/**
 * StudyMate - Comprehensive Academic Study Materials Bank
 * Complete study guides, core theory, key formulas, code snippets, and review questions across all core subjects.
 */

export const STUDY_MATERIALS_BANK = [
  // 1. DATA STRUCTURES & ALGORITHMS
  {
    id: "mat_dsa",
    title: "Data Structures & Algorithms: Complete Engineering Handbook",
    subject: "Data Structures & Algorithms",
    category: "Comprehensive Handbook",
    type: "PDF",
    size: "5.4 MB",
    pages: 48,
    readTime: "50 mins",
    uploadedDate: "2026-09-01",
    author: "Department of Computer Science & Engineering",
    description: "Exhaustive reference covering Asymptotic Complexities, Self-Balancing Trees, Heaps, Graph Algorithms, and Dynamic Programming.",
    chapters: [
      {
        title: "1. Asymptotic Complexity & Master Theorem",
        content: `
### Asymptotic Analysis Fundamentals
- **Big-O Notation (O)**: Upper bound representing worst-case growth rate.
- **Big-Omega (Ω)**: Lower bound representing best-case growth rate.
- **Big-Theta (Θ)**: Tight bound where f(n) is bounded both above and below.

#### Master Theorem for Divide-and-Conquer:
For recurrence relations of the form:
$$T(n) = a T(n/b) + f(n)$$ where $a \\ge 1, b > 1$:
1. If $f(n) = O(n^{\\log_b a - \\epsilon})$, then $T(n) = \\Theta(n^{\\log_b a})$.
2. If $f(n) = \\Theta(n^{\\log_b a} \\log^k n)$, then $T(n) = \\Theta(n^{\\log_b a} \\log^{k+1} n)$.
3. If $f(n) = \\Omega(n^{\\log_b a + \\epsilon})$ and regularity condition holds, then $T(n) = \\Theta(f(n))$.
        `,
        keyFormulas: [
          "MergeSort: T(n) = 2T(n/2) + O(n) -> Θ(n log n)",
          "Binary Search: T(n) = T(n/2) + O(1) -> Θ(log n)",
          "Strassen Matrix: T(n) = 7T(n/2) + O(n^2) -> Θ(n^2.81)"
        ]
      },
      {
        title: "2. Linear Data Structures & Hash Tables",
        content: `
### Arrays, Linked Lists & Amortized Doubling
- **Dynamic Arrays**: Amortized $O(1)$ push back. When capacity doubles, copying $N$ elements takes $O(N)$ once every $N$ insertions, yielding an average cost of $O(1)$.
- **Singly vs Doubly Linked Lists**: Singly lists require $O(1)$ head insertion/deletion, $O(n)$ tail deletion. Doubly linked lists achieve $O(1)$ deletion given node pointer.
- **Hash Tables**:
  - Open Addressing (Linear Probing, Quadratic Probing, Double Hashing)
  - Separate Chaining (Linked Lists or Red-Black Trees per bucket)
  - Load factor $\\alpha = n/m$. When $\\alpha > 0.75$, rehashing doubles table size.
        `,
        keyFormulas: [
          "Hash Lookup: Expected O(1), Worst O(n)",
          "Stack / Queue (Array or Linked): Push O(1), Pop O(1)"
        ]
      },
      {
        title: "3. Trees & Self-Balancing Binary Search Trees",
        content: `
### Binary Search Trees & AVL Trees
- **BST Property**: For every node $X$, all keys in left subtree $< X.key$ and right subtree $> X.key$.
- **In-Order Traversal**: Always yields keys in strictly ascending order.
- **AVL Tree Balance Factor**:
  $$BF(node) = \\text{height}(left) - \\text{height}(right) \\in \\{-1, 0, +1\\}$$
- Four Rotation Cases:
  1. Left-Left (LL) -> Single Right Rotation
  2. Right-Right (RR) -> Single Left Rotation
  3. Left-Right (LR) -> Left rotation on child, Right rotation on root
  4. Right-Left (RL) -> Right rotation on child, Left rotation on root
- Maximum AVL Height: $h < 1.44 \\log_2(n+2)$, strictly guaranteeing $O(\\log n)$ search, insert, and delete operations.
        `,
        keyFormulas: [
          "Complete Tree Height: floor(log2 N)",
          "Max nodes at level L: 2^L",
          "Total nodes in full tree of height H: 2^(H+1) - 1"
        ]
      },
      {
        title: "4. Graph Algorithms & Shortest Paths",
        content: `
### Traversal & Shortest Path Theorems
- **BFS (Breadth-First Search)**: Uses FIFO Queue. Computes unweighted shortest paths in $O(V + E)$.
- **DFS (Depth-First Search)**: Uses LIFO Stack / Recursion. Discovers connected components, topological sorting, and bridges in $O(V + E)$.
- **Dijkstra's Algorithm**:
  - Greedy shortest path for graphs with non-negative edge weights.
  - Priority Queue (Min-Heap) implementation runs in $O((V + E) \\log V)$.
- **Bellman-Ford Algorithm**:
  - Handles negative edge weights and detects negative weight cycles.
  - Relaxes all $|V|-1$ edges in $O(V \\cdot E)$.
- **Floyd-Warshall**:
  - All-Pairs Shortest Path dynamic programming in $O(V^3)$.
        `,
        keyFormulas: [
          "Dijkstra: O((V + E) log V)",
          "Bellman-Ford: O(V * E)",
          "Floyd-Warshall: dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])"
        ]
      },
      {
        title: "5. Dynamic Programming & Greedy Strategies",
        content: `
### Optimal Substructure & Overlapping Subproblems
- **0/1 Knapsack**:
  $$DP[i][w] = \\max(DP[i-1][w], val[i-1] + DP[i-1][w - wt[i-1]])$$
  Time: $O(N \\times W)$, Space: $O(W)$ using 1D rolling array.
- **Longest Common Subsequence (LCS)**:
  $$LCS[i][j] = \\begin{cases} 1 + LCS[i-1][j-1] & \\text{if } X[i] == Y[j] \\\\ \\max(LCS[i-1][j], LCS[i][j-1]) & \\text{otherwise} \\end{cases}$$
        `,
        keyFormulas: [
          "Matrix Chain Multiplication: O(N^3)",
          "Kadane's Maximum Subarray: O(N) time, O(1) space"
        ]
      }
    ]
  },

  // 2. OPERATING SYSTEMS
  {
    id: "mat_os",
    title: "Operating Systems: Core Concepts & Systems Programming",
    subject: "Operating Systems",
    category: "Comprehensive Handbook",
    type: "PDF",
    size: "4.9 MB",
    pages: 44,
    readTime: "45 mins",
    uploadedDate: "2026-08-25",
    author: "Systems & Infrastructure Faculty",
    description: "Complete study textbook covering Kernel architectures, Threads, Semaphores, Deadlock prevention, Paging, and File Systems.",
    chapters: [
      {
        title: "1. OS Architecture & Dual-Mode Operation",
        content: `
### Kernel Architecture & Dual Mode
- **User Mode (Bit 1)** vs **Kernel/Supervisor Mode (Bit 0)**:
  Protects hardware by restricting privileged instructions (direct I/O, timer reset, page table register modification) to kernel mode.
- **System Calls**: Software interrupts that transfer control via the interrupt vector table to pre-defined kernel routines (e.g., \`fork()\`, \`read()\`, \`write()\`, \`mmap()\`).
- **Monolithic Kernels** (Linux) vs **Microkernels** (Mach, QNX):
  Microkernels move file systems, drivers, and networking into user-space servers, communicating via IPC.
        `,
        keyFormulas: [
          "Context Switch Time: PCB save + cache flush + MMU reprogram",
          "CPU Utilization: 1 - p^n (where p = fraction of time waiting for I/O)"
        ]
      },
      {
        title: "2. Processes, Threads, and CPU Scheduling",
        content: `
### Process Control Block (PCB) & Scheduling
- **PCB Components**: PID, Process State, Program Counter, CPU Registers, Memory Limits, Open File Descriptors.
- **Threads**: Lightweight processes sharing Code, Data, and Heap segments, but retaining independent Registers, Program Counter, and Stack.
- **Scheduling Algorithms**:
  - **First-Come, First-Served (FCFS)**: Convoy effect prone.
  - **Shortest Job First (SJF)**: Mathematically optimal minimum average wait time.
  - **Round Robin (RR)**: Time quantum $q$. If $q \\to \\infty$, behaves like FCFS; if $q \\to 0$, context switch overhead dominates.
  - **Multilevel Feedback Queue (MLFQ)**: Dynamically adjusts priorities based on process CPU burst history.
        `,
        keyFormulas: [
          "Turnaround Time = Completion Time - Arrival Time",
          "Waiting Time = Turnaround Time - Burst Time"
        ]
      },
      {
        title: "3. Synchronization, Mutexes & Semaphores",
        content: `
### Critical Section Problem
Requires:
1. **Mutual Exclusion**: At most one process in critical section.
2. **Progress**: Next process chosen only among those requesting entry.
3. **Bounded Waiting**: Finite bound on delays before access is granted.

- **Semaphores**:
  - \`wait(S)\` / \`P(S)\`: \`while (S <= 0); S--;\` (atomic decrement)
  - \`signal(S)\` / \`V(S)\`: \`S++;\` (atomic increment)
- **Classic Concurrency Problems**: Producer-Consumer, Readers-Writers, Dining Philosophers.
        `,
        keyFormulas: [
          "Binary Semaphore (Mutex): Range [0, 1]",
          "Counting Semaphore: Unrestricted integer range"
        ]
      },
      {
        title: "4. Deadlocks & Banker's Algorithm",
        content: `
### The Four Coffman Conditions for Deadlock
Deadlock can occur if and only if ALL four conditions hold simultaneously:
1. **Mutual Exclusion**: Resource held in non-shareable mode.
2. **Hold and Wait**: Process holding resources requests additional ones.
3. **No Preemption**: Resources cannot be forcibly revoked.
4. **Circular Wait**: Set of processes $\{P_0, P_1, \\dots, P_n\}$ where $P_i$ waits for $P_{i+1}$.

- **Banker's Algorithm Safety Test**:
  Computes whether a resource allocation sequence exists such that every process can satisfy its $Need \\le Available$ vector and complete safely.
        `,
        keyFormulas: [
          "Need Matrix = Max - Allocation",
          "Deadlock Avoidance Condition: System remains in Safe State"
        ]
      },
      {
        title: "5. Virtual Memory, Paging & Page Replacement",
        content: `
### Virtual Address Translation & TLB
- **Page Table**: Translates Virtual Page Number (VPN) to Physical Frame Number (PFN).
- **TLB (Translation Lookaside Buffer)**: High-speed hardware associative cache.
  $$\\text{EAT} = \\text{HitRate} \\times (T_{TLB} + T_{MEM}) + (1 - \\text{HitRate}) \\times (T_{TLB} + 2 \\times T_{MEM})$$
- **Page Replacement Policies**:
  - **FIFO**: Subject to Belady's Anomaly (increasing frames increases page faults).
  - **Optimal (OPT / MIN)**: Replace page referenced furthest in future (theoretical baseline).
  - **LRU (Least Recently Used)**: Replaces least recently referenced page. Stack algorithm immune to Belady's Anomaly.
        `,
        keyFormulas: [
          "Effective Access Time (EAT) calculation",
          "Page Fault Rate p: EAT = (1 - p)*ma + p*PageFaultTime"
        ]
      }
    ]
  },

  // 3. DATABASE MANAGEMENT SYSTEMS (DBMS)
  {
    id: "mat_dbms",
    title: "Database Management Systems: Relational Theory & SQL Architecture",
    subject: "DBMS",
    category: "Comprehensive Handbook",
    type: "PDF",
    size: "5.1 MB",
    pages: 40,
    readTime: "40 mins",
    uploadedDate: "2026-08-28",
    author: "Database Systems & Engineering Lab",
    description: "Deep dive into Relational Algebra, Normalization (1NF to BCNF), B+ Tree Indexing, ACID Transactions, and Concurrency Protocols.",
    chapters: [
      {
        title: "1. Relational Model & Relational Algebra",
        content: `
### Mathematical Foundations of Relational Databases
- **Relation (Table)**: Subset of Cartesian product of domains $D_1 \\times D_2 \\times \\dots \\times D_n$.
- **Fundamental Relational Algebra Operators**:
  - **Selection ($\\\\sigma_C$)**: Filters tuples matching condition $C$.
  - **Projection ($\\\\pi_{A1, A2}$)**: Extracts specified attribute columns.
  - **Cartesian Product ($\\\\times$)**: Combines all tuples from two relations.
  - **Set Difference ($-$)** & **Union ($\\\\cup$)**: Requires union compatibility.
  - **Natural Join ($\\\\bowtie$)**: Equi-join on common attributes followed by duplicate column removal.
        `,
        keyFormulas: [
          "Theta Join: R ⋈_θ S = σ_θ(R × S)",
          "Tuple Relational Calculus (TRC) equivalence"
        ]
      },
      {
        title: "2. Functional Dependencies & Normalization (1NF - BCNF)",
        content: `
### Database Normalization Principles
- **1NF**: Atomic attribute values; no repeating groups.
- **2NF**: In 1NF and no non-prime attribute is partially dependent on any candidate key.
- **3NF**: In 2NF and no non-prime attribute is transitively dependent on any candidate key ($X \\to Y$, where $X$ is superkey or $Y$ is prime).
- **Boyce-Codd Normal Form (BCNF)**: For every functional dependency $X \\to Y$, $X$ must be a superkey. Eliminates all redundancy from functional dependencies.
        `,
        keyFormulas: [
          "Armstrong Axioms: Reflexivity, Augmentation, Transitivity",
          "Lossless Join Check: (R1 ∩ R2) -> R1 or (R1 ∩ R2) -> R2"
        ]
      },
      {
        title: "3. Storage Engines & B+ Tree Indexing",
        content: `
### Storage Engine & B+ Tree Structures
- **B+ Tree Properties**:
  - Multi-level, self-balancing balanced search tree.
  - Internal nodes store only search keys and child pointers (no data records).
  - All data pointers and records reside exclusively in **leaf nodes**.
  - Leaf nodes are linked sequentially as a linked list, enabling lightning-fast **range queries** in $O(\\log N + K)$.
  - Maximize fanout to minimize disk block I/O operations.
        `,
        keyFormulas: [
          "B+ Tree Lookup: O(log_B N) where B is block fanout factor",
          "Clustered Index: Physical sort order matches index key"
        ]
      },
      {
        title: "4. Transaction Management & ACID Properties",
        content: `
### The ACID Guarantee
1. **Atomicity**: All operations in a transaction succeed or all rollback (WAL - Write-Ahead Logging).
2. **Consistency**: Database transitions from one valid state to another valid state preserving integrity constraints.
3. **Isolation**: Intermediate states of concurrent transactions are hidden from each other.
4. **Durability**: Committed data persists even across system crashes.

- **Isolation Levels (ANSI SQL)**:
  - Read Uncommitted (Dirty Reads possible)
  - Read Committed (Non-repeatable reads possible)
  - Repeatable Read (Phantom reads possible)
  - Serializable (Strict serializability)
        `,
        keyFormulas: [
          "Two-Phase Locking (2PL): Growing Phase -> Shrinking Phase",
          "Strict 2PL prevents cascading rollbacks"
        ]
      }
    ]
  },

  // 4. COMPUTER NETWORKS
  {
    id: "mat_cn",
    title: "Computer Networks: Protocols, Architecture & Sockets",
    subject: "Computer Networks",
    category: "Comprehensive Handbook",
    type: "PDF",
    size: "4.6 MB",
    pages: 42,
    readTime: "40 mins",
    uploadedDate: "2026-08-22",
    author: "Network Systems Faculty",
    description: "Comprehensive coverage of the 5-layer internet model, TCP 3-way handshake, congestion control, IP subnetting, and routing protocols.",
    chapters: [
      {
        title: "1. The 5-Layer Internet Protocol Stack",
        content: `
### Architectural Overview
1. **Application Layer**: HTTP/HTTPS, DNS, SMTP, FTP, SSH. Protocol Data Unit (PDU): Message.
2. **Transport Layer**: TCP, UDP. End-to-end delivery and port multiplexing. PDU: Segment.
3. **Network Layer**: IP (IPv4, IPv6), ICMP, OSPF, BGP. Host-to-host routing and packet forwarding. PDU: Datagram.
4. **Data Link Layer**: Ethernet, Wi-Fi (802.11), ARP. Hop-to-hop framing and MAC addressing. PDU: Frame.
5. **Physical Layer**: Bits over twisted pair, fiber optics, or radio frequencies.
        `,
        keyFormulas: [
          "Encapsulation: Data -> Segment -> Packet -> Frame -> Bits",
          "Total Delay = Transmission + Propagation + Queuing + Processing"
        ]
      },
      {
        title: "2. Transport Layer: TCP vs UDP & Congestion Control",
        content: `
### Reliable Transport with TCP
- **TCP 3-Way Handshake**:
  1. Client $\\to$ Server: \`SYN (seq = x)\`
  2. Server $\\to$ Client: \`SYN-ACK (seq = y, ack = x + 1)\`
  3. Client $\\to$ Server: \`ACK (seq = x + 1, ack = y + 1)\`
- **TCP Congestion Control Stages**:
  1. **Slow Start**: Congestion Window ($CWND$) doubles every RTT ($2^k$).
  2. **Congestion Avoidance**: Linear increase ($CWND + 1$ per RTT) when $CWND \\ge SSTHRESH$.
  3. **Fast Retransmit & Fast Recovery**: Triggered by 3 duplicate ACKs.
        `,
        keyFormulas: [
          "Bandwidth-Delay Product (BDP) = Bandwidth × RTT",
          "TCP Throughput ≈ (1.22 × MSS) / (RTT × sqrt(LossRate))"
        ]
      },
      {
        title: "3. IP Addressing, Subnetting & CIDR",
        content: `
### IPv4 Subnetting & Supernetting
- Standard IPv4 address: 32 bits divided into Network ID and Host ID.
- **CIDR Notation** (Classless Inter-Domain Routing): \`/24\` has 24 network bits and 8 host bits.
- Assignable hosts formula: $2^{32 - \\text{prefix}} - 2$ (subtracting Network ID and Broadcast Address).
- **Subnet Mask**: Bitwise AND of IP and Subnet Mask extracts the Network Prefix.
        `,
        keyFormulas: [
          "Number of Subnets = 2^(borrowed_bits)",
          "Usable Hosts = 2^h - 2"
        ]
      }
    ]
  },

  // 5. SOFTWARE ENGINEERING
  {
    id: "mat_se",
    title: "Software Engineering: Design Patterns, Architecture & Agile",
    subject: "Software Engineering",
    category: "Comprehensive Handbook",
    type: "PDF",
    size: "4.2 MB",
    pages: 36,
    readTime: "35 mins",
    uploadedDate: "2026-08-30",
    author: "Software Design & Architecture Council",
    description: "Modern software principles: SOLID design principles, GoF Design Patterns, Clean Code, CI/CD pipelines, and microservices.",
    chapters: [
      {
        title: "1. SOLID Principles of Object-Oriented Design",
        content: `
### The 5 Foundations of Maintainable Code
- **S - Single Responsibility Principle (SRP)**: A class should have one, and only one, reason to change.
- **O - Open/Closed Principle (OCP)**: Software entities should be open for extension, but closed for modification.
- **L - Liskov Substitution Principle (LSP)**: Subtypes must be substitutable for their base types without altering program correctness.
- **I - Interface Segregation Principle (ISP)**: Clients should not be forced to depend upon interfaces they do not use.
- **D - Dependency Inversion Principle (DIP)**: High-level modules should not depend on low-level modules; both should depend on abstractions.
        `,
        keyFormulas: [
          "Coupling: Low Coupling is ideal",
          "Cohesion: High Cohesion is ideal"
        ]
      },
      {
        title: "2. Gang of Four (GoF) Design Patterns",
        content: `
### Creational, Structural & Behavioral Patterns
- **Singleton**: Guarantees a class has only one instance and provides a global access point.
- **Factory Method**: Defines an interface for creating an object, but lets subclasses decide which class to instantiate.
- **Observer**: Defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified automatically.
- **Strategy**: Defines a family of algorithms, encapsulates each one, and makes them interchangeable at runtime.
- **Decorator**: Dynamically attaches additional responsibilities to an object without subclassing.
        `
      }
    ]
  },

  // 6. PYTHON PROGRAMMING
  {
    id: "mat_py",
    title: "Python Programming: Advanced Internals, Concurrency & Data Structures",
    subject: "Python Programming",
    category: "Comprehensive Handbook",
    type: "PDF",
    size: "4.7 MB",
    pages: 38,
    readTime: "40 mins",
    uploadedDate: "2026-09-02",
    author: "Python Software Engineering Guild",
    description: "From fundamentals to advanced internals: Decorators, Generators, Context Managers, Global Interpreter Lock (GIL), and AsyncIO.",
    chapters: [
      {
        title: "1. Python Memory Model & The Global Interpreter Lock (GIL)",
        content: `
### Internals & Memory Architecture
- **Everything is an Object**: Every integer, function, and class in CPython is represented as a \`PyObject\` structure with a reference count (\`ob_refcnt\`) and type pointer (\`ob_type\`).
- **Memory Management**:
  - Small object allocator (PyMalloc) for allocations $\\le 512$ bytes.
  - Reference Counting + Generational Garbage Collector for cyclic references (Gen 0, Gen 1, Gen 2).
- **The GIL (Global Interpreter Lock)**:
  - Mutex preventing multiple native OS threads from executing Python bytecode simultaneously.
  - CPU-bound tasks require multiprocessing (\`multiprocessing\` library); I/O-bound tasks thrive on multithreading or \`asyncio\`.
        `
      },
      {
        title: "2. Decorators, Generators, and Iterators",
        content: `
### Metaprogramming & Lazy Evaluation
- **Decorators**: Functions that wrap other functions, enabling aspect-oriented programming (logging, timing, auth guards).
\`\`\`python
def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.perf_counter() - start:.4f}s")
        return result
    return wrapper
\`\`\`
- **Generators**: Functions containing \`yield\`. Maintain internal frame state, computing values lazily in $O(1)$ memory.
        `
      }
    ]
  },

  // 7. MATHEMATICS FOR COMPUTER SCIENCE
  {
    id: "mat_math",
    title: "Mathematics for Computer Science: Discrete Structures & Linear Algebra",
    subject: "Mathematics for CS",
    category: "Comprehensive Handbook",
    type: "PDF",
    size: "5.0 MB",
    pages: 45,
    readTime: "45 mins",
    uploadedDate: "2026-08-18",
    author: "Applied Mathematics & Theoretical CS Group",
    description: "Mathematical rigor for CS: Logic, Set Theory, Combinatorics, Graph Theory, Probability, and Matrix Decompositions for Machine Learning.",
    chapters: [
      {
        title: "1. Propositional Logic & Proof Techniques",
        content: `
### Foundations of Proofs
- **Modus Ponens**: $(P \\land (P \\implies Q)) \\implies Q$.
- **Proof by Contradiction**: To prove $P$, assume $\\neg P$ and deduce a falsehood ($R \\land \\neg R$).
- **Mathematical Induction**:
  1. Base Case: Prove statement for $n = 0$ or $n = 1$.
  2. Inductive Hypothesis: Assume statement holds for $n = k$.
  3. Inductive Step: Prove statement holds for $n = k + 1$.
        `
      },
      {
        title: "2. Combinatorics, Probability & Bayes' Theorem",
        content: `
### Permutations & Combinations
- Permutations of $n$ elements taken $r$ at a time:
  $$P(n, r) = \\frac{n!}{(n - r)!}$$
- Combinations (Binomial Coefficient):
  $$\\binom{n}{r} = \\frac{n!}{r!(n - r)!}$$
- **Bayes' Theorem**:
  $$P(A | B) = \\frac{P(B | A) \\times P(A)}{P(B)}$$
  Fundamental formula underpinning Bayesian spam filtering, Naive Bayes classifiers, and machine learning inference.
        `
      },
      {
        title: "3. Linear Algebra & Eigenvalues for AI",
        content: `
### Vectors, Matrices & Decompositions
- **Matrix Multiplication**: $A_{m \\times k} \\times B_{k \\times n} = C_{m \\times n}$ in $O(m k n)$ naive time.
- **Eigenvalues & Eigenvectors**:
  $$A \\mathbf{v} = \\lambda \\mathbf{v} \\iff (A - \\lambda I)\\mathbf{v} = \\mathbf{0}$$
  Roots of characteristic polynomial $\\det(A - \\lambda I) = 0$.
- **Singular Value Decomposition (SVD)**:
  $$A = U \\Sigma V^T$$
  Core technique for Principal Component Analysis (PCA), dimensionality reduction, and image compression.
        `
      }
    ]
  }
];
