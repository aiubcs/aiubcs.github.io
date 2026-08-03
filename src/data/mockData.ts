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
  category: 'Core CS' | 'Software Engineering' | 'Data Science & AI' | 'Computer Hardware & COE' | 'Math & Science' | 'General & Business';
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
  // --- CORE CS & PROGRAMMING ---
  { id: 'csc-1101', code: 'CSC 1101', title: 'Introduction to Computer Studies', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['Computer Organization', 'Operating System Basics', 'Binary Arithmetic', 'Software Systems'] },
  { id: 'csc-1102', code: 'CSC 1102', title: 'Introduction to Programming Language', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['C Syntax', 'Variables & Operators', 'Control Flow & Loops', 'Functions & Pointers', 'Arrays & Structures'] },
  { id: 'csc-1103', code: 'CSC 1103', title: 'Introduction to Programming Language Lab', category: 'Core CS', credits: 1, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['C Programming Lab Experiments', 'Debugging & Code Execution'] },
  { id: 'csc-1204', code: 'CSC 1204', title: 'Discrete Mathematics', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'math', syllabus: ['Propositional Logic', 'Sets & Relations', 'Induction', 'Combinatorics', 'Graph Theory'] },
  { id: 'csc-1205', code: 'CSC 1205', title: 'Object Oriented Programming 1', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'code', syllabus: ['Java Syntax', 'Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation'] },
  { id: 'csc-2106', code: 'CSC 2106', title: 'Data Structure', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'cpu', syllabus: ['Arrays & Stacks', 'Queues & Linked Lists', 'Binary Trees', 'Heap & Hashing', 'Sorting Algorithms'] },
  { id: 'csc-2107', code: 'CSC 2107', title: 'Data Structure Lab', category: 'Core CS', credits: 1, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'cpu', syllabus: ['Data Structures C++ Lab Implementation'] },
  { id: 'csc-2108', code: 'CSC 2108', title: 'Introduction to Database', category: 'Core CS', credits: 3, ongoing: true, completedTopics: 0, totalTopics: 14, iconType: 'database', syllabus: ['Relational Model', 'SQL DDL/DML', 'ER Diagrams', 'Normalization 1NF-BCNF', 'Indexing'] },
  { id: 'csc-2209', code: 'CSC 2209', title: 'Object Oriented Analysis and Design', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['Requirements Modeling', 'UML Class & Use Case Diagrams', 'Sequence Diagrams', 'Design Patterns'] },
  { id: 'csc-2210', code: 'CSC 2210', title: 'Object Oriented Programming 2', category: 'Core CS', credits: 3, ongoing: true, completedTopics: 0, totalTopics: 14, iconType: 'code', syllabus: ['Advanced OOP Concepts', 'GUI & Event Handling', 'Multithreading', 'Database Connectivity'] },
  { id: 'csc-2211', code: 'CSC 2211', title: 'Algorithms', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 16, iconType: 'cpu', syllabus: ['Asymptotic Growth', 'Divide & Conquer', 'Greedy Algorithms', 'Dynamic Programming', 'Graph Search'] },
  { id: 'csc-3112', code: 'CSC 3112', title: 'Software Engineering', category: 'Software Engineering', credits: 3, ongoing: true, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['SDLC Models', 'Agile Methodologies', 'Software Verification', 'Software Architecture'] },
  { id: 'csc-3113', code: 'CSC 3113', title: 'Theory of Computation', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'math', syllabus: ['Finite Automata DFA/NFA', 'Regular Expressions', 'Context-Free Grammars', 'Turing Machines', 'Decidability'] },
  { id: 'csc-3214', code: 'CSC 3214', title: 'Operating Systems', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'cpu', syllabus: ['Process Scheduling', 'Inter-Process Communication', 'Deadlocks', 'Memory Paging', 'File Systems'] },
  { id: 'csc-3215', code: 'CSC 3215', title: 'Web Technologies', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'code', syllabus: ['HTML5 & CSS3', 'JavaScript & DOM', 'Server Programming', 'REST APIs', 'Web Security'] },
  { id: 'csc-3216', code: 'CSC 3216', title: 'Compiler Design', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'code', syllabus: ['Lexical Analysis', 'Parsing LL/LR', 'Semantic Analysis', 'Intermediate Representation', 'Optimization'] },
  { id: 'csc-3217', code: 'CSC 3217', title: 'Artificial Intelligence and Expert System', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'ai', syllabus: ['Heuristic Search', 'Minimax & Alpha-Beta', 'Knowledge Representation', 'Rule-Based Expert Systems', 'Machine Learning'] },
  { id: 'csc-4118', code: 'CSC 4118', title: 'Computer Graphics', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['2D/3D Transformations', 'Rasterization Algorithms', 'Clipping Algorithms', 'Shading & Lighting', 'OpenGL Pipeline'] },

  // --- DATA SCIENCE, AI & MACHINE LEARNING ---
  { id: 'csc-4180', code: 'CSC 4180', title: 'Introduction to Data Science', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'ai', syllabus: ['Data Preprocessing', 'Exploratory Data Analysis', 'Statistical Models', 'Supervised Learning', 'Python Data Stack'] },
  { id: 'csc-4181', code: 'CSC 4181', title: 'Advance Database Management Systems', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'database', syllabus: ['Distributed DBMS', 'NoSQL Storage', 'Query Optimization', 'Concurrency Tuning', 'Data Warehousing'] },
  { id: 'csc-4182', code: 'CSC 4182', title: 'Human Computer Interaction', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'code', syllabus: ['User-Centered Design', 'UI Wireframing & Prototyping', 'Usability Evaluation', 'Interaction Models'] },
  { id: 'csc-4183', code: 'CSC 4183', title: 'Cyber Laws & Information Security', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'network', syllabus: ['Information Security Policies', 'Cyber Ethics & Laws', 'Digital Rights', 'Data Privacy Regulations'] },
  { id: 'csc-4230', code: 'CSC 4230', title: 'Bioinformatics', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'ai', syllabus: ['DNA Sequence Alignment', 'BLAST Algorithms', 'Phylogenetics', 'Gene Expression Profiling'] },
  { id: 'csc-4231', code: 'CSC 4231', title: 'Parallel Computing', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Parallel Hardware Architectures', 'MPI & OpenMP Programming', 'GPU Computing (CUDA)', 'Parallel Speedup Models'] },
  { id: 'csc-4232', code: 'CSC 4232', title: 'Machine Learning', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'ai', syllabus: ['Linear & Logistic Regression', 'Decision Trees & Ensembles', 'Support Vector Machines', 'Clustering & PCA', 'Neural Networks'] },
  { id: 'csc-4233', code: 'CSC 4233', title: 'Natural Language Processing', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'ai', syllabus: ['Text Tokenization & Parsing', 'N-gram Models', 'Word Embeddings', 'RNNs & LSTMs', 'Transformer Models'] },
  { id: 'csc-4251', code: 'CSC 4251', title: 'Image Processing', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'ai', syllabus: ['Digital Image Fundamentals', 'Spatial & Frequency Filtering', 'Image Restoration', 'Edge Detection', 'Morphological Processing'] },
  { id: 'csc-4254', code: 'CSC 4254', title: 'Computer Vision & Pattern Recognition', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'ai', syllabus: ['Image Features & Descriptors', 'Convolutional Networks (CNNs)', 'Object Detection (YOLO)', 'Pattern Recognition Classifiers'] },
  { id: 'csc-4285', code: 'CSC 4285', title: 'Data Warehouse and Data Mining', category: 'Data Science & AI', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'database', syllabus: ['ETL Processing', 'Star & Snowflake Schemas', 'OLAP Cubes', 'Association Rule Mining', 'Clustering Algorithms'] },

  // --- SOFTWARE ENGINEERING TRACKS ---
  { id: 'csc-4160', code: 'CSC 4160', title: 'Software Requirement Engineering', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'code', syllabus: ['Elicitation Techniques', 'SRS Documentation', 'Requirement Validation', 'Traceability Matrices'] },
  { id: 'csc-4261', code: 'CSC 4261', title: 'Advanced Programming in Web Technologies', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['Single Page Applications (React)', 'TypeScript & State Management', 'Next.js SSR', 'GraphQL APIs'] },
  { id: 'csc-4262', code: 'CSC 4262', title: 'Programming in Python', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'code', syllabus: ['Python Fundamentals', 'Data Structures & OOP', 'File I/O & Modules', 'Web Development with Flask/Django'] },
  { id: 'csc-4263', code: 'CSC 4263', title: 'Advanced Programming with JAVA', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['Spring Boot Framework', 'Hibernate & JPA', 'REST Microservices', 'Spring Security'] },
  { id: 'csc-4264', code: 'CSC 4264', title: 'Advanced Programming with .NET', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['C# & ASP.NET Core', 'Entity Framework Core', 'LINQ Queries', 'Web API Microservices'] },
  { id: 'csc-4270', code: 'CSC 4270', title: 'Software Development Project Management', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'code', syllabus: ['Project Scheduling & Estimation', 'Risk Management', 'Agile & Scrum Practices', 'Team Leadership'] },
  { id: 'csc-4271', code: 'CSC 4271', title: 'Software Quality and Testing', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'code', syllabus: ['Unit Testing', 'Integration & System Testing', 'Automated QA Tools (Selenium)', 'Code Coverage Analysis'] },
  { id: 'csc-4272', code: 'CSC 4272', title: 'Mobile Application Development', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'code', syllabus: ['Mobile UI Patterns', 'Cross-Platform Frameworks', 'Local Storage & State', 'Mobile API Integration'] },
  { id: 'csc-4273', code: 'CSC 4273', title: 'Software Architecture & Design Patterns', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'code', syllabus: ['Creational, Structural & Behavioral Patterns', 'Clean Architecture', 'Microservices vs Monoliths', 'SOLID Principles'] },

  // --- COMPUTER HARDWARE & NETWORKING (COE & EEE) ---
  { id: 'eee-2101', code: 'EEE 2101', title: 'Basic Mechanical Engineering', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'science', syllabus: ['Statics & Dynamics', 'Thermodynamics Principles', 'Fluid Mechanics', 'Mechanical Tools'] },
  { id: 'eee-2103', code: 'EEE 2103', title: 'Electronic Devices', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Semiconductor Diodes', 'BJT Transistors', 'FET & MOSFET Devices', 'Amplifier Circuits'] },
  { id: 'eee-2104', code: 'EEE 2104', title: 'Electronic Devices Lab', category: 'Computer Hardware & COE', credits: 1, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Electronic Devices Experiments'] },
  { id: 'eee-2108', code: 'EEE 2108', title: 'Introduction to Electrical Circuits', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Ohm Law & Kirchhoff Laws', 'Mesh & Nodal Analysis', 'Network Theorems', 'AC Circuit Analysis'] },
  { id: 'eee-2109', code: 'EEE 2109', title: 'Introduction to Electrical Circuits Lab', category: 'Computer Hardware & COE', credits: 1, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Electrical Circuits Experiments'] },
  { id: 'eee-2213', code: 'EEE 2213', title: 'Signals and Linear Systems', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'science', syllabus: ['Continuous & Discrete Signals', 'LTI System Properties', 'Fourier Series & Transform', 'Laplace Transform'] },
  { id: 'eee-2216', code: 'EEE 2216', title: 'Engineering Ethics', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 8, iconType: 'book', syllabus: ['Engineering Professional Codes', 'Safety & Liability', 'Environmental Ethics', 'Intellectual Property'] },
  { id: 'eee-3101', code: 'EEE 3101', title: 'Digital Logic and Circuits', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Boolean Algebra & Gate Minimization', 'Karnaugh Maps', 'Combinational Logic', 'Sequential Logic & Flip-Flops', 'Counters & Registers'] },
  { id: 'eee-3103', code: 'EEE 3103', title: 'Digital Signal Processing (DSP)', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'science', syllabus: ['Discrete Fourier Transform (DFT)', 'Fast Fourier Transform (FFT)', 'IIR & FIR Filter Design', 'DSP Processor Hardware'] },
  { id: 'eee-4209', code: 'EEE 4209', title: 'Telecommunications Engineering', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'network', syllabus: ['Modulation Techniques AM/FM', 'Digital Transmission PCM/ASK/FSK', 'Cellular Networks 4G/5G', 'Satellite Communications'] },
  { id: 'eee-4217', code: 'EEE 4217', title: 'VLSI Circuit Design', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['CMOS Logic Design', 'Silicon Fabrication Steps', 'Layout & Mask Generation', 'Verilog Synthesis'] },
  { id: 'eee-4233', code: 'EEE 4233', title: 'Digital Design with System Verilog, VHDL & FPGAs', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Hardware Description Languages (VHDL/Verilog)', 'FPGA Architectures', 'RTL Simulation', 'Synthesis & Placement'] },
  { id: 'eee-4241', code: 'EEE 4241', title: 'Industrial Electronics, Drives & Instrumentation', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'cpu', syllabus: ['Power Electronics (Thyristors/Triacs)', 'Motor Speed Control Drives', 'Sensors & Instrumentation', 'PLC Controllers'] },

  { id: 'coe-3101', code: 'COE 3101', title: 'Data Communication', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'network', syllabus: ['Data Transmission Fundamentals', 'Multiplexing Techniques (TDM/FDM)', 'Error Detection & Correction', 'Data Link Protocols'] },
  { id: 'coe-3102', code: 'COE 3102', title: 'Microprocessor and Embedded Systems', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['8086 Microprocessor Architecture', 'Assembly Language Programming', 'Interrupt Processing & Memory Interfacing', 'ARM Microcontroller Programming'] },
  { id: 'coe-3203', code: 'COE 3203', title: 'Computer Organization & Architecture', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['CPU Datapath & Control Unit', 'Instruction Set Architecture (RISC/CISC)', 'Cache Memory & Virtual Memory', 'Pipelining & Parallelism'] },
  { id: 'coe-3204', code: 'COE 3204', title: 'Computer Networks', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 14, iconType: 'network', syllabus: ['OSI & TCP/IP Reference Models', 'IP Subnetting IPv4/IPv6', 'Routing Protocols RIP/OSPF/BGP', 'TCP Congestion Control'] },
  { id: 'coe-4140', code: 'COE 4140', title: 'Advanced Operating Systems', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Distributed OS Kernels', 'Distributed Mutual Exclusion', 'Fault Tolerance & Replication', 'Virtualization Technologies'] },
  { id: 'coe-4141', code: 'COE 4141', title: 'Advanced Computer Networks', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'network', syllabus: ['Software-Defined Networking (SDN)', 'Network Function Virtualization (NFV)', 'High-Speed Packet Switching', 'QoS Architectures'] },
  { id: 'coe-4142', code: 'COE 4142', title: 'Network Resource Management & Organization', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'network', syllabus: ['Traffic Modeling & Queuing Theory', 'Bandwidth Allocation Models', 'Network Management Protocols (SNMP)'] },
  { id: 'coe-4143', code: 'COE 4143', title: 'Digital System Design', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['RTL Design & State Machine Synthesis', 'VHDL/Verilog Design Verification', 'ASIC & FPGA Design Workflows'] },
  { id: 'coe-4250', code: 'COE 4250', title: 'Simulation and Modelling', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'science', syllabus: ['Discrete-Event Simulation', 'Random Number Generators', 'Model Validation Techniques', 'Monte Carlo Methods'] },
  { id: 'coe-4252', code: 'COE 4252', title: 'Network Security', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'network', syllabus: ['Symmetric & Public-Key Cryptography', 'TLS/SSL Protocols', 'Firewalls & IPS Systems', 'Wireless Network Security'] },
  { id: 'coe-4253', code: 'COE 4253', title: 'Wireless Sensor Network', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'network', syllabus: ['Sensor Node Hardware Architecture', 'WSN MAC & Routing Protocols', 'Zigbee & IoT Communication Standards', 'Energy Conservation Protocols'] },
  { id: 'coe-4255', code: 'COE 4255', title: 'Robotics Engineering', category: 'Computer Hardware & COE', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Kinematics & Dynamics of Robot Arms', 'Sensors & Actuators', 'Path Planning & Navigation (SLAM)', 'Robot Operating System (ROS)'] },

  // --- MATHEMATICS & SCIENCES ---
  { id: 'mat-1102', code: 'MAT 1102', title: 'Differential Calculus and Coordinate Geometry', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'math', syllabus: ['Limits & Continuity', 'Derivatives & Applications', 'Partial Derivatives', '2D & 3D Geometry'] },
  { id: 'mat-1205', code: 'MAT 1205', title: 'Integral Calculus and Ordinary Differential Equations', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'math', syllabus: ['Definite & Indefinite Integrals', 'Multiple Integrals', '1st Order ODEs', 'Higher Order Differential Equations'] },
  { id: 'mat-2101', code: 'MAT 2101', title: 'Complex Variables, Laplace and Z-transformations', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'math', syllabus: ['Analytic Complex Functions', 'Cauchy-Riemann Equations', 'Laplace Transform', 'Z-Transform Applications'] },
  { id: 'mat-2202', code: 'MAT 2202', title: 'Matrices, Vectors and Fourier Analysis', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'math', syllabus: ['Matrix Algebra & Eigenvalues', 'Vector Differential Calculus', 'Fourier Series & Integrals', 'PDE Fundamentals'] },
  { id: 'mat-3101', code: 'MAT 3101', title: 'Numerical Methods for Science and Engineering', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'math', syllabus: ['Root Finding Methods', 'Numerical Integration (Simpson/Trapezoidal)', 'System of Linear Equations', 'ODE Numerical Solvers'] },
  { id: 'mat-3103', code: 'MAT 3103', title: 'Computational Statistics and Probability', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'math', syllabus: ['Probability Distributions', 'Bayesian Probability', 'Hypothesis Testing', 'Regression & Correlation'] },
  { id: 'csc-4125', code: 'CSC 4125', title: 'Computer Science Mathematics', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'math', syllabus: ['Number Theory for Cryptography', 'Abstract Algebra Groups/Rings', 'Vector Spaces & Matrix Factorizations'] },
  { id: 'csc-4126', code: 'CSC 4126', title: 'Basic Graph Theory', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'math', syllabus: ['Graph Isomorphism', 'Eulerian & Hamiltonian Graphs', 'Planar Graphs & Coloring', 'Network Flows'] },
  { id: 'csc-4127', code: 'CSC 4127', title: 'Advanced Algorithm Techniques', category: 'Core CS', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 12, iconType: 'cpu', syllabus: ['Amortized Analysis', 'Randomized Algorithms', 'Approximation Algorithms', 'NP-Hard Problem Reductions'] },
  { id: 'csc-4128', code: 'CSC 4128', title: 'Linear Programming', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'math', syllabus: ['Simplex Method', 'Duality Theory & Sensitivity Analysis', 'Integer Linear Programming', 'Transportation Problems'] },
  { id: 'phy-1101', code: 'PHY 1101', title: 'Physics-1', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'science', syllabus: ['Vectors & Motion', 'Work, Energy & Momentum', 'Rotational Mechanics', 'Fluid Statics'] },
  { id: 'phy-1102', code: 'PHY 1102', title: 'Physics 1 Lab', category: 'Math & Science', credits: 1, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'science', syllabus: ['Physics Lab Experiments 1'] },
  { id: 'phy-1203', code: 'PHY 1203', title: 'Physics 2', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'science', syllabus: ['Electrostatics & Gauss Law', 'Magnetism & Ampere Law', 'Electromagnetic Waves', 'Optics & Quantum Physics'] },
  { id: 'phy-1204', code: 'PHY 1204', title: 'Physics 2 Lab', category: 'Math & Science', credits: 1, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'science', syllabus: ['Physics Lab Experiments 2'] },
  { id: 'chem-1101', code: 'Chem 1101', title: 'Chemistry', category: 'Math & Science', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'science', syllabus: ['Atomic Structure & Chemical Bonding', 'Thermochemistry', 'Electrochemistry', 'Chemical Kinetics'] },
  { id: 'bae-2101', code: 'BAE 2101', title: 'Computer Aided Design & Drafting Lab', category: 'Math & Science', credits: 1, ongoing: false, completedTopics: 0, totalTopics: 8, iconType: 'science', syllabus: ['AutoCAD 2D Drafting', '3D Modeling & Orthographic Projections'] },

  // --- GENERAL EDUCATION, BUSINESS & CAPSTONE ---
  { id: 'eng-1101', code: 'ENG 1101', title: 'English Reading Skills and Public Speaking', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['Reading Comprehension', 'Vocabulary Enhancement', 'Public Speaking Principles', 'Speech Delivery'] },
  { id: 'eng-1202', code: 'ENG 1202', title: 'English Writing Skills and Communication', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['Essay & Report Writing', 'Grammar & Composition', 'Business Email Protocols'] },
  { id: 'eng-2103', code: 'ENG 2103', title: 'Business Communication', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['Corporate Presentation Skills', 'Meeting Minutes & Proposal Writing', 'Cross-Cultural Communication'] },
  { id: 'bba-1102', code: 'BBA 1102', title: 'Principles of Accounting', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['Accounting Cycle', 'Financial Statements', 'Balance Sheets & Cash Flow Statements'] },
  { id: 'mgt-3202', code: 'MGT 3202', title: 'Engineering Management', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['Organizational Behavior', 'Human Resource Management', 'Engineering Economics', 'Project Risk Management'] },
  { id: 'eco-3150', code: 'ECO 3150', title: 'Principles of Economics', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['Microeconomics Demand & Supply', 'Market Structures', 'Macroeconomics Indicators (GDP, Inflation)'] },
  { id: 'bas-2101', code: 'BAS 2101', title: 'Bangladesh Studies', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 8, iconType: 'book', syllabus: ['History & Liberation War of Bangladesh', 'Constitution & Governance', 'Economy & Socio-Cultural Development'] },
  { id: 'mis-3101', code: 'MIS 3101', title: 'Management Information Systems', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['Information Systems in Global Business', 'Enterprise Systems', 'Database & Knowledge Management'] },
  { id: 'mis-4007', code: 'MIS 4007', title: 'Digital Marketing', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['SEO & SEM Strategies', 'Social Media Analytics', 'Content Marketing', 'Digital Ad Campaigns'] },
  { id: 'mis-4011', code: 'MIS 4011', title: 'Enterprise Resource Planning', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['ERP Architecture & Modules', 'SAP / Oracle ERP Implementations', 'Business Process Reengineering'] },
  { id: 'mis-4012', code: 'MIS 4012', title: 'E-Commerce, E-Governance & E-Series', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['E-Commerce Models B2B/B2C', 'Payment Gateways & Security', 'E-Governance Architectures'] },
  { id: 'mis-4014', code: 'MIS 4014', title: 'Business Intelligence and Decision Support System', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'book', syllabus: ['BI Frameworks', 'Executive Dashboards', 'Decision Support Algorithms', 'Data Visualization'] },
  { id: 'csc-4144', code: 'CSC 4144', title: 'Multimedia Systems', category: 'Software Engineering', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 10, iconType: 'code', syllabus: ['Audio/Video Compression Algorithms', 'JPEG/MPEG Standards', 'Streaming Protocols'] },
  { id: 'csc-4197', code: 'CSC 4197', title: 'Research Methodology', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 8, iconType: 'book', syllabus: ['Literature Survey', 'Hypothesis Design', 'Data Collection & Statistics', 'Paper Writing & Citation'] },
  { id: 'csc-4298', code: 'CSC 4298', title: 'Thesis/Project', category: 'General & Business', credits: 6, ongoing: true, completedTopics: 0, totalTopics: 6, iconType: 'code', syllabus: ['Thesis Proposal Defense', 'System Architecture & Implementation', 'Experimental Evaluation', 'Final Defense'] },
  { id: 'csc-4299', code: 'CSC 4299', title: 'Internship', category: 'General & Business', credits: 3, ongoing: false, completedTopics: 0, totalTopics: 1, iconType: 'book', syllabus: ['Industry Software Engineering Placement', 'Professional Report Submission & Defense'] }
];

export const MOCK_MATERIALS: MaterialItem[] = [];

export const ANNOUNCEMENTS: Array<{ id: string; title: string; date: string; desc: string; unread: boolean }> = [];
