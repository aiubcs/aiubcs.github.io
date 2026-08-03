import React from 'react';
import { Bell, Sparkles } from 'lucide-react';
import { UserProfile } from '../data/mockData';

interface NavbarProps {
  user: UserProfile;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenNotifications, onOpenProfile }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left: AIUB CS Logo & Title */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 via-blue-700 to-indigo-900 flex items-center justify-center p-0.5 shadow-md shadow-blue-500/10">
              <img 
                src="https://img.icons8.com/color/96/academic-cap.png" 
                alt="AIUB Logo" 
                className="w-7 h-7 bg-white rounded-full p-1"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">AIUB CS</span>
              <span className="bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-800">PWA</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Department of Computer Science</p>
          </div>
        </div>

        {/* Right Actions: Notification & Profile */}
        <div className="flex items-center space-x-2">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {user.unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white dark:border-slate-900 animate-pulse">
                {user.unreadNotifications}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="relative p-0.5 rounded-full ring-2 ring-teal-500/40 hover:ring-teal-500 transition-all focus:outline-none"
            title="Profile"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
