export interface UserProfile {
  name: string;
  role: string;
  studentId: string;
  email: string;
  department: string;
  unreadNotifications: number;
  avatarUrl: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  credits: number;
  ongoing: boolean;
  completedTopics: number;
  totalTopics: number;
  iconType: 'database' | 'code' | 'network' | 'cpu' | 'book';
  syllabus: string[];
}

export interface MaterialItem {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  addedTime: string;
  size: string;
  fileType: 'pdf' | 'docx' | 'pptx' | 'xlsx';
  category: 'Mid' | 'Final' | 'Notes' | 'Textbook';
  badges: string[];
  isBookmarked?: boolean;
  isDownloaded?: boolean;
  pagesCount: number;
  documentContent?: DocumentContent;
}

export interface DocumentQuestion {
  number: string;
  text: string;
  marks: number;
  subQuestions?: string[];
}

export interface DocumentContent {
  university: string;
  department: string;
  courseCodeTitle: string;
  term: string;
  timeLimit: string;
  totalMarks: number;
  section: string;
  instructions: string;
  questions: DocumentQuestion[];
}

export const CURRENT_USER: UserProfile = {
  name: 'Tanvir Rahman',
  role: 'Undergraduate Student',
  studentId: '23-51455-1',
  email: '23-51455-1@student.aiub.edu',
  department: 'Department of Computer Science',
  unreadNotifications: 1,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
};

export const COURSES: Course[] = [
  {
    id: 'cse-314',
    code: 'CSE 314',
    title: 'Database Management System',
    credits: 3,
    ongoing: true,
    completedTopics: 8,
    totalTopics: 14,
    iconType: 'database',
    syllabus: [
      'Introduction to DBMS Architecture & Data Models',
      'Relational Model & Relational Algebra Operations',
      'SQL Data Definition Language (DDL) and Manipulation (DML)',
      'Advanced SQL Subqueries, Joins & Views',
      'Entity-Relationship (ER) & Enhanced ER Diagram Modeling',
      'Database Normalization (1NF, 2NF, 3NF, BCNF)',
      'Transaction Processing, ACID Properties & Concurrency Control',
      'Indexing Mechanisms (B-Trees, B+ Trees & Hashing)'
    ]
  },
  {
    id: 'cse-411',
    code: 'CSE 411',
    title: 'Software Engineering',
    credits: 3,
    ongoing: true,
    completedTopics: 5,
    totalTopics: 12,
    iconType: 'code',
    syllabus: [
      'Software Development Life Cycle (SDLC) & Agile Methodologies',
      'Requirements Engineering & Use Case Modeling',
      'UML Class Diagrams, Sequence Diagrams & Statecharts',
      'Software Design Patterns (Creational, Structural, Behavioral)',
      'Software Testing Strategies (Unit, Integration, System)'
    ]
  },
  {
    id: 'cse-322',
    code: 'CSE 322',
    title: 'Computer Networks',
    credits: 3,
    ongoing: false,
    completedTopics: 14,
    totalTopics: 14,
    iconType: 'network',
    syllabus: [
      'OSI and TCP/IP Reference Models Architecture',
      'Physical & Data Link Layers: Ethernet, MAC, Error Control',
      'Network Layer Routing Algorithms (Distance Vector, Link State)',
      'Transport Layer Protocols: TCP Congestion Control, UDP'
    ]
  },
  {
    id: 'cse-221',
    code: 'CSE 221',
    title: 'Algorithms & Data Structures',
    credits: 3,
    ongoing: false,
    completedTopics: 16,
    totalTopics: 16,
    iconType: 'cpu',
    syllabus: [
      'Asymptotic Analysis & Recurrence Relations',
      'Divide and Conquer: QuickSort, MergeSort',
      'Dynamic Programming & Greedy Strategies',
      'Graph Algorithms: BFS, DFS, Dijkstra, Prim & Kruskal'
    ]
  }
];

