/**
 * StudyMate - Marks & GPA/CGPA Calculator Controller
 * Supports 4.0 & 10.0 grading scales, course row manipulation, SGPA/CGPA computation, semester archiving.
 */

document.addEventListener('DOMContentLoaded', () => {
  initGpaModule();
});

let currentScale = '4.0'; // '4.0' or '10.0'
let activeCourses = [];

function initGpaModule() {
  loadInitialCourses();
  setupGpaEventListeners();
  renderCourseRows();
  calculateAndRenderResults();
  renderSavedSemesters();
}

function loadInitialCourses() {
  const gpaData = GpaService.getGpaRecords();
  currentScale = gpaData.scale || '4.0';

  const scaleSelect = document.getElementById('gpa-scale-select');
  if (scaleSelect) scaleSelect.value = currentScale;

  if (gpaData.currentCourses && gpaData.currentCourses.length > 0) {
    activeCourses = JSON.parse(JSON.stringify(gpaData.currentCourses));
  } else {
    activeCourses = [
      { code: "CS401", name: "Distributed Systems", credits: 4, grade: "A", marks: 92 },
      { code: "CS402", name: "Machine Learning", credits: 4, grade: "A-", marks: 88 },
      { code: "CS403", name: "Cloud Computing & DevOps", credits: 3, grade: "A", marks: 95 },
      { code: "CS404", name: "Compiler Design", credits: 4, grade: "B+", marks: 84 },
      { code: "CS405", name: "Information Security", credits: 3, grade: "A", marks: 91 }
    ];
  }
}

function setupGpaEventListeners() {
  const scaleSelect = document.getElementById('gpa-scale-select');
  if (scaleSelect) {
    scaleSelect.addEventListener('change', (e) => {
      currentScale = e.target.value;
      renderCourseRows();
      calculateAndRenderResults();
    });
  }

  const addRowBtn = document.getElementById('add-course-row-btn');
  if (addRowBtn) {
    addRowBtn.addEventListener('click', addCourseRow);
  }

  const saveSemBtn = document.getElementById('save-semester-btn');
  if (saveSemBtn) {
    saveSemBtn.addEventListener('click', saveCurrentSemester);
  }

  const resetBtn = document.getElementById('reset-gpa-table-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetCourseTable);
  }
}

