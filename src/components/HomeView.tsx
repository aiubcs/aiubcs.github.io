import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Notebook, 
  FlaskConical, 
  FileCode, 
  Heart, 
  ChevronRight,
  Database,
  Code2,
  Network,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight
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

  const quickAccessItems = [
    { label: 'All Courses', icon: BookOpen, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400', tab: 'courses' },
    { label: 'Mid Qs', icon: FileText, color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400', filter: 'Mid' },
    { label: 'Final Qs', icon: FileCode, color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400', filter: 'Final' },
    { label: 'Notes', icon: Notebook, color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400', filter: 'Notes' },
    { label: 'Textbooks', icon: Layers, color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400', filter: 'Textbook' },
    { label: 'Labs', icon: FlaskConical, color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400', filter: 'Labs' },
    { label: 'Past Papers', icon: FileText, color: 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400', filter: 'Past' },
    { label: 'Favorites', icon: Heart, color: 'bg-pink-50 text-pink-600 dark:bg-pink-950/60 dark:text-pink-400', tab: 'saved' },
  ];

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

  const recentMaterials = MOCK_MATERIALS.slice(0, 3);

  return (
    <div className="pb-24 pt-2 space-y-6">
      {/* 1. Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06382b] via-[#054a37] to-[#0a664d] text-white p-6 shadow-xl shadow-teal-950/20 border border-teal-700/30">
        {/* Subtle Architectural Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div>
            <span className="text-teal-200/90 text-sm font-medium tracking-wide">Welcome back,</span>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-1.5 mt-0.5">
              {user.name} <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-teal-100/80 text-xs mt-1 font-light">Your CS resources, in one place.</p>
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
              className="w-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium pl-10 pr-4 py-3 rounded-2xl shadow-inner border border-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
        </div>
      </div>

      {/* 2. Stat Badges Counter */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-2.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">124+</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Courses</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-2.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-sky-50 dark:bg-sky-950/80 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">3.2K+</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Materials</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center space-x-2.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">12.5K+</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Students</div>
          </div>
        </div>
      </div>

      {/* 3. My Courses Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">My Courses</h2>
          <button
            onClick={() => onNavigateTab('courses')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors"
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
                className="flex-shrink-0 w-64 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3 group"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center">
                    {getCourseIcon(course.iconType)}
                  </div>
                  {course.ongoing && (
                    <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950/90 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Ongoing
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{course.code}</span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {course.title}
                  </h3>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span>Progress</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{course.completedTopics}/{course.totalTopics} Topics</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Quick Access Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Quick Access</h2>
        <div className="grid grid-cols-4 gap-3">
          {quickAccessItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  if (item.tab) {
                    onNavigateTab(item.tab);
                  } else {
                    onSelectCourse(COURSES[0]);
                  }
                }}
                className="flex flex-col items-center p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-teal-500/50 hover:shadow-md transition-all group"
              >
                <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 text-center line-clamp-1">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Recently Added Materials */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Recently Added</h2>
          <button
            onClick={() => onSelectCourse(COURSES[0])}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-2.5">
          {recentMaterials.map((mat) => (
            <div
              key={mat.id}
              onClick={() => onSelectMaterial(mat)}
              className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-teal-500/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400 flex items-center justify-center font-black text-xs">
                  PDF
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {mat.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {mat.courseCode} • {mat.size}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-transform group-hover:translate-x-0.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
