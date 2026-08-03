import React from 'react';
import { BookOpen, Database, Code2, Network, Cpu, ChevronRight } from 'lucide-react';
import { COURSES, Course } from '../data/mockData';

interface CoursesViewProps {
  onSelectCourse: (course: Course) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onSelectCourse }) => {
  const getCourseIcon = (type: string) => {
    switch (type) {
      case 'database':
        return <Database className="w-5 h-5 text-emerald-500" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-indigo-500" />;
      case 'network':
        return <Network className="w-5 h-5 text-sky-500" />;
      default:
        return <Cpu className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="pb-24 pt-2 space-y-4">
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-slate-900 dark:text-white">Computer Science Courses</h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Select a course to view past questions & study notes</p>
        </div>
      </div>

      <div className="space-y-3">
        {COURSES.map((course) => {
          const percent = Math.round((course.completedTopics / course.totalTopics) * 100);
          return (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {getCourseIcon(course.iconType)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400">{course.code}</span>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                      {course.title}
                    </h3>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>Topic Coverage</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{percent}% ({course.completedTopics}/{course.totalTopics})</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${percent}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
