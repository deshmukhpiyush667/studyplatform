/**
 * StudyMate - Realistic Seed & Mock Data (ES Module for React)
 */
import { EXTENDED_QUIZZES } from './quizBank.js';
import { STUDY_MATERIALS_BANK } from './studyMaterialBank.js';

export const STUDYMATE_MOCK_DATA = {
  // Student Profile
  student: {
    id: "stu_101",
    name: "Payal Deshmukh",
    email: "payal.deshmukh@university.edu",
    avatar: "PD",
    course: "B.Tech Computer Science & Engineering",
    college: "Institute of Technology & Engineering",
    semester: "Semester 6",
    academicYear: "2025 - 2026",
    studyStreak: 12,
    totalStudyHours: 142.5,
    todayStudyHours: 3.5,
    bio: "Passionate CS undergrad specializing in Distributed Systems, Algorithms, and Full-Stack Engineering. Preparing for upcoming technical interviews & semester finals.",
    joinedDate: "2025-08-15"
  },

  // Notes
  notes: [
    {
      id: "note_1",
      title: "Process Synchronization & Semaphores in OS",
      subject: "Operating Systems",
      color: "#4f46e5",
      isPinned: true,
      isFavorite: true,
      tags: ["Concurrency", "Deadlocks", "CriticalSection"],
      createdAt: "2026-09-02T10:30:00Z",
      content: `### Process Synchronization Key Takeaways:
1. **Critical Section Problem**: A section of code where shared resources are accessed. Requires:
   - Mutual Exclusion: Only one process can execute at a time.
   - Progress: Selection cannot be postponed indefinitely.
   - Bounded Waiting: Bound on number of times other processes enter before request is granted.
2. **Semaphores**:
   - Counting Semaphore: Integer value range unrestricted.
   - Binary Semaphore (Mutex): Integer value ranges only between 0 and 1.
   - wait() (P operation) decrements; signal() (V operation) increments.`
    },
    {
      id: "note_2",
      title: "B-Trees and B+ Trees Indexing in DBMS",
      subject: "DBMS",
      color: "#06b6d4",
      isPinned: true,
      isFavorite: false,
      tags: ["Database", "Indexing", "StorageEngine"],
      createdAt: "2026-09-03T14:15:00Z",
      content: `### B+ Tree Properties:
- Self-balancing search tree with multi-level indexing.
- Internal nodes contain only search keys and child pointers (no data records).
- All actual data pointers are stored in **leaf nodes**.
- Leaf nodes are linked as a singly or doubly linked list, enabling **O(log N) point queries** and **lightning-fast range scans**!`
    },
    {
      id: "note_3",
      title: "Dynamic Programming: Knapsack & Longest Common Subsequence",
      subject: "Data Structures & Algorithms",
      color: "#8b5cf6",
      isPinned: false,
      isFavorite: true,
      tags: ["Algorithms", "DP", "Optimization"],
      createdAt: "2026-09-04T09:00:00Z",
      content: `### 0/1 Knapsack Formula:
DP[i][w] = max(DP[i-1][w], val[i-1] + DP[i-1][w - wt[i-1]])
Time Complexity: O(N * W). Space Complexity: O(W) with state compression.
Remember to check base cases where weight is 0 or items array is empty.`
    },
    {
      id: "note_4",
      title: "Python Decorators & Generators Deep Dive",
      subject: "Python Programming",
      color: "#10b981",
      isPinned: false,
      isFavorite: true,
      tags: ["Python", "Advanced", "Generators"],
      createdAt: "2026-09-05T16:20:00Z",
      content: `Generators produce items lazily using yield. Memory footprint is O(1) compared to lists!
Decorators wrap functions using @functools.wraps to preserve metadata.
Useful for authentication wrappers, logging execution latency, and caching memoization results.`
    },
    {
      id: "note_5",
      title: "TCP 3-Way Handshake and Flow Control",
      subject: "Computer Networks",
      color: "#f59e0b",
      isPinned: false,
      isFavorite: false,
      tags: ["Networking", "TCP", "Protocols"],
      createdAt: "2026-09-01T11:10:00Z",
      content: `TCP Connection Establishment:
1. Client sends SYN (seq = x)
2. Server responds SYN-ACK (seq = y, ack = x + 1)
3. Client acknowledges with ACK (ack = y + 1)
Flow control is managed via Sliding Window protocol; congestion control uses Slow Start & Congestion Avoidance algorithms.`
    }
  ],

  // Tasks & Assignments
  tasks: [
    {
      id: "task_1",
      title: "Submit DBMS Normalization Assignment #3 (BCNF & 4NF)",
      subject: "DBMS",
      category: "Assignment",
      priority: "high",
      dueDate: "2026-09-07",
      dueTime: "23:59",
      completed: false,
      description: "Solve problems 1 through 8 covering lossless join decomposition and dependency preservation."
    },
    {
      id: "task_2",
      title: "Complete Operating Systems Virtual Memory Lab Report",
      subject: "Operating Systems",
      category: "Lab Report",
      priority: "high",
      dueDate: "2026-09-08",
      dueTime: "17:00",
      completed: false,
      description: "Document page fault frequency and FIFO vs LRU page replacement benchmark graphs."
    },
    {
      id: "task_3",
      title: "Solve 5 LeetCode Graph Problems (BFS, DFS, Dijkstra)",
      subject: "Data Structures & Algorithms",
      category: "Practice",
      priority: "medium",
      dueDate: "2026-09-09",
      dueTime: "20:00",
      completed: false,
      description: "Target Course Schedule, Network Delay Time, and Number of Islands."
    },
    {
      id: "task_4",
      title: "Draft Software Engineering Architecture Diagram for Semester Project",
      subject: "Software Engineering",
      category: "Project",
      priority: "medium",
      dueDate: "2026-09-11",
      dueTime: "18:00",
      completed: false,
      description: "Use C4 model or standard UML component diagram with microservices layout."
    },
    {
      id: "task_5",
      title: "Read Chapter 4: Computer Networks Link Layer",
      subject: "Computer Networks",
      category: "Reading",
      priority: "low",
      dueDate: "2026-09-12",
      dueTime: "22:00",
      completed: true,
      description: "Study Ethernet frames, CSMA/CD collision detection, and ARP protocol."
    },
    {
      id: "task_6",
      title: "Review Python AsyncIO & Event Loop Mechanics",
      subject: "Python Programming",
      category: "Study",
      priority: "low",
      dueDate: "2026-09-05",
      dueTime: "12:00",
      completed: false,
      description: "Write sample code with aiohttp to compare synchronous requests vs asynchronous coroutines."
    }
  ],

  // Study Timetable / Planner
  schedule: [
    {
      id: "sched_1",
      day: "Monday",
      date: "2026-09-07",
      startTime: "09:00",
      endTime: "10:30",
      subject: "Data Structures & Algorithms",
      activity: "Graph Algorithms & Shortest Path (Dijkstra)",
      priority: "high",
      isDone: false
    },
    {
      id: "sched_2",
      day: "Monday",
      date: "2026-09-07",
      startTime: "11:00",
      endTime: "12:30",
      subject: "Operating Systems",
      activity: "Paging & Memory Management Simulator",
      priority: "medium",
      isDone: false
    },
    {
      id: "sched_3",
      day: "Tuesday",
      date: "2026-09-08",
      startTime: "10:00",
      endTime: "11:30",
      subject: "DBMS",
      activity: "SQL Index Tuning & Query Optimization",
      priority: "high",
      isDone: false
    },
    {
      id: "sched_4",
      day: "Wednesday",
      date: "2026-09-09",
      startTime: "14:00",
      endTime: "16:00",
      subject: "Machine Learning",
      activity: "Supervised Learning Models & Scikit-learn Pipeline",
      priority: "medium",
      isDone: false
    },
    {
      id: "sched_5",
      day: "Thursday",
      date: "2026-09-10",
      startTime: "09:30",
      endTime: "11:00",
      subject: "Computer Networks",
      activity: "Wireshark Packet Analysis Lab Exercises",
      priority: "low",
      isDone: false
    },
    {
      id: "sched_6",
      day: "Friday",
      date: "2026-09-11",
      startTime: "15:00",
      endTime: "17:00",
      subject: "Web Development",
      activity: "REST API Integration & Frontend State Management",
      priority: "high",
      isDone: false
    },
    {
      id: "sched_7",
      day: "Saturday",
      date: "2026-09-12",
      startTime: "10:00",
      endTime: "12:00",
      subject: "Full-Length Revision",
      activity: "Weekly Quiz & Flashcards Review",
      priority: "medium",
      isDone: false
    }
  ],

  // Academic Study Materials & Documents (Full multi-chapter handbooks across all subjects)
  materials: STUDY_MATERIALS_BANK,

  // Curated Learning Resources Directory
  resources: [
    {
      id: "res_1",
      title: "Python 3 Official Documentation & Tutorial",
      subject: "Python",
      platform: "Official Docs",
      difficulty: "All Levels",
      url: "https://docs.python.org/3/tutorial/",
      description: "The authoritative, interactive tutorial covering core semantics, standard library, and OOP."
    },
    {
      id: "res_2",
      title: "NeetCode 150: Curated Coding Interview Roadmap",
      subject: "Data Structures",
      platform: "Interactive Web",
      difficulty: "Intermediate",
      url: "https://neetcode.io/roadmap",
      description: "Comprehensive step-by-step algorithms roadmap covering arrays, trees, heaps, DP, and graphs."
    },
    {
      id: "res_3",
      title: "MDN Web Docs: Modern JavaScript Handbook",
      subject: "JavaScript",
      platform: "Mozilla Docs",
      difficulty: "Beginner to Advanced",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      description: "World-class documentation for ECMAScript specifications, DOM manipulation, promises, and events."
    },
    {
      id: "res_4",
      title: "Fast.ai: Practical Deep Learning for Coders",
      subject: "Machine Learning",
      platform: "Video & MOOC",
      difficulty: "Intermediate",
      url: "https://course.fast.ai/",
      description: "Top-down approach to training state-of-the-art computer vision and NLP models."
    },
    {
      id: "res_5",
      title: "Stanford CS144: Introduction to Computer Networking",
      subject: "Computer Networks",
      platform: "University Course",
      difficulty: "Advanced",
      url: "https://cs144.github.io/",
      description: "Rigorous systems course building an IP router and TCP stack from scratch in modern C++."
    },
    {
      id: "res_6",
      title: "Use The Index, Luke! - Guide to Database Performance",
      subject: "DBMS",
      platform: "Interactive Guide",
      difficulty: "Intermediate",
      url: "https://use-the-index-luke.com/",
      description: "Visual explanation of B-tree indexes, execution plans, clustered keys, and range scans."
    },
    {
      id: "res_7",
      title: "Java 21 Design Patterns & Best Practices",
      subject: "Java",
      platform: "Refactoring Guru",
      difficulty: "Intermediate",
      url: "https://refactoring.guru/design-patterns/java",
      description: "Visual, clear explanations of Factory, Singleton, Observer, Strategy, and Decorator patterns."
    },
    {
      id: "res_8",
      title: "Operating Systems: Three Easy Pieces (OSTEP)",
      subject: "Operating Systems",
      platform: "Open Textbook",
      difficulty: "Intermediate",
      url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
      description: "The gold standard book on Virtualization, Concurrency, and Persistence by Remzi & Andrea Arpaci-Dusseau."
    }
  ],

  // Goals
  goals: [
    {
      id: "goal_1",
      title: "Score 9.0+ SGPA in Semester 6 Finals",
      subject: "Academics",
      type: "long-term",
      targetDate: "2026-11-30",
      progress: 75,
      completed: false,
      milestones: [
        { text: "Attend 90%+ of all theory and lab sessions", done: true },
        { text: "Submit all continuous assessment assignments on time", done: true },
        { text: "Complete revision quizzes for all 6 core subjects", done: true },
        { text: "Solve past 5 years question papers", done: false }
      ]
    },
    {
      id: "goal_2",
      title: "Master Dynamic Programming & Graph Traversal",
      subject: "Data Structures & Algorithms",
      type: "short-term",
      targetDate: "2026-09-30",
      progress: 60,
      completed: false,
      milestones: [
        { text: "Solve 20 1D/2D DP problems", done: true },
        { text: "Implement BFS, DFS, and topological sort from scratch", done: true },
        { text: "Solve 15 LeetCode Medium graph problems", done: false }
      ]
    },
    {
      id: "goal_3",
      title: "Build & Deploy Semester Full-Stack Capstone Project",
      subject: "Web Development",
      type: "medium-term",
      targetDate: "2026-10-20",
      progress: 40,
      completed: false,
      milestones: [
        { text: "Complete database schema and entity relations", done: true },
        { text: "Implement RESTful backend endpoints & auth", done: true },
        { text: "Build responsive frontend UI with dark mode", done: false },
        { text: "Deploy to cloud staging environment", done: false }
      ]
    },
    {
      id: "goal_4",
      title: "Maintain 15-Day Continuous Study Streak",
      subject: "Productivity",
      type: "short-term",
      targetDate: "2026-09-15",
      progress: 80,
      completed: false,
      milestones: [
        { text: "Log at least 2 Pomodoro sessions every day", done: true },
        { text: "Review daily notes before bedtime", done: true }
      ]
    }
  ],

  // Quiz Question Bank (30+ questions per subject)
  quizzes: EXTENDED_QUIZZES,

  // Quiz History
  quizHistory: [
    {
      id: "qh_1",
      quizSubject: "Data Structures & Algorithms",
      score: 4,
      totalQuestions: 5,
      percentage: 80,
      date: "2026-09-04T18:45:00Z"
    },
    {
      id: "qh_2",
      quizSubject: "Operating Systems",
      score: 4,
      totalQuestions: 4,
      percentage: 100,
      date: "2026-09-05T14:10:00Z"
    }
  ],

  // GPA Records
  gpaRecords: {
    scale: "4.0",
    targetCgpa: 3.85,
    semesters: [
      {
        semesterName: "Semester 5 (Fall 2025)",
        sgpa: 3.82,
        credits: 21,
        courses: [
          { code: "CS301", name: "Operating Systems", credits: 4, grade: "A", points: 4.0 },
          { code: "CS302", name: "Database Systems", credits: 4, grade: "A", points: 4.0 },
          { code: "CS303", name: "Algorithms Analysis", credits: 4, grade: "A-", points: 3.7 },
          { code: "CS304", name: "Computer Networks", credits: 4, grade: "B+", points: 3.3 },
          { code: "CS305", name: "Software Engineering", credits: 3, grade: "A", points: 4.0 },
          { code: "CS306", name: "OS & DBMS Lab", credits: 2, grade: "A", points: 4.0 }
        ]
      }
    ],
    currentCourses: [
      { code: "CS401", name: "Distributed Systems", credits: 4, grade: "A", marks: 92 },
      { code: "CS402", name: "Machine Learning", credits: 4, grade: "A-", marks: 88 },
      { code: "CS403", name: "Cloud Computing & DevOps", credits: 3, grade: "A", marks: 95 },
      { code: "CS404", name: "Compiler Design", credits: 4, grade: "B+", marks: 84 },
      { code: "CS405", name: "Information Security", credits: 3, grade: "A", marks: 91 }
    ]
  },

  // Focus Timer History
  timerSessions: [
    { id: "ts_1", subject: "Operating Systems", durationMinutes: 25, date: "2026-09-06T10:00:00Z" },
    { id: "ts_2", subject: "Operating Systems", durationMinutes: 25, date: "2026-09-06T10:30:00Z" },
    { id: "ts_3", subject: "DBMS", durationMinutes: 25, date: "2026-09-06T11:15:00Z" },
    { id: "ts_4", subject: "Data Structures & Algorithms", durationMinutes: 50, date: "2026-09-05T15:00:00Z" },
    { id: "ts_5", subject: "Machine Learning", durationMinutes: 45, date: "2026-09-04T16:30:00Z" }
  ],

  // Badges
  badges: [
    {
      id: "b_streak7",
      title: "7-Day Study Streak",
      desc: "Logged focus sessions 7 consecutive days in a row.",
      icon: "fa-fire",
      color: "#f59e0b",
      unlocked: true,
      unlockedAt: "2026-08-30"
    },
    {
      id: "b_taskmaster",
      title: "Task Master",
      desc: "Completed 25+ assignments & tasks before the deadline.",
      icon: "fa-check-double",
      color: "#10b981",
      unlocked: true,
      unlockedAt: "2026-09-02"
    },
    {
      id: "b_pomo",
      title: "Pomodoro Pro",
      desc: "Clocked 50+ focused 25-minute Pomodoro study intervals.",
      icon: "fa-stopwatch",
      color: "#4f46e5",
      unlocked: true,
      unlockedAt: "2026-09-03"
    },
    {
      id: "b_quizace",
      title: "Quiz Champion",
      desc: "Achieved a 100% score on any subject revision quiz.",
      icon: "fa-trophy",
      color: "#ec4899",
      unlocked: true,
      unlockedAt: "2026-09-05"
    },
    {
      id: "b_gpastar",
      title: "GPA Star",
      desc: "Maintained a cumulative GPA above 3.7 / 9.0.",
      icon: "fa-star",
      color: "#eab308",
      unlocked: true,
      unlockedAt: "2026-08-15"
    },
    {
      id: "b_nightowl",
      title: "Night Owl",
      desc: "Completed a study session between 11:00 PM and 4:00 AM.",
      icon: "fa-moon",
      color: "#8b5cf6",
      unlocked: true,
      unlockedAt: "2026-08-27"
    },
    {
      id: "b_goalcrush",
      title: "Goal Crusher",
      desc: "Completed 100% of all milestones on 3 active study goals.",
      icon: "fa-medal",
      color: "#06b6d4",
      unlocked: false,
      unlockedAt: null
    },
    {
      id: "b_century",
      title: "Century Club",
      desc: "Logged over 100 total productive study hours.",
      icon: "fa-crown",
      color: "#f97316",
      unlocked: true,
      unlockedAt: "2026-08-25"
    }
  ],

  // Notifications
  notifications: [
    {
      id: "notif_1",
      type: "deadline",
      title: "Assignment Due Soon",
      message: "DBMS Normalization Assignment #3 is due tomorrow at 23:59.",
      time: "2 hours ago",
      read: false
    },
    {
      id: "notif_2",
      type: "streak",
      title: "Streak Maintained!",
      message: "Awesome work! You are now on a 12-day study streak. Keep it going!",
      time: "5 hours ago",
      read: false
    },
    {
      id: "notif_3",
      type: "planner",
      title: "Upcoming Study Session",
      message: "Today 14:00: Machine Learning Supervised Models session scheduled.",
      time: "Yesterday",
      read: true
    }
  ]
};
