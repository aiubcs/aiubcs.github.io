import { Course, MaterialItem, COURSES, MOCK_MATERIALS } from '../data/mockData';

const API_BASE = '/api';

export async function fetchCoursesFromCloudflare(): Promise<Course[]> {
  try {
    const res = await fetch(`${API_BASE}/courses`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
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
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
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
    const json = await res.json();
    return json.success;
  } catch (err) {
    console.error('Failed to upload to Cloudflare R2:', err);
    return false;
  }
}
