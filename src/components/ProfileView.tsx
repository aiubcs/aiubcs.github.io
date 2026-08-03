import React, { useState } from 'react';
import { User, Mail, GraduationCap, Building2, Moon, Sun, Smartphone, DownloadCloud, Check } from 'lucide-react';
import { UserProfile } from '../data/mockData';

interface ProfileViewProps {
  user: UserProfile;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  deferredPrompt?: any;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  isDarkMode,
  onToggleDarkMode,
  deferredPrompt
}) => {
  const [pwaInstalled, setPwaInstalled] = useState(false);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setPwaInstalled(true);
      }
    } else {
      alert('To install AIUB CS PWA:\n• On Android/Chrome: Tap Chrome Menu (⋮) -> "Install app" or "Add to Home screen"\n• On iPhone/Safari: Tap Share icon (⎋) -> "Add to Home Screen"');
    }
  };

  return (
    <div className="pb-24 pt-1 space-y-4">
      {/* User Header Profile Card */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-2">
        <div className="relative w-16 h-16 mx-auto">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500/30 shadow-xs"
          />
          <div className="absolute bottom-0 right-0 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900" />
        </div>

        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">{user.name}</h3>
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{user.role}</p>
          <p className="text-[10px] text-slate-400 font-mono">ID: {user.studentId}</p>
        </div>
      </div>

      {/* Profile Details List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        <div className="p-3.5 flex items-center space-x-3">
          <GraduationCap className="w-4.5 h-4.5 text-slate-400" />
          <div>
            <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Department</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user.department}</div>
          </div>
        </div>

        <div className="p-3.5 flex items-center space-x-3">
          <Mail className="w-4.5 h-4.5 text-slate-400" />
          <div>
            <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Student Email</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{user.email}</div>
          </div>
        </div>

        <div className="p-3.5 flex items-center space-x-3">
          <Building2 className="w-4.5 h-4.5 text-slate-400" />
          <div>
            <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Institution</div>
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">American International University-Bangladesh</div>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
        <div
          onClick={onToggleDarkMode}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            {isDarkMode ? <Moon className="w-4.5 h-4.5 text-indigo-400" /> : <Sun className="w-4.5 h-4.5 text-amber-500" />}
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Dark Mode</span>
          </div>
          <div className={`w-10 h-5.5 flex items-center rounded-full p-0.5 transition-colors ${isDarkMode ? 'bg-emerald-600' : 'bg-slate-300'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform ${isDarkMode ? 'translate-x-4.5' : ''}`} />
          </div>
        </div>

        <div
          onClick={handleInstallPWA}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Smartphone className="w-4.5 h-4.5 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Install PWA Mobile App</div>
              <div className="text-[10px] text-slate-400">Add to home screen for native offline access</div>
            </div>
          </div>
          {pwaInstalled ? (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <Check className="w-4 h-4" /> Installed
            </span>
          ) : (
            <DownloadCloud className="w-4.5 h-4.5 text-emerald-600" />
          )}
        </div>
      </div>
    </div>
  );
};