export const MOCK_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-1',
    courseId: 'cse-314',
    courseCode: 'CSE 314',
    courseTitle: 'Database Management System',
    title: 'Midterm 2024.pdf',
    addedTime: 'Added 2 weeks ago',
    size: '1.8 MB',
    fileType: 'pdf',
    category: 'Mid',
    badges: ['Official', 'Question'],
    isBookmarked: true,
    isDownloaded: true,
    pagesCount: 12,
    documentContent: {
      university: 'AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH',
      department: 'Department of Computer Science',
      courseCodeTitle: 'CSE 314: Database Management System',
      term: 'Midterm Examination - Fall 2024',
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
            '   i) All students from CSE department. (5 marks)',
            '   ii) Students with CGPA greater than 3.50. (5 marks)'
          ]
        },
        {
          number: '2.',
          text: 'Explain database normalization up to 3NF with real-world examples and decomposition rules.',
          marks: 10
        },
        {
          number: '3.',
          text: 'Draw an ER diagram for a university management system including:',
          marks: 10,
          subQuestions: [
            '• Student, Course, Instructor, Registration entities',
            '• Cardinality ratios and primary key constraints',
            '• Weak entity set handling'
          ]
        }
      ]
    }
  },
  {
    id: 'mat-2',
    courseId: 'cse-314',
    courseCode: 'CSE 314',
    courseTitle: 'Database Management System',
    title: 'Midterm 2023 (Solution).pdf',
    addedTime: '3 months ago',
    size: '2.4 MB',
    fileType: 'pdf',
    category: 'Mid',
    badges: ['Official', 'Solution'],
    isBookmarked: false,
    isDownloaded: false,
    pagesCount: 8,
    documentContent: {
      university: 'AMERICAN INTERNATIONAL UNIVERSITY-BANGLADESH',
      department: 'Department of Computer Science',
      courseCodeTitle: 'CSE 314: Database Management System Solutions',
      term: 'Midterm Examination - Fall 2023 Solution Set',
      timeLimit: '1.5 Hours',
      totalMarks: 30,
      section: 'A',
      instructions: 'Model answer key compiled by AIUB Faculty.',
      questions: [
        {
          number: '1.',
          text: 'Relational Algebra Expression Solutions for Company Database:',
          marks: 10,
          subQuestions: [
            'i) π Name (σ Salary > 50000 (Employee))',
            'ii) Employee ⨝ (Dno = Dnumber) Department'
          ]
        }
      ]
    }
  },
  {
    id: 'mat-3',
    courseId: 'cse-314',
    courseCode: 'CSE 314',
    courseTitle: 'Database Management System',
    title: 'Important Topics.docx',
    addedTime: '4 months ago',
    size: '420 KB',
    fileType: 'docx',
    category: 'Notes',
    badges: ['Notes', 'Summary'],
    isBookmarked: true,
    isDownloaded: false,
    pagesCount: 5
  },
  {
    id: 'mat-4',
    courseId: 'cse-314',
    courseCode: 'CSE 314',
    courseTitle: 'Database Management System',
    title: 'ER Model Summary.pptx',
    addedTime: '6 months ago',
    size: '2.1 MB',
    fileType: 'pptx',
    category: 'Notes',
    badges: ['Slides', 'Lecture'],
    isBookmarked: false,
    isDownloaded: false,
    pagesCount: 24
  },
  {
    id: 'mat-5',
    courseId: 'cse-314',
    courseCode: 'CSE 314',
    courseTitle: 'Database Management System',
    title: 'SQL Practice.xlsx',
    addedTime: '1 year ago',
    size: '580 KB',
    fileType: 'xlsx',
    category: 'Final',
    badges: ['Lab', 'Practice'],
    isBookmarked: false,
    isDownloaded: true,
    pagesCount: 3
  },
  {
    id: 'mat-6',
    courseId: 'cse-411',
    courseCode: 'CSE 411',
    courseTitle: 'Software Engineering',
    title: 'Software Design Patterns Summary.pdf',
    addedTime: '1 month ago',
    size: '3.1 MB',
    fileType: 'pdf',
    category: 'Mid',
    badges: ['Official', 'Notes'],
    isBookmarked: true,
    isDownloaded: true,
    pagesCount: 14
  }
];

export const ANNOUNCEMENTS = [
  {
    id: 'ann-1',
    title: 'Fall 2024 Midterm Exam Schedule Published',
    date: 'Aug 03, 2026',
    desc: 'The midterm examinations for Computer Science department courses will commence from next week. Check your exam room allocations on VUE portal.',
    unread: true
  },
  {
    id: 'ann-2',
    title: 'New DBMS Practice Sheets Added',
    date: 'Jul 28, 2026',
    desc: 'Updated SQL Practice datasets and ER Model solutions have been added to CSE 314 Database Management System.',
    unread: false
  }
];
