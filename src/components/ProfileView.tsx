import React, { useState } from 'react';
import { User, Mail, GraduationCap, Building2, Moon, Sun, Smartphone, DownloadCloud, ShieldCheck, LogOut, Check } from 'lucide-react';
import { UserProfile } from '../data/mockData';

interface ProfileViewProps {
  user: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [pwaInstalled, setPwaInstalled] = useState(false);

  const handleInstallPWA = () => {
    setPwaInstalled(true);
    alert('AIUB CS PWA app installed to your mobile home screen!');
  };

  return (
    <div className="pb-24 pt-2 space-y-5">
      {/* User Header Profile Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3">
        <div className="relative w-20 h-20 mx-auto">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-500/30 shadow-md"
          />
          <div className="absolute bottom-0 right-0 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900" />
        </div>

        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">{user.name}</h2>
          <p className="text-xs font-bold text-teal-600 dark:text-teal-400">{user.role}</p>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {user.studentId}</p>
        </div>
      </div>

      {/* Profile Details List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        <div className="p-4 flex items-center space-x-3">
          <GraduationCap className="w-5 h-5 text-slate-400" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Department</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user.department}</div>
          </div>
        </div>

        <div className="p-4 flex items-center space-x-3">
          <Mail className="w-5 h-5 text-slate-400" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Student Email</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user.email}</div>
          </div>
        </div>

        <div className="p-4 flex items-center space-x-3">
          <Building2 className="w-5 h-5 text-slate-400" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Institution</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">American International University-Bangladesh</div>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        <div
          onClick={onToggleDarkMode}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {isDarkMode ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Dark Mode</span>
          </div>
          <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${isDarkMode ? 'bg-teal-600' : 'bg-slate-300'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isDarkMode ? 'translate-x-5' : ''}`} />
          </div>
        </div>

        <div
          onClick={handleInstallPWA}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-teal-500" />
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Install PWA Mobile App</div>
              <div className="text-[10px] text-slate-400">Add to home screen for offline use</div>
            </div>
          </div>
          {pwaInstalled ? (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <Check className="w-4 h-4" /> Installed
            </span>
          ) : (
            <DownloadCloud className="w-5 h-5 text-teal-600" />
          )}
        </div>
      </div>
    </div>
  );
};
