import React from 'react';
import { Home, BookOpen, Bookmark, Download, User } from 'lucide-react';

export type TabType = 'home' | 'courses' | 'saved' | 'downloads' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  savedCount: number;
  downloadsCount: number;
}

interface TabItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  savedCount,
  downloadsCount,
}) => {
  const tabs: TabItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'saved', label: 'Saved', icon: Bookmark, badge: savedCount },
    { id: 'downloads', label: 'Downloads', icon: Download, badge: downloadsCount },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 pb-[var(--safe-bottom)] transition-colors">
      <div className="max-w-md mx-auto px-4 pl-[calc(var(--safe-left)+1rem)] pr-[calc(var(--safe-right)+1rem)] flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as TabType)}
              className={`relative flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-teal-700 dark:text-teal-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-emerald-500 text-white text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 bg-teal-600 dark:bg-teal-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