function renderCourseRows() {
  const tbody = document.getElementById('gpa-course-tbody');
  if (!tbody) return;

  const gradeOptions4 = [
    { label: "A+ (4.0)", val: "A+" },
    { label: "A  (4.0)", val: "A" },
    { label: "A- (3.7)", val: "A-" },
    { label: "B+ (3.3)", val: "B+" },
    { label: "B  (3.0)", val: "B" },
    { label: "B- (2.7)", val: "B-" },
    { label: "C+ (2.3)", val: "C+" },
    { label: "C  (2.0)", val: "C" },
    { label: "C- (1.7)", val: "C-" },
    { label: "D  (1.0)", val: "D" },
    { label: "F  (0.0)", val: "F" }
  ];

  const gradeOptions10 = [
    { label: "O  (10.0)", val: "O" },
    { label: "A+ (9.0)", val: "A+" },
    { label: "A  (8.0)", val: "A" },
    { label: "B+ (7.0)", val: "B+" },
    { label: "B  (6.0)", val: "B" },
    { label: "C  (5.0)", val: "C" },
    { label: "P  (4.0)", val: "P" },
    { label: "F  (0.0)", val: "F" }
  ];

  const options = currentScale === '10.0' ? gradeOptions10 : gradeOptions4;

  let html = '';
  activeCourses.forEach((c, idx) => {
    let selectOpts = '';
    options.forEach(o => {
      const isSel = (c.grade || '').toUpperCase() === o.val ? 'selected' : '';
      selectOpts += `<option value="${o.val}" ${isSel}>${o.label}</option>`;
    });

    html += `
      <tr>
        <td>
          <input type="text" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" value="${escapeHtml(c.code || '')}" placeholder="e.g. CS101" onchange="updateCourseField(${idx}, 'code', this.value)">
        </td>
        <td>
          <input type="text" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" value="${escapeHtml(c.name || '')}" placeholder="Course name" onchange="updateCourseField(${idx}, 'name', this.value)">
        </td>
        <td style="width: 90px;">
          <input type="number" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" min="1" max="10" value="${c.credits || 3}" onchange="updateCourseField(${idx}, 'credits', this.value)">
        </td>
        <td style="width: 140px;">
          <select class="form-select" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" onchange="updateCourseField(${idx}, 'grade', this.value)">
            ${selectOpts}
          </select>
        </td>
        <td style="width: 100px;">
          <input type="number" class="form-control" style="padding: 0.4rem 0.6rem; font-size: 0.85rem;" min="0" max="100" value="${c.marks || ''}" placeholder="Marks" onchange="updateCourseField(${idx}, 'marks', this.value)">
        </td>
        <td style="width: 50px; text-align: center;">
          <button class="icon-btn" style="width: 30px; height: 30px; color: var(--danger);" onclick="removeCourseRow(${idx})" title="Remove Course">
            <i class="fas fa-times"></i>
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

window.updateCourseField = function(index, field, value) {
  if (activeCourses[index]) {
    activeCourses[index][field] = value;
    calculateAndRenderResults();
  }
};

window.addCourseRow = function() {
  activeCourses.push({
    code: `CS${400 + activeCourses.length + 1}`,
    name: "Elective Course",
    credits: 3,
    grade: currentScale === '10.0' ? 'A' : 'A',
    marks: 85
  });
  renderCourseRows();
  calculateAndRenderResults();
  StudyMate.toast('Course row added', 'info', 1500);
};

window.removeCourseRow = function(index) {
  if (activeCourses.length <= 1) {
    StudyMate.toast('At least one course is required in the calculator.', 'warning');
    return;
  }
  activeCourses.splice(index, 1);
  renderCourseRows();
  calculateAndRenderResults();
};

window.resetCourseTable = function() {
  StudyMate.confirm({
    title: "Reset Calculator",
    message: "Clear all courses in the current table? You can start over with a fresh sheet.",
    confirmText: "Reset",
    isDanger: false,
    onConfirm: () => {
      activeCourses = [
        { code: "SUBJ1", name: "Core Course 1", credits: 4, grade: "A", marks: 90 },
        { code: "SUBJ2", name: "Core Course 2", credits: 4, grade: "B+", marks: 82 }
      ];
      renderCourseRows();
      calculateAndRenderResults();
      StudyMate.toast('Calculator reset', 'info');
    }
  });
};

function calculateAndRenderResults() {
  const result = GpaService.calculateGpa(activeCourses, currentScale);

  const gpaEl = document.getElementById('calc-gpa-display');
  const maxScaleEl = document.getElementById('calc-max-scale');
  const creditsEl = document.getElementById('calc-total-credits');
  const pctEl = document.getElementById('calc-percentage');
  const classEl = document.getElementById('calc-classification');

  if (gpaEl) gpaEl.textContent = result.gpa.toFixed(2);
  if (maxScaleEl) maxScaleEl.textContent = `/ ${currentScale}`;
  if (creditsEl) creditsEl.textContent = result.totalCredits;
  if (pctEl) pctEl.textContent = `${result.percentage}%`;
  if (classEl) classEl.textContent = result.classification;
}

window.saveCurrentSemester = function() {
  const result = GpaService.calculateGpa(activeCourses, currentScale);
  const semName = prompt("Enter a name for this semester (e.g. Semester 6 - Spring 2026):", `Semester ${new Date().getMonth() > 6 ? 'Fall' : 'Spring'} 2026`);
  if (!semName) return;

  const gpaData = GpaService.getGpaRecords();
  gpaData.scale = currentScale;
  gpaData.currentCourses = activeCourses;

  if (!gpaData.semesters) gpaData.semesters = [];
  gpaData.semesters.unshift({
    semesterName: semName,
    sgpa: result.gpa,
    credits: result.totalCredits,
    courses: activeCourses
  });

  GpaService.saveGpaRecords(gpaData);
  StudyMate.toast('Semester GPA record saved successfully!', 'success');
  renderSavedSemesters();
};

function renderSavedSemesters() {
  const container = document.getElementById('gpa-saved-semesters');
  if (!container) return;

  const gpaData = GpaService.getGpaRecords();
  const semesters = gpaData.semesters || [];

  if (semesters.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.88rem; text-align: center; padding: 1.5rem;">No saved semester records yet. Click "Save This Semester" above to store your transcript history.</p>`;
    return;
  }

  let html = '';
  semesters.forEach((s, idx) => {
    html += `
      <div class="card" style="padding: 1.25rem; margin-bottom: 1rem; border-left: 4px solid var(--primary);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700;">${escapeHtml(s.semesterName)}</h4>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${s.courses ? s.courses.length : 0} courses • ${s.credits} Credits</span>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary);">${s.sgpa.toFixed(2)}</div>
            <span style="font-size: 0.72rem; font-weight: 700; color: var(--text-subtle);">SGPA</span>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  })[m]);
}
