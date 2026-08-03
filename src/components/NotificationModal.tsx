import React from 'react';
import { X, Bell, Calendar } from 'lucide-react';
import { ANNOUNCEMENTS } from '../data/mockData';

interface NotificationModalProps {
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 pl-[calc(var(--safe-left)+1.5rem)] pr-[calc(var(--safe-right)+1.5rem)] pb-[calc(var(--safe-bottom)+1.5rem)] space-y-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Announcements</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {ANNOUNCEMENTS.map((ann) => (
            <div
              key={ann.id}
              className={`p-4 rounded-2xl border space-y-1.5 transition-colors ${
                ann.unread
                  ? 'bg-teal-50/50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{ann.title}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {ann.date}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{ann.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};
