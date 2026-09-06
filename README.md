# StudyMate - Modern Student Study Management Platform

> **Plan Your Studies. Track Your Progress. Achieve Your Goals.**

StudyMate is a modern, student-first productivity platform built with **HTML5, CSS3, and vanilla JavaScript**. It replaces scattered sticky notes, messy bookmark bars, and disconnected calendar apps with a unified academic management system.

---

## 🚀 Key Modules & Capabilities

1. **SaaS Landing Page (`index.html`)**:
   - Modern hero section with glassmorphism mockup preview.
   - Bento-style feature grid, benefits breakdown, student feedback testimonials, and interactive FAQ accordion.
2. **Student Authentication & Onboarding (`login.html`, `register.html`)**:
   - Student session management with password toggles.
   - **One-Click Demo Account**: Instant login as "Payal Deshmukh" with preloaded realistic computer science academic seed data.
3. **Central Dashboard (`dashboard.html`)**:
   - Dynamic time-of-day greeting, study streak counter, and current date.
   - Key KPIs: Total Tasks, Completed Tasks, Study Hours, Active Goals, CGPA, and Task Completion Rate.
   - Weekly Study Hours Bar Chart (Chart.js) and Subject Breakdown Doughnut Chart.
   - Upcoming Assignments list with overdue warnings and one-click completion.
   - Today's Timetable session widget and quick action modals.
4. **Notes & Summaries Manager (`notes.html`)**:
   - Create, edit, delete, pin, favorite, and tag lecture notes.
   - Color accent badges, real-time search, and filter by subject/status.
5. **Tasks & Assignments Tracker (`tasks.html`)**:
   - High, Medium, and Low priority indicators.
   - Automatic overdue task detection comparing due date against current timestamp.
   - Filter by status (All, Pending, Completed, Overdue), subject, and category (Assignment, Lab Report, Project, etc.).
   - Sorting by Due Date (soonest first) or Priority.
6. **Study Timetable & Planner (`planner.html`)**:
   - Weekly and Daily interactive timetable views.
   - Schedule sessions with subject, time slot, topic activity, and priority.
   - One-click completion marking that automatically accumulates study hours!
7. **Academic Study Materials (`materials.html`)**:
   - Organize textbooks, lecture slides, lab manuals, PDFs, and video courses by subject.
   - Simulated download and external resource viewer.
8. **Curated Learning Resources (`resources.html`)**:
   - Directory covering Python, JavaScript, Java, Data Structures & Algorithms, Machine Learning & AI, DBMS, Operating Systems, and Computer Networks.
   - Filter by subject and difficulty (Beginner, Intermediate, Advanced) + custom bookmark creator.
9. **Academic Goals & Milestones (`goals.html`)**:
   - Short-term and long-term goal tracking with target dates.
   - Interactive milestone checklist that auto-calculates completion percentage and marks goals 100% complete.
10. **Productivity & Analytics (`progress.html`)**:
    - Weekly study hours bar chart, subject doughnut chart, 30-day task completion trend line chart, and quiz accuracy chart.
    - Dynamic productivity index score out of 100 based on streaks, task rate, and quiz performance.
11. **Pomodoro Focus Timer (`timer.html`)**:
    - Customizable Focus (25m), Short Break (5m), and Long Break (15m) intervals.
    - SVG circular countdown ring, browser tab time indicator, Web Audio API chime, and automatic session logger.
12. **Revision Quizzes (`quiz.html`)**:
    - Subject-based MCQ quiz test engine with **30+ questions per subject** across 7 core disciplines: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Software Engineering, Python Programming, and Mathematics.
    - Timer, live progress bar, instant grading, circular score breakdown, and in-depth explanations for every answer.
13. **Marks & GPA/CGPA Calculator (`gpa.html`)**:
    - Supports both 4.0 and 10.0 scale grading systems.
    - Dynamic course rows with credit weighting, grade selection, honors classification, and semester archiving.
14. **Student Profile & Achievements (`profile.html`)**:
    - Student bio details, major, university, and academic statistics.
    - 8 Gamified Productivity Badges ("7-Day Streak", "Task Master", "Pomodoro Pro", "Century Club", etc.) calculated dynamically from real activity.
