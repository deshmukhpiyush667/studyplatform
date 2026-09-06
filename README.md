# StudyMate - Modern Student Study Management Platform (React.js)

> **Plan Your Studies. Track Your Progress. Achieve Your Goals.**

StudyMate is a modern, student-first productivity platform built with **React 18, React Router v6, Vite, and Chart.js**. It replaces scattered sticky notes, messy bookmark bars, and disconnected calendar apps with a unified academic workspace.

---

## 🚀 Key Modules & Capabilities

1. **SaaS Landing Page (`/`)**:
   - Modern hero section with glassmorphism mockup preview.
   - Bento-style feature grid, benefits breakdown, student feedback testimonials, and interactive FAQ accordion.
2. **Student Authentication & Onboarding (`/login`, `/register`)**:
   - Student session management with password toggles.
   - **One-Click Demo Account**: Instant login as "Payal Deshmukh" with preloaded realistic computer science academic seed data.
3. **Central Dashboard (`/dashboard`)**:
   - Dynamic time-of-day greeting, study streak counter, and current date.
   - Key KPIs: Total Tasks, Completed Tasks, Study Hours, Active Goals, CGPA, and Task Completion Rate.
   - Weekly Study Hours Bar Chart (Chart.js) and Subject Breakdown Doughnut Chart.
   - Upcoming Assignments list with overdue warnings and one-click completion.
   - Today's Timetable session widget and quick action modals.
4. **Notes & Summaries Manager (`/notes`)**:
   - Create, edit, delete, pin, favorite, and tag lecture notes.
   - Color accent badges, real-time search, and filter by subject/status.
5. **Tasks & Assignments Tracker (`/tasks`)**:
   - High, Medium, and Low priority indicators.
   - Automatic overdue task detection comparing due date against current timestamp.
   - Filter by status (All, Pending, Completed, Overdue), subject, and category (Assignment, Lab Report, Project, etc.).
   - Sorting by Due Date (soonest first) or Priority.
6. **Study Timetable & Planner (`/planner`)**:
   - Weekly and Daily interactive timetable views.
   - Schedule sessions with subject, time slot, topic activity, and priority.
   - One-click completion marking that automatically accumulates study hours!
7. **Academic Study Materials (`/materials`)**:
   - Organize textbooks, lecture slides, lab manuals, PDFs, and video courses by subject.
   - Simulated download and external resource viewer.
8. **Curated Learning Resources (`/resources`)**:
   - Directory covering Python, JavaScript, Java, Data Structures & Algorithms, Machine Learning & AI, DBMS, Operating Systems, and Computer Networks.
   - Filter by subject and difficulty (Beginner, Intermediate, Advanced) + custom bookmark creator.
9. **Academic Goals & Milestones (`/goals`)**:
   - Short-term and long-term goal tracking with target dates.
   - Interactive milestone checklist that auto-calculates completion percentage and marks goals 100% complete.
10. **Productivity & Analytics (`/progress`)**:
    - Weekly study hours bar chart, subject doughnut chart, 30-day task completion trend line chart, and quiz accuracy chart.
    - Dynamic productivity index score out of 100 based on streaks, task rate, and quiz performance.
11. **Pomodoro Focus Timer (`/timer`)**:
    - Customizable Focus (25m), Short Break (5m), and Long Break (15m) intervals.
    - SVG circular countdown ring, browser tab time indicator, Web Audio API chime, and automatic session logger.
12. **Revision Quizzes (`/quiz`)**:
    - Subject-based MCQ quiz test engine with **30+ questions per subject** across 7 core disciplines: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Software Engineering, Python Programming, and Mathematics (224 questions total).
    - Live timer, progress bar, instant grading, circular score breakdown, and in-depth explanations for every answer.
13. **Marks & GPA/CGPA Calculator (`/gpa`)**:
    - Supports both 4.0 and 10.0 scale grading systems.
    - Dynamic course rows with credit weighting, grade selection, honors classification, and semester archiving.
14. **Student Profile & Achievements (`/profile`)**:
    - Student bio details, major, university, and academic statistics.
    - 8 Gamified Productivity Badges ("7-Day Streak", "Task Master", "Pomodoro Pro", "Century Club", etc.) calculated dynamically from real activity.
15. **Settings & Data Management (`/settings`)**:
    - Light Mode and Dark Mode theme switcher with persistence.
    - Notification preferences.
    - JSON Data Export and Import backup engine.
    - Reset to Default Demo Data and Clear All Data options.
    - Spring Boot + MySQL backend architecture blueprint.
16. **Global Search (`Ctrl + K`) & Toast Notifications**:
    - Quick search across all notes, tasks, materials, resources, and schedule slots.

---

## 📂 Project Structure

