import React, { useState } from 'react';
import { useStudy } from '../context/StudyContext';

const GRADE_POINTS_4_0 = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0
};

const GRADE_POINTS_10_0 = {
  'O (Outstanding)': 10.0,
  'A+ (Excellent)': 9.0,
  'A (Very Good)': 8.0,
  'B+ (Good)': 7.0,
  'B (Above Average)': 6.0,
  'C (Average)': 5.0,
  'P (Pass)': 4.0,
  'F (Fail)': 0.0
};

export default function GpaPage() {
  const { gpaData, saveGpaSemester, deleteGpaSemester } = useStudy();

  const [scale, setScale] = useState('4.0'); // '4.0' or '10.0'
  const [courses, setCourses] = useState([
    { id: 1, name: 'Data Structures & Algorithms', credits: 4, grade: scale === '4.0' ? 'A' : 'A+ (Excellent)' },
    { id: 2, name: 'Operating Systems', credits: 3, grade: scale === '4.0' ? 'A-' : 'A (Very Good)' },
    { id: 3, name: 'Computer Networks', credits: 3, grade: scale === '4.0' ? 'B+' : 'B+ (Good)' },
    { id: 4, name: 'Software Engineering', credits: 3, grade: scale === '4.0' ? 'A' : 'A+ (Excellent)' }
  ]);

  const [semesterName, setSemesterName] = useState('Fall 2026');

  const gradeList = scale === '4.0' ? Object.keys(GRADE_POINTS_4_0) : Object.keys(GRADE_POINTS_10_0);
  const gradePoints = scale === '4.0' ? GRADE_POINTS_4_0 : GRADE_POINTS_10_0;

  // Change scale
  const handleScaleChange = (newScale) => {
    setScale(newScale);
    const newGradeList = newScale === '4.0' ? Object.keys(GRADE_POINTS_4_0) : Object.keys(GRADE_POINTS_10_0);
    setCourses(courses.map(c => ({
      ...c,
      grade: newGradeList[0]
    })));
  };

  // Add course row
  const addCourseRow = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        name: `Course ${courses.length + 1}`,
        credits: 3,
        grade: gradeList[0]
      }
    ]);
  };

  // Remove course row
  const removeCourseRow = (id) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter(c => c.id !== id));
  };

  // Update course row
  const updateCourse = (id, field, val) => {
    setCourses(courses.map(c => {
      if (c.id === id) {
        return { ...c, [field]: val };
      }
      return c;
    }));
  };

  // Calculate GPA
  let totalCredits = 0;
  let totalPoints = 0;

  courses.forEach(c => {
    const cred = parseFloat(c.credits) || 0;
    const pt = gradePoints[c.grade] !== undefined ? gradePoints[c.grade] : 0;
    totalCredits += cred;
    totalPoints += (cred * pt);
  });

  const calculatedGpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  // Honors standing
  const getHonors = (gpaVal, scaleType) => {
    const g = parseFloat(gpaVal);
    if (scaleType === '4.0') {
      if (g >= 3.8) return { label: 'Summa Cum Laude (Highest Honors)', badge: 'badge-success' };
      if (g >= 3.5) return { label: 'Magna Cum Laude (High Honors)', badge: 'badge-primary' };
      if (g >= 3.2) return { label: 'Dean’s Honor List', badge: 'badge-info' };
      if (g >= 2.0) return { label: 'Good Academic Standing', badge: 'badge-secondary' };
      return { label: 'Academic Probation Warning', badge: 'badge-danger' };
    } else {
      if (g >= 9.0) return { label: 'First Class with Distinction', badge: 'badge-success' };
      if (g >= 7.5) return { label: 'First Class Honors', badge: 'badge-primary' };
      if (g >= 6.0) return { label: 'Second Class Honors', badge: 'badge-secondary' };
      return { label: 'Pass Standing', badge: 'badge-warning' };
    }
  };

  const honors = getHonors(calculatedGpa, scale);

  const handleSaveSemester = () => {
    saveGpaSemester({
      semester: semesterName,
      scale,
      gpa: parseFloat(calculatedGpa),
      credits: totalCredits,
      coursesCount: courses.length,
      date: new Date().toISOString()
    });
  };

  return (
    <div className="gpa-page">
      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2>GPA & Academic Performance Calculator</h2>
        <p className="text-muted">Calculate semester GPA, cumulative standing, and honors eligibility across international grading scales</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* GPA Summary Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Calculated Semester GPA
          </span>
          <h1 style={{ fontSize: '4.5rem', margin: '0.5rem 0', color: 'var(--primary)', fontWeight: 800 }}>
            {calculatedGpa}
          </h1>
          <div style={{ marginBottom: '1rem' }}>
            <span className={`badge ${honors.badge}`} style={{ fontSize: '0.85rem', padding: '0.4rem 0.8rem' }}>
              {honors.label}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Total Credits Attempted: <strong>{totalCredits}</strong>
          </p>

          <div style={{ marginTop: '1.5rem', width: '100%', display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Semester Name (e.g. Fall 2026)"
              value={semesterName}
              onChange={e => setSemesterName(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSaveSemester} style={{ whiteSpace: 'nowrap' }}>
              <i className="fas fa-save"></i> Save Record
            </button>
          </div>
        </div>

        {/* Grading Scale Options */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>Grading Configuration</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Select your university’s grading standard. Points automatically recalculate instantly.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <label
              style={{
                flex: 1,
                padding: '1rem',
                border: scale === '4.0' ? '2px solid var(--primary)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: scale === '4.0' ? 'var(--hover-bg)' : 'transparent'
              }}
              onClick={() => handleScaleChange('4.0')}
            >
              <input type="radio" name="scale" checked={scale === '4.0'} onChange={() => {}} style={{ display: 'none' }} />
              <h4 style={{ margin: '0 0 0.25rem 0' }}>4.0 Scale</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>US / Canada / Standard</span>
            </label>

            <label
              style={{
                flex: 1,
                padding: '1rem',
                border: scale === '10.0' ? '2px solid var(--primary)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                textAlign: 'center',
                backgroundColor: scale === '10.0' ? 'var(--hover-bg)' : 'transparent'
              }}
              onClick={() => handleScaleChange('10.0')}
            >
              <input type="radio" name="scale" checked={scale === '10.0'} onChange={() => {}} style={{ display: 'none' }} />
              <h4 style={{ margin: '0 0 0.25rem 0' }}>10.0 Scale</h4>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CGPA / European / Indian</span>
            </label>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <strong>Scale Reference:</strong>
            <ul style={{ paddingLeft: '1.25rem', margin: '0.5rem 0 0 0' }}>
              <li>Honors qualification requires at least 12 graded credit hours.</li>
              <li>Spring Boot backend will sync historical GPA trends seamlessly.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Courses Calculator Table */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Semester Course Grades</h3>
          <button className="btn btn-sm btn-primary" onClick={addCourseRow}>
            <i className="fas fa-plus"></i> Add Course Row
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: '45%' }}>Course Name / Code</th>
                  <th style={{ width: '20%' }}>Credit Hours</th>
                  <th style={{ width: '25%' }}>Grade Obtained</th>
                  <th style={{ width: '10%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={course.name}
                        onChange={e => updateCourse(course.id, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="12"
                        className="form-control"
                        value={course.credits}
                        onChange={e => updateCourse(course.id, 'credits', parseFloat(e.target.value) || 0)}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control"
                        value={course.grade}
                        onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                      >
                        {gradeList.map(g => (
                          <option key={g} value={g}>{g} ({gradePoints[g]} pts)</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline text-danger"
                        onClick={() => removeCourseRow(course.id)}
                        disabled={courses.length <= 1}
                        title="Remove Course"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Saved Semesters History */}
      <div className="card">
        <div className="card-header">
          <h3>Saved Semester Records</h3>
        </div>
        <div className="card-body">
          {gpaData.semesters.length === 0 ? (
            <p className="text-muted" style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              No saved semesters yet. Calculate your semester above and click "Save Record"!
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Semester</th>
                    <th>Scale</th>
                    <th>Credits</th>
                    <th>Courses</th>
                    <th>GPA</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gpaData.semesters.map((sem, idx) => (
                    <tr key={sem.id || idx}>
                      <td><strong>{sem.semester}</strong></td>
                      <td><span className="badge badge-secondary">{sem.scale} Scale</span></td>
                      <td>{sem.credits}</td>
                      <td>{sem.coursesCount}</td>
                      <td>
                        <span className="badge badge-success" style={{ fontSize: '0.9rem' }}>
                          {sem.gpa.toFixed(2)}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline text-danger"
                          onClick={() => deleteGpaSemester(sem.id)}
                          title="Delete Semester Record"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
