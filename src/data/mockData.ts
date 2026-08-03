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
  unreadNotifications: 1,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
};

export const COURSES: Course[] = [
  // --- CORE CS & PROGRAMMING ---
  {
    id: 'csc-1101',
    code: 'CSC 1101',
    title: 'Introduction to Computer Studies',
    category: 'Core CS',
    credits: 3,
    ongoing: false,
    completedTopics: 10,
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
    completedTopics: 12,
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
    completedTopics: 12,
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
    completedTopics: 14,
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
    completedTopics: 14,
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
    completedTopics: 8,
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
    completedTopics: 12,
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
    completedTopics: 6,
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
    completedTopics: 16,
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
    completedTopics: 5,
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
    completedTopics: 12,
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
    completedTopics: 14,
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
    completedTopics: 14,
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
    completedTopics: 14,
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
    completedTopics: 14,
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
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['2D & 3D Geometric Transformations', 'Line & Circle Drawing Algorithms (DDA, Bresenham)', 'Clipping Algorithms (Cohen-Sutherland)', '3D Projection & Lighting Models', 'OpenGL / WebGL Rendering Pipeline']
  },

  // --- DATA SCIENCE, AI & MACHINE LEARNING ---
  {
    id: 'csc-4180',
    code: 'CSC 4180',
    title: 'Introduction to Data Science',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
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
    completedTopics: 14,
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
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'ai',
    syllabus: ['Text Preprocessing & Tokenization', 'N-gram Language Modeling & Sentiment Analysis', 'Word Embeddings (Word2Vec, GloVe)', 'Sequence Models (RNNs, LSTMs)', 'Transformers & Large Language Models (LLMs)']
  },
  {
    id: 'csc-4181',
    code: 'CSC 4181',
    title: 'Advance Database Management Systems',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'database',
    syllabus: ['Distributed Database Architecture', 'NoSQL Databases (MongoDB, Cassandra)', 'Query Optimization & Performance Tuning', 'Transaction Concurrency & CAP Theorem', 'Data Warehousing & ETL Pipelines']
  },
  {
    id: 'csc-4285',
    code: 'CSC 4285',
    title: 'Data Warehouse and Data Mining',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'database',
    syllabus: ['Data Warehouse Schemas (Star, Snowflake)', 'OLAP Cube Operations', 'Apriori Association Rule Mining', 'Classification & Clustering Methods', 'Data Mining Applications in Business']
  },
  {
    id: 'csc-4254',
    code: 'CSC 4254',
    title: 'Computer Vision & Pattern Recognition',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'ai',
    syllabus: ['Image Filtering & Edge Detection (Canny, Sobel)', 'Feature Extraction (SIFT, ORB)', 'Convolutional Neural Networks (CNNs) for Vision', 'Object Detection (YOLO, R-CNN)', 'Image Segmentation & Pattern Classification']
  },
  {
    id: 'csc-4230',
    code: 'CSC 4230',
    title: 'Bioinformatics',
    category: 'Data Science & AI',
    credits: 3,
    ongoing: false,
    completedTopics: 10,
    totalTopics: 10,
    iconType: 'ai',
    syllabus: ['Biological Sequence Alignment (BLAST, Needle)', 'DNA & Protein Sequence Analysis', 'Phylogenetic Tree Construction', 'Gene Expression Analysis', 'Structural Bioinformatics']
  },

  // --- SOFTWARE ENGINEERING & ADVANCED TRACKS ---
  {
    id: 'csc-4160',
    code: 'CSC 4160',
    title: 'Software Requirement Engineering',
    category: 'Software Engineering',
    credits: 3,
    ongoing: false,
    completedTopics: 10,
    totalTopics: 10,
    iconType: 'code',
    syllabus: ['Requirements Elicitation Techniques', 'SRS Documentation & IEEE Standards', 'Requirements Validation & Traceability', 'Agile User Stories & Backlog Refinement']
  },
  {
    id: 'csc-4261',
    code: 'CSC 4261',
    title: 'Advanced Programming in Web Technologies',
    category: 'Software Engineering',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['Single Page Applications (React / Vue)', 'TypeScript & Modern State Management', 'Server-Side Rendering (Next.js)', 'GraphQL & Microservices Integration']
  },
  {
    id: 'csc-4262',
    code: 'CSC 4262',
    title: 'Programming in Python',
    category: 'Software Engineering',
    credits: 3,
    ongoing: false,
    completedTopics: 10,
    totalTopics: 10,
    iconType: 'code',
    syllabus: ['Pythonic Data Structures & Modules', 'File I/O & Exception Handling', 'Object-Oriented Python', 'Web Scraping & Automation', 'Frameworks: Django & Flask']
  },
  {
    id: 'csc-4263',
    code: 'CSC 4263',
    title: 'Advanced Programming with JAVA',
    category: 'Software Engineering',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['Spring Boot & Microservices Architecture', 'Hibernate & JPA ORM Framework', 'REST API Security (JWT, OAuth2)', 'Dockerization & Deployment']
  },
  {
    id: 'csc-4264',
    code: 'CSC 4264',
    title: 'Advanced Programming with .NET',
    category: 'Software Engineering',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['ASP.NET Core Web API', 'Entity Framework Core ORM', 'LINQ & Asynchronous C#', 'Microservices with .NET']
  },
  {
    id: 'csc-4272',
    code: 'CSC 4272',
    title: 'Mobile Application Development',
    category: 'Software Engineering',
    credits: 3,
    ongoing: false,
    completedTopics: 14,
    totalTopics: 14,
    iconType: 'code',
    syllabus: ['Android & iOS UI Architecture', 'Cross-Platform Frameworks (React Native / Flutter)', 'Local Database Storage (SQLite / Realm)', 'Push Notifications & Native Hardware APIs']
  },
  {
    id: 'csc-4273',
    code: 'CSC 4273',
    title: 'Software Architecture & Design Patterns',
    category: 'Software Engineering',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'code',
    syllabus: ['Gang of Four (GoF) Design Patterns', 'Clean Architecture & SOLID Principles', 'Microservices vs Monolithic Architecture', 'Event-Driven Architecture']
  },

  // --- COMPUTER HARDWARE & NETWORKING (COE & EEE) ---
  {
    id: 'coe-3204',
    code: 'COE 3204',
    title: 'Computer Networks',
    category: 'Computer Hardware & COE',
    credits: 3,
    ongoing: false,
    completedTopics: 14,
    totalTopics: 14,
    iconType: 'network',
    syllabus: ['OSI & TCP/IP Layer Architecture', 'IP Addressing (IPv4/IPv6) & Subnetting', 'Routing Protocols (RIP, OSPF, BGP)', 'Transport Protocols (TCP, UDP, Congestion Control)', 'Network Security & Firewalls']
  },
  {
    id: 'coe-3102',
    code: 'COE 3102',
    title: 'Microprocessor and Embedded Systems',
    category: 'Computer Hardware & COE',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'cpu',
    syllabus: ['8086 Microprocessor Architecture', 'Assembly Language Programming', 'Interrupt Processing & Memory Interfacing', 'Microcontroller Programming (ARM / Arduino)']
  },
  {
    id: 'coe-3203',
    code: 'COE 3203',
    title: 'Computer Organization & Architecture',
    category: 'Computer Hardware & COE',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'cpu',
    syllabus: ['CPU Datapath & Control Unit Design', 'ALU Architecture & Instruction Set (RISC/CISC)', 'Memory Hierarchy: Cache Mapping & Virtual Memory', 'Pipelining & Parallelism']
  },
  {
    id: 'coe-4252',
    code: 'COE 4252',
    title: 'Network Security',
    category: 'Computer Hardware & COE',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'network',
    syllabus: ['Cryptography: Symmetric (AES) & Asymmetric (RSA)', 'Public Key Infrastructure (PKI) & SSL/TLS', 'Firewalls, IDS/IPS & VPN Architectures', 'Cyber Threat Mitigation']
  },

  // --- MATHEMATICS & SCIENCES ---
  {
    id: 'mat-1102',
    code: 'MAT 1102',
    title: 'Differential Calculus and Coordinate Geometry',
    category: 'Math & Science',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'math',
    syllabus: ['Limits, Continuity & Differentiability', 'Rolle Theorem & Mean Value Theorem', 'Partial Differentiation', '2D & 3D Coordinate Geometry']
  },
  {
    id: 'mat-1205',
    code: 'MAT 1205',
    title: 'Integral Calculus and Ordinary Differential Equations',
    category: 'Math & Science',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'math',
    syllabus: ['Indefinite & Definite Integrals', 'Area, Volume & Arc Length', 'First Order Differential Equations', 'Higher Order Linear ODEs']
  },
  {
    id: 'mat-3103',
    code: 'MAT 3103',
    title: 'Computational Statistics and Probability',
    category: 'Math & Science',
    credits: 3,
    ongoing: false,
    completedTopics: 12,
    totalTopics: 12,
    iconType: 'math',
    syllabus: ['Probability Theory & Bayes Theorem', 'Discrete & Continuous Distributions', 'Sampling Distributions & Estimation', 'Regression & Correlation Analysis']
  },
  {
    id: 'phy-1101',
    code: 'PHY 1101',
    title: 'Physics-1',
    category: 'Math & Science',
    credits: 3,
    ongoing: false,
    completedTopics: 10,
    totalTopics: 10,
    iconType: 'science',
    syllabus: ['Vectors & Kinematics', 'Newton Laws & Work-Energy Theorem', 'Thermodynamics & Heat Transfer', 'Waves & Oscillations']
  },

  // --- CAPSTONE & GRADUATION ---
  {
    id: 'csc-4197',
    code: 'CSC 4197',
    title: 'Research Methodology',
    category: 'General & Business',
    credits: 3,
    ongoing: false,
    completedTopics: 8,
    totalTopics: 8,
    iconType: 'book',
    syllabus: ['Literature Survey & Problem Formulation', 'Research Design & Quantitative Analysis', 'Academic Writing & Citation Formats', 'Research Ethics']
  },
  {
    id: 'csc-4298',
    code: 'CSC 4298',
    title: 'Thesis/Project',
    category: 'General & Business',
    credits: 6,
    ongoing: true,
    completedTopics: 4,
    totalTopics: 6,
    iconType: 'code',
    syllabus: ['Topic Defense & Proposal', 'System Architecture & Implementation', 'Experimental Evaluation & Results', 'Final Thesis Defense & Presentation']
  },
  {
    id: 'csc-4299',
    code: 'CSC 4299',
    title: 'Internship',
    category: 'General & Business',
    credits: 3,
    ongoing: false,
    completedTopics: 1,
    totalTopics: 1,
    iconType: 'book',
    syllabus: ['Industry Placement', 'Professional Software Development Experience', 'Internship Report Submission & Defense']
  }
];

