import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { MaterialsView } from './components/MaterialsView';
import { CoursesView } from './components/CoursesView';
import { SavedView } from './components/SavedView';
import { DownloadsView } from './components/DownloadsView';
import { ProfileView } from './components/ProfileView';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { SyllabusModal } from './components/SyllabusModal';
import { NotificationModal } from './components/NotificationModal';
import { AdminLogin } from './components/AdminLogin';
import { AdminView } from './components/AdminView';
import { CURRENT_USER, COURSES, Course, MaterialItem } from './data/mockData';
import { fetchMaterialsFromCloudflare, fetchCoursesFromCloudflare } from './services/api';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [showAdmin, setShowAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(
    localStorage.getItem('aiubcs_admin_token')
  );
  const [adminUsername, setAdminUsername] = useState<string>(
    localStorage.getItem('aiubcs_admin_username') || ''
  );

  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [savedMaterials, setSavedMaterials] = useState<MaterialItem[]>([]);
  const [downloadedMaterials, setDownloadedMaterials] = useState<MaterialItem[]>([]);

  const refreshData = () => {
    fetchCoursesFromCloudflare().then(data => {
      if (data && data.length > 0) setCourses(data);
    });
    fetchMaterialsFromCloudflare().then(data => {
      if (data) setMaterials(data);
    });
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackFromMaterials = () => {
    setSelectedCourse(null);
  };

  const handleToggleSaved = (material: MaterialItem) => {
    setSavedMaterials(prev => {
      const exists = prev.some(m => m.id === material.id);
      if (exists) {
        return prev.filter(m => m.id !== material.id);
      } else {
        return [...prev, { ...material, isBookmarked: true }];
      }
    });
  };

  const handleToggleDownloaded = (material: MaterialItem) => {
    setDownloadedMaterials(prev => {
      const exists = prev.some(m => m.id === material.id);
      if (exists) {
        return prev;
      } else {
        return [...prev, { ...material, isDownloaded: true }];
      }
    });
  };

  return (
    <div className="min-h-app bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-emerald-500 selection:text-white">
      {/* Mobile Frame Container */}
      <div className="max-w-md mx-auto w-full min-h-app bg-white dark:bg-slate-900 shadow-2xl relative flex flex-col">
        {/* Navbar */}
        <Navbar
          user={CURRENT_USER}
          onOpenNotifications={() => setShowNotifications(true)}
          onOpenProfile={() => {
            setSelectedCourse(null);
            setActiveTab('profile');
          }}
        />

        {/* Main Body */}
        <main className="flex-1 px-4 py-2 overflow-y-auto">
          {selectedCourse ? (
            <MaterialsView
              course={selectedCourse}
              onBack={handleBackFromMaterials}
              onSelectMaterial={(material) => setSelectedMaterial(material)}
              onOpenSyllabus={() => setShowSyllabus(true)}
            />
          ) : (
            <>
              {activeTab === 'home' && (
                <HomeView
                  user={CURRENT_USER}
                  courses={courses}
                  materials={materials}
                  onSelectCourse={handleSelectCourse}
                  onSelectMaterial={(material) => setSelectedMaterial(material)}
                  onNavigateTab={(tab) => {
                    setSelectedCourse(null);
                    setActiveTab(tab);
                  }}
                  onSearchQuery={(q) => {
                    if (q) {
                      setSelectedCourse(null);
                      setActiveTab('courses');
                    }
                  }}
                />
              )}

              {activeTab === 'courses' && (
                <CoursesView courses={courses} onSelectCourse={handleSelectCourse} />
              )}

              {activeTab === 'saved' && (
                <SavedView
                  savedMaterials={savedMaterials}
                  onSelectMaterial={(material) => setSelectedMaterial(material)}
                  onRemoveBookmark={handleToggleSaved}
                />
              )}

              {activeTab === 'downloads' && (
                <DownloadsView
                  downloadedMaterials={downloadedMaterials}
                  onSelectMaterial={(material) => setSelectedMaterial(material)}
                />
              )}

              {activeTab === 'profile' && (
                <ProfileView
                  user={CURRENT_USER}
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
                  onOpenAdmin={() => setShowAdmin(true)}
                />
              )}
            </>
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setSelectedCourse(null);
            setActiveTab(tab);
          }}
          savedCount={savedMaterials.length}
          downloadsCount={downloadedMaterials.length}
        />
      </div>

      {/* Modals & Overlays */}
      {selectedMaterial && (
        <DocumentViewerModal
          material={selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          onToggleSaved={handleToggleSaved}
          onToggleDownloaded={handleToggleDownloaded}
        />
      )}

      {showSyllabus && selectedCourse && (
        <SyllabusModal
          course={selectedCourse}
          onClose={() => setShowSyllabus(false)}
        />
      )}

      {showNotifications && (
        <NotificationModal
          onClose={() => setShowNotifications(false)}
        />
      )}

      {/* Admin Panel (full-screen overlay) */}
      {showAdmin && (
        <div className="fixed inset-0 z-50 bg-slate-100 dark:bg-slate-950 overflow-y-auto">
          {adminToken ? (
            <AdminView
              token={adminToken}
              username={adminUsername}
              onBack={() => setShowAdmin(false)}
              onLoggedOut={() => {
                localStorage.removeItem('aiubcs_admin_token');
                localStorage.removeItem('aiubcs_admin_username');
                setAdminToken(null);
                setAdminUsername('');
                setShowAdmin(false);
                refreshData();
              }}
            />
          ) : (
            <AdminLogin
              onLogin={(token, username) => {
                localStorage.setItem('aiubcs_admin_token', token);
                localStorage.setItem('aiubcs_admin_username', username);
                setAdminToken(token);
                setAdminUsername(username);
              }}
              onBack={() => setShowAdmin(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
