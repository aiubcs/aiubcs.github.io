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

export async function uploadMaterialToCloudflareR2(file: File, courseCode: string, title: string, category: string): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseCode', courseCode);
    formData.append('title', title);
    formData.append('category', category);

    const res = await fetch(`${API_BASE}/materials/upload`, {
      method: 'POST',
      body: formData,
    });
    const json: any = await res.json();
    return Boolean(json && json.success);
  } catch (err) {
    console.error('Failed to upload to Cloudflare R2:', err);
    return false;
  }
}
