import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  FileText, 
  FileCheck2, 
  BookMarked, 
  Book, 
  FlaskConical, 
  FileCode2, 
  Heart, 
  ChevronRight,
  Database,
  Code2,
  Users,
  Building2
} from 'lucide-react';
import { COURSES, MOCK_MATERIALS, Course, MaterialItem, UserProfile } from '../data/mockData';

interface HomeViewProps {
  user: UserProfile;
  onSelectCourse: (course: Course) => void;
  onSelectMaterial: (material: MaterialItem) => void;
  onNavigateTab: (tab: any) => void;
  onSearchQuery: (query: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  onSelectCourse,
  onSelectMaterial,
  onNavigateTab,
  onSearchQuery
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const quickAccessGrid = [
    { label: 'All Courses', icon: BookOpen, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200', tab: 'courses' },
    { label: 'Mid Qs', icon: FileText, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200', course: COURSES[0] },
    { label: 'Final Qs', icon: FileCheck2, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200', course: COURSES[0] },
    { label: 'Notes', icon: BookMarked, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200', course: COURSES[0] },
    { label: 'Textbooks', icon: Book, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200', course: COURSES[0] },
    { label: 'Labs', icon: FlaskConical, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200', course: COURSES[0] },
    { label: 'Past Papers', icon: FileCode2, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200', course: COURSES[0] },
    { label: 'Favorites', icon: Heart, color: 'text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-200', tab: 'saved' },
  ];

  return (
    <div className="pb-24 pt-1 space-y-5">
      {/* 1. Hero Welcome Card with Deep Forest Green Gradient & Architectural Building Pattern */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#043927] via-[#054a37] to-[#09523a] text-white p-5 shadow-lg border border-emerald-900/30">
        {/* Subtle Architectural Building Line Art Vector on right */}
        <div className="absolute right-0 bottom-0 top-0 w-2/5 opacity-15 pointer-events-none flex items-end justify-end pr-2 pb-1">
          <Building2 className="w-40 h-40 stroke-[1]" />
        </div>

        <div className="relative z-10 space-y-4">
          <div>
            <span className="text-teal-200/90 text-xs font-medium tracking-wide">Welcome back,</span>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              {user.name} <span className="animate-bounce">👋</span>
            </h2>
            <p className="text-teal-100/80 text-xs mt-0.5 font-light">Your CS resources, in one place.</p>
          </div>

          {/* Search Bar Input */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                onSearchQuery(e.target.value);
              }}
              placeholder="Search courses, materials..."
              className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-xs font-medium pl-9 pr-4 py-3 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>
      </div>

      {/* 2. Stat Counter Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-2.5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="font-black text-slate-900 dark:text-white text-sm leading-tight">124+</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Courses</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-2.5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/80 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-black text-slate-900 dark:text-white text-sm leading-tight">3.2K+</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Materials</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-2.5 shadow-xs">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="font-black text-slate-900 dark:text-white text-sm leading-tight">12.5K+</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Students</div>
          </div>
        </div>
      </div>

      {/* 3. My Courses Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">My Courses</h3>
          <button
            onClick={() => onNavigateTab('courses')}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All
          </button>
        </div>

        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
          {COURSES.map((course) => {
            const percent = Math.round((course.completedTopics / course.totalTopics) * 100);
            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="flex-shrink-0 w-64 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600">
                    {course.iconType === 'database' ? <Database className="w-5 h-5" /> : <Code2 className="w-5 h-5 text-indigo-500" />}
                  </div>
                  {course.ongoing && (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/90 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Ongoing
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400">{course.code}</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {course.title}
                  </h4>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>Progress</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{course.completedTopics}/{course.totalTopics} Topics</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Access 8-Grid */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Quick Access</h3>
        <div className="grid grid-cols-4 gap-2.5">
          {quickAccessGrid.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (item.tab) {
                    onNavigateTab(item.tab);
                  } else if (item.course) {
                    onSelectCourse(item.course);
                  }
                }}
                className="flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105">
                  <Icon className="w-4.5 h-4.5 stroke-[1.75]" />
                </div>
                <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300 text-center line-clamp-1">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Recently Added */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Recently Added</h3>
          <button
            onClick={() => onSelectCourse(COURSES[0])}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All
          </button>
        </div>

        <div
          onClick={() => onSelectMaterial(MOCK_MATERIALS[0])}
          className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-emerald-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-500 text-white font-black text-[10px] flex items-center justify-center shadow-xs">
              PDF
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 transition-colors">
                DBMS Midterm 2024.pdf
              </h4>
              <p className="text-[10px] text-slate-400 font-medium">
                CSE 314 • 1.8 MB
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );
};
