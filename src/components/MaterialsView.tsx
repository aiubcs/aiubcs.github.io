import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  MoreVertical, 
  Database, 
  ChevronDown, 
  Search, 
  SlidersHorizontal,
  FileText,
  Download,
  Share2,
  Check,
  BookOpen,
  Info
} from 'lucide-react';
import { Course, MaterialItem, MOCK_MATERIALS } from '../data/mockData';

interface MaterialsViewProps {
  course: Course;
  onBack: () => void;
  onSelectMaterial: (material: MaterialItem) => void;
  onOpenSyllabus: () => void;
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({
  course,
  onBack,
  onSelectMaterial,
  onOpenSyllabus,
}) => {
  const [activeCategory, setActiveCategory] = useState<'Mid' | 'Final' | 'Notes' | 'Textbook' | 'All'>('Mid');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [sortBy, setSortBy] = useState('Latest');
  const [materials, setMaterials] = useState<MaterialItem[]>(MOCK_MATERIALS);
  const [searchFilter, setSearchFilter] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: Array<'Mid' | 'Final' | 'Notes' | 'Textbook' | 'All'> = ['Mid', 'Final', 'Notes', 'Textbook', 'All'];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMaterials(prev =>
      prev.map(m => m.id === id ? { ...m, isBookmarked: !m.isBookmarked } : m)
    );
  };

  const filteredMaterials = materials.filter(m => {
    const matchesCategory = activeCategory === 'All' || m.category === activeCategory;
    const matchesSearch = m.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          m.badges.some(b => b.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 font-extrabold text-[10px] flex items-center justify-center border border-rose-200 dark:border-rose-900 shadow-sm">PDF</div>;
      case 'docx':
        return <div className="w-10 h-10 rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 font-extrabold text-[10px] flex items-center justify-center border border-sky-200 dark:border-sky-900 shadow-sm">DOCX</div>;
      case 'pptx':
        return <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 font-extrabold text-[10px] flex items-center justify-center border border-purple-200 dark:border-purple-900 shadow-sm">PPTX</div>;
      default:
        return <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] flex items-center justify-center border border-emerald-200 dark:border-emerald-900 shadow-sm">XLSX</div>;
    }
  };

  return (
    <div className="pb-28 pt-2 space-y-5">
      {/* 1. Header Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Course Header Banner */}
      <div className="bg-gradient-to-r from-[#06382b] to-[#0d9488] p-5 rounded-3xl text-white shadow-lg space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Database className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-200/90 tracking-wide uppercase">{course.code}</span>
            <h1 className="text-lg font-black tracking-tight leading-snug">{course.title}</h1>
          </div>
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 no-scrollbar overflow-x-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-xs font-bold transition-all relative whitespace-nowrap ${
                isActive
                  ? 'text-teal-700 dark:text-teal-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {cat}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Course Info Card */}
      <div className="bg-white dark:bg-slate-900 p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="space-y-1 max-w-[70%]">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Course Info</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Access past midterm questions, solutions and important resources.
          </p>
        </div>
        <button
          onClick={onOpenSyllabus}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/60 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          Syllabus
        </button>
      </div>

      {/* 5. Filters Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          {/* Year Filter Dropdown */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none shadow-sm"
          >
            <option value="All Years">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          {/* Sort Filter Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none shadow-sm"
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
            <option value="Popular">Popular</option>
          </select>
        </div>

        {/* Search Toggle Icon */}
        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-600 shadow-sm"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {showSearchInput && (
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder="Filter materials by title or badge..."
          className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 shadow-inner"
        />
      )}

      {/* 6. Materials List */}
      <div className="space-y-3">
        {filteredMaterials.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectMaterial(item)}
            className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-teal-500/60 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              {getFileTypeIcon(item.fileType)}
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {item.addedTime} • {item.size}
                </p>
                {/* Badges */}
                <div className="flex items-center space-x-1.5 pt-0.5">
                  {item.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                        badge === 'Official'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                          : badge === 'Question'
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          : badge === 'Solution'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => toggleBookmark(item.id, e)}
                className={`p-2 rounded-lg transition-colors ${
                  item.isBookmarked
                    ? 'text-teal-600 dark:text-teal-400'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${item.isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 7. Floating Action Button (FAB): Browse by Topic */}
      <div className="fixed bottom-20 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <button
          onClick={onOpenSyllabus}
          className="pointer-events-auto bg-[#06382b] hover:bg-[#0a4a39] text-white text-xs font-bold px-5 py-3 rounded-full shadow-xl shadow-teal-950/40 flex items-center space-x-2 border border-teal-600/40 transition-all hover:scale-105"
        >
          <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
            <div className="bg-emerald-400 rounded-xs" />
            <div className="bg-emerald-400 rounded-xs" />
            <div className="bg-emerald-400 rounded-xs" />
            <div className="bg-emerald-400 rounded-xs" />
          </div>
          <span>Browse by Topic</span>
        </button>
      </div>
    </div>
  );
};