```
study_mate/
├── index.html                 # React entry point with #root and font/icon links
├── package.json               # Dependencies: react, react-dom, react-router-dom, chart.js
├── vite.config.js             # Vite configuration with React plugin
├── vercel.json                # Vercel SPA rewrite rule to prevent 404 on direct URLs
├── public/
│   └── assets/
│       └── logo.svg           # Vector brand logo
├── src/
│   ├── main.jsx               # React DOM bootstrap with BrowserRouter and Context Providers
│   ├── App.jsx                # Route definitions for all 16 pages with AppLayout
│   ├── context/
│   │   ├── ThemeContext.jsx   # Light/dark mode state & persistence
│   │   ├── AuthContext.jsx    # Session management & demo student authentication
│   │   └── StudyContext.jsx   # Global reactive state for tasks, notes, goals, notifications, etc.
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx  # Shared dashboard layout (Sidebar + Topbar + Content Outlet)
│   │   │   ├── Sidebar.jsx    # Collapsible sidebar with active link highlights & badge counters
│   │   │   └── Topbar.jsx     # Header with search trigger, notifications dropdown, theme toggle
│   │   └── common/
│   │       ├── GlobalSearchModal.jsx  # Ctrl+K modal searching notes, tasks, materials, resources
│   │       ├── ToastContainer.jsx     # Floating toast notifications
│   │       └── ConfirmModal.jsx       # Modal dialog for delete / reset confirmations
│   ├── pages/
│   │   ├── LandingPage.jsx    # Marketing landing page with hero mockup, bento grid, FAQ accordion
│   │   ├── LoginPage.jsx      # Student login & 1-click demo login
│   │   ├── RegisterPage.jsx   # Student registration form
│   │   ├── DashboardPage.jsx  # Main hub with KPIs, Chart.js study hours & subject charts, overdue alerts
│   │   ├── NotesPage.jsx      # Smart notes manager (CRUD, color tags, pinning, search/filter)
│   │   ├── TasksPage.jsx      # Tasks & assignments manager (priorities, overdue flags, filtering)
│   │   ├── PlannerPage.jsx    # Weekly & daily study timetable with one-click completion
│   │   ├── MaterialsPage.jsx  # Academic documents & PDFs organizer by subject
│   │   ├── ResourcesPage.jsx  # Curated developer/engineering resources directory & custom bookmarks
│   │   ├── GoalsPage.jsx      # Academic goals & interactive milestone checklist
│   │   ├── ProgressPage.jsx   # Productivity analytics & 4 Chart.js charts + productivity index
│   │   ├── TimerPage.jsx      # Pomodoro focus timer with circular SVG progress & audio chime
│   │   ├── QuizPage.jsx       # 224-question quiz engine across 7 core subjects with timer & review
│   │   ├── GpaPage.jsx        # GPA/CGPA calculator (4.0 & 10.0 scales) with semester archiving
│   │   ├── ProfilePage.jsx    # Student profile & 8 dynamic productivity badges
│   │   └── SettingsPage.jsx   # Theme switcher, notification toggles, JSON backup export/import
│   ├── services/
│   │   ├── mockData.js        # Seed data (Payal Deshmukh profile, tasks, notes, goals, timetable)
│   │   ├── quizBank.js        # 224 questions (32 per subject across 7 core subjects)
│   │   └── storage.js         # LocalStorage repository layer
│   └── styles/
│       ├── main.css           # Design tokens, variables, typography, modals, cards, buttons
│       ├── landing.css        # Landing hero glow, bento grid, showcase cards
│       ├── dashboard.css      # Dashboard grid, widgets, KPIs, timeline
│       ├── modules.css        # Quiz, timer, GPA, timetable custom styles
│       └── responsive.css     # Mobile drawer, media queries, touch responsiveness
```

---

## 🛠️ Technologies Used

- **React 18**: Reusable functional components, Hooks (`useState`, `useEffect`, `useMemo`, `useRef`), and Context API.
- **React Router v6**: Client-side routing with clean URLs and nested layout routes.
- **Vite 6**: Fast development server and optimized production build bundling.
- **Chart.js v4**: Interactive canvas charts for study analytics and KPIs.
- **Font Awesome v6**: Vector iconography.
- **Web Audio API**: Native browser audio synthesis for Pomodoro completion chimes.
- **LocalStorage**: Persistent client-side data storage.

---

## 💻 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🌐 Deployment to Vercel

StudyMate includes a pre-configured `vercel.json` with Single Page Application rewrites:

1. Push your code to your GitHub repository:
   ```bash
   git add -A
   git commit -m "Convert StudyMate to complete React.js application"
   git push origin main
   ```
2. In [Vercel](https://vercel.com):
   - Import your GitHub repository (`studyplatform`).
   - Framework Preset: **Vite** (detected automatically).
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Click **Deploy**. Vercel will build and launch your application. All direct URLs (`/dashboard`, `/quiz`, etc.) will work without 404 errors!

---

## 💾 LocalStorage Persistence

All data is structured under specific, namespaced keys in `LocalStorage`:

| Key | Description |
|---|---|
| `studymate_student` | Student bio, college, course, streak, and study hours |
| `studymate_notes` | Array of smart notes with tags, color accents, and pins |
| `studymate_tasks` | Tasks and assignments with priorities and due dates |
| `studymate_schedule` | Timetable sessions with day, time slot, and completion state |
| `studymate_materials`| Academic documents and textbook metadata |
| `studymate_resources`| Curated tech and computer science bookmarks |
| `studymate_goals` | Goals and interactive milestone checklists |
| `studymate_quizzes` | Question bank with 224 questions across 7 subjects |
| `studymate_quiz_history`| Quiz attempt logs and accuracy records |
| `studymate_gpa` | Course grades and archived semester transcripts |
| `studymate_timer_sessions`| Focus intervals and study session logs |
| `studymate_badges` | 8 dynamic productivity badge unlock states |
| `studymate_theme` | Selected theme (`light` or `dark`) |
| `studymate_auth_user`| Active authentication session (Payal Deshmukh) |

You can export a full backup anytime from **Settings -> Export JSON Backup** or restore from a file.
