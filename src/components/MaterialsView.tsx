import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  MoreVertical, 
  Database, 
  ChevronDown, 
  Search, 
  SlidersHorizontal,
  Grid2X2
} from 'lucide-react';
import { Course, MaterialItem } from '../data/mockData';
import { fetchMaterialsFromCloudflare } from '../services/api';

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
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Fetch materials for this course from Cloudflare D1
  useEffect(() => {
    setIsLoading(true);
    fetchMaterialsFromCloudflare(course.id)
      .then(data => {
        setMaterials(data);
      })
      .catch(() => setMaterials([]))
      .finally(() => setIsLoading(false));
  }, [course.id]);

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

  const getFileSquareIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <div className="w-9 h-9 rounded-xl bg-red-500 text-white font-extrabold text-[9px] flex items-center justify-center shadow-xs flex-shrink-0">PDF</div>;
      case 'docx':
        return <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold text-[9px] flex items-center justify-center shadow-xs flex-shrink-0">DOCX</div>;
      case 'pptx':
        return <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-extrabold text-[9px] flex items-center justify-center shadow-xs flex-shrink-0">PPTX</div>;
      default:
        return <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold text-[9px] flex items-center justify-center shadow-xs flex-shrink-0">XLSX</div>;
    }
  };

  return (
    <div className="pb-28 pt-1 space-y-4">
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-1">
          <button className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Course Header Card */}
      <div className="bg-gradient-to-r from-[#043927] to-[#09523a] p-4.5 rounded-3xl text-white shadow-md space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 backdrop-blur-md flex items-center justify-center border border-emerald-400/30">
            <Database className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-teal-200/90 tracking-wide uppercase">{course.code}</span>
            <h2 className="text-base font-black tracking-tight leading-snug">{course.title}</h2>
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
                  ? 'text-slate-900 dark:text-white font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              {cat}
              {isActive && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#043927] dark:bg-emerald-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Course Info Box */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div className="space-y-0.5 max-w-[70%]">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Course Info</h4>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            Access past midterm questions, solutions and important resources.
          </p>
        </div>
        <button
          onClick={onOpenSyllabus}
          className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-[11px] font-bold rounded-xl transition-all border border-slate-200 dark:border-slate-700"
        >
          Syllabus
        </button>
      </div>

      {/* 5. Filters Row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          {/* Year Filter */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold pl-3 pr-7 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 appearance-none focus:outline-none shadow-xs"
            >
              <option value="All Years">All Years</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Sort Filter */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-bold pl-7 pr-7 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 appearance-none focus:outline-none shadow-xs"
            >
              <option value="Latest">Latest</option>
              <option value="Oldest">Oldest</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5 pointer-events-none" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Search Icon */}
        <button
          onClick={() => setShowSearchInput(!showSearchInput)}
          className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 shadow-xs"
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
          className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      )}

      {/* 6. Materials List */}
      <div className="space-y-2.5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium text-slate-500">Loading materials...</p>
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto">
              <Database className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No materials yet</p>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              No {activeCategory === 'All' ? '' : activeCategory + ' '}materials have been uploaded for {course.code} yet.
            </p>
          </div>
        ) : (
          filteredMaterials.map((item, index) => {
            const isSelected = index === 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectMaterial(item)}
                className={`p-3.5 rounded-2xl transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-blue-50/20 dark:bg-slate-900 border-2 border-blue-500 shadow-md'
                    : 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {getFileSquareIcon(item.fileType)}
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {item.addedTime} • {item.size}
                    </p>
                    {/* Pastel Badges */}
                    <div className="flex items-center space-x-1.5 pt-0.5">
                      {item.badges.map((badge, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
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
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.isBookmarked ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${item.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 7. Floating Action Button: Browse by Topic */}
      <div className="fixed bottom-20 bottom-[calc(var(--safe-bottom)+5rem)] left-0 right-0 z-30 flex justify-center pointer-events-none">
        <button
          onClick={onOpenSyllabus}
          className="pointer-events-auto bg-[#043927] hover:bg-[#075239] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xl flex items-center space-x-2 border border-emerald-600/30 transition-all hover:scale-105"
        >
          <Grid2X2 className="w-4 h-4 text-emerald-400" />
          <span>Browse by Topic</span>
        </button>
      </div>
    </div>
  );
};
