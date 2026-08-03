import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Share2, 
  Download, 
  Layers, 
  List, 
  Check,
  FileText
} from 'lucide-react';
import { MaterialItem } from '../data/mockData';

interface DocumentViewerModalProps {
  material: MaterialItem;
  onClose: () => void;
  onToggleSaved: (material: MaterialItem) => void;
  onToggleDownloaded: (material: MaterialItem) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  material,
  onClose,
  onToggleSaved,
  onToggleDownloaded
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = material.pagesCount || 12;
  const [isDocumentDark, setIsDocumentDark] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showContents, setShowContents] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const doc = material.documentContent || {
    university: 'AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH',
    department: 'Department of Computer Science',
    courseCodeTitle: `${material.courseCode}: ${material.courseTitle}`,
    term: `${material.category} Examination Paper`,
    timeLimit: '1.5 Hours',
    totalMarks: 30,
    section: 'A',
    instructions: 'Answer all questions. Write clear explanations and diagrams where required.',
    questions: [
      {
        number: '1.',
        text: 'Consider the following relation:',
        marks: 10,
        subQuestions: [
          'Student (SID, Name, Dept, CGPA)',
          'a) Write SQL queries to find:',
          '   i) All students from CSE department. (5)',
          '   ii) Students with CGPA greater than 3.50. (5)'
        ]
      },
      {
        number: '2.',
        text: 'Explain normalization up to 3NF with examples.',
        marks: 10
      },
      {
        number: '3.',
        text: 'Draw an ER diagram for a university management system including:',
        marks: 10,
        subQuestions: [
          '• Student',
          '• Course',
          '• Instructor',
          '• Registration'
        ]
      }
    ]
  };

  const handleDownload = () => {
    onToggleDownloaded(material);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: material.title,
          text: `Check out ${material.title} for ${material.courseCode} on AIUB CS PWA`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      alert(`Copied link for ${material.title} to clipboard!`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col justify-between text-slate-100 overflow-hidden font-sans">
      {/* 1. Top Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="max-w-[200px] sm:max-w-xs">
            <h2 className="text-xs font-bold text-slate-100 truncate">{material.title}</h2>
            <span className="text-[10px] text-teal-400 font-medium">{material.courseCode}</span>
          </div>
        </div>

        {/* Page Counter Badge */}
        <div className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
          {currentPage} / {totalPages}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onToggleSaved(material)}
            className={`p-2 rounded-full hover:bg-slate-800 transition-colors ${
              material.isBookmarked ? 'text-teal-400' : 'text-slate-400'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${material.isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full hover:bg-slate-800 text-slate-400">
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Document Viewer Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center relative">
        <div className={`w-full max-w-xl rounded-2xl shadow-2xl transition-all duration-300 border ${
          isDocumentDark 
            ? 'bg-slate-900 text-slate-100 border-slate-800' 
            : 'bg-white text-slate-900 border-slate-200'
        } p-6 sm:p-8 space-y-6 min-h-[550px]`}>
          
          {/* Exam Header */}
          <div className="text-center space-y-2 pb-4 border-b border-slate-700/50 dark:border-slate-800">
            <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-tr from-sky-600 to-indigo-900 p-0.5 shadow-md flex items-center justify-center">
              <img 
                src="https://img.icons8.com/color/96/academic-cap.png" 
                alt="AIUB Crest" 
                className="w-9 h-9 bg-white rounded-full p-1"
              />
            </div>
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">{doc.university}</h3>
            <p className="text-[11px] font-semibold text-teal-500 tracking-wide">{doc.department}</p>
            <div className="pt-1">
              <h4 className="text-xs font-bold">{doc.courseCodeTitle}</h4>
              <p className="text-[11px] opacity-80 font-medium">{doc.term}</p>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-[10px] font-semibold opacity-75 pt-2">
              <span>Time: {doc.timeLimit}</span>
              <span>•</span>
              <span>Total Marks: {doc.totalMarks}</span>
              <span>•</span>
              <span>Section: {doc.section}</span>
            </div>
          </div>

          {/* Exam Instructions */}
          <div className="text-[11px] italic opacity-85 leading-relaxed bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20">
            {doc.instructions}
          </div>

          {/* Questions Render */}
          <div className="space-y-6 pt-2">
            {doc.questions.map((q, idx) => (
              <div key={idx} className="space-y-2 text-xs leading-relaxed">
                <div className="flex justify-between font-bold">
                  <span>{q.number} {q.text}</span>
                  <span className="opacity-70">({q.marks})</span>
                </div>
                {q.subQuestions && (
                  <div className="pl-4 space-y-1.5 opacity-90 text-[11px] font-mono">
                    {q.subQuestions.map((sq, sIdx) => (
                      <p key={sIdx}>{sq}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* End of Questions footer */}
          <div className="text-center pt-8 opacity-60 text-[10px] tracking-widest font-mono">
            *** End of Questions ***
          </div>
        </div>
      </div>

      {/* 3. Horizontal Page Thumbnails Bar */}
      {showThumbnails && (
        <div className="bg-slate-900/90 backdrop-blur-md border-t border-slate-800 px-4 py-2.5 flex items-center space-x-3 overflow-x-auto no-scrollbar">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
            <button
              key={pNum}
              onClick={() => setCurrentPage(pNum)}
              className={`flex-shrink-0 w-12 h-16 rounded-lg border-2 transition-all flex flex-col items-center justify-center space-y-1 ${
                currentPage === pNum
                  ? 'border-teal-500 bg-teal-950/40 text-teal-300 font-bold scale-105 shadow-md shadow-teal-500/20'
                  : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="text-[10px]">{pNum}</span>
            </button>
          ))}
        </div>
      )}

      {/* 4. Bottom Toolbar */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex items-center justify-around text-slate-300 text-[11px]">
        <button
          onClick={() => setShowContents(!showContents)}
          className="flex flex-col items-center space-y-1 hover:text-teal-400 transition-colors"
        >
          <List className="w-5 h-5" />
          <span>Contents</span>
        </button>

        <button
          onClick={() => setShowThumbnails(!showThumbnails)}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            showThumbnails ? 'text-teal-400 font-semibold' : 'hover:text-teal-400'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span>Thumbnails</span>
        </button>

        <button
          onClick={() => setIsDocumentDark(!isDocumentDark)}
          className="flex flex-col items-center space-y-1 hover:text-teal-400 transition-colors"
        >
          {isDocumentDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          <span>Dark Mode</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center space-y-1 hover:text-teal-400 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>

        <button
          onClick={handleDownload}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            downloadSuccess ? 'text-emerald-400 font-bold' : 'hover:text-teal-400'
          }`}
        >
          {downloadSuccess ? <Check className="w-5 h-5" /> : <Download className="w-5 h-5" />}
          <span>{downloadSuccess ? 'Saved!' : 'Download'}</span>
        </button>
      </div>

      {/* Contents Modal Overlay */}
      {showContents && (
        <div className="absolute inset-x-0 bottom-16 bg-slate-900 border-t border-slate-800 p-4 space-y-3 z-30 rounded-t-2xl shadow-2xl animate-in slide-in-from-bottom duration-200">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-white">Table of Contents</h4>
            <button onClick={() => setShowContents(false)} className="text-xs text-slate-400">Close</button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto text-xs text-slate-300">
            <div onClick={() => { setCurrentPage(1); setShowContents(false); }} className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between">
              <span>Section A: Question 1 (SQL Queries)</span>
              <span className="text-slate-500 font-mono">Pg 1</span>
            </div>
            <div onClick={() => { setCurrentPage(2); setShowContents(false); }} className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between">
              <span>Section A: Question 2 (Database Normalization)</span>
              <span className="text-slate-500 font-mono">Pg 2</span>
            </div>
            <div onClick={() => { setCurrentPage(3); setShowContents(false); }} className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between">
              <span>Section A: Question 3 (ER Diagram Design)</span>
              <span className="text-slate-500 font-mono">Pg 3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
