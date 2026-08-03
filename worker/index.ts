import { Hono } from 'hono';
import { cors } from 'hono/cors';

export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
  ASSETS: Fetcher;
}

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());

// Health Check API
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', service: 'AIUB CS Cloudflare Worker API' });
});

// GET /api/courses
app.get('/api/courses', async (c) => {
  try {
    const { results } = await c.env.DB.prepare('SELECT * FROM courses ORDER BY code ASC').all();
    const courses = results.map((row: any) => ({
      ...row,
      ongoing: Boolean(row.ongoing),
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
        ...course,
        ongoing: Boolean(course.ongoing),
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
    const materials = results.map((row: any) => ({
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
      pagesCount: row.pages_count,
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

// POST /api/materials/upload (Uploads file to R2 & inserts metadata into D1)
app.post('/api/materials/upload', async (c) => {
  try {
    const formData = await c.req.parseBody();
    const file = formData['file'] as File;
    const courseCode = formData['courseCode'] as string;
    const title = formData['title'] as string;
    const category = formData['category'] as string;

    if (!file || !courseCode || !title) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }

    const r2Key = `${courseCode.toLowerCase()}/${Date.now()}-${file.name}`;
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
    return c.json({ success: true, data: results });
  } catch (err: any) {
    return c.json({ success: false, error: err.message }, 500);
  }
});

export default app;
