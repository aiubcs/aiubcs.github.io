import React from 'react';
import { Bell } from 'lucide-react';
import { UserProfile } from '../data/mockData';

interface NavbarProps {
  user: UserProfile;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onOpenNotifications, onOpenProfile }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left: AIUB CS Logo & Subtitle */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-white border border-slate-200 dark:border-slate-700 p-0.5 shadow-sm flex items-center justify-center">
            <img 
              src="https://aiub.edu/Files/Templates/AIUBv3/assets/images/aiub-logo-white-border.svg" 
              alt="AIUB Logo" 
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight leading-none">
              AIUB CS
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Department of Computer Science
            </p>
          </div>
        </div>

        {/* Right Actions: Notification Bell & Profile Avatar */}
        <div className="flex items-center space-x-2.5">
          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-full bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-xs transition-colors"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            {user.unreadNotifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {user.unreadNotifications}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            className="w-9 h-9 rounded-full overflow-hidden border border-slate-200/80 dark:border-slate-700 shadow-xs hover:opacity-90 transition-opacity"
            title="Profile"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