export const MOCK_MATERIALS: MaterialItem[] = [
  {
    id: 'mat-1',
    courseId: 'csc-2108',
    courseCode: 'CSC 2108',
    courseTitle: 'Introduction to Database',
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
      courseCodeTitle: 'CSC 2108: Introduction to Database',
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
            '   i) All students from CSE department. (5)',
            '   ii) Students with CGPA greater than 3.50. (5)'
          ]
        },
        {
          number: '2.',
          text: 'Explain database normalization up to 3NF with examples.',
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
    }
  },
  {
    id: 'mat-2',
    courseId: 'csc-2108',
    courseCode: 'CSC 2108',
    courseTitle: 'Introduction to Database',
    title: 'Midterm 2023 (Solution).pdf',
    addedTime: '3 months ago',
    size: '2.4 MB',
    fileType: 'pdf',
    category: 'Mid',
    badges: ['Official', 'Solution'],
    isBookmarked: false,
    isDownloaded: false,
    pagesCount: 8
  },
  {
    id: 'mat-3',
    courseId: 'csc-2108',
    courseCode: 'CSC 2108',
    courseTitle: 'Introduction to Database',
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
    courseId: 'csc-2108',
    courseCode: 'CSC 2108',
    courseTitle: 'Introduction to Database',
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
    courseId: 'csc-2108',
    courseCode: 'CSC 2108',
    courseTitle: 'Introduction to Database',
    title: 'SQL Practice.xlsx',
    addedTime: '1 year ago',
    size: '580 KB',
    fileType: 'xlsx',
    category: 'Final',
    badges: ['Lab', 'Practice'],
    isBookmarked: false,
    isDownloaded: true,
    pagesCount: 3
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
    title: 'AIUB CS Course Catalog Updated',
    date: 'Aug 03, 2026',
    desc: 'Full CS curriculum including Core CS, Data Science & AI, Software Engineering, COE, and Mathematics courses updated.',
    unread: false
  }
];
