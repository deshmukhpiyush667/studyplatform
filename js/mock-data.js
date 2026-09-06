/**
 * StudyMate - Realistic Seed & Mock Data
 * Realistic academic data for computer science / engineering student
 */

const STUDYMATE_MOCK_DATA = {
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
    studyStreak: 12, // 12 days
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
   - ` + "`wait()`" + ` (P operation) decrements; ` + "`signal()`" + ` (V operation) increments.`
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
` + "```\nDP[i][w] = max(DP[i-1][w], val[i-1] + DP[i-1][w - wt[i-1]])\n```" + `
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
      content: `Generators produce items lazily using ` + "`yield`" + `. Memory footprint is O(1) compared to lists!
Decorators wrap functions using ` + "`@functools.wraps`" + ` to preserve metadata.
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
      priority: "high", // high, medium, low
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
      dueDate: "2026-09-05", // Deliberately past date to test overdue badge!
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

  // Academic Study Materials & Documents
  materials: [
    {
      id: "mat_1",
      title: "Operating Systems Principles (10th Ed) - Silberschatz",
      subject: "Operating Systems",
      category: "Textbook",
      type: "pdf", // pdf, doc, video, book, link
      description: "Official textbook reference covering kernels, CPU scheduling, synchronization, and storage.",
      url: "https://example.com/books/os-silberschatz.pdf",
      tags: ["Textbook", "Reference", "OS"],
      uploadedDate: "2026-08-20"
    },
    {
      id: "mat_2",
      title: "Database System Concepts Slides & Cheatsheet",
      subject: "DBMS",
      category: "Lecture Notes",
      type: "doc",
      description: "Concise summary of relational algebra, ER diagrams, SQL constraints, and transaction ACID properties.",
      url: "https://example.com/notes/dbms-summary.docx",
      tags: ["SQL", "Relational", "ACID"],
      uploadedDate: "2026-08-28"
    },
    {
      id: "mat_3",
      title: "MIT 6.006: Introduction to Algorithms Video Lectures",
      subject: "Data Structures & Algorithms",
      category: "Video Course",
      type: "video",
      description: "Complete MIT OpenCourseWare lecture series by Prof. Erik Demaine.",
      url: "https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",
      tags: ["MIT", "Video", "Algorithms"],
      uploadedDate: "2026-08-15"
    },
    {
      id: "mat_4",
      title: "Computer Networking: A Top-Down Approach (Kurose & Ross)",
      subject: "Computer Networks",
      category: "Textbook",
      type: "book",
      description: "Standard networking reference detailing application, transport, network, and link layers.",
      url: "https://example.com/books/kurose-ross.pdf",
      tags: ["Networking", "Sockets", "Protocols"],
      uploadedDate: "2026-08-22"
    },
    {
      id: "mat_5",
      title: "Hands-On Machine Learning with Scikit-Learn, Keras, and TF",
      subject: "Machine Learning",
      category: "Textbook",
      type: "pdf",
      description: "Practical guide by Aurélien Géron for building ML pipelines and deep neural architectures.",
      url: "https://example.com/books/hands-on-ml.pdf",
      tags: ["AI", "Python", "DeepLearning"],
      uploadedDate: "2026-09-01"
    }
  ],

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

  // Quiz Question Bank (30+ questions per subject across 7 core subjects)
  quizzes: [
    {
        "id": "quiz_dsa",
        "subject": "Data Structures & Algorithms",
        "title": "Data Structures & Algorithms",
        "description": "Deep dive into Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming & Complexity.",
        "questions": [
            {
                "id": "dsa_1",
                "question": "What is the worst-case time complexity of QuickSort when naive pivot selection is used?",
                "options": [
                    "O(N log N)",
                    "O(N^2)",
                    "O(log N)",
                    "O(N)"
                ],
                "correct": 1,
                "explanation": "In the worst case (already sorted array with first element as pivot), QuickSort partitions into 1 and N-1 elements, yielding O(N^2) complexity."
            },
            {
                "id": "dsa_2",
                "question": "Which data structure is fundamentally used to implement Breadth-First Search (BFS)?",
                "options": [
                    "Stack",
                    "Queue",
                    "Priority Queue",
                    "Binary Search Tree"
                ],
                "correct": 1,
                "explanation": "BFS explores vertices level-by-level using a FIFO Queue."
            },
            {
                "id": "dsa_3",
                "question": "What is the minimum number of nodes in a complete binary tree of height H (where root height = 0)?",
                "options": [
                    "2^H",
                    "2^(H+1) - 1",
                    "2^H - 1",
                    "H + 1"
                ],
                "correct": 0,
                "explanation": "A complete binary tree of height H has full levels up to H-1 (2^H - 1 nodes) plus at least 1 node at height H, totaling 2^H nodes."
            },
            {
                "id": "dsa_4",
                "question": "Dijkstra's shortest path algorithm fails or produces incorrect results in the presence of:",
                "options": [
                    "Directed cycles",
                    "Disconnected components",
                    "Negative weight edges",
                    "Dense graphs"
                ],
                "correct": 2,
                "explanation": "Dijkstra relies on greedy assumption that edge weights are non-negative. Negative weights require Bellman-Ford."
            },
            {
                "id": "dsa_5",
                "question": "What is the average time complexity to search an element in a balanced Hash Table?",
                "options": [
                    "O(1)",
                    "O(log N)",
                    "O(N)",
                    "O(N log N)"
                ],
                "correct": 0,
                "explanation": "A hash table with a good hash function and reasonable load factor achieves O(1) expected lookup."
            },
            {
                "id": "dsa_6",
                "question": "Which sorting algorithm is guaranteed to be stable and has O(N log N) worst-case time complexity?",
                "options": [
                    "Quick Sort",
                    "Heap Sort",
                    "Merge Sort",
                    "Selection Sort"
                ],
                "correct": 2,
                "explanation": "Merge Sort maintains relative order of duplicate elements and is consistently O(N log N) in all cases."
            },
            {
                "id": "dsa_7",
                "question": "What is the height of an AVL tree with N nodes in the worst case?",
                "options": [
                    "O(log N)",
                    "O(N)",
                    "O(sqrt(N))",
                    "O(N log N)"
                ],
                "correct": 0,
                "explanation": "The balance factor restriction (-1, 0, 1) guarantees maximum height is approximately 1.44 * log2(N), which is strictly O(log N)."
            },
            {
                "id": "dsa_8",
                "question": "Which tree traversal of a Binary Search Tree (BST) visits elements in ascending order?",
                "options": [
                    "Pre-order",
                    "In-order",
                    "Post-order",
                    "Level-order"
                ],
                "correct": 1,
                "explanation": "In-order traversal visits Left Subtree -> Root -> Right Subtree, resulting in sorted output for a BST."
            },
            {
                "id": "dsa_9",
                "question": "What is the time complexity of building a Max-Heap from an unsorted array of N elements?",
                "options": [
                    "O(N log N)",
                    "O(N)",
                    "O(N^2)",
                    "O(log N)"
                ],
                "correct": 1,
                "explanation": "Bottom-up heapify builds a heap in mathematical linear time O(N), not O(N log N)."
            },
            {
                "id": "dsa_10",
                "question": "Which algorithmic technique does Floyd-Warshall algorithm for all-pairs shortest paths use?",
                "options": [
                    "Greedy Method",
                    "Divide and Conquer",
                    "Dynamic Programming",
                    "Backtracking"
                ],
                "correct": 2,
                "explanation": "Floyd-Warshall computes shortest paths using intermediate vertices k via dynamic programming in O(V^3)."
            },
            {
                "id": "dsa_11",
                "question": "What is the worst-case search complexity in a standard Binary Search Tree (unbalanced)?",
                "options": [
                    "O(log N)",
                    "O(N)",
                    "O(1)",
                    "O(N log N)"
                ],
                "correct": 1,
                "explanation": "When elements are inserted in sorted order, an unbalanced BST degenerates into a linear linked list with O(N) search."
            },
            {
                "id": "dsa_12",
                "question": "In a min-heap with N elements, where is the maximum element located?",
                "options": [
                    "At the root",
                    "At an internal node",
                    "At one of the leaf nodes",
                    "It cannot be determined"
                ],
                "correct": 2,
                "explanation": "In a min-heap, every parent is smaller than its children, so the maximum element must reside in one of the leaves."
            },
            {
                "id": "dsa_13",
                "question": "Which data structure is most efficient to check for balanced parentheses in an expression?",
                "options": [
                    "Queue",
                    "Stack",
                    "Priority Queue",
                    "Circular Array"
                ],
                "correct": 1,
                "explanation": "A Stack provides LIFO behavior, allowing matching open brackets with recent closed brackets."
            },
            {
                "id": "dsa_14",
                "question": "What is the space complexity of Depth-First Search (DFS) on a graph with V vertices and E edges?",
                "options": [
                    "O(V)",
                    "O(E)",
                    "O(V + E)",
                    "O(V * E)"
                ],
                "correct": 0,
                "explanation": "The recursion stack or visited array in DFS consumes O(V) space."
            },
            {
                "id": "dsa_15",
                "question": "Which technique is used to solve the 0/1 Knapsack problem efficiently?",
                "options": [
                    "Greedy algorithm",
                    "Dynamic Programming",
                    "Divide and Conquer",
                    "Radix Sort"
                ],
                "correct": 1,
                "explanation": "Fractional knapsack can be solved with greedy, but 0/1 knapsack requires Dynamic Programming with O(N * W)."
            },
            {
                "id": "dsa_16",
                "question": "Kruskal's algorithm for finding Minimum Spanning Tree (MST) utilizes which auxiliary data structure?",
                "options": [
                    "Disjoint Set Union (DSU / Union-Find)",
                    "Hash Map",
                    "Suffix Tree",
                    "Fenwick Tree"
                ],
                "correct": 0,
                "explanation": "Kruskal sorts edges and uses Union-Find to detect cycles in nearly O(1) amortized time."
            },
            {
                "id": "dsa_17",
                "question": "What is the recurrence relation for the Merge Sort algorithm?",
                "options": [
                    "T(N) = 2T(N/2) + O(N)",
                    "T(N) = T(N-1) + O(N)",
                    "T(N) = 2T(N/2) + O(1)",
                    "T(N) = T(N/2) + O(1)"
                ],
                "correct": 0,
                "explanation": "Merge sort divides into 2 subproblems of size N/2 and takes linear O(N) time to merge."
            },
            {
                "id": "dsa_18",
                "question": "What is the worst-case number of comparisons made in standard Binary Search on an array of size N?",
                "options": [
                    "floor(log2(N)) + 1",
                    "N / 2",
                    "N",
                    "2 * log2(N)"
                ],
                "correct": 0,
                "explanation": "Binary search repeatedly halves search space, stopping after at most floor(log2(N)) + 1 comparisons."
            },
            {
                "id": "dsa_19",
                "question": "A graph with V vertices and no cycles has how many edges in each spanning tree?",
                "options": [
                    "V",
                    "V - 1",
                    "V + 1",
                    "2V - 1"
                ],
                "correct": 1,
                "explanation": "Every spanning tree of a connected graph with V vertices contains exactly V - 1 edges."
            },
            {
                "id": "dsa_20",
                "question": "What is the time complexity of finding an element in a Trie of key length L?",
                "options": [
                    "O(L)",
                    "O(N * L)",
                    "O(log L)",
                    "O(N)"
                ],
                "correct": 0,
                "explanation": "Lookup in a Trie only depends on the length of string L and is independent of total words N."
            },
            {
                "id": "dsa_21",
                "question": "Which of the following is an in-place comparison sort?",
                "options": [
                    "Merge Sort",
                    "Heap Sort",
                    "Counting Sort",
                    "Bucket Sort"
                ],
                "correct": 1,
                "explanation": "Heap Sort sorts directly within the input array using O(1) auxiliary memory."
            },
            {
                "id": "dsa_22",
                "question": "What is the amortized time complexity of an append operation on a dynamic resizing array (like vector/ArrayList)?",
                "options": [
                    "O(1)",
                    "O(N)",
                    "O(log N)",
                    "O(N^2)"
                ],
                "correct": 0,
                "explanation": "Doubling array capacity when full yields an amortized O(1) cost per push."
            },
            {
                "id": "dsa_23",
                "question": "The Longest Common Subsequence (LCS) problem of two strings of lengths M and N is solved via DP in time:",
                "options": [
                    "O(M * N)",
                    "O(M + N)",
                    "O(2^(M+N))",
                    "O(M log N)"
                ],
                "correct": 0,
                "explanation": "Standard 2D table DP compares prefix combinations in O(M * N) time."
            },
            {
                "id": "dsa_24",
                "question": "Which traversal sequence is unique when paired with in-order traversal to reconstruct a binary tree?",
                "options": [
                    "Pre-order only",
                    "Post-order only",
                    "Either Pre-order or Post-order",
                    "Level-order only"
                ],
                "correct": 2,
                "explanation": "In-order combined with either pre-order or post-order uniquely determines binary tree topology."
            },
            {
                "id": "dsa_25",
                "question": "What is the minimum number of queues needed to implement a FIFO Stack?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "Not possible"
                ],
                "correct": 1,
                "explanation": "A stack can be simulated using 2 FIFO queues by transferring elements during push or pop."
            },
            {
                "id": "dsa_26",
                "question": "Which self-balancing search tree allows color rotation properties (Red and Black) for O(log N) operations?",
                "options": [
                    "Red-Black Tree",
                    "B+ Tree",
                    "Splay Tree",
                    "Segment Tree"
                ],
                "correct": 0,
                "explanation": "Red-Black Trees maintain balance through node color constraints, guaranteeing search in at most 2 * log2(N+1)."
            },
            {
                "id": "dsa_27",
                "question": "In topological sorting of a Directed Acyclic Graph (DAG), what is true about an edge (u, v)?",
                "options": [
                    "u appears after v",
                    "u appears before v",
                    "u and v must have equal in-degrees",
                    "v must have zero out-degree"
                ],
                "correct": 1,
                "explanation": "Topological ordering guarantees that for every directed edge u -> v, vertex u precedes v in the linear order."
            },
            {
                "id": "dsa_28",
                "question": "What is the best case time complexity of Bubble Sort when an early exit flag is implemented?",
                "options": [
                    "O(N)",
                    "O(N log N)",
                    "O(N^2)",
                    "O(1)"
                ],
                "correct": 0,
                "explanation": "If no swaps occur on the first pass through an already sorted array, Bubble Sort terminates in O(N)."
            },
            {
                "id": "dsa_29",
                "question": "What is the primary advantage of a Doubly Linked List over a Singly Linked List?",
                "options": [
                    "Less memory used",
                    "Bidirectional traversal and O(1) node deletion with pointer",
                    "Random access O(1)",
                    "Cache locality"
                ],
                "correct": 1,
                "explanation": "Given a direct pointer to a node, a doubly linked list can delete it in O(1) because node.prev is directly accessible."
            },
            {
                "id": "dsa_30",
                "question": "Which data structure is ideal for range sum queries with point updates in O(log N) time?",
                "options": [
                    "Fenwick Tree (Binary Indexed Tree)",
                    "Linked List",
                    "Queue",
                    "Binary Search Tree"
                ],
                "correct": 0,
                "explanation": "A Binary Indexed Tree (Fenwick Tree) handles prefix sums and updates in O(log N) with minimal code overhead."
            },
            {
                "id": "dsa_31",
                "question": "What is the worst-case time complexity of the Bellman-Ford algorithm on a graph with V vertices and E edges?",
                "options": [
                    "O(V * E)",
                    "O(V + E)",
                    "O(E log V)",
                    "O(V^2)"
                ],
                "correct": 0,
                "explanation": "Bellman-Ford relaxes all E edges V - 1 times, leading to O(V * E) runtime."
            },
            {
                "id": "dsa_32",
                "question": "Which of the following problems is known to be NP-Complete?",
                "options": [
                    "Shortest Path in Weighted Graph",
                    "Traveling Salesperson Decision Problem",
                    "Minimum Spanning Tree",
                    "Connected Components"
                ],
                "correct": 1,
                "explanation": "The Traveling Salesperson Decision Problem (TSP) is a classic NP-Complete problem."
            }
        ]
    },
    {
        "id": "quiz_os",
        "subject": "Operating Systems",
        "title": "Operating Systems & Concurrency",
        "description": "Processes, Threads, CPU Scheduling, Virtual Memory, Deadlocks, Paging, and File Systems.",
        "questions": [
            {
                "id": "os_1",
                "question": "Which of the following is NOT one of the four Coffman conditions necessary for deadlock?",
                "options": [
                    "Mutual Exclusion",
                    "Hold and Wait",
                    "Preemption Allowed",
                    "Circular Wait"
                ],
                "correct": 2,
                "explanation": "The condition is No Preemption. Allowing preemption prevents or breaks deadlock."
            },
            {
                "id": "os_2",
                "question": "What phenomenon occurs when excessive paging causes the OS to spend more time swapping pages than executing instructions?",
                "options": [
                    "Starvation",
                    "Thrashing",
                    "Fragmentation",
                    "Context Flooding"
                ],
                "correct": 1,
                "explanation": "Thrashing occurs when active working sets exceed physical RAM."
            },
            {
                "id": "os_3",
                "question": "What does the TLB (Translation Lookaside Buffer) cache in hardware?",
                "options": [
                    "Instruction opcodes",
                    "Virtual to physical page frame translations",
                    "Disk sector addresses",
                    "Interrupt vectors"
                ],
                "correct": 1,
                "explanation": "The TLB is an associative hardware cache storing recently used Virtual Page -> Physical Frame translations."
            },
            {
                "id": "os_4",
                "question": "Which CPU scheduling algorithm is non-preemptive and minimizes average waiting time for batch jobs?",
                "options": [
                    "Round Robin",
                    "Shortest Job First (Non-preemptive)",
                    "Priority Scheduling",
                    "Multilevel Feedback Queue"
                ],
                "correct": 1,
                "explanation": "Shortest Job First (SJF) is mathematically optimal for minimizing average wait time."
            },
            {
                "id": "os_5",
                "question": "In Linux/Unix, which system call creates a duplicate child process?",
                "options": [
                    "fork()",
                    "exec()",
                    "spawn()",
                    "clone_thread()"
                ],
                "correct": 0,
                "explanation": "fork() creates an exact duplicate process by cloning address space with Copy-on-Write (COW)."
            },
            {
                "id": "os_6",
                "question": "What is a major advantage of threads (lightweight processes) over full processes?",
                "options": [
                    "Independent memory spaces",
                    "Faster context switching and shared memory within the process",
                    "Immunity from race conditions",
                    "No OS scheduling needed"
                ],
                "correct": 1,
                "explanation": "Threads share the same text, data, and heap, making context switching and communication far faster than IPC."
            },
            {
                "id": "os_7",
                "question": "Belady's Anomaly demonstrates that increasing the number of page frames can result in more page faults in:",
                "options": [
                    "LRU (Least Recently Used)",
                    "FIFO (First In First Out)",
                    "Optimal Page Replacement",
                    "LFU"
                ],
                "correct": 1,
                "explanation": "FIFO does not belong to the class of stack algorithms and is vulnerable to Belady's Anomaly."
            },
            {
                "id": "os_8",
                "question": "Banker's Algorithm is primarily used in operating systems for:",
                "options": [
                    "Deadlock Detection",
                    "Deadlock Avoidance",
                    "Memory Allocation",
                    "CPU Quantum Timing"
                ],
                "correct": 1,
                "explanation": "Banker's Algorithm tests for safe states before allocating resources to avoid deadlock."
            },
            {
                "id": "os_9",
                "question": "What is the critical section problem requirement ensuring that selection cannot be postponed indefinitely?",
                "options": [
                    "Mutual Exclusion",
                    "Progress",
                    "Bounded Waiting",
                    "Atomicity"
                ],
                "correct": 1,
                "explanation": "Progress guarantees that if no process is in critical section, only candidates participate in deciding who enters."
            },
            {
                "id": "os_10",
                "question": "What does the atomic hardware instruction 'Test-and-Set' do?",
                "options": [
                    "Sets a bit to 0 and returns original value",
                    "Sets a memory word to 1 and returns previous value atomically",
                    "Flushes CPU cache",
                    "Swaps register with memory asynchronously"
                ],
                "correct": 1,
                "explanation": "Test-and-Set reads old value and sets new value in a single uninterruptible memory bus cycle."
            },
            {
                "id": "os_11",
                "question": "Which scheduling algorithm assigns each process a fixed time slice and preempts when expired?",
                "options": [
                    "FCFS",
                    "Round Robin",
                    "Shortest Remaining Time First",
                    "Priority Non-preemptive"
                ],
                "correct": 1,
                "explanation": "Round Robin rotates CPU time quantum among ready processes in circular order."
            },
            {
                "id": "os_12",
                "question": "Internal fragmentation occurs when:",
                "options": [
                    "Allocated memory block is slightly larger than requested memory",
                    "Total free memory is enough but not contiguous",
                    "Page table is full",
                    "Swap partition runs out of space"
                ],
                "correct": 0,
                "explanation": "Internal fragmentation is unused space inside fixed-size allocated partitions/pages."
            },
            {
                "id": "os_13",
                "question": "External fragmentation can be solved by which of the following techniques?",
                "options": [
                    "Compaction and Paging",
                    "Increasing page size",
                    "Disabling virtual memory",
                    "Overlays"
                ],
                "correct": 0,
                "explanation": "Compaction shifts allocated memory together, and Paging breaks physical memory into non-contiguous frames."
            },
            {
                "id": "os_14",
                "question": "A process that has finished execution but still has an entry in the process table is called:",
                "options": [
                    "Orphan Process",
                    "Zombie Process",
                    "Daemon Process",
                    "Foreground Process"
                ],
                "correct": 1,
                "explanation": "A zombie process has exited, but its exit status has not yet been read by parent via wait()."
            },
            {
                "id": "os_15",
                "question": "An orphan process in Unix whose parent terminates is adopted by which process?",
                "options": [
                    "kernel (pid 0)",
                    "init / systemd (pid 1)",
                    "cron",
                    "bash"
                ],
                "correct": 1,
                "explanation": "Init/systemd (PID 1) adopts orphan processes and periodically reaps their exit statuses."
            },
            {
                "id": "os_16",
                "question": "What is an Inode in Unix-based file systems?",
                "options": [
                    "The actual file content",
                    "Data structure storing file metadata, permissions, and block pointers",
                    "Directory path string",
                    "Master Boot Record sector"
                ],
                "correct": 1,
                "explanation": "An inode stores file attributes, permissions, size, timestamps, and direct/indirect block pointers."
            },
            {
                "id": "os_17",
                "question": "Which of the following is an IPC (Inter-Process Communication) mechanism?",
                "options": [
                    "Pipes",
                    "Message Queues",
                    "Shared Memory",
                    "All of the above"
                ],
                "correct": 3,
                "explanation": "Pipes, named pipes, message queues, sockets, and shared memory are standard IPC mechanisms."
            },
            {
                "id": "os_18",
                "question": "What is the primary role of a device controller interrupt handler?",
                "options": [
                    "Polling hardware in infinite loop",
                    "Notifying CPU asynchronously that I/O operation has completed",
                    "Translating virtual addresses",
                    "Formatting disk blocks"
                ],
                "correct": 1,
                "explanation": "Interrupt handlers service asynchronous hardware events when disk or network controllers finish I/O."
            },
            {
                "id": "os_19",
                "question": "What is Copy-on-Write (COW) optimization in modern OS kernels?",
                "options": [
                    "Parent and child share read-only pages until one modifies a page",
                    "All memory is copied immediately during fork",
                    "Files are backed up on every write",
                    "Cache is written directly to disk"
                ],
                "correct": 0,
                "explanation": "COW defers page duplication until either parent or child executes a write, saving immense RAM."
            },
            {
                "id": "os_20",
                "question": "What is a race condition in concurrent systems?",
                "options": [
                    "System freezes completely",
                    "Outcome depends on the non-deterministic interleaving or timing of execution",
                    "One process takes all CPU cycles",
                    "Two threads deadlocking on one mutex"
                ],
                "correct": 1,
                "explanation": "A race condition occurs when concurrent threads access shared data without synchronization, causing inconsistent results."
            },
            {
                "id": "os_21",
                "question": "Which page replacement policy replaces the page that will not be used for the longest period of time?",
                "options": [
                    "LRU",
                    "FIFO",
                    "Optimal (OPT / Belady's Min)",
                    "Clock Policy"
                ],
                "correct": 2,
                "explanation": "Optimal Page Replacement looks into the future to replace the page unreferenced for the longest time."
            },
            {
                "id": "os_22",
                "question": "A counting semaphore was initialized to 8. Then 10 P (wait) operations and 4 V (signal) operations were performed. The final value is:",
                "options": [
                    "2",
                    "12",
                    "6",
                    "0"
                ],
                "correct": 0,
                "explanation": "Initial = 8; 10 wait operations: 8 - 10 = -2; 4 signal operations: -2 + 4 = 2."
            },
            {
                "id": "os_23",
                "question": "What is the purpose of the 'dirty bit' in a page table entry?",
                "options": [
                    "Indicates page has syntax errors",
                    "Indicates page has been modified in memory and must be written back to disk on eviction",
                    "Indicates page is corrupted",
                    "Tracks TLB hits"
                ],
                "correct": 1,
                "explanation": "The dirty bit (modify bit) signals whether memory differs from backing disk block."
            },
            {
                "id": "os_24",
                "question": "What is spooling (Simultaneous Peripheral Operations On-Line)?",
                "options": [
                    "Placing I/O jobs in a buffer/disk queue so device processes them at its own speed",
                    "CPU overclocking technique",
                    "Direct memory access bypass",
                    "Network packet routing"
                ],
                "correct": 0,
                "explanation": "Spooling (e.g. print spooler) buffers data on disk for slow peripheral devices."
            },
            {
                "id": "os_25",
                "question": "In multi-level page tables, what is the primary benefit?",
                "options": [
                    "Faster access than single level",
                    "Reduces physical memory used to store page tables for sparse virtual address spaces",
                    "Eliminates TLB misses",
                    "Simplifies hardware logic"
                ],
                "correct": 1,
                "explanation": "Multi-level page tables avoid allocating intermediate tables for unallocated address regions."
            },
            {
                "id": "os_26",
                "question": "What is a trap instruction in computer architecture and OS?",
                "options": [
                    "Software-generated interrupt caused by error or system call request",
                    "Hardware circuit failure",
                    "Infinite while loop",
                    "Deadlock condition"
                ],
                "correct": 0,
                "explanation": "A trap switches CPU from user mode to kernel mode via software interrupt vector."
            },
            {
                "id": "os_27",
                "question": "Which disk scheduling algorithm services requests in cylinder order, reversing at the disk boundary?",
                "options": [
                    "FCFS",
                    "SSTF",
                    "SCAN (Elevator Algorithm)",
                    "C-LOOK"
                ],
                "correct": 2,
                "explanation": "The SCAN algorithm moves heads in one direction across cylinders and reverses at the boundary."
            },
            {
                "id": "os_28",
                "question": "What is the major difference between a monolithic kernel and a microkernel?",
                "options": [
                    "Monolithic runs all OS services in kernel space; microkernel moves non-essential services to user space",
                    "Monolithic is slower",
                    "Microkernel has no memory management",
                    "Monolithic only supports single-core"
                ],
                "correct": 0,
                "explanation": "Microkernels minimize kernel space code, running drivers and file systems as user-space servers."
            },
            {
                "id": "os_29",
                "question": "Which of the following is a non-blocking I/O approach?",
                "options": [
                    "System call returns immediately, process checks status or receives callback later",
                    "Thread halts until bytes are read",
                    "Process enters sleep state",
                    "CPU disables interrupts"
                ],
                "correct": 0,
                "explanation": "Non-blocking or asynchronous I/O allows program execution to proceed without waiting for disk/network."
            },
            {
                "id": "os_30",
                "question": "What is the main purpose of virtual memory in modern OS?",
                "options": [
                    "Enable processes to address larger memory than physical RAM and provide isolation/protection",
                    "Increase physical disk rotation speed",
                    "Accelerate CPU clock rate",
                    "Eliminate L1 cache"
                ],
                "correct": 0,
                "explanation": "Virtual memory creates an illusion of large private address space per process and provides hardware protection."
            },
            {
                "id": "os_31",
                "question": "What is priority inversion and how is it resolved?",
                "options": [
                    "Low priority task blocks high priority task via lock; resolved with Priority Inheritance",
                    "High priority process starves; resolved with aging",
                    "Threads execute in reverse order; resolved with LIFO",
                    "Deadlock between 3 processes"
                ],
                "correct": 0,
                "explanation": "Priority Inheritance temporarily elevates the lower-priority thread holding the lock to the priority of the waiting high-priority thread."
            },
            {
                "id": "os_32",
                "question": "Which file allocation method has zero external fragmentation and supports fast direct access?",
                "options": [
                    "Contiguous Allocation",
                    "Linked Allocation",
                    "Indexed Allocation",
                    "Tape Storage Allocation"
                ],
                "correct": 2,
                "explanation": "Indexed allocation brings pointers together into index blocks, avoiding external fragmentation while allowing random access."
            }
        ]
    },
    {
        "id": "quiz_dbms",
        "subject": "DBMS",
        "title": "Database Management Systems",
        "description": "Relational Algebra, SQL, Normalization (1NF to BCNF), ACID Transactions, Indexing & Concurrency.",
        "questions": [
            {
                "id": "db_1",
                "question": "Which normal form strictly eliminates transitive functional dependencies on non-prime attributes?",
                "options": [
                    "1NF",
                    "2NF",
                    "3NF",
                    "BCNF"
                ],
                "correct": 2,
                "explanation": "3NF requires that no non-prime attribute depends transitively on a candidate key."
            },
            {
                "id": "db_2",
                "question": "The 'I' in the ACID properties of database transactions stands for:",
                "options": [
                    "Integrity",
                    "Isolation",
                    "Indexability",
                    "Immutability"
                ],
                "correct": 1,
                "explanation": "Isolation ensures concurrent transactions execute without seeing intermediate dirty states."
            },
            {
                "id": "db_3",
                "question": "Which SQL clause is used to filter results of an aggregate function such as COUNT() or AVG()?",
                "options": [
                    "WHERE",
                    "HAVING",
                    "GROUP BY",
                    "ORDER BY"
                ],
                "correct": 1,
                "explanation": "HAVING filters aggregated groups, while WHERE filters individual records before grouping."
            },
            {
                "id": "db_4",
                "question": "What type of lock allows concurrent transactions to read data but prevents any writes?",
                "options": [
                    "Exclusive Lock (X)",
                    "Shared Lock (S)",
                    "Intent Exclusive Lock (IX)",
                    "Schema Lock"
                ],
                "correct": 1,
                "explanation": "Shared locks (S) allow multiple readers simultaneously while blocking write requests."
            },
            {
                "id": "db_5",
                "question": "What is the key advantage of B+ Trees over standard B-Trees for database indexing?",
                "options": [
                    "Leaf nodes are linked in a chain, making range scans fast",
                    "Internal nodes store data pointers",
                    "Requires zero rebalancing",
                    "Uses less disk storage"
                ],
                "correct": 0,
                "explanation": "In B+ trees, all records are stored in linked leaves, allowing sequential range queries without traversing root."
            },
            {
                "id": "db_6",
                "question": "A relation is in Boyce-Codd Normal Form (BCNF) if for every non-trivial functional dependency X -> Y:",
                "options": [
                    "Y is a candidate key",
                    "X is a superkey",
                    "X is a subset of Y",
                    "Y is a prime attribute"
                ],
                "correct": 1,
                "explanation": "BCNF requires every determinant X in X -> Y to be a Superkey."
            },
            {
                "id": "db_7",
                "question": "Which isolation level prevents Dirty Reads and Non-Repeatable Reads, but may allow Phantom Reads?",
                "options": [
                    "Read Uncommitted",
                    "Read Committed",
                    "Repeatable Read",
                    "Serializable"
                ],
                "correct": 2,
                "explanation": "Repeatable Read ensures read rows cannot change during transaction, but new rows inserted by others can appear."
            },
            {
                "id": "db_8",
                "question": "In Two-Phase Locking (2PL), once a transaction releases any lock, it enters which phase?",
                "options": [
                    "Growing phase",
                    "Shrinking phase",
                    "Validation phase",
                    "Commit phase"
                ],
                "correct": 1,
                "explanation": "In the shrinking phase of 2PL, locks can only be released; no new locks can be acquired."
            },
            {
                "id": "db_9",
                "question": "Which of the following relational algebra operations is commutative?",
                "options": [
                    "Natural Join",
                    "Cartesian Product",
                    "Union",
                    "All of the above"
                ],
                "correct": 3,
                "explanation": "Natural join, cross product, and union are all mathematically commutative."
            },
            {
                "id": "db_10",
                "question": "What is a clustered index in a relational database?",
                "options": [
                    "An index where physical order of rows on disk matches index order",
                    "An index on multiple columns",
                    "An index stored in separate file",
                    "A non-unique index"
                ],
                "correct": 0,
                "explanation": "A table can have only one clustered index because disk rows are physically arranged in that sorted sequence."
            },
            {
                "id": "db_11",
                "question": "What does the Write-Ahead Logging (WAL) protocol require before a transaction commits?",
                "options": [
                    "Log records must be flushed to disk before corresponding data pages are written",
                    "Data pages flushed before log",
                    "No logging needed if in RAM",
                    "Indexes written first"
                ],
                "correct": 0,
                "explanation": "WAL guarantees durability and recovery by persisting log records before dirty pages reach disk."
            },
            {
                "id": "db_12",
                "question": "In SQL, what is the result of 'SELECT 1 WHERE NULL = NULL'?",
                "options": [
                    "1",
                    "Empty set (no rows)",
                    "NULL",
                    "Error"
                ],
                "correct": 1,
                "explanation": "In SQL three-valued logic, comparison with NULL yields UNKNOWN, so the WHERE condition evaluates to false/no rows."
            },
            {
                "id": "db_13",
                "question": "Which anomaly occurs when Transaction T1 reads data modified by T2, and T2 subsequently rolls back?",
                "options": [
                    "Dirty Read",
                    "Non-repeatable Read",
                    "Phantom Read",
                    "Lost Update"
                ],
                "correct": 0,
                "explanation": "A dirty read reads uncommitted changes that might be reverted."
            },
            {
                "id": "db_14",
                "question": "What is the primary objective of Database Normalization?",
                "options": [
                    "Maximize query join performance",
                    "Minimize data redundancy and eliminate insert/update/delete anomalies",
                    "Increase table size",
                    "Create automatic backups"
                ],
                "correct": 1,
                "explanation": "Normalization reduces data duplication and structural update anomalies by decomposing relations."
            },
            {
                "id": "db_15",
                "question": "Which relational algebra operator performs projection (selecting specific attributes/columns)?",
                "options": [
                    "sigma (σ)",
                    "pi (π)",
                    "rho (ρ)",
                    "bowtie (⋈)"
                ],
                "correct": 1,
                "explanation": "Pi (π) denotes projection of columns; sigma (σ) denotes selection of rows."
            },
            {
                "id": "db_16",
                "question": "A Foreign Key constraint enforces which of the following integrity rules?",
                "options": [
                    "Entity Integrity",
                    "Referential Integrity",
                    "Domain Integrity",
                    "User-Defined Integrity"
                ],
                "correct": 1,
                "explanation": "Referential integrity requires foreign key values to match an existing primary key or be NULL."
            },
            {
                "id": "db_17",
                "question": "What is a View in SQL?",
                "options": [
                    "A physical copy of table on disk",
                    "A virtual table based on the result-set of an SQL statement",
                    "A stored procedure",
                    "A database trigger"
                ],
                "correct": 1,
                "explanation": "Views are stored queries that present dynamic virtual tables without duplicating raw storage."
            },
            {
                "id": "db_18",
                "question": "Which database crash recovery algorithm uses Analysis, Redo, and Undo phases?",
                "options": [
                    "ARIES",
                    "Banker's",
                    "Dijkstra",
                    "Graham Scan"
                ],
                "correct": 0,
                "explanation": "ARIES (Algorithms for Recovery and Isolation Exploiting Semantics) uses Analysis, Redo, and Undo with WAL."
            },
            {
                "id": "db_19",
                "question": "What does 'CASCADE' in 'ON DELETE CASCADE' do for foreign key relationships?",
                "options": [
                    "Prevents deletion of parent row",
                    "Automatically deletes dependent child rows when parent row is deleted",
                    "Sets child foreign keys to NULL",
                    "Throws runtime exception"
                ],
                "correct": 1,
                "explanation": "CASCADE propagates deletions from parent table to all linked child records."
            },
            {
                "id": "db_20",
                "question": "What is a dense index in a database management system?",
                "options": [
                    "An index with an entry for every search key value in data file",
                    "An index only for some blocks",
                    "An index without pointers",
                    "An uncompressed index"
                ],
                "correct": 0,
                "explanation": "A dense index contains a record pointer for every distinct key in the table."
            },
            {
                "id": "db_21",
                "question": "Which constraint ensures that no two rows have identical values in a column, but allows NULLs?",
                "options": [
                    "PRIMARY KEY",
                    "UNIQUE",
                    "CHECK",
                    "NOT NULL"
                ],
                "correct": 1,
                "explanation": "UNIQUE enforces uniqueness but permits NULL values (unlike PRIMARY KEY)."
            },
            {
                "id": "db_22",
                "question": "In transaction schedules, what condition defines Conflict Serializability?",
                "options": [
                    "Its precedence (serialization) graph is acyclic",
                    "It uses only exclusive locks",
                    "All transactions execute sequentially",
                    "No rollback occurs"
                ],
                "correct": 0,
                "explanation": "A schedule is conflict serializable if and only if its precedence graph contains no directed cycles."
            },
            {
                "id": "db_23",
                "question": "What does an SQL Correlated Subquery do?",
                "options": [
                    "Executes once for entire outer query",
                    "Executes repeatedly for each candidate row evaluated by outer query",
                    "Runs in background thread",
                    "Cannot reference outer table"
                ],
                "correct": 1,
                "explanation": "A correlated subquery references columns from outer query and evaluates once per outer row."
            },
            {
                "id": "db_24",
                "question": "Which of the following represents Fourth Normal Form (4NF)?",
                "options": [
                    "Eliminating partial dependencies",
                    "Relation is in BCNF and has no multi-valued dependencies (MVD)",
                    "Eliminating transitive dependencies",
                    "Splitting numeric keys"
                ],
                "correct": 1,
                "explanation": "4NF forbids non-trivial multivalued dependencies (X ->-> Y) where X is not a superkey."
            },
            {
                "id": "db_25",
                "question": "Which of the following is a DDL (Data Definition Language) statement?",
                "options": [
                    "SELECT",
                    "INSERT",
                    "ALTER",
                    "UPDATE"
                ],
                "correct": 2,
                "explanation": "CREATE, ALTER, DROP, and TRUNCATE are DDL statements modifying schema structures."
            },
            {
                "id": "db_26",
                "question": "What is the purpose of database checkpointing?",
                "options": [
                    "Reduces recovery time by flushing dirty pages and writing a checkpoint record to log",
                    "Locks the database from writes",
                    "Defragments secondary storage",
                    "Backs up SQL scripts"
                ],
                "correct": 0,
                "explanation": "Checkpoints ensure all prior log entries are saved to disk, limiting log scan distance during crash recovery."
            },
            {
                "id": "db_27",
                "question": "What is the difference between TRUNCATE and DELETE in SQL?",
                "options": [
                    "TRUNCATE is DDL, faster, and deallocates pages without row-by-row logging",
                    "DELETE is faster than TRUNCATE",
                    "TRUNCATE can use WHERE clause",
                    "There is no difference"
                ],
                "correct": 0,
                "explanation": "TRUNCATE drops table data at page level, resets identity seeds, and cannot filter rows."
            },
            {
                "id": "db_28",
                "question": "What does the CAP Theorem state for distributed databases?",
                "options": [
                    "Consistency, Availability, and Partition Tolerance cannot all be guaranteed simultaneously",
                    "Compute, Architecture, Performance",
                    "Concurrency, Atomicity, Persistence",
                    "Control, Authorization, Privacy"
                ],
                "correct": 0,
                "explanation": "In the presence of network partitions (P), a distributed system must trade off between Consistency (C) and Availability (A)."
            },
            {
                "id": "db_29",
                "question": "Which SQL operator searches for a specified pattern in a column using wildcards like '%' and '_'?",
                "options": [
                    "IN",
                    "LIKE",
                    "BETWEEN",
                    "MATCH"
                ],
                "correct": 1,
                "explanation": "LIKE performs regex pattern matching with % (any sequence) and _ (single character)."
            },
            {
                "id": "db_30",
                "question": "In entity-relationship (ER) modeling, what does a double diamond represent?",
                "options": [
                    "Weak Entity",
                    "Identifying Relationship",
                    "Composite Attribute",
                    "Derived Attribute"
                ],
                "correct": 1,
                "explanation": "An identifying relationship connects a weak entity set to its owner entity set."
            },
            {
                "id": "db_31",
                "question": "What is the default isolation level in MySQL InnoDB storage engine?",
                "options": [
                    "Read Committed",
                    "Repeatable Read",
                    "Serializable",
                    "Read Uncommitted"
                ],
                "correct": 1,
                "explanation": "MySQL InnoDB uses Repeatable Read with Next-Key Locks to avoid phantom reads."
            },
            {
                "id": "db_32",
                "question": "Which SQL clause partitions rows into groups before window functions (like RANK() or ROW_NUMBER()) are calculated?",
                "options": [
                    "GROUP BY",
                    "PARTITION BY",
                    "ORDER BY",
                    "SPLIT BY"
                ],
                "correct": 1,
                "explanation": "Window functions use PARTITION BY inside the OVER() clause to create calculation partitions."
            }
        ]
    },
    {
        "id": "quiz_cn",
        "subject": "Computer Networks",
        "title": "Computer Networks & Protocols",
        "description": "OSI & TCP/IP Model, Routing, Congestion Control, TCP/UDP, DNS, HTTP/HTTPS, and Security.",
        "questions": [
            {
                "id": "cn_1",
                "question": "In the TCP 3-way handshake, what flags are sent by client and server during connection setup?",
                "options": [
                    "SYN -> SYN-ACK -> ACK",
                    "ACK -> SYN -> SYN-ACK",
                    "FIN -> ACK -> FIN-ACK",
                    "SYN -> ACK -> DATA"
                ],
                "correct": 0,
                "explanation": "Client sends SYN, server replies with SYN-ACK, client completes with ACK."
            },
            {
                "id": "cn_2",
                "question": "Which transport layer protocol is connectionless, lightweight, and does NOT guarantee packet delivery?",
                "options": [
                    "TCP",
                    "UDP",
                    "SCTP",
                    "TLS"
                ],
                "correct": 1,
                "explanation": "UDP provides fast best-effort datagram delivery without handshakes or retransmissions."
            },
            {
                "id": "cn_3",
                "question": "What is the standard port number for secure HTTPS communication?",
                "options": [
                    "80",
                    "443",
                    "8080",
                    "22"
                ],
                "correct": 1,
                "explanation": "HTTPS operates on port 443 (HTTP uses port 80; SSH uses port 22)."
            },
            {
                "id": "cn_4",
                "question": "Which layer of the OSI model is responsible for end-to-end flow control and reliable data transfer?",
                "options": [
                    "Network Layer",
                    "Data Link Layer",
                    "Transport Layer",
                    "Session Layer"
                ],
                "correct": 2,
                "explanation": "Transport layer (Layer 4) manages process-to-process reliable transport."
            },
            {
                "id": "cn_5",
                "question": "Which protocol resolves a known IP address to a physical MAC address on a local area network?",
                "options": [
                    "DNS",
                    "ARP (Address Resolution Protocol)",
                    "DHCP",
                    "ICMP"
                ],
                "correct": 1,
                "explanation": "ARP broadcasts on Layer 2 to discover hardware MAC address corresponding to target IP."
            },
            {
                "id": "cn_6",
                "question": "What is the size of an IPv6 address compared to IPv4?",
                "options": [
                    "32 bits vs 16 bits",
                    "64 bits vs 32 bits",
                    "128 bits vs 32 bits",
                    "256 bits vs 64 bits"
                ],
                "correct": 2,
                "explanation": "IPv6 uses 128-bit hexadecimal addresses compared to IPv4's 32-bit dotted decimal addresses."
            },
            {
                "id": "cn_7",
                "question": "What mechanism prevents packet looping indefinitely in an IP network?",
                "options": [
                    "Checksum",
                    "TTL (Time to Live) field in IP header",
                    "Sequence Number",
                    "Subnet Mask"
                ],
                "correct": 1,
                "explanation": "Routers decrement TTL by 1; when TTL hits 0, packet is dropped and ICMP Time Exceeded is returned."
            },
            {
                "id": "cn_8",
                "question": "Which routing protocol uses the Bellman-Ford distance-vector algorithm?",
                "options": [
                    "OSPF",
                    "BGP",
                    "RIP (Routing Information Protocol)",
                    "IS-IS"
                ],
                "correct": 2,
                "explanation": "RIP uses hop count distance-vector algorithm with a maximum hop metric of 15."
            },
            {
                "id": "cn_9",
                "question": "What routing algorithm does OSPF (Open Shortest Path First) use to compute shortest paths?",
                "options": [
                    "Dijkstra's Algorithm",
                    "Floyd-Warshall",
                    "Bellman-Ford",
                    "Kruskal's Algorithm"
                ],
                "correct": 0,
                "explanation": "OSPF is a link-state protocol where each router runs Dijkstra's algorithm to compute shortest path tree."
            },
            {
                "id": "cn_10",
                "question": "In TCP congestion control, what algorithm is active when Congestion Window (cwnd) is below slow start threshold (ssthresh)?",
                "options": [
                    "Slow Start (exponential growth)",
                    "Congestion Avoidance (linear growth)",
                    "Fast Recovery",
                    "Random Early Detection"
                ],
                "correct": 0,
                "explanation": "In Slow Start, cwnd doubles every RTT (exponential growth) until it reaches ssthresh."
            },
            {
                "id": "cn_11",
                "question": "What is the CIDR subnet mask for prefix '/26'?",
                "options": [
                    "255.255.255.0",
                    "255.255.255.128",
                    "255.255.255.192",
                    "255.255.255.224"
                ],
                "correct": 2,
                "explanation": "/26 has 26 ones: 255.255.255.(128+64) = 255.255.255.192, allowing 64 total addresses (62 usable)."
            },
            {
                "id": "cn_12",
                "question": "Which protocol dynamically assigns IP addresses, default gateways, and DNS servers to network hosts?",
                "options": [
                    "SNMP",
                    "DHCP",
                    "NTP",
                    "SMTP"
                ],
                "correct": 1,
                "explanation": "DHCP (Dynamic Host Configuration Protocol) leases network configuration settings automatically."
            },
            {
                "id": "cn_13",
                "question": "What does ICMP (Internet Control Message Protocol) power in common diagnostic tools?",
                "options": [
                    "ping and traceroute",
                    "telnet and ssh",
                    "curl and wget",
                    "ftp and scp"
                ],
                "correct": 0,
                "explanation": "ping uses ICMP Echo Request/Reply; traceroute triggers ICMP Time Exceeded packets."
            },
            {
                "id": "cn_14",
                "question": "Which layer of the OSI model handles encryption, compression, and data format translation?",
                "options": [
                    "Session Layer",
                    "Presentation Layer",
                    "Application Layer",
                    "Transport Layer"
                ],
                "correct": 1,
                "explanation": "Presentation layer (Layer 6) manages serialization, SSL/TLS encryption, and compression formats."
            },
            {
                "id": "cn_15",
                "question": "In CSMA/CD (Carrier Sense Multiple Access with Collision Detection), how do hosts handle collisions?",
                "options": [
                    "Retransmit immediately",
                    "Wait a random backoff time calculated by Binary Exponential Backoff",
                    "Switch to token ring",
                    "Drop connection"
                ],
                "correct": 1,
                "explanation": "Binary exponential backoff exponentially doubles backoff window to minimize collision recurrence."
            },
            {
                "id": "cn_16",
                "question": "Which protocol is the de facto exterior gateway protocol routing traffic across Autonomous Systems on the global Internet?",
                "options": [
                    "OSPF",
                    "BGP (Border Gateway Protocol)",
                    "RIP",
                    "EIGRP"
                ],
                "correct": 1,
                "explanation": "BGP is the path-vector inter-domain routing protocol governing worldwide Internet traffic."
            },
            {
                "id": "cn_17",
                "question": "What is the role of NAT (Network Address Translation)?",
                "options": [
                    "Translates private non-routable IP addresses into public routable IP addresses",
                    "Compresses HTTP headers",
                    "Encrypts Wi-Fi passwords",
                    "Routes packets across VLANs"
                ],
                "correct": 0,
                "explanation": "NAT enables multiple internal hosts with private IPs (e.g. 192.168.x.x) to share single public IP."
            },
            {
                "id": "cn_18",
                "question": "In TCP, how does the receiver notify the sender that its receive buffer is full?",
                "options": [
                    "Sets Window Size = 0 in ACK segment",
                    "Sends RST flag",
                    "Closes socket connection",
                    "Drops incoming packets silently"
                ],
                "correct": 0,
                "explanation": "Zero Window advertisement halts sender transmission until buffer space clears."
            },
            {
                "id": "cn_19",
                "question": "What HTTP status code represents '404'?",
                "options": [
                    "Unauthorized",
                    "Forbidden",
                    "Not Found",
                    "Internal Server Error"
                ],
                "correct": 2,
                "explanation": "404 signifies requested resource could not be found on server."
            },
            {
                "id": "cn_20",
                "question": "What security attack exploits unauthenticated DNS replies to redirect users to malicious servers?",
                "options": [
                    "DNS Spoofing / Cache Poisoning",
                    "SYN Flood",
                    "Man-in-the-Middle",
                    "Cross-Site Scripting"
                ],
                "correct": 0,
                "explanation": "DNS cache poisoning corrupts resolver cache entries with spoofed IP mappings."
            },
            {
                "id": "cn_21",
                "question": "Which framing technique inserts an escape byte before data bytes identical to framing flags?",
                "options": [
                    "Bit Stuffing",
                    "Byte Stuffing (Character Stuffing)",
                    "Manchester Encoding",
                    "CRC Check"
                ],
                "correct": 1,
                "explanation": "Byte stuffing escapes flag characters appearing within payload data."
            },
            {
                "id": "cn_22",
                "question": "What is the maximum data rate defined by Nyquist's theorem for noiseless channel of bandwidth B and V signal levels?",
                "options": [
                    "2 * B * log2(V)",
                    "B * log2(1 + S/N)",
                    "B * V^2",
                    "V * log2(B)"
                ],
                "correct": 0,
                "explanation": "Nyquist Capacity = 2 * B * log2(V) bits/sec."
            },
            {
                "id": "cn_23",
                "question": "Shannon's capacity formula accounts for what real-world transmission property?",
                "options": [
                    "Signal-to-Noise Ratio (SNR)",
                    "Subnet mask size",
                    "Cable color",
                    "Clock frequency"
                ],
                "correct": 0,
                "explanation": "Shannon Capacity = B * log2(1 + S/N), defining theoretical maximum bit rate in noisy channels."
            },
            {
                "id": "cn_24",
                "question": "What does the TCP Selective Acknowledgment (SACK) option achieve?",
                "options": [
                    "Allows receiver to inform sender about all received disjoint segments, avoiding retransmission of already received packets",
                    "Encrypts TCP payloads",
                    "Combines ACK with HTTP POST",
                    "Bypasses flow control"
                ],
                "correct": 0,
                "explanation": "SACK pinpoints missing segments so sender only retransmits truly lost packets."
            },
            {
                "id": "cn_25",
                "question": "Which of the following is a private IPv4 address range defined in RFC 1918?",
                "options": [
                    "10.0.0.0/8",
                    "172.16.0.0/12",
                    "192.168.0.0/16",
                    "All of the above"
                ],
                "correct": 3,
                "explanation": "RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16 for private internets."
            },
            {
                "id": "cn_26",
                "question": "What is the purpose of the Spanning Tree Protocol (STP) in Layer 2 Ethernet switches?",
                "options": [
                    "Prevent switching loops and broadcast storms",
                    "Encrypt ethernet frames",
                    "Route traffic between subnets",
                    "Allocate IP addresses"
                ],
                "correct": 0,
                "explanation": "STP (IEEE 802.1D) disables redundant links logically to avoid bridge loops while retaining failover capability."
            },
            {
                "id": "cn_27",
                "question": "What is an advantage of HTTP/2 over HTTP/1.1?",
                "options": [
                    "Binary framing, multiplexing multiple streams over single TCP connection, and header compression (HPACK)",
                    "Runs over UDP",
                    "Removes SSL requirement",
                    "Requires no web server"
                ],
                "correct": 0,
                "explanation": "HTTP/2 introduces binary framing and multiplexing to eliminate Head-of-Line blocking at application layer."
            },
            {
                "id": "cn_28",
                "question": "Which transport protocol does HTTP/3 utilize as its underlying foundation?",
                "options": [
                    "TCP",
                    "QUIC (over UDP)",
                    "SCTP",
                    "RSVP"
                ],
                "correct": 1,
                "explanation": "HTTP/3 runs on top of Google's QUIC protocol using UDP, featuring built-in encryption and zero Head-of-Line blocking."
            },
            {
                "id": "cn_29",
                "question": "In symmetric key cryptography, how many total keys are required for N users to communicate privately in pairs?",
                "options": [
                    "N",
                    "2N",
                    "N * (N - 1) / 2",
                    "N^2"
                ],
                "correct": 2,
                "explanation": "Each pair requires unique secret key, producing N*(N-1)/2 total keys across network."
            },
            {
                "id": "cn_30",
                "question": "What does TLS (Transport Layer Security) use during handshake to securely negotiate symmetric session keys?",
                "options": [
                    "Asymmetric Key Cryptography (RSA or Diffie-Hellman)",
                    "Cleartext HTTP header",
                    "Symmetric AES without keys",
                    "Hardware jumper"
                ],
                "correct": 0,
                "explanation": "TLS uses public-key cryptography to authenticate certificates and securely derive shared symmetric session keys."
            },
            {
                "id": "cn_31",
                "question": "What is the broadcast MAC address in Ethernet networks?",
                "options": [
                    "00:00:00:00:00:00",
                    "FF:FF:FF:FF:FF:FF",
                    "127.0.0.1",
                    "255.255.255.255"
                ],
                "correct": 1,
                "explanation": "FF:FF:FF:FF:FF:FF addresses all network interface cards on the local broadcast domain."
            },
            {
                "id": "cn_32",
                "question": "What is the purpose of a VLAN (Virtual Local Area Network)?",
                "options": [
                    "Logically segment single physical switch network into multiple isolated broadcast domains",
                    "Increase internet speed",
                    "Replace DNS servers",
                    "Translate IPv4 to IPv6"
                ],
                "correct": 0,
                "explanation": "VLANs divide broadcast domains at Layer 2 without requiring separate physical switches."
            }
        ]
    },
    {
        "id": "quiz_se",
        "subject": "Software Engineering",
        "title": "Software Engineering Principles",
        "description": "Agile/Scrum, Design Patterns, SOLID Principles, Software Architecture, Testing & CI/CD.",
        "questions": [
            {
                "id": "se_1",
                "question": "In the SOLID design principles, what does the 'S' stand for?",
                "options": [
                    "Single Responsibility Principle",
                    "System Integration Principle",
                    "Scalability Principle",
                    "Security Principle"
                ],
                "correct": 0,
                "explanation": "Single Responsibility Principle asserts that a class should have one, and only one, reason to change."
            },
            {
                "id": "se_2",
                "question": "Which design pattern ensures that a class has only one instance and provides a global point of access to it?",
                "options": [
                    "Factory Pattern",
                    "Singleton Pattern",
                    "Observer Pattern",
                    "Adapter Pattern"
                ],
                "correct": 1,
                "explanation": "Singleton pattern restricts instantiation to a solitary object (e.g. Database Connection Pool)."
            },
            {
                "id": "se_3",
                "question": "In Agile Scrum methodology, what is the recommended duration of a standard Sprint?",
                "options": [
                    "1 to 4 weeks",
                    "6 months",
                    "1 year",
                    "1 day"
                ],
                "correct": 0,
                "explanation": "Standard Agile sprints range from 1 to 4 weeks, with 2 weeks being the most common industry cadence."
            },
            {
                "id": "se_4",
                "question": "Which design pattern defines a one-to-many dependency between objects so that when one changes state, all dependents are notified?",
                "options": [
                    "Observer Pattern",
                    "Decorator Pattern",
                    "Strategy Pattern",
                    "Facade Pattern"
                ],
                "correct": 0,
                "explanation": "Observer pattern decouples subject publisher from multiple subscriber observers."
            },
            {
                "id": "se_5",
                "question": "What does the 'O' in SOLID represent?",
                "options": [
                    "Object-oriented Principle",
                    "Open/Closed Principle",
                    "Operational Principle",
                    "Optimization Principle"
                ],
                "correct": 1,
                "explanation": "Open/Closed Principle: Software entities should be open for extension, but closed for modification."
            },
            {
                "id": "se_6",
                "question": "Which type of testing verifies that code modifications have not unintentionally broken existing features?",
                "options": [
                    "Unit Testing",
                    "Regression Testing",
                    "Smoke Testing",
                    "Performance Testing"
                ],
                "correct": 1,
                "explanation": "Regression testing re-runs test suites to ensure bug fixes or changes preserve existing behavior."
            },
            {
                "id": "se_7",
                "question": "The Liskov Substitution Principle (LSP) requires that:",
                "options": [
                    "Subtypes must be substitutable for their base types without altering program correctness",
                    "Classes must only inherit once",
                    "Base classes cannot have abstract methods",
                    "All interfaces must be sealed"
                ],
                "correct": 0,
                "explanation": "LSP guarantees that derived classes adhere to behavioral contracts established by their parent interfaces."
            },
            {
                "id": "se_8",
                "question": "Which structural design pattern attaches additional responsibilities and behavior to an object dynamically without subclassing?",
                "options": [
                    "Decorator Pattern",
                    "Singleton Pattern",
                    "Builder Pattern",
                    "Prototype Pattern"
                ],
                "correct": 0,
                "explanation": "Decorator pattern wraps target objects with additional functionality at runtime."
            },
            {
                "id": "se_9",
                "question": "In Git version control, what does 'git rebase' do compared to 'git merge'?",
                "options": [
                    "Moves or reapplies commits on top of another base tip for linear commit history",
                    "Deletes repository",
                    "Creates backup branch",
                    "Pushes code to GitHub"
                ],
                "correct": 0,
                "explanation": "Rebasing replays local commits on top of updated upstream branch without generating merge commits."
            },
            {
                "id": "se_10",
                "question": "What is the primary role of the Scrum Master?",
                "options": [
                    "Assign tasks to engineers",
                    "Facilitate Scrum ceremonies and remove team impediments",
                    "Write software code",
                    "Act as product CEO"
                ],
                "correct": 1,
                "explanation": "The Scrum Master is a servant-leader helping the development team eliminate blockers and adhere to Scrum practices."
            },
            {
                "id": "se_11",
                "question": "In software architecture, what characterizes Microservices over a Monolith?",
                "options": [
                    "Single codebase and shared deployment",
                    "Decoupled services independently deployable and communicating over lightweight APIs",
                    "Zero network latency",
                    "Single database for all tables"
                ],
                "correct": 1,
                "explanation": "Microservices architecture divides functionality into modular, independently scalable services."
            },
            {
                "id": "se_12",
                "question": "What does CI/CD stand for in modern DevOps engineering?",
                "options": [
                    "Continuous Integration / Continuous Delivery (or Deployment)",
                    "Computer Interface / Data Control",
                    "Code Inspection / Code Debugging",
                    "Central Index / Cloud Deployment"
                ],
                "correct": 0,
                "explanation": "CI/CD automates code testing, building, staging, and production release pipelines."
            },
            {
                "id": "se_13",
                "question": "Which creational pattern separates the construction of a complex object from its representation?",
                "options": [
                    "Builder Pattern",
                    "State Pattern",
                    "Flyweight Pattern",
                    "Visitor Pattern"
                ],
                "correct": 0,
                "explanation": "Builder pattern constructs complex objects step-by-step with clear method chaining."
            },
            {
                "id": "se_14",
                "question": "What is Cyclomatic Complexity in software metrics?",
                "options": [
                    "Number of linearly independent execution paths through code",
                    "Number of lines of code",
                    "Number of variables declared",
                    "Size of compiled binary"
                ],
                "correct": 0,
                "explanation": "McCabe's Cyclomatic Complexity measures decision logic paths: M = E - N + 2P."
            },
            {
                "id": "se_15",
                "question": "In Clean Architecture, which layer contains enterprise business rules and entities?",
                "options": [
                    "Core / Domain Layer (innermost)",
                    "UI / Web Layer",
                    "Database Framework Layer",
                    "External Devices"
                ],
                "correct": 0,
                "explanation": "Domain entities sit at the core, independent of UI, databases, and external libraries."
            },
            {
                "id": "se_16",
                "question": "What is the main goal of Test-Driven Development (TDD)?",
                "options": [
                    "Write tests after production deployment",
                    "Follow Red-Green-Refactor cycle: write failing test, write minimal code to pass, refactor",
                    "Only test frontend components",
                    "Skip integration tests"
                ],
                "correct": 1,
                "explanation": "TDD mandates writing automated unit tests before implementing production code."
            },
            {
                "id": "se_17",
                "question": "Which design pattern converts the interface of a class into another interface clients expect?",
                "options": [
                    "Adapter Pattern",
                    "Proxy Pattern",
                    "Composite Pattern",
                    "Command Pattern"
                ],
                "correct": 0,
                "explanation": "Adapter pattern acts as a wrapper bridging incompatible interfaces."
            },
            {
                "id": "se_18",
                "question": "What does High Cohesion and Low Coupling indicate in software design?",
                "options": [
                    "Poor code quality",
                    "Good modularity: modules focus on single purpose and have minimal interdependence",
                    "Code is too small",
                    "Memory leaks"
                ],
                "correct": 1,
                "explanation": "High cohesion within classes and loose coupling between classes facilitates maintainability and testability."
            },
            {
                "id": "se_19",
                "question": "What is an MVP (Minimum Viable Product)?",
                "options": [
                    "Product version with core features sufficient to validate hypothesis with early adopters",
                    "Cheapest possible code",
                    "Bug-ridden release",
                    "Final production system"
                ],
                "correct": 0,
                "explanation": "An MVP gathers validated customer learning with minimal engineering effort."
            },
            {
                "id": "se_20",
                "question": "Which behavioral pattern encapsulates a request as an object, allowing parameterization and undo operations?",
                "options": [
                    "Command Pattern",
                    "Chain of Responsibility",
                    "Mediator",
                    "Memento"
                ],
                "correct": 0,
                "explanation": "Command pattern packages actions into executable objects supporting queuing, logging, and undo/redo."
            },
            {
                "id": "se_21",
                "question": "What does Interface Segregation Principle (ISP) state?",
                "options": [
                    "Clients should not be forced to depend on methods they do not use",
                    "Never create interfaces",
                    "Interfaces must have at least 10 methods",
                    "All methods must be public static"
                ],
                "correct": 0,
                "explanation": "ISP promotes splitting large monolithic interfaces into smaller, specific role-based interfaces."
            },
            {
                "id": "se_22",
                "question": "What is Dependency Inversion Principle (DIP)?",
                "options": [
                    "High-level modules should not depend on low-level modules; both should depend on abstractions",
                    "Dependencies must be reversed alphabetically",
                    "Modules should create their own concrete dependencies",
                    "Use global variables"
                ],
                "correct": 0,
                "explanation": "DIP decouples modules by relying on abstractions (interfaces) rather than concrete implementations."
            },
            {
                "id": "se_23",
                "question": "Which architectural pattern organizes code into Model, View, and Controller components?",
                "options": [
                    "MVC Pattern",
                    "Blackboard Pattern",
                    "Peer-to-Peer",
                    "Pipe and Filter"
                ],
                "correct": 0,
                "explanation": "MVC isolates application data (Model), presentation (View), and user input handling (Controller)."
            },
            {
                "id": "se_24",
                "question": "What is Code Smells in refactoring terminology?",
                "options": [
                    "Syntax errors that prevent compilation",
                    "Surface indicators in code that usually correspond to deeper design problems",
                    "Missing semicolons",
                    "Deprecated libraries"
                ],
                "correct": 1,
                "explanation": "Code smells (e.g. Long Method, Feature Envy, Duplicate Code) indicate architectural weaknesses."
            },
            {
                "id": "se_25",
                "question": "What does Mocking do in Unit Testing?",
                "options": [
                    "Simulates behavior of external dependencies (e.g. API/Database) in controlled manner",
                    "Taunts other developers",
                    "Disables test runners",
                    "Executes integration tests"
                ],
                "correct": 0,
                "explanation": "Mocks replace slow or non-deterministic dependencies with test doubles for isolated verification."
            },
            {
                "id": "se_26",
                "question": "Which pattern provides a unified simplified interface to a complex library or subsystem?",
                "options": [
                    "Facade Pattern",
                    "Flyweight Pattern",
                    "Proxy Pattern",
                    "Bridge Pattern"
                ],
                "correct": 0,
                "explanation": "Facade pattern hides internal complexity behind clean, easy-to-use high-level methods."
            },
            {
                "id": "se_27",
                "question": "What is technical debt in software development?",
                "options": [
                    "Monetary cost of server hosting",
                    "Future cost of rework caused by choosing an easy, fast solution now instead of better approach",
                    "Unpaid software licenses",
                    "Salary of contractors"
                ],
                "correct": 1,
                "explanation": "Technical debt accumulates when taking shortcuts that require refactoring interest later."
            },
            {
                "id": "se_28",
                "question": "In Kanban methodology, what is a WIP (Work In Progress) limit?",
                "options": [
                    "Constraint on number of active work items in a stage to prevent bottlenecks",
                    "Minimum lines of code",
                    "Team size limit",
                    "Maximum bug count"
                ],
                "correct": 0,
                "explanation": "WIP limits enhance flow by stopping developers from context-switching across too many tasks."
            },
            {
                "id": "se_29",
                "question": "Which testing technique tests application inputs at boundary edges (e.g. 0, min, max)?",
                "options": [
                    "Boundary Value Analysis (BVA)",
                    "Stress Testing",
                    "Usability Testing",
                    "Alpha Testing"
                ],
                "correct": 0,
                "explanation": "BVA targets values on and around input domain boundaries where bugs frequently occur."
            },
            {
                "id": "se_30",
                "question": "What is semantic versioning (SemVer) format 'MAJOR.MINOR.PATCH'?",
                "options": [
                    "Breaking changes . New backward-compatible features . Backward-compatible bug fixes",
                    "Year . Month . Day",
                    "Files . Lines . Characters",
                    "Random build numbers"
                ],
                "correct": 0,
                "explanation": "SemVer increments MAJOR for breaking changes, MINOR for features, and PATCH for bug fixes."
            },
            {
                "id": "se_31",
                "question": "Which pattern enables selecting an algorithm's implementation at runtime?",
                "options": [
                    "Strategy Pattern",
                    "Template Method",
                    "State Pattern",
                    "Chain of Responsibility"
                ],
                "correct": 0,
                "explanation": "Strategy pattern defines family of interchangeable algorithms conforming to common interface."
            },
            {
                "id": "se_32",
                "question": "What is mutation testing?",
                "options": [
                    "Intentionally introducing small errors (mutants) into source code to check if test suite catches them",
                    "Testing DNA sequencing apps",
                    "Randomizing UI clicks",
                    "Compiling on different platforms"
                ],
                "correct": 0,
                "explanation": "Mutation testing measures test suite efficacy by verifying whether tests fail when bugs are injected."
            }
        ]
    },
    {
        "id": "quiz_python",
        "subject": "Python Programming",
        "title": "Python Programming & Systems",
        "description": "Data Structures, OOP, Generators, Decorators, GIL, Memory Management & Pythonic Idioms.",
        "questions": [
            {
                "id": "py_1",
                "question": "What is the Global Interpreter Lock (GIL) in standard CPython?",
                "options": [
                    "A mutex that allows only one thread to execute Python bytecode at a time",
                    "A compiler optimization",
                    "A security firewall",
                    "A package manager lock"
                ],
                "correct": 0,
                "explanation": "The GIL prevents multi-core CPU parallelism for Python bytecodes within a single CPython process."
            },
            {
                "id": "py_2",
                "question": "Which keyword transforms a standard Python function into a Generator?",
                "options": [
                    "return",
                    "yield",
                    "generate",
                    "async"
                ],
                "correct": 1,
                "explanation": "Functions containing the yield keyword produce generator iterators lazily evaluated on demand."
            },
            {
                "id": "py_3",
                "question": "What is the time complexity of dictionary key lookup in Python on average?",
                "options": [
                    "O(1)",
                    "O(log N)",
                    "O(N)",
                    "O(N log N)"
                ],
                "correct": 0,
                "explanation": "Python dictionaries are implemented with sparse hash tables, achieving O(1) average lookup."
            },
            {
                "id": "py_4",
                "question": "What is the output of 'bool([])' and 'bool([0])' in Python?",
                "options": [
                    "False, True",
                    "False, False",
                    "True, True",
                    "True, False"
                ],
                "correct": 0,
                "explanation": "An empty container [] evaluates to False (falsy); a non-empty list [0] evaluates to True (truthy)."
            },
            {
                "id": "py_5",
                "question": "Which of the following built-in data types is immutable in Python?",
                "options": [
                    "List",
                    "Dictionary",
                    "Set",
                    "Tuple"
                ],
                "correct": 3,
                "explanation": "Tuples, strings, integers, and frozensets are immutable; their values cannot change after creation."
            },
            {
                "id": "py_6",
                "question": "What does the '@functools.wraps(fn)' decorator do when creating custom decorators?",
                "options": [
                    "Preserves original function name, docstring, and metadata",
                    "Makes function run faster",
                    "Converts function to async",
                    "Allows multi-threading"
                ],
                "correct": 0,
                "explanation": "functools.wraps copies __name__, __doc__, and module attributes from wrapped function to wrapper."
            },
            {
                "id": "py_7",
                "question": "What is the purpose of '__init__.py' files in Python directories?",
                "options": [
                    "Marks directory as a regular Python package for module imports",
                    "Executes unit tests",
                    "Stores compiled byte code",
                    "Configures virtual environments"
                ],
                "correct": 0,
                "explanation": "__init__.py initializes packages and exposes package-level APIs upon import."
            },
            {
                "id": "py_8",
                "question": "What does list comprehension '[x**2 for x in range(5) if x % 2 == 0]' produce?",
                "options": [
                    "[0, 4, 16]",
                    "[1, 9]",
                    "[0, 1, 4, 9, 16]",
                    "[4, 16]"
                ],
                "correct": 0,
                "explanation": "range(5) gives 0, 1, 2, 3, 4. Even numbers are 0, 2, 4. Squaring them yields [0, 4, 16]."
            },
            {
                "id": "py_9",
                "question": "How does Python handle memory management and cleanup of unused objects?",
                "options": [
                    "Reference counting combined with a generational cyclic garbage collector",
                    "Manual malloc and free",
                    "Stack allocation only",
                    "No garbage collection"
                ],
                "correct": 0,
                "explanation": "CPython deallocates immediately when reference count drops to 0 and uses cyclic GC for circular references."
            },
            {
                "id": "py_10",
                "question": "What is the difference between '==' and 'is' in Python?",
                "options": [
                    "'==' checks equality of values; 'is' checks identity of memory addresses",
                    "'==' checks memory; 'is' checks value",
                    "They are completely identical",
                    "'is' only works for strings"
                ],
                "correct": 0,
                "explanation": "== calls __eq__() for equality; is evaluates id(a) == id(b) for object memory identity."
            },
            {
                "id": "py_11",
                "question": "What does '__slots__' attribute do when defined in a Python class?",
                "options": [
                    "Prevents creation of dynamic __dict__, reducing instance memory footprint",
                    "Limits number of class instances",
                    "Makes methods private",
                    "Disables inheritance"
                ],
                "correct": 0,
                "explanation": "__slots__ allocates a static array of attributes per instance, saving significant RAM."
            },
            {
                "id": "py_12",
                "question": "Which module in the Python standard library provides true multi-core CPU parallelism?",
                "options": [
                    "threading",
                    "multiprocessing",
                    "asyncio",
                    "socket"
                ],
                "correct": 1,
                "explanation": "multiprocessing spawns separate OS processes, each with its own Python interpreter and GIL."
            },
            {
                "id": "py_13",
                "question": "What is the output of 'type(lambda x: x)' in Python?",
                "options": [
                    "<class 'function'>",
                    "<class 'lambda'>",
                    "<class 'anonymous'>",
                    "<class 'method'>"
                ],
                "correct": 0,
                "explanation": "Lambda functions are instances of standard built-in function class."
            },
            {
                "id": "py_14",
                "question": "What happens when you pass a mutable default argument like 'def func(a, lst=[])'?",
                "options": [
                    "lst is created once at function definition time and shared across all subsequent invocations",
                    "A fresh list is created on every call",
                    "Python throws SyntaxError",
                    "lst is garbage collected after return"
                ],
                "correct": 0,
                "explanation": "Default parameter expressions evaluate once at def time, making mutable defaults a common pitfall."
            },
            {
                "id": "py_15",
                "question": "Which magic dunder method allows an object to be used inside a 'with' context manager statement?",
                "options": [
                    "__enter__ and __exit__",
                    "__open__ and __close__",
                    "__start__ and __stop__",
                    "__init__ and __del__"
                ],
                "correct": 0,
                "explanation": "Context managers implement __enter__() and __exit__() for setup and cleanup."
            },
            {
                "id": "py_16",
                "question": "What is the result of '\"abc\"[:: -1]'?",
                "options": [
                    "'cba'",
                    "'abc'",
                    "'b'",
                    "IndexError"
                ],
                "correct": 0,
                "explanation": "Slice step -1 reverses sequences in Python."
            },
            {
                "id": "py_17",
                "question": "What does the 'zip()' built-in function do?",
                "options": [
                    "Compresses files to .zip archive",
                    "Iterates over multiple iterables simultaneously, pairing corresponding elements in tuples",
                    "Sorts two lists together",
                    "Combines dictionaries"
                ],
                "correct": 1,
                "explanation": "zip(*iterables) yields tuples aggregating elements from each argument."
            },
            {
                "id": "py_18",
                "question": "What exception is raised when next() is called on an exhausted generator iterator?",
                "options": [
                    "StopIteration",
                    "GeneratorExit",
                    "IndexError",
                    "EOFError"
                ],
                "correct": 0,
                "explanation": "The iterator protocol signals completion by raising StopIteration."
            },
            {
                "id": "py_19",
                "question": "What is Method Resolution Order (MRO) in Python multiple inheritance?",
                "options": [
                    "C3 Superconcurrency Linearization Algorithm",
                    "Depth-First Left-to-Right exclusively",
                    "Random selection",
                    "Alphabetical order"
                ],
                "correct": 0,
                "explanation": "Python uses C3 Linearization to determine method resolution order across complex inheritance hierarchies."
            },
            {
                "id": "py_20",
                "question": "What is the output of '5 // 2' versus '5 / 2' in Python 3?",
                "options": [
                    "2 and 2.5",
                    "2.5 and 2",
                    "2 and 2",
                    "2.5 and 2.5"
                ],
                "correct": 0,
                "explanation": "// performs floor division returning int 2; / performs true float division returning 2.5."
            },
            {
                "id": "py_21",
                "question": "Which module provides high-performance container alternatives like deque, defaultdict, and Counter?",
                "options": [
                    "collections",
                    "itertools",
                    "functools",
                    "structures"
                ],
                "correct": 0,
                "explanation": "The collections module offers specialized datatypes extending built-in dict, list, and tuple."
            },
            {
                "id": "py_22",
                "question": "What is the purpose of 'copy.deepcopy()' compared to 'copy.copy()'?",
                "options": [
                    "Deepcopy recursively copies all nested objects; copy creates shallow reference clones",
                    "Deepcopy is faster",
                    "Copy cannot clone lists",
                    "Deepcopy converts to string"
                ],
                "correct": 0,
                "explanation": "deepcopy creates independent copies of all objects and children found in original."
            },
            {
                "id": "py_23",
                "question": "In asyncio, which keyword declares a coroutine function in Python 3.5+?",
                "options": [
                    "async def",
                    "yield from",
                    "coroutine def",
                    "task"
                ],
                "correct": 0,
                "explanation": "async def declares asynchronous coroutines awaited using await."
            },
            {
                "id": "py_24",
                "question": "What does the 'pass' statement do in Python?",
                "options": [
                    "A null statement that does nothing, used as placeholder where code is syntactically required",
                    "Exits current loop",
                    "Skips exception handling",
                    "Passes return value to parent"
                ],
                "correct": 0,
                "explanation": "pass serves as a syntactic no-op placeholder."
            },
            {
                "id": "py_25",
                "question": "What is the purpose of 'super()' in class method overriding?",
                "options": [
                    "Delegates method calls to parent class dynamically via MRO",
                    "Makes class immutable",
                    "Initializes global variables",
                    "Creates singleton"
                ],
                "correct": 0,
                "explanation": "super() proxies access to next method in the class's MRO hierarchy."
            },
            {
                "id": "py_26",
                "question": "Which built-in function returns an enumerated iterator of (index, item) tuples?",
                "options": [
                    "enumerate()",
                    "iterator()",
                    "counter()",
                    "indexof()"
                ],
                "correct": 0,
                "explanation": "enumerate(iterable, start=0) yields (0, item[0]), (1, item[1]), etc."
            },
            {
                "id": "py_27",
                "question": "What happens when accessing a missing key in a 'defaultdict(int)'?",
                "options": [
                    "KeyError is raised",
                    "The key is automatically created with default value 0",
                    "Returns None",
                    "Application crashes"
                ],
                "correct": 1,
                "explanation": "defaultdict invokes the factory callable (int() -> 0) when a key is absent."
            },
            {
                "id": "py_28",
                "question": "What is the output of 'set([1, 2, 2, 3, 1])'?",
                "options": [
                    "{1, 2, 3}",
                    "[1, 2, 3]",
                    "{1: 2, 2: 1}",
                    "{1, 2, 2, 3, 1}"
                ],
                "correct": 0,
                "explanation": "Sets store unique unordered elements, automatically deduplicating duplicate entries."
            },
            {
                "id": "py_29",
                "question": "What does the '__str__' vs '__repr__' convention dictate?",
                "options": [
                    "__str__ is user-friendly; __repr__ is unambiguous and developer-oriented for debugging",
                    "__str__ is for numbers; __repr__ is for text",
                    "They must return identical strings",
                    "__str__ cannot be overridden"
                ],
                "correct": 0,
                "explanation": "__repr__ aims for precision (ideally valid Python expression to recreate object); __str__ is readable for users."
            },
            {
                "id": "py_30",
                "question": "What is the time complexity to insert an element at index 0 of a standard Python list?",
                "options": [
                    "O(N)",
                    "O(1)",
                    "O(log N)",
                    "O(N^2)"
                ],
                "correct": 0,
                "explanation": "Python lists are contiguous arrays; inserting at index 0 shifts all existing N items right by one position."
            },
            {
                "id": "py_31",
                "question": "Which container provides O(1) appends and pops from BOTH ends?",
                "options": [
                    "collections.deque",
                    "list",
                    "array",
                    "set"
                ],
                "correct": 0,
                "explanation": "collections.deque is implemented as doubly linked blocks allowing O(1) head and tail operations."
            },
            {
                "id": "py_32",
                "question": "What does the 'any()' function return for an empty list 'any([])'?",
                "options": [
                    "False",
                    "True",
                    "None",
                    "ValueError"
                ],
                "correct": 0,
                "explanation": "any() returns True if at least one element is truthy. An empty iterable has zero truthy elements, so it returns False."
            }
        ]
    },
    {
        "id": "quiz_math",
        "subject": "Mathematics",
        "title": "Discrete Mathematics & Foundations",
        "description": "Logic, Set Theory, Combinatorics, Graph Theory, Number Theory, Linear Algebra & Probability.",
        "questions": [
            {
                "id": "m_1",
                "question": "What is the negation of the proposition 'All students passed the exam'?",
                "options": [
                    "No students passed the exam",
                    "At least one student did not pass the exam",
                    "All students failed the exam",
                    "Only some students passed the exam"
                ],
                "correct": 1,
                "explanation": "The negation of universal quantification (∀x P(x)) is existential quantification of the negation (∃x ¬P(x))."
            },
            {
                "id": "m_2",
                "question": "What is the cardinality of the power set of a set S with N elements?",
                "options": [
                    "2^N",
                    "N^2",
                    "N!",
                    "2N"
                ],
                "correct": 0,
                "explanation": "Each element has 2 choices (included or excluded), giving 2^N total subsets."
            },
            {
                "id": "m_3",
                "question": "According to Pigeonhole Principle, if 13 pigeons are put into 12 pigeonholes, at least one pigeonhole must contain at least how many pigeons?",
                "options": [
                    "1",
                    "2",
                    "3",
                    "13"
                ],
                "correct": 1,
                "explanation": "ceil(13 / 12) = 2. At least one hole must hold 2 or more pigeons."
            },
            {
                "id": "m_4",
                "question": "What is the modular arithmetic value of (17 mod 5)?",
                "options": [
                    "2",
                    "3",
                    "1",
                    "4"
                ],
                "correct": 0,
                "explanation": "17 = 5 * 3 + 2, so the remainder is 2."
            },
            {
                "id": "m_5",
                "question": "How many distinct permutations can be formed from the letters in the word 'LEVEL'?",
                "options": [
                    "120",
                    "60",
                    "30",
                    "24"
                ],
                "correct": 2,
                "explanation": "Total letters = 5. L appears 2 times, E appears 2 times. Permutations = 5! / (2! * 2!) = 120 / 4 = 30."
            },
            {
                "id": "m_6",
                "question": "A relation R on a set A is an Equivalence Relation if and only if it is:",
                "options": [
                    "Reflexive, Symmetric, and Transitive",
                    "Reflexive, Antisymmetric, and Transitive",
                    "Symmetric and Irreflexive",
                    "Transitive only"
                ],
                "correct": 0,
                "explanation": "An equivalence relation must be Reflexive, Symmetric, and Transitive."
            },
            {
                "id": "m_7",
                "question": "What is the probability of rolling a sum of 7 with two fair 6-sided dice?",
                "options": [
                    "1/6",
                    "1/12",
                    "7/36",
                    "5/36"
                ],
                "correct": 0,
                "explanation": "Combinations totaling 7 are (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes out of 36 = 1/6."
            },
            {
                "id": "m_8",
                "question": "What is the determinant of a 2x2 matrix [[a, b], [c, d]]?",
                "options": [
                    "ad - bc",
                    "ab - cd",
                    "ad + bc",
                    "ac - bd"
                ],
                "correct": 0,
                "explanation": "Determinant of 2x2 matrix is ad - bc."
            },
            {
                "id": "m_9",
                "question": "In graph theory, what is Euler's formula for any connected planar graph with V vertices, E edges, and F faces?",
                "options": [
                    "V - E + F = 2",
                    "V + E + F = 2",
                    "V - E - F = 0",
                    "V + E = F + 1"
                ],
                "correct": 0,
                "explanation": "Euler's planar formula is V - E + F = 2."
            },
            {
                "id": "m_10",
                "question": "By Handshaking Lemma, the sum of degrees of all vertices in any undirected graph is equal to:",
                "options": [
                    "Number of edges (E)",
                    "Twice the number of edges (2E)",
                    "E^2",
                    "Number of vertices (V)"
                ],
                "correct": 1,
                "explanation": "Every edge contributes exactly 1 degree to two endpoints, totaling 2E."
            },
            {
                "id": "m_11",
                "question": "What is the greatest common divisor gcd(48, 18) using the Euclidean Algorithm?",
                "options": [
                    "6",
                    "12",
                    "3",
                    "2"
                ],
                "correct": 0,
                "explanation": "48 mod 18 = 12; 18 mod 12 = 6; 12 mod 6 = 0. Hence gcd is 6."
            },
            {
                "id": "m_12",
                "question": "What is the value of combination C(7, 3)?",
                "options": [
                    "35",
                    "21",
                    "210",
                    "42"
                ],
                "correct": 0,
                "explanation": "7! / (3! * 4!) = (7 * 6 * 5) / (3 * 2 * 1) = 35."
            },
            {
                "id": "m_13",
                "question": "If A and B are independent events with P(A) = 0.5 and P(B) = 0.4, what is P(A and B)?",
                "options": [
                    "0.2",
                    "0.9",
                    "0.1",
                    "0.5"
                ],
                "correct": 0,
                "explanation": "For independent events, P(A ∩ B) = P(A) * P(B) = 0.5 * 0.4 = 0.20."
            },
            {
                "id": "m_14",
                "question": "Fermat's Little Theorem states that if p is prime and a is not divisible by p, then a^(p-1) mod p is:",
                "options": [
                    "1",
                    "0",
                    "p - 1",
                    "a"
                ],
                "correct": 0,
                "explanation": "Fermat's Little Theorem states a^(p-1) ≡ 1 (mod p)."
            },
            {
                "id": "m_15",
                "question": "What is the eigenvalues of an identity matrix I of size N x N?",
                "options": [
                    "All are 1",
                    "All are 0",
                    "1 to N",
                    "N"
                ],
                "correct": 0,
                "explanation": "Since I * v = 1 * v, all N eigenvalues of identity matrix equal 1."
            },
            {
                "id": "m_16",
                "question": "In Boolean algebra, what is the dual of the identity 'x + 0 = x'?",
                "options": [
                    "x * 1 = x",
                    "x * 0 = 0",
                    "x + 1 = 1",
                    "x' = x"
                ],
                "correct": 0,
                "explanation": "Duality interchanges + with * and 0 with 1, yielding x * 1 = x."
            },
            {
                "id": "m_17",
                "question": "What is a simple graph with N vertices where every pair of distinct vertices is connected by an edge called?",
                "options": [
                    "Complete Graph (K_n)",
                    "Bipartite Graph",
                    "Tree",
                    "Planar Graph"
                ],
                "correct": 0,
                "explanation": "A complete graph K_n has every possible edge, containing N*(N-1)/2 total edges."
            },
            {
                "id": "m_18",
                "question": "How many edges does a complete bipartite graph K_{3, 4} have?",
                "options": [
                    "12",
                    "7",
                    "14",
                    "24"
                ],
                "correct": 0,
                "explanation": "Edges in K_{m, n} = m * n. Here 3 * 4 = 12 edges."
            },
            {
                "id": "m_19",
                "question": "What is Bayes' Theorem formula for P(A|B)?",
                "options": [
                    "[P(B|A) * P(A)] / P(B)",
                    "[P(A|B) * P(B)] / P(A)",
                    "P(A) * P(B)",
                    "P(A) + P(B)"
                ],
                "correct": 0,
                "explanation": "Bayes' Theorem: P(A|B) = [P(B|A) * P(A)] / P(B)."
            },
            {
                "id": "m_20",
                "question": "A relation R on set A that is Reflexive, Antisymmetric, and Transitive is a:",
                "options": [
                    "Partial Order (Poset)",
                    "Equivalence Relation",
                    "Function",
                    "Total Lattice"
                ],
                "correct": 0,
                "explanation": "A partial order requires reflexivity, antisymmetry, and transitivity."
            },
            {
                "id": "m_21",
                "question": "What is the chromatic number of any bipartite graph containing at least one edge?",
                "options": [
                    "2",
                    "1",
                    "3",
                    "Depends on number of vertices"
                ],
                "correct": 0,
                "explanation": "Every bipartite graph can be colored with exactly 2 colors."
            },
            {
                "id": "m_22",
                "question": "What is the trace of a square matrix?",
                "options": [
                    "Sum of elements on the main diagonal",
                    "Product of main diagonal",
                    "Determinant",
                    "Rank of matrix"
                ],
                "correct": 0,
                "explanation": "Trace is defined as the sum of diagonal elements: Tr(A) = sum(a_ii)."
            },
            {
                "id": "m_23",
                "question": "According to De Morgan's Laws, what is ¬(P ∧ Q) equivalent to?",
                "options": [
                    "¬P ∨ ¬Q",
                    "¬P ∧ ¬Q",
                    "P ∨ Q",
                    "¬P → Q"
                ],
                "correct": 0,
                "explanation": "The negation of conjunction is disjunction of negations: ¬(P ∧ Q) ≡ ¬P ∨ ¬Q."
            },
            {
                "id": "m_24",
                "question": "What is the sum of the first N positive integers: 1 + 2 + ... + N?",
                "options": [
                    "N * (N + 1) / 2",
                    "N^2",
                    "N * (N - 1) / 2",
                    "(N + 1)^2 / 2"
                ],
                "correct": 0,
                "explanation": "Gauss formula: sum = N * (N + 1) / 2."
            },
            {
                "id": "m_25",
                "question": "A matrix A is orthogonal if:",
                "options": [
                    "A^T * A = I (transpose equals inverse)",
                    "det(A) = 0",
                    "A = A^T",
                    "Trace(A) = 0"
                ],
                "correct": 0,
                "explanation": "An orthogonal matrix satisfies A^T = A^(-1), so A^T * A = I."
            },
            {
                "id": "m_26",
                "question": "What is the value of 0! (zero factorial)?",
                "options": [
                    "1",
                    "0",
                    "Undefined",
                    "-1"
                ],
                "correct": 0,
                "explanation": "By mathematical definition and empty product convention, 0! = 1."
            },
            {
                "id": "m_27",
                "question": "What is the rank of a matrix?",
                "options": [
                    "Maximum number of linearly independent rows or columns",
                    "Number of rows plus columns",
                    "The largest element",
                    "The determinant squared"
                ],
                "correct": 0,
                "explanation": "Rank represents dimension of vector space spanned by columns or rows."
            },
            {
                "id": "m_28",
                "question": "How many binary relations can be defined on a set with N elements?",
                "options": [
                    "2^(N^2)",
                    "2^N",
                    "N^2",
                    "N!"
                ],
                "correct": 0,
                "explanation": "Cartesian product A x A has N^2 pairs. The power set has 2^(N^2) relations."
            },
            {
                "id": "m_29",
                "question": "If a graph has an Eulerian circuit, what must be true about the degree of every vertex?",
                "options": [
                    "Every vertex must have even degree",
                    "Every vertex must have odd degree",
                    "At most two vertices have odd degree",
                    "All vertices have degree >= 3"
                ],
                "correct": 0,
                "explanation": "Euler's theorem states a connected graph has an Eulerian circuit iff every vertex has even degree."
            },
            {
                "id": "m_30",
                "question": "What is the expected value of rolling a fair 6-sided die?",
                "options": [
                    "3.5",
                    "3.0",
                    "4.0",
                    "3.6"
                ],
                "correct": 0,
                "explanation": "E[X] = (1 + 2 + 3 + 4 + 5 + 6) / 6 = 21 / 6 = 3.5."
            },
            {
                "id": "m_31",
                "question": "Which proof technique assumes the statement to be false and derives a logical contradiction?",
                "options": [
                    "Proof by Contradiction (Reductio ad absurdum)",
                    "Direct Proof",
                    "Mathematical Induction",
                    "Proof by Construction"
                ],
                "correct": 0,
                "explanation": "Proof by contradiction assumes ¬P and proves it leads to a falsehood (Q ∧ ¬Q)."
            },
            {
                "id": "m_32",
                "question": "Two non-zero vectors u and v are orthogonal if and only if their dot product u · v is:",
                "options": [
                    "0",
                    "1",
                    "-1",
                    "Equal to their magnitudes"
                ],
                "correct": 0,
                "explanation": "u · v = |u||v| cos(90°) = 0."
            }
        ]
    }
],

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

  // GPA / Course Records
  gpaRecords: {
    scale: "4.0", // or "10.0"
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

  // Achievements / Badges
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

  // System Notifications / Reminders
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

// Make globally available on window in browsers
if (typeof window !== 'undefined') {
  window.STUDYMATE_MOCK_DATA = STUDYMATE_MOCK_DATA;
}

// Export for Node.js test environment if available
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { STUDYMATE_MOCK_DATA };
}