15. **Settings & Data Management (`settings.html`)**:
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
├── index.html                 # Landing / Marketing Page
├── login.html                 # Student Login (Demo Auth & 1-Click Access)
├── register.html              # Student Registration
├── dashboard.html             # Main Student Hub
├── notes.html                 # Smart Notes Manager
├── tasks.html                 # Tasks & Assignments Tracker
├── planner.html               # Timetable & Planner
├── materials.html             # Academic Materials & PDFs Library
├── resources.html             # Curated Learning Resources Directory
├── goals.html                 # Goals & Milestones Tracker
├── progress.html              # Progress Analytics (Chart.js)
├── timer.html                 # Pomodoro Focus Timer
├── quiz.html                  # Revision Quizzes & Test Engine
├── gpa.html                   # Marks & GPA/CGPA Calculator
├── profile.html               # Student Profile & Achievements
├── settings.html              # Settings, Theme, & JSON Backups
├── css/
│   ├── main.css               # Design tokens, variables, typography, modals, toasts, cards
│   ├── landing.css            # SaaS marketing styles, bento grid, hero glow
│   ├── dashboard.css          # Dashboard layout, KPI cards, timeline, widgets
│   ├── modules.css            # Module-specific styles (Timer, Quiz, Timetable, GPA)
│   └── responsive.css         # Breakpoint rules for mobile drawer and tablets
├── js/
│   ├── mock-data.js           # Realistic seed data for engineering/CS students
│   ├── storage.js             # Repository layer & LocalStorage engine (Spring Boot mirror)
│   ├── auth.js                # Auth session state & route guard
│   ├── app.js                 # Global shell: theme switcher, drawer, search modal, toasts
│   ├── dashboard.js           # Dashboard metrics & Chart.js instances
│   ├── notes.js               # Notes CRUD & filters
│   ├── tasks.js               # Tasks CRUD, overdue checks, priorities
│   ├── planner.js             # Timetable schedule & session logging
│   ├── materials.js           # Documents organizer & preview
│   ├── resources.js           # Tech learning directory & bookmarks
│   ├── goals.js               # Milestone checklists & progress bars
│   ├── progress.js            # Advanced Chart.js analytics & productivity index
│   ├── timer.js               # Pomodoro intervals & Web Audio chime
│   ├── quiz.js                # MCQ test engine & answer explanations
│   ├── gpa.js                 # GPA calculator & semester records
│   ├── profile.js             # Profile management & dynamic badge unlocks
│   └── settings.js            # Preferences & JSON import/export
├── assets/
│   └── logo.svg               # Vector brand logo
└── README.md                  # Project documentation & backend guide
```

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup, accessible forms, and dialog overlays.
- **CSS3**: CSS Custom Properties (variables), Flexbox, CSS Grid, animations, and dark/light theme switching.
- **Vanilla JavaScript (ES6+)**: Clean, modular structure using the Repository Pattern with zero dependencies or heavy frameworks.
- **Chart.js (v4 via CDN)**: Used for responsive weekly hours charts, doughnut distribution, and line trends.
- **Font Awesome (v6 via CDN)**: Crisp vector icons.
- **Web Audio API**: Native browser audio synthesis for focus timer completion chimes.
- **LocalStorage**: Client-side storage engine for complete offline persistence.

---

## 💻 How to Run Locally

Because StudyMate is built with pure HTML, CSS, and vanilla JavaScript, **no build tools or compilation steps are required**.

### Option 1: Built-in Node.js Server (Recommended)
Run the lightweight built-in zero-dependency server:
```bash
node server.js
```
Then visit:
- **Landing Page**: `http://localhost:3000/` or `http://localhost:3000/index.html`
- **Dashboard**: `http://localhost:3000/dashboard.html`

### Option 2: Direct File Launch
Simply double click `index.html` or open it directly in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 3: Using VS Code Live Server
1. Open the `study_mate` directory in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right click `index.html` and select **"Open with Live Server"**.

### Option 4: Python HTTP Server
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

---

## 🌐 Deployment (Vercel, GitHub Pages, Netlify)

StudyMate is a **100% pure static web application** (HTML5, CSS3, Vanilla JS). It requires no build step, no npm install, and no compile process.

