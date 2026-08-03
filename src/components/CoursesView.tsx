import React, { useState } from 'react';
import { BookOpen, Database, Code2, Network, Cpu, ChevronRight, Search, Sparkles, Binary, Calculator } from 'lucide-react';
import { COURSES, Course } from '../data/mockData';

interface CoursesViewProps {
  onSelectCourse: (course: Course) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onSelectCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Core CS',
    'Software Engineering',
    'Data Science & AI',
    'Computer Hardware & COE',
    'Math & Science',
    'General & Business'
  ];

  const filteredCourses = COURSES.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCourseIcon = (type: string) => {
    switch (type) {
      case 'database':
        return <Database className="w-5 h-5 text-emerald-500" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-indigo-500" />;
      case 'network':
        return <Network className="w-5 h-5 text-sky-500" />;
      case 'ai':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'math':
        return <Calculator className="w-5 h-5 text-purple-500" />;
      default:
        return <Cpu className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="pb-24 pt-1 space-y-4">
      {/* Title Bar */}
      <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="w-9 h-9 rounded-2xl bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-black text-slate-900 dark:text-white">AIUB CS Course Catalog</h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Complete curriculum ({COURSES.length} courses)</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code (e.g. CSC 2108) or title..."
          className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs px-3.5 pl-9 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-xs"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
      </div>

      {/* Category Pills */}
      <div className="flex space-x-1.5 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#043927] text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Course List */}
      <div className="space-y-2.5">
        {filteredCourses.map((course) => {
          const percent = Math.round((course.completedTopics / course.totalTopics) * 100);
          return (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course)}
              className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer space-y-2.5 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {getCourseIcon(course.iconType)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">{course.code}</span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {course.credits} Credits
                      </span>
                    </div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-700 transition-colors line-clamp-1">
                      {course.title}
                    </h4>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>Category: {course.category}</span>
                  <span className="font-bold text-slate-600 dark:text-slate-300">{course.completedTopics}/{course.totalTopics} Topics</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${percent}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
