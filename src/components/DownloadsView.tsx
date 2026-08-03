import React from 'react';
import { Download, FileText, CheckCircle2, HardDrive } from 'lucide-react';
import { MaterialItem } from '../data/mockData';

interface DownloadsViewProps {
  downloadedMaterials: MaterialItem[];
  onSelectMaterial: (material: MaterialItem) => void;
}

export const DownloadsView: React.FC<DownloadsViewProps> = ({
  downloadedMaterials,
  onSelectMaterial,
}) => {
  return (
    <div className="pb-24 pt-2 space-y-4">
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
          <Download className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-slate-900 dark:text-white">Offline Downloads</h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Available offline without internet connection</p>
        </div>
      </div>

      <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <HardDrive className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <div>
            <div className="text-xs font-extrabold text-emerald-900 dark:text-emerald-200">Offline Storage Used</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400">4.2 MB / 500 MB Cached</div>
          </div>
        </div>
        <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded-full">
          Offline Ready
        </span>
      </div>

      {downloadedMaterials.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
          <Download className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Offline Downloads</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Downloaded materials appear here and remain readable even when offline.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {downloadedMaterials.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectMaterial(item)}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {item.courseCode} • {item.size}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
