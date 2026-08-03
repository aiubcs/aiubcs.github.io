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
  category: 'Core CS' | 'Software Engineering' | 'Data Science & AI' | 'Computer Hardware & COE' | 'Math & Science' | 'General & Business' | 'Elective & Advanced';
  credits: number;
  ongoing: boolean;
  completedTopics: number;
  totalTopics: number;
  iconType: 'database' | 'code' | 'network' | 'cpu' | 'book' | 'math' | 'science' | 'ai';
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
  unreadNotifications: 0,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
};

export const COURSES: Course[] = [
  {
    id: 'csc-1101',
    code: 'CSC 1101',
    title: 'Introduction to Computer Studies',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 10,
    iconType: 'book',
    syllabus: ['Computer Organization Fundamentals', 'Operating System Concepts', 'Number Systems & Binary Math', 'Software & Internet Applications']
  },
  {
    id: 'csc-1102',
    code: 'CSC 1102',
    title: 'Introduction to Programming Language',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['C Programming Basics & Syntax', 'Control Structures & Loops', 'Functions & Recursion', 'Arrays, Strings & Pointers', 'Structures & File I/O']
  },
  {
    id: 'csc-1204',
    code: 'CSC 1204',
    title: 'Discrete Mathematics',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 12,
    iconType: 'math',
    syllabus: ['Propositional & Predicate Logic', 'Set Theory, Relations & Functions', 'Mathematical Induction', 'Counting Techniques & Combinatorics', 'Graph Theory Foundations']
  },
  {
    id: 'csc-1205',
    code: 'CSC 1205',
    title: 'Object Oriented Programming 1',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'code',
    syllabus: ['Java Syntax & Primitive Data', 'Classes, Objects & Constructors', 'Inheritance & Polymorphism', 'Encapsulation & Access Modifiers', 'Exception Handling & Interfaces']
  },
  {
    id: 'csc-2106',
    code: 'CSC 2106',
    title: 'Data Structure',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'cpu',
    syllabus: ['Arrays, Stacks & Queues', 'Single & Double Linked Lists', 'Trees & Binary Search Trees (BST)', 'Heap, Hashing & Hash Tables', 'Sorting & Searching Algorithms']
  },
  {
    id: 'csc-2108',
    code: 'CSC 2108',
    title: 'Introduction to Database',
    category: 'Core CS',
    credits: 3,
    ongoing: true,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'database',
    syllabus: ['Relational Model & Relational Algebra', 'SQL Queries, DDL, DML & Subqueries', 'ER & EER Diagram Modeling', 'Database Normalization (1NF to BCNF)', 'Indexing & Transaction Basics']
  },
  {
    id: 'csc-2209',
    code: 'CSC 2209',
    title: 'Object Oriented Analysis and Design',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['Requirements Engineering', 'UML Use Case & Activity Diagrams', 'UML Class & Sequence Diagrams', 'GRASP Design Principles', 'Architectural Patterns']
  },
  {
    id: 'csc-2210',
    code: 'CSC 2210',
    title: 'Object Oriented Programming 2',
    category: 'Core CS',
    credits: 3,
    ongoing: true,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'code',
    syllabus: ['Advanced Java / C# OOP Features', 'GUI Programming (JavaFX / WPF)', 'Multithreading & Concurrency', 'Database Integration (JDBC / ADO.NET)', 'Design Patterns Implementation']
  },
  {
    id: 'csc-2211',
    code: 'CSC 2211',
    title: 'Algorithms',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 16,
    iconType: 'cpu',
    syllabus: ['Asymptotic Growth (Big-O, Omega, Theta)', 'Divide and Conquer: QuickSort, MergeSort', 'Greedy Method: Knapsack, Minimum Spanning Tree', 'Dynamic Programming: LCS, Matrix Chain', 'Graph Traversal: BFS, DFS, Shortest Path']
  },
  {
    id: 'csc-3112',
    code: 'CSC 3112',
    title: 'Software Engineering',
    category: 'Software Engineering',
    credits: 3,
    ongoing: true,
    completedTopics: 0,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['Software Development Life Cycle Models', 'Agile & Scrum Methodologies', 'Software Testing & Verification', 'Software Architecture Patterns', 'Maintenance & CI/CD Pipelines']
  },
  {
    id: 'csc-3113',
    code: 'CSC 3113',
    title: 'Theory of Computation',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 12,
    iconType: 'math',
    syllabus: ['Deterministic & Non-Deterministic Finite Automata', 'Regular Expressions & Pumping Lemma', 'Context-Free Grammars & Pushdown Automata', 'Turing Machines & Decidability', 'NP-Completeness Foundations']
  },
  {
    id: 'csc-3214',
    code: 'CSC 3214',
    title: 'Operating Systems',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'cpu',
    syllabus: ['OS Architecture & System Calls', 'Process Management & Scheduling', 'Process Synchronization & Deadlocks', 'Memory Management & Paging', 'File Systems & Storage Management']
  },
  {
    id: 'csc-3215',
    code: 'CSC 3215',
    title: 'Web Technologies',
    category: 'Software Engineering',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'code',
    syllabus: ['HTML5 Semantic Elements & CSS3 Flex/Grid', 'JavaScript ES6+, DOM Manipulation & Async/Await', 'Server-Side Development (Node.js / PHP)', 'RESTful APIs & JSON Integration', 'Web Security (XSS, CSRF, Authentication)']
  },
  {
    id: 'csc-3216',
    code: 'CSC 3216',
    title: 'Compiler Design',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'code',
    syllabus: ['Lexical Analysis & Lex/Flex', 'Syntax Analysis: LL(1) & LR(1) Parsers', 'Semantic Analysis & Symbol Tables', 'Intermediate Code Generation (3-Address Code)', 'Code Optimization & Target Assembly Generation']
  },
  {
    id: 'csc-3217',
    code: 'CSC 3217',
    title: 'Artificial Intelligence and Expert System',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'ai',
    syllabus: ['Problem Solving via Uninformed & Informed Search', 'Adversarial Search & Game Playing (Minimax, Alpha-Beta)', 'Knowledge Representation & Propositional Logic', 'Expert System Shells & Rule-Based Reasoning', 'Introduction to Machine Learning & Neural Nets']
  },
  {
    id: 'csc-4118',
    code: 'CSC 4118',
    title: 'Computer Graphics',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['2D & 3D Geometric Transformations', 'Line & Circle Drawing Algorithms (DDA, Bresenham)', 'Clipping Algorithms (Cohen-Sutherland)', '3D Projection & Lighting Models', 'OpenGL / WebGL Rendering Pipeline']
  },
  {
    id: 'csc-4180',
    code: 'CSC 4180',
    title: 'Introduction to Data Science',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 12,
    iconType: 'ai',
    syllabus: ['Data Acquisition, Cleaning & Wrangling', 'Exploratory Data Analysis (EDA) & Visualization', 'Statistical Inference & Hypothesis Testing', 'Supervised & Unsupervised Machine Learning', 'Big Data Ecosystem Overview (Pandas, NumPy, Scikit-learn)']
  },
  {
    id: 'csc-4232',
    code: 'CSC 4232',
    title: 'Machine Learning',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'ai',
    syllabus: ['Linear & Logistic Regression Models', 'Decision Trees, Random Forests & Ensemble Learning', 'Support Vector Machines (SVM)', 'K-Means Clustering & Dimensionality Reduction (PCA)', 'Deep Neural Networks (CNNs, RNNs)']
  },
  {
    id: 'csc-4233',
    code: 'CSC 4233',
    title: 'Natural Language Processing',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 12,
    iconType: 'ai',
    syllabus: ['Text Preprocessing & Tokenization', 'N-gram Language Modeling & Sentiment Analysis', 'Word Embeddings (Word2Vec, GloVe)', 'Sequence Models (RNNs, LSTMs)', 'Transformers & Large Language Models (LLMs)']
  },
  {
    id: 'coe-3204',
    code: 'COE 3204',
    title: 'Computer Networks',
    category: 'Computer Hardware & COE',
    credits: 3,
    ongoing: false,
    completedTopics: 0,
    totalTopics: 14,
    iconType: 'network',
    syllabus: ['OSI & TCP/IP Layer Architecture', 'IP Addressing (IPv4/IPv6) & Subnetting', 'Routing Protocols (RIP, OSPF, BGP)', 'Transport Protocols (TCP, UDP, Congestion Control)', 'Network Security & Firewalls']
  }
];

export const MOCK_MATERIALS: MaterialItem[] = [];

export const ANNOUNCEMENTS: Array<{ id: string; title: string; date: string; desc: string; unread: boolean }> = [];