### Deploying to Vercel
1. Import your GitHub repository into [Vercel](https://vercel.com).
2. Framework Preset: **Other** (leave build command empty, output directory as `./` or root).
3. Click **Deploy**. Vercel will immediately publish the site with zero configuration!

### Deploying to GitHub Pages
1. Go to your repository **Settings** -> **Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `main` / `root`. Click **Save**.

---

## 💾 LocalStorage Data Model & Persistence

All data is structured under specific, namespaced keys in `LocalStorage`:

| Key | Description |
|---|---|
| `studymate_student` | Student bio, college, course, streak, and total study hours |
| `studymate_notes` | Array of notes (id, title, subject, content, tags, pinned, favorite) |
| `studymate_tasks` | Array of tasks (id, title, subject, priority, dueDate, completed) |
| `studymate_schedule` | Timetable sessions (id, day, startTime, endTime, subject, isDone) |
| `studymate_materials` | Study documents, textbooks, and PDF metadata |
| `studymate_resources` | Curated and custom learning bookmarks |
| `studymate_goals` | Goals, target dates, progress percentages, and milestone arrays |
| `studymate_quizzes` | Question banks by subject |
| `studymate_quiz_history`| Past quiz attempts, scores, and accuracy percentages |
| `studymate_gpa` | Current semester courses and saved semester transcript records |
| `studymate_timer_sessions` | Focus sessions history log |
| `studymate_badges` | Productivity badges with unlock states |
| `studymate_theme` | Selected theme (`light` or `dark`) |

You can export a full backup anytime from **Settings -> Export JSON Backup** or restore from a file.

---

## ☕ Future Java Spring Boot + MySQL Backend Migration

StudyMate's JavaScript layer in `js/storage.js` is structured to mirror Spring Boot `@Service` and `@Repository` patterns. To migrate from `LocalStorage` to a live relational database, simply swap the `LocalStorageEngine` calls with `fetch()` requests to your Spring Boot REST controllers.

### Architecture Overview

```
[ Frontend: HTML5 / CSS3 / Vanilla JS (StudyMate) ]
                     │  HTTP / JSON (REST API)
                     ▼
[ Spring Boot 3.x REST Controllers (@RestController) ]
                     │
[ Spring Data JPA Services (@Service) ]
                     │
[ Spring Data Repositories (@Repository) ]
                     │  Hibernate / JDBC
                     ▼
[ MySQL 8.0 Relational Database (studymate_db) ]
```

### Planned REST Endpoints

| Resource | Method | Endpoint | Description |
|---|---|---|---|
| **Auth** | `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT |
| **Auth** | `POST` | `/api/v1/auth/register` | Register new student profile |
| **Notes** | `GET` | `/api/v1/notes` | Retrieve all notes for logged-in user |
| **Notes** | `POST` | `/api/v1/notes` | Create a new note |
| **Notes** | `PUT` | `/api/v1/notes/{id}` | Update note content / pin / favorite |
| **Notes** | `DELETE` | `/api/v1/notes/{id}` | Delete note |
| **Tasks** | `GET` | `/api/v1/tasks` | Get all tasks (filterable by status/priority) |
| **Tasks** | `POST` | `/api/v1/tasks` | Create a new task |
| **Tasks** | `PATCH` | `/api/v1/tasks/{id}/toggle` | Toggle completion status |
| **Schedule**| `GET` | `/api/v1/schedules` | Get weekly timetable sessions |
| **Schedule**| `POST` | `/api/v1/schedules` | Add timetable session |
| **Goals** | `GET` | `/api/v1/goals` | Get all short/long term goals |
| **Goals** | `PATCH` | `/api/v1/goals/{id}/milestone` | Toggle milestone status |
| **Timer** | `POST` | `/api/v1/timer-sessions` | Log completed Pomodoro session |
| **Quizzes** | `POST` | `/api/v1/quizzes/results` | Store quiz attempt score |
| **GPA** | `POST` | `/api/v1/gpa/semesters` | Save semester transcript record |

### Database Schema (MySQL DDL Sample)

```sql
CREATE DATABASE IF NOT EXISTS studymate_db;
USE studymate_db;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    course VARCHAR(150),
    college VARCHAR(150),
    semester VARCHAR(50),
    study_streak INT DEFAULT 1,
    total_study_hours DOUBLE DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    category VARCHAR(50) DEFAULT 'Assignment',
    priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
    due_date DATE NOT NULL,
    due_time TIME,
    completed BOOLEAN DEFAULT FALSE,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    color VARCHAR(20) DEFAULT '#4f46e5',
    content LONGTEXT NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE schedules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    day VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    subject VARCHAR(100) NOT NULL,
    activity VARCHAR(255) NOT NULL,
    priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
    is_done BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 📄 License
This project is licensed under the MIT License — feel free to use and expand it for your academic and portfolio needs!
