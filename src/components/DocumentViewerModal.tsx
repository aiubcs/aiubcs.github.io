import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Search, 
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
  const [isDocumentDark, setIsDocumentDark] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [showContents, setShowContents] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const doc = material.documentContent || {
    university: 'AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH',
    department: 'Department of Computer Science',
    courseCodeTitle: `${material.courseCode}: Database Management System`,
    term: 'Midterm Examination – Fall 2024',
    timeLimit: '1.5 Hours',
    totalMarks: 30,
    section: 'A',
    instructions: 'Answer all questions clearly. Assume standard relational schema conventions unless specified otherwise.',
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
          text: `Check out ${material.title} on AIUB CS PWA`,
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
    <div className="fixed inset-0 z-50 bg-[#0f172a] flex flex-col justify-between text-slate-100 overflow-hidden font-sans">
      {/* 1. Top Navigation Bar */}
      <div className="bg-[#0f172a]/95 backdrop-blur-md border-b border-slate-800 px-4 pl-[calc(var(--safe-left)+1rem)] pr-[calc(var(--safe-right)+1rem)] pt-2.5 pt-[calc(var(--safe-top)+0.625rem)] pb-2.5 flex items-center justify-between z-10">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-xs font-bold text-slate-100 truncate max-w-[150px] sm:max-w-xs">{material.title}</h3>
          </div>
        </div>

        {/* Page Counter Badge */}
        <div className="bg-slate-800/90 text-slate-300 text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-slate-700">
          {currentPage} / {totalPages}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => onToggleSaved(material)}
            className={`p-1.5 rounded-full hover:bg-slate-800 transition-colors ${
              material.isBookmarked ? 'text-blue-400' : 'text-slate-400'
            }`}
          >
            <Bookmark className={`w-4.5 h-4.5 ${material.isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400">
            <Search className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* 2. Main Paper Document Preview Canvas */}
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center relative bg-[#090d16]">
        <div className={`w-full max-w-lg rounded-lg shadow-2xl transition-all duration-200 border ${
          isDocumentDark 
            ? 'bg-slate-900 text-slate-100 border-slate-800' 
            : 'bg-white text-slate-900 border-slate-200'
        } p-6 sm:p-8 space-y-5 min-h-[500px]`}>
          
          {/* Exam Header */}
          <div className="text-center space-y-1.5 pb-4 border-b border-slate-300 dark:border-slate-800">
            <div className="w-10 h-10 mx-auto rounded-full bg-white border border-slate-200 p-0.5 flex items-center justify-center mb-1">
              <img 
                src="https://aiub.edu/Files/Templates/AIUBv3/assets/images/aiub-logo-white-border.svg" 
                alt="AIUB Crest" 
                className="w-7 h-7 object-contain"
              />
            </div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">{doc.university}</h3>
            <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{doc.department}</p>
            <div className="pt-1">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{doc.courseCodeTitle}</h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">{doc.term}</p>
            </div>
            
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 dark:text-slate-300 pt-2 px-2">
              <span>Time: {doc.timeLimit}</span>
              <span>Total Marks: {doc.totalMarks}</span>
              <span>Section: {doc.section}</span>
            </div>
          </div>

          {/* Questions Render */}
          <div className="space-y-5 text-xs text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
            {doc.questions.map((q, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>{q.number} {q.text}</span>
                  <span className="text-slate-500 font-normal">({q.marks})</span>
                </div>
                {q.subQuestions && (
                  <div className="pl-4 space-y-1 text-[11px] font-mono text-slate-700 dark:text-slate-300">
                    {q.subQuestions.map((sq, sIdx) => (
                      <p key={sIdx}>{sq}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* End of Questions Footer */}
          <div className="text-center pt-6 text-[10px] font-bold tracking-widest text-slate-400 font-mono">
            *** End of Questions ***
          </div>
        </div>
      </div>

      {/* 3. Horizontal Page Thumbnail Carousel Strip (Screen 3 match) */}
      {showThumbnails && (
        <div className="bg-[#0f172a] border-t border-slate-800 px-4 pl-[calc(var(--safe-left)+1rem)] pr-[calc(var(--safe-right)+1rem)] py-2 flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
            const isSelectedPage = currentPage === pNum;
            return (
              <button
                key={pNum}
                onClick={() => setCurrentPage(pNum)}
                className={`flex-shrink-0 w-10 h-14 rounded-md border transition-all flex flex-col items-center justify-center space-y-1 ${
                  isSelectedPage
                    ? 'border-2 border-blue-500 bg-slate-900 text-blue-400 font-bold scale-105 shadow-md'
                    : 'border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="text-[9px]">{pNum}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Bottom Document Toolbar (Screen 3 match) */}
      <div className="bg-[#0f172a] border-t border-slate-800 px-4 pl-[calc(var(--safe-left)+1rem)] pr-[calc(var(--safe-right)+1rem)] py-2.5 pb-[calc(var(--safe-bottom)+0.625rem)] flex items-center justify-around text-slate-400 text-[10px]">
        <button
          onClick={() => setShowContents(!showContents)}
          className="flex flex-col items-center space-y-1 hover:text-white transition-colors"
        >
          <List className="w-4.5 h-4.5" />
          <span>Contents</span>
        </button>

        <button
          onClick={() => setShowThumbnails(!showThumbnails)}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            showThumbnails ? 'text-blue-400 font-bold' : 'hover:text-white'
          }`}
        >
          <Layers className="w-4.5 h-4.5" />
          <span>Thumbnails</span>
        </button>

        <button
          onClick={() => setIsDocumentDark(!isDocumentDark)}
          className="flex flex-col items-center space-y-1 hover:text-white transition-colors"
        >
          {isDocumentDark ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
          <span>Dark Mode</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center space-y-1 hover:text-white transition-colors"
        >
          <Share2 className="w-4.5 h-4.5" />
          <span>Share</span>
        </button>

        <button
          onClick={handleDownload}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            downloadSuccess ? 'text-emerald-400 font-bold' : 'hover:text-white'
          }`}
        >
          {downloadSuccess ? <Check className="w-4.5 h-4.5" /> : <Download className="w-4.5 h-4.5" />}
          <span>{downloadSuccess ? 'Saved!' : 'Download'}</span>
        </button>
      </div>

      {/* Table of Contents Drawer */}
      {showContents && (
        <div className="absolute inset-x-0 bottom-14 bottom-[calc(var(--safe-bottom)+3.5rem)] bg-slate-900 border-t border-slate-800 p-4 pb-[calc(var(--safe-bottom)+1rem)] space-y-2 z-30 rounded-t-2xl shadow-2xl">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h4 className="text-xs font-bold text-white">Table of Contents</h4>
            <button onClick={() => setShowContents(false)} className="text-xs text-slate-400">Close</button>
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto text-xs text-slate-300">
            <div onClick={() => { setCurrentPage(1); setShowContents(false); }} className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between">
              <span>Section A: Question 1 (SQL Queries)</span>
              <span className="text-slate-500 font-mono">Pg 1</span>
            </div>
            <div onClick={() => { setCurrentPage(2); setShowContents(false); }} className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between">
              <span>Section A: Question 2 (Normalization)</span>
              <span className="text-slate-500 font-mono">Pg 2</span>
            </div>
            <div onClick={() => { setCurrentPage(3); setShowContents(false); }} className="p-2 hover:bg-slate-800 rounded-lg cursor-pointer flex justify-between">
              <span>Section A: Question 3 (ER Diagram)</span>
              <span className="text-slate-500 font-mono">Pg 3</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
