import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  BellRing,
  FileText,
  UploadCloud,
  BookOpen,
  Trash2,
  Pencil,
  Plus,
  X,
  Check,
  LogOut,
  Loader2,
} from 'lucide-react';
import { Course, MaterialItem } from '../data/mockData';
import {
  fetchAnnouncements,
  fetchCoursesFromCloudflare,
  fetchMaterialsFromCloudflare,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  updateCourse,
  deleteMaterial,
  uploadMaterialToCloudflareR2,
} from '../services/api';

interface AdminViewProps {
  token: string;
  username: string;
  onBack: () => void;
  onLoggedOut: () => void;
}

type AdminTab = 'announcements' | 'materials' | 'upload' | 'courses';

const CATEGORIES = ['Mid', 'Final', 'Notes', 'Textbooks', 'Labs', 'Past Papers'];

export const AdminView: React.FC<AdminViewProps> = ({ token, username, onBack, onLoggedOut }) => {
  const [tab, setTab] = useState<AdminTab>('announcements');

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Announcement editor
  const [editingAnn, setEditingAnn] = useState<any | null>(null);
  const [annTitle, setAnnTitle] = useState('');
  const [annDesc, setAnnDesc] = useState('');

  // Upload form
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCourse, setUploadCourse] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Mid');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const flash = (type: 'ok' | 'err', text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const [anns, mats, crs] = await Promise.all([
      fetchAnnouncements(),
      fetchMaterialsFromCloudflare(),
      fetchCoursesFromCloudflare(),
    ]);
    setAnnouncements(anns);
    setMaterials(mats);
    setCourses(crs);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startCreateAnn = () => {
    setEditingAnn(null);
    setAnnTitle('');
    setAnnDesc('');
  };

  const startEditAnn = (ann: any) => {
    setEditingAnn(ann);
    setAnnTitle(ann.title || '');
    setAnnDesc(ann.desc || '');
  };

  const saveAnnouncement = async () => {
    if (!annTitle.trim() || !annDesc.trim()) {
      flash('err', 'Title and description are required');
      return;
    }
    setBusy(true);
    const ok = editingAnn
      ? await updateAnnouncement(token, editingAnn.id, { title: annTitle.trim(), desc: annDesc.trim() })
      : await createAnnouncement(token, { title: annTitle.trim(), desc: annDesc.trim() });
    setBusy(false);
    if (ok) {
      flash('ok', editingAnn ? 'Announcement updated' : 'Announcement published');
      setEditingAnn(null);
      load();
    } else {
      flash('err', 'Failed to save announcement');
    }
  };

  const removeAnnouncement = async (id: string) => {
    if (!window.confirm('Delete this announcement?')) return;
    setBusy(true);
    const ok = await deleteAnnouncement(token, id);
    setBusy(false);
    if (ok) {
      flash('ok', 'Announcement deleted');
      load();
    } else {
      flash('err', 'Failed to delete announcement');
    }
  };

  const toggleCourse = async (course: Course) => {
    setBusy(true);
    const ok = await updateCourse(token, course.id, { ongoing: !course.ongoing });
    setBusy(false);
    if (ok) {
      flash('ok', `${course.code} ${course.ongoing ? 'marked not ongoing' : 'marked ongoing'}`);
      load();
    } else {
      flash('err', 'Failed to update course');
    }
  };

  const removeMaterial = async (id: string) => {
    if (!window.confirm('Delete this material? The R2 file will also be removed.')) return;
    setBusy(true);
    const ok = await deleteMaterial(token, id);
    setBusy(false);
    if (ok) {
      flash('ok', 'Material deleted');
      load();
    } else {
      flash('err', 'Failed to delete material');
    }
  };

  const handleUpload = async () => {
    if (!uploadFile || !uploadCourse || !uploadTitle.trim()) {
      flash('err', 'Select a file, course and enter a title');
      return;
    }
    setBusy(true);
    const ok = await uploadMaterialToCloudflareR2(uploadFile, uploadCourse, uploadTitle.trim(), uploadCategory, token);
    setBusy(false);
    if (ok) {
      flash('ok', 'Material uploaded and published');
      setUploadFile(null);
      setUploadTitle('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      load();
    } else {
      flash('err', 'Upload failed — check the file size and try again');
    }
  };

  const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'announcements', label: 'Announcements', icon: BellRing },
    { id: 'materials', label: 'Materials', icon: FileText },
    { id: 'upload', label: 'Upload', icon: UploadCloud },
    { id: 'courses', label: 'Courses', icon: BookOpen },
  ];

  return (
    <div className="min-h-app bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <div className="max-w-md mx-auto w-full min-h-app bg-white dark:bg-slate-900 relative flex flex-col">
        {/* Admin Header */}
        <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 pl-[calc(var(--safe-left)+1rem)] pr-[calc(var(--safe-right)+1rem)] pt-3 pt-[calc(var(--safe-top)+0.75rem)] pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <button
                onClick={onBack}
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                title="Back to app"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-none">Admin Panel</h1>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                  Signed in as <span className="font-bold text-emerald-600 dark:text-emerald-400">{username}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onLoggedOut}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              title="Sign out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Tab bar */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#043927] text-white shadow-md shadow-teal-950/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Notice */}
        {notice && (
          <div className={`px-4 pt-3 ${notice.type === 'ok' ? '' : ''}`}>
            <p
              className={`text-[11px] font-semibold rounded-xl px-3 py-2 border ${
                notice.type === 'ok'
                  ? 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50'
                  : 'text-rose-500 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50'
              }`}
            >
              {notice.text}
            </p>
          </div>
        )}

        <main className="flex-1 px-4 py-4 pb-[calc(var(--safe-bottom)+5rem)] space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
            </div>
          ) : (
            <>
              {/* ---------- Announcements ---------- */}
              {tab === 'announcements' && (
                <>
                  {/* Editor */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {editingAnn ? 'Edit Announcement' : 'New Announcement'}
                      </h3>
                      {editingAnn && (
                        <button onClick={startCreateAnn} className="text-[10px] font-bold text-slate-400 flex items-center space-x-1">
                          <X className="w-3 h-3" /> Cancel edit
                        </button>
                      )}
                    </div>
                    <input
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      placeholder="Title (e.g. Midterm exam schedule)"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                    <textarea
                      value={annDesc}
                      onChange={(e) => setAnnDesc(e.target.value)}
                      placeholder="Description"
                      rows={2}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 resize-none"
                    />
                    <button
                      onClick={saveAnnouncement}
                      disabled={busy}
                      className="w-full py-2.5 bg-[#043927] hover:bg-[#075239] disabled:opacity-60 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      {editingAnn ? <Pencil className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{busy ? 'Saving...' : editingAnn ? 'Update Announcement' : 'Publish Announcement'}</span>
                    </button>
                  </div>

                  {/* List */}
                  {announcements.length === 0 ? (
                    <p className="text-center text-[11px] font-semibold text-slate-400 py-10">No announcements yet</p>
                  ) : (
                    announcements.map((ann) => (
                      <div
                        key={ann.id}
                        className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-1.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{ann.title}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">{ann.date}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={() => startEditAnn(ann)}
                              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-colors"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => removeAnnouncement(ann.id)}
                              className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{ann.desc}</p>
                      </div>
                    ))
                  )}
                </>
              )}

              {/* ---------- Materials ---------- */}
              {tab === 'materials' && (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {materials.length} material{materials.length === 1 ? '' : 's'}
                  </p>
                  {materials.length === 0 ? (
                    <p className="text-center text-[11px] font-semibold text-slate-400 py-10">No materials uploaded yet</p>
                  ) : (
                    materials.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-red-500 text-white font-black text-[9px] flex items-center justify-center flex-shrink-0">
                            {(m.fileType || 'PDF').toUpperCase().slice(0, 3)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{m.title}</p>
                            <p className="text-[10px] text-slate-400 font-medium truncate">
                              {m.courseCode} · {m.category} · {m.size}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMaterial(m.id)}
                          className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-500 transition-colors flex-shrink-0"
                          title="Delete material"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </>
              )}

              {/* ---------- Upload ---------- */}
              {tab === 'upload' && (
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 space-y-3">
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">Upload Material</h3>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="text-[11px] file:mr-3 file:px-3 file:py-2 file:rounded-xl file:border-0 file:bg-[#043927] file:text-white file:text-[11px] file:font-bold file:cursor-pointer text-slate-500"
                  />
                  {uploadFile && (
                    <p className="text-[10px] text-slate-400 font-medium truncate">
                      {uploadFile.name} · {(uploadFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                  <select
                    value={uploadCourse}
                    onChange={(e) => setUploadCourse(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  >
                    <option value="">Select course...</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.code}>
                        {c.code} — {c.title}
                      </option>
                    ))}
                  </select>
                  <input
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Title (e.g. Midterm 2024 Question)"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  />
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleUpload}
                    disabled={busy}
                    className="w-full py-2.5 bg-[#043927] hover:bg-[#075239] disabled:opacity-60 text-white text-xs font-bold rounded-xl flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    {busy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
                    <span>{busy ? 'Uploading...' : 'Upload & Publish'}</span>
                  </button>
                </div>
              )}

              {/* ---------- Courses ---------- */}
              {tab === 'courses' && (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {courses.length} courses — tap toggle to mark as currently offered
                  </p>
                  {courses.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white">{c.code}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate">{c.title}</p>
                      </div>
                      <button
                        onClick={() => toggleCourse(c)}
                        disabled={busy}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-colors ${
                          c.ongoing
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                        title={c.ongoing ? 'Currently offered — click to unmark' : 'Not currently offered — click to mark ongoing'}
                      >
                        {c.ongoing && <Check className="w-3 h-3" />}
                        <span>{c.ongoing ? 'Ongoing' : 'Offered'}</span>
                      </button>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
