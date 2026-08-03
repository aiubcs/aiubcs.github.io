import { Course, MaterialItem, COURSES, MOCK_MATERIALS } from '../data/mockData';

// Always use the live Cloudflare Worker API — no local API server exists.
const API_BASE = 'https://aiubcs-api.tanvirrahman-b16.workers.dev/api';

export async function fetchCoursesFromCloudflare(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_BASE}/courses`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json: any = await res.json();
    if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map((c: any) => ({
        id: c.id,
        code: c.code,
        title: c.title,
        category: c.category || 'Core CS',
        credits: Number(c.credits) || 3,
        ongoing: Boolean(c.ongoing),
        completedTopics: Number(c.completedTopics ?? c.completed_topics) || 0,
        totalTopics: Number(c.totalTopics ?? c.total_topics) || 14,
        iconType: c.iconType || c.icon_type || 'code',
        syllabus: Array.isArray(c.syllabus) ? c.syllabus : []
      }));
    }
  } catch (err) {
    console.warn('Falling back to local PWA offline courses:', err);
  }
  return COURSES;
}

export async function fetchMaterialsFromCloudflare(courseId?: string, category?: string): Promise<MaterialItem[]> {
  try {
    let url = `${API_BASE}/materials`;
    const params = new URLSearchParams();
    if (courseId) params.append('courseId', courseId);
    if (category && category !== 'All') params.append('category', category);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json: any = await res.json();
    if (json && json.success && Array.isArray(json.data)) {
      return json.data;
    }
  } catch (err) {
    console.warn('Falling back to local PWA offline materials:', err);
  }
  return MOCK_MATERIALS;
}

export async function uploadMaterialToCloudflareR2(file: File, courseCode: string, title: string, category: string, token?: string): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseCode', courseCode);
    formData.append('title', title);
    formData.append('category', category);

    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/materials/upload`, {
      method: 'POST',
      headers,
      body: formData,
    });
    const json: any = await res.json();
    return Boolean(json && json.success);
  } catch (err) {
    console.error('Failed to upload to Cloudflare R2:', err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Admin auth + panel API (token-based)
// ---------------------------------------------------------------------------

const ADMIN_TOKEN_KEY = 'aiubcs_admin_token';
const ADMIN_USERNAME_KEY = 'aiubcs_admin_username';

export function getAdminToken(): string | null {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getAdminUsername(): string | null {
  return localStorage.getItem(ADMIN_USERNAME_KEY);
}

export function setAdminSession(token: string, username: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_USERNAME_KEY, username);
}

export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USERNAME_KEY);
}

async function adminFetch(path: string, token: string, init?: RequestInit): Promise<any> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(init?.headers || {}),
    },
  });
  return res.json();
}

export async function loginAdmin(username: string, password: string): Promise<{ token: string; username: string } | null> {
  try {
    const res = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const json: any = await res.json();
    if (res.ok && json?.success && json?.data?.token) {
      return { token: json.data.token, username: json.data.username };
    }
    return null;
  } catch (err) {
    console.error('Login failed:', err);
    return null;
  }
}

export async function logoutAdmin(token: string): Promise<void> {
  try {
    await fetch(`${API_BASE}/admin/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    console.warn('Logout request failed:', err);
  }
}

export async function getAdminMe(token: string): Promise<{ userId: number; username: string } | null> {
  try {
    const res = await fetch(`${API_BASE}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json: any = await res.json();
    if (res.ok && json?.success && json?.data) return json.data;
    return null;
  } catch (err) {
    return null;
  }
}

export async function fetchAnnouncements(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/announcements`);
    const json: any = await res.json();
    return json?.success && Array.isArray(json.data) ? json.data : [];
  } catch (err) {
    return [];
  }
}

export async function createAnnouncement(token: string, data: { title: string; desc: string; date?: string }): Promise<boolean> {
  try {
    const json = await adminFetch('/admin/announcements', token, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return Boolean(json && json.success);
  } catch (err) {
    return false;
  }
}

export async function updateAnnouncement(token: string, id: string, data: { title: string; desc: string; date?: string; unread?: boolean }): Promise<boolean> {
  try {
    const json = await adminFetch(`/admin/announcements/${id}`, token, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return Boolean(json && json.success);
  } catch (err) {
    return false;
  }
}

export async function deleteAnnouncement(token: string, id: string): Promise<boolean> {
  try {
    const json = await adminFetch(`/admin/announcements/${id}`, token, {
      method: 'DELETE',
    });
    return Boolean(json && json.success);
  } catch (err) {
    return false;
  }
}

export async function updateCourse(token: string, id: string, patch: { ongoing?: boolean; completedTopics?: number }): Promise<boolean> {
  try {
    const json = await adminFetch(`/admin/courses/${id}`, token, {
      method: 'PATCH',
      body: JSON.stringify(patch),
    });
    return Boolean(json && json.success);
  } catch (err) {
    return false;
  }
}

export async function deleteMaterial(token: string, id: string): Promise<boolean> {
  try {
    const json = await adminFetch(`/admin/materials/${id}`, token, {
      method: 'DELETE',
    });
    return Boolean(json && json.success);
  } catch (err) {
    return false;
  }
}
