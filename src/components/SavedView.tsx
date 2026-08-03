import React from 'react';
import { Bookmark, FileText, Trash2, ArrowRight } from 'lucide-react';
import { MaterialItem } from '../data/mockData';

interface SavedViewProps {
  savedMaterials: MaterialItem[];
  onSelectMaterial: (material: MaterialItem) => void;
  onRemoveBookmark: (material: MaterialItem) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedMaterials,
  onSelectMaterial,
  onRemoveBookmark,
}) => {
  return (
    <div className="pb-24 pt-2 space-y-4">
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="w-9 h-9 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
          <Bookmark className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-slate-900 dark:text-white">Saved Resources</h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Bookmarked questions and notes for quick revision</p>
        </div>
      </div>

      {savedMaterials.length === 0 ? (
        <div className="text-center py-16 space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6">
          <Bookmark className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">No Saved Items Yet</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Click the bookmark icon on any exam paper or note to save it here for fast access.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedMaterials.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectMaterial(item)}
              className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {item.courseCode} • {item.size}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveBookmark(item);
                }}
                className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors"
                title="Remove Bookmark"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
