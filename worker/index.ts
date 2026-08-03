/// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono';
import { cors } from 'hono/cors';

export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  ASSETS: Fetcher;
}

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all origins (GitHub Pages, localhost, mobile PWA)
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// ---------------------------------------------------------------------------
// Admin authentication (username + password -> session token in D1)
// Password format: pbkdf2$<iterations>$<saltHex>$<hashHex>
// ---------------------------------------------------------------------------

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const PBKDF2_ITERATIONS = 100000; // Cloudflare Workers caps PBKDF2 at 100k iterations

function bytesToHex(bytes: Uint8Array<ArrayBuffer>): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

async function pbkdf2(password: string, salt: Uint8Array<ArrayBuffer>, iterations: number): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return bytesToHex(new Uint8Array(bits));
}

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, PBKDF2_ITERATIONS);
  return `pbkdf2$${PBKDF2_ITERATIONS}$${bytesToHex(salt)}$${hash}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;
  const iterations = parseInt(parts[1], 10);
  if (isNaN(iterations)) return false;
  const hash = await pbkdf2(password, hexToBytes(parts[2]), iterations);
  return hash === parts[3];
}

function randomToken(byteLength = 32): string {
  return bytesToHex(crypto.getRandomValues(new Uint8Array(byteLength)));
}

// Resolves the admin from the Authorization: Bearer <token> header, or null
async function requireAdmin(c: any) {
  const auth = c.req.header('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;

  const session: any = await c.env.DB.prepare(
    `SELECT s.token, s.expires_at, u.id AS user_id, u.username
     FROM sessions s JOIN users u ON u.id = s.user_id
     WHERE s.token = ?`
  ).bind(token).first();
  if (!session) return null;

  if (session.expires_at < Date.now()) {
    await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
    return null;
  }
  return { userId: session.user_id, username: session.username };
}

// POST /api/admin/login — exchange username + password for a session token
app.post('/api/admin/login', async (c) => {
  try {
    const body = await c.req.json();
    const username = String(body?.username || '').trim();
    const password = String(body?.password || '');
    if (!username || !password) {
      return c.json({ success: false, error: 'Username and password are required' }, 400);
    }

    const user: any = await c.env.DB.prepare(
      'SELECT id, username, password_hash FROM users WHERE username = ?'
    ).bind(username).first();
    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return c.json({ success: false, error: 'Invalid username or password' }, 401);
    }

    const token = randomToken(32);
    const expiresAt = Date.now() + SESSION_TTL_MS;
    await c.env.DB.prepare(
      'INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)'
    ).bind(token, user.id, expiresAt).run();

    return c.json({ success: true, data: { token, username: user.username, expiresAt } });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/admin/logout — invalidate the session token
app.post('/api/admin/logout', async (c) => {
  const auth = c.req.header('Authorization') || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  if (token) {
    await c.env.DB.prepare('DELETE FROM sessions WHERE token = ?').bind(token).run();
  }
  return c.json({ success: true });
});

// GET /api/admin/me — validate a session token
app.get('/api/admin/me', async (c) => {
  const admin = await requireAdmin(c);
  if (!admin) return c.json({ success: false, error: 'Unauthorized' }, 401);
  return c.json({ success: true, data: admin });
});

// Health Check API
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', service: 'AIUB CS Cloudflare Worker API' });
});

// GET /api/courses
app.get('/api/courses', async (c) => {
  try {
    const { results } = await c.env.DB.prepare('SELECT * FROM courses ORDER BY code ASC').all();
    const courses = results.map((row: any) => ({
      id: row.id,
      code: row.code,
      title: row.title,
      category: row.category,
      credits: row.credits,
      ongoing: Boolean(row.ongoing),
      completedTopics: Number(row.completed_topics) || 0,
      totalTopics: Number(row.total_topics) || 14,
      iconType: row.icon_type || 'code',
      syllabus: JSON.parse(row.syllabus_json || '[]')
    }));
    return c.json({ success: true, data: courses });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/courses/:id
app.get('/api/courses/:id', async (c) => {
  const id = c.req.param('id');
  try {
    const course: any = await c.env.DB.prepare('SELECT * FROM courses WHERE id = ?').bind(id).first();
    if (!course) return c.json({ success: false, error: 'Course not found' }, 404);
    
    return c.json({
      success: true,
      data: {
        id: course.id,
        code: course.code,
        title: course.title,
        category: course.category,
        credits: course.credits,
        ongoing: Boolean(course.ongoing),
        completedTopics: Number(course.completed_topics) || 0,
        totalTopics: Number(course.total_topics) || 14,
        iconType: course.icon_type || 'code',
        syllabus: JSON.parse(course.syllabus_json || '[]')
      }
    });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/materials
app.get('/api/materials', async (c) => {
  const courseId = c.req.query('courseId');
  const category = c.req.query('category');
  
  try {
    let query = 'SELECT * FROM materials';
    const params: string[] = [];

    if (courseId && category) {
      query += ' WHERE course_id = ? AND category = ?';
      params.push(courseId, category);
    } else if (courseId) {
      query += ' WHERE course_id = ?';
      params.push(courseId);
    } else if (category && category !== 'All') {
      query += ' WHERE category = ?';
      params.push(category);
    }

    query += ' ORDER BY id ASC';

    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    const materials = (results || []).map((row: any) => ({
      id: row.id,
      courseId: row.course_id,
      courseCode: row.course_code,
      courseTitle: row.course_title,
      title: row.title,
      addedTime: row.added_time,
      size: row.size,
      fileType: row.file_type,
      category: row.category,
      badges: JSON.parse(row.badges_json || '[]'),
      isBookmarked: Boolean(row.is_bookmarked),
      isDownloaded: Boolean(row.is_downloaded),
      pagesCount: row.pages_count || 1,
      r2Key: row.r2_key,
      documentContent: row.document_content_json ? JSON.parse(row.document_content_json) : null
    }));

    return c.json({ success: true, data: materials });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/materials/:id/download (Streams file from Cloudflare R2 Bucket)
app.get('/api/materials/:id/download', async (c) => {
  const id = c.req.param('id');
  try {
    const material: any = await c.env.DB.prepare('SELECT * FROM materials WHERE id = ?').bind(id).first();
    if (!material) return c.json({ success: false, error: 'Material not found' }, 404);

    if (!material.r2_key) {
      return c.json({ success: false, error: 'No R2 object key attached' }, 400);
    }

    const object = await c.env.BUCKET.get(material.r2_key);
    if (!object) {
      return c.json({ success: false, error: 'File object not found in Cloudflare R2' }, 404);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Content-Disposition', `attachment; filename="${material.title}"`);

    return new Response(object.body, { headers });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// POST /api/materials/upload (Uploads file to R2 & inserts metadata into D1) — admin only
app.post('/api/materials/upload', async (c) => {
  const admin = await requireAdmin(c);
  if (!admin) return c.json({ success: false, error: 'Unauthorized' }, 401);

  try {
    const formData = await c.req.parseBody();
    const file = formData['file'] as File;
    const courseCode = formData['courseCode'] as string;
    const title = formData['title'] as string;
    const category = formData['category'] as string;

    if (!file || !courseCode || !title) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }

    const r2Key = `${courseCode.toLowerCase().replace(/\s+/g, '')}/${Date.now()}-${file.name}`;
    await c.env.BUCKET.put(r2Key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type }
    });

    const materialId = `mat-${Date.now()}`;
    await c.env.DB.prepare(`
      INSERT INTO materials (id, course_id, course_code, course_title, title, added_time, size, file_type, category, badges_json, r2_key)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      materialId,
      `csc-${courseCode.toLowerCase().replace(/\s+/g, '')}`,
      courseCode,
      title,
      file.name,
      'Just now',
      `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      file.name.split('.').pop() || 'pdf',
      category || 'Mid',
      JSON.stringify(['Uploaded']),
      r2Key
    ).run();

    return c.json({ success: true, message: 'Uploaded to Cloudflare R2 & D1 successfully', id: materialId });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// GET /api/announcements
app.get('/api/announcements', async (c) => {
  try {
    const { results } = await c.env.DB.prepare('SELECT * FROM announcements ORDER BY date DESC').all();
    return c.json({ success: true, data: results || [] });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// ---------------------------------------------------------------------------
// Admin content management (all require a valid session token)
// ---------------------------------------------------------------------------

// POST /api/admin/announcements — create announcement
app.post('/api/admin/announcements', async (c) => {
  const admin = await requireAdmin(c);
  if (!admin) return c.json({ success: false, error: 'Unauthorized' }, 401);

  try {
    const body = await c.req.json();
    const title = String(body?.title || '').trim();
    const desc = String(body?.desc || '').trim();
    if (!title || !desc) {
      return c.json({ success: false, error: 'Title and description are required' }, 400);
    }
    const id = `ann-${Date.now()}`;
    const date = String(body?.date || '').trim() || new Date().toISOString().slice(0, 10);
    await c.env.DB.prepare(
      'INSERT INTO announcements (id, title, date, desc, unread) VALUES (?, ?, ?, ?, 1)'
    ).bind(id, title, date, desc).run();
    return c.json({ success: true, data: { id } });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// PATCH /api/admin/announcements/:id — update announcement
app.patch('/api/admin/announcements/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (!admin) return c.json({ success: false, error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const existing: any = await c.env.DB.prepare('SELECT * FROM announcements WHERE id = ?').bind(id).first();
    if (!existing) return c.json({ success: false, error: 'Announcement not found' }, 404);

    const title = String(body?.title ?? existing.title).trim();
    const desc = String(body?.desc ?? existing.desc).trim();
    const date = String(body?.date ?? existing.date).trim();
    const unread = body?.unread === undefined ? existing.unread : (body.unread ? 1 : 0);

    await c.env.DB.prepare(
      'UPDATE announcements SET title = ?, desc = ?, date = ?, unread = ? WHERE id = ?'
    ).bind(title, desc, date, unread, id).run();
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// DELETE /api/admin/announcements/:id — remove announcement
app.delete('/api/admin/announcements/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (!admin) return c.json({ success: false, error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    await c.env.DB.prepare('DELETE FROM announcements WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// PATCH /api/admin/courses/:id — update course (ongoing, completed topics)
app.patch('/api/admin/courses/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (!admin) return c.json({ success: false, error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const course: any = await c.env.DB.prepare('SELECT * FROM courses WHERE id = ?').bind(id).first();
    if (!course) return c.json({ success: false, error: 'Course not found' }, 404);

    const ongoing = body?.ongoing === undefined ? course.ongoing : (body.ongoing ? 1 : 0);
    const completed = body?.completedTopics === undefined ? course.completed_topics : Number(body.completedTopics) || 0;

    await c.env.DB.prepare(
      'UPDATE courses SET ongoing = ?, completed_topics = ? WHERE id = ?'
    ).bind(ongoing, completed, id).run();
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

// DELETE /api/admin/materials/:id — remove material + its R2 object
app.delete('/api/admin/materials/:id', async (c) => {
  const admin = await requireAdmin(c);
  if (!admin) return c.json({ success: false, error: 'Unauthorized' }, 401);

  try {
    const id = c.req.param('id');
    const material: any = await c.env.DB.prepare('SELECT * FROM materials WHERE id = ?').bind(id).first();
    if (!material) return c.json({ success: false, error: 'Material not found' }, 404);

    if (material.r2_key) {
      await c.env.BUCKET.delete(material.r2_key);
    }
    await c.env.DB.prepare('DELETE FROM materials WHERE id = ?').bind(id).run();
    return c.json({ success: true });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

export default app;
