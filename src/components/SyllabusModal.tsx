import React from 'react';
import { X, CheckCircle, BookOpen } from 'lucide-react';
import { Course } from '../data/mockData';

interface SyllabusModalProps {
  course: Course;
  onClose: () => void;
}

export const SyllabusModal: React.FC<SyllabusModalProps> = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{course.code} Syllabus</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{course.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {course.syllabus.map((topic, idx) => {
            const isCompleted = idx < course.completedTopics;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-start space-x-3 transition-colors ${
                  isCompleted
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                }`}
              >
                <CheckCircle
                  className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    isCompleted ? 'text-emerald-500 fill-emerald-100 dark:fill-emerald-950' : 'text-slate-300 dark:text-slate-600'
                  }`}
                />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Module {idx + 1}</span>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">{topic}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#06382b] hover:bg-[#0a4a39] text-white text-xs font-bold rounded-2xl shadow-lg shadow-teal-950/20 transition-all"
        >
          Close Syllabus
        </button>
      </div>
    </div>
  );
};
