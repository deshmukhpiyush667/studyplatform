/**
 * StudyMate - Academic Handbook & PDF Exporter
 * Generates beautifully formatted, printable, multi-page study guides with cover pages,
 * tables of contents, syntax-highlighted code, formula callouts, and clean page breaks.
 */

function generateHandbookHTML(materials, options = {}) {
  const isAllSubjects = Array.isArray(materials) && materials.length > 1;
  const title = isAllSubjects
    ? "StudyMate Engineering Master Handbook: All Subjects Complete Revision Guide"
    : materials[0].title;
  const subtitle = isAllSubjects
    ? "Comprehensive Academic Curriculum Reference Covering All 7 Core Computer Science & Engineering Subjects"
    : `${materials[0].subject} • Academic Curriculum Handbook`;

  const matList = Array.isArray(materials) ? materials : [materials];

  const chaptersHTML = matList.map((mat, matIdx) => {
    const chapters = mat.chapters || [];
    const chaptersRendered = chapters.map((chap, cIdx) => `
      <section class="chapter-section">
        <div class="chapter-header">
          <span class="chapter-num">Chapter ${matIdx + 1}.${cIdx + 1}</span>
          <h3 class="chapter-title">${chap.title}</h3>
        </div>
        <div class="chapter-body">
          ${formatMarkdownContent(chap.content)}
          ${chap.keyFormulas && chap.keyFormulas.length > 0 ? `
            <div class="formula-box">
              <div class="formula-title">⚡ Key Formulas, Complexities & Theorems</div>
              <ul>
                ${chap.keyFormulas.map(f => `<li><code>${escapeHTML(f)}</code></li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      </section>
    `).join('');

    return `
      <article class="subject-article ${matIdx > 0 ? 'page-break-before' : ''}">
        <div class="subject-cover">
          <div class="subject-badge">${escapeHTML(mat.subject)}</div>
          <h2 class="subject-title">${escapeHTML(mat.title)}</h2>
          <p class="subject-desc">${escapeHTML(mat.description || '')}</p>
          <div class="subject-meta-grid">
            <div class="meta-item"><strong>Department:</strong> ${escapeHTML(mat.author || 'Computer Science & Engineering')}</div>
            <div class="meta-item"><strong>Estimated Read Time:</strong> ${escapeHTML(mat.readTime || '45 mins')}</div>
            <div class="meta-item"><strong>Academic Term:</strong> 2025 - 2026 Academic Year</div>
            <div class="meta-item"><strong>Format:</strong> Verified Engineering Syllabus Reference</div>
          </div>
        </div>
        <div class="chapters-container">
          ${chaptersRendered}
        </div>
      </article>
    `;
  }).join('');

  const tocHTML = matList.map((m, idx) => `
    <li class="toc-subject-entry">
      <span class="toc-num">${idx + 1}.</span>
      <span class="toc-title">${escapeHTML(m.subject)}: ${escapeHTML(m.title)}</span>
      <span class="toc-dots"></span>
      <span class="toc-count">${(m.chapters || []).length} Chapters</span>
    </li>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHTML(title)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --primary: #4f46e5;
      --primary-dark: #3730a3;
      --text: #0f172a;
      --text-muted: #475569;
      --border: #e2e8f0;
      --bg-alt: #f8fafc;
      --card-bg: #ffffff;
      --accent: #0284c7;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: var(--text);
      background-color: #f1f5f9;
      line-height: 1.65;
      font-size: 14px;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .toolbar-screen {
      position: sticky;
      top: 0;
      background: #1e1b4b;
      color: white;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .toolbar-screen .btn {
      background: #4f46e5;
      color: white;
      border: none;
      padding: 8px 18px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      font-size: 14px;
      margin-left: 8px;
      transition: background 0.2s;
    }
    .toolbar-screen .btn:hover {
      background: #4338ca;
    }
    .toolbar-screen .btn-secondary {
      background: #334155;
    }
    .toolbar-screen .btn-secondary:hover {
      background: #475569;
    }

    .document-wrapper {
      max-width: 900px;
      margin: 30px auto;
      background: var(--card-bg);
      padding: 60px 70px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      border-radius: 8px;
    }

    /* Cover Page */
    .master-cover {
      border: 3px double #cbd5e1;
      padding: 50px 40px;
      text-align: center;
      margin-bottom: 50px;
      background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
      border-radius: 8px;
      page-break-after: always;
    }
    .cover-badge {
      display: inline-block;
      padding: 6px 16px;
      background: #e0e7ff;
      color: #4338ca;
      font-weight: 700;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      border-radius: 20px;
      margin-bottom: 20px;
    }
    .cover-title {
      font-size: 28px;
      font-weight: 800;
      color: #1e1b4b;
      margin-bottom: 12px;
      line-height: 1.3;
    }
    .cover-subtitle {
      font-size: 15px;
      color: var(--text-muted);
      max-width: 650px;
      margin: 0 auto 30px;
    }
    .cover-divider {
      width: 80px;
      height: 4px;
      background: #4f46e5;
      margin: 25px auto;
      border-radius: 2px;
    }
    .cover-meta {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      max-width: 500px;
      margin: 30px auto 0;
      text-align: left;
      font-size: 13px;
      background: white;
      padding: 18px 24px;
      border: 1px solid var(--border);
      border-radius: 6px;
    }

    /* Table of Contents */
    .toc-section {
      margin-bottom: 50px;
      padding: 24px 30px;
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 8px;
      page-break-after: always;
    }
    .toc-heading {
      font-size: 20px;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 18px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
    }
    .toc-list {
      list-style: none;
    }
    .toc-subject-entry {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px dashed #cbd5e1;
      font-size: 14px;
    }
    .toc-num {
      font-weight: 700;
      color: #4f46e5;
      width: 28px;
    }
    .toc-title {
      font-weight: 600;
      color: #1e293b;
    }
    .toc-dots {
      flex: 1;
      border-bottom: 1px dotted #94a3b8;
      margin: 0 12px;
      height: 12px;
    }
    .toc-count {
      color: #64748b;
      font-size: 12px;
      font-weight: 500;
    }

    /* Subject Article */
    .subject-article {
      margin-bottom: 60px;
    }
    .subject-cover {
      background: #f1f5f9;
      padding: 28px 32px;
      border-radius: 8px;
      border-left: 6px solid #4f46e5;
      margin-bottom: 35px;
    }
    .subject-badge {
      display: inline-block;
      background: #4f46e5;
      color: white;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .subject-title {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 8px;
    }
    .subject-desc {
      font-size: 14px;
      color: #475569;
      margin-bottom: 16px;
    }
    .subject-meta-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 10px;
      font-size: 12px;
      color: #334155;
      padding-top: 12px;
      border-top: 1px solid #cbd5e1;
    }

    /* Chapter Section */
    .chapter-section {
      margin-bottom: 35px;
      padding-bottom: 25px;
      border-bottom: 1px solid #e2e8f0;
    }
    .chapter-header {
      margin-bottom: 14px;
    }
    .chapter-num {
      font-size: 12px;
      font-weight: 700;
      color: #6366f1;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      display: block;
      margin-bottom: 4px;
    }
    .chapter-title {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
    }
    .chapter-body {
      font-size: 14px;
      line-height: 1.7;
      color: #334155;
    }
    .chapter-body p {
      margin-bottom: 12px;
    }
    .chapter-body h4 {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin: 16px 0 8px;
    }
    .chapter-body ul, .chapter-body ol {
      margin: 10px 0 16px 24px;
    }
    .chapter-body li {
      margin-bottom: 6px;
    }
    .chapter-body strong {
      color: #0f172a;
    }
    .chapter-body code {
      font-family: 'JetBrains Mono', monospace;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
      color: #0f172a;
      border: 1px solid #e2e8f0;
    }
    .chapter-body pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      line-height: 1.5;
      margin: 14px 0;
    }
    .chapter-body pre code {
      background: transparent;
      color: inherit;
      border: none;
      padding: 0;
    }

    /* Formula Box */
    .formula-box {
      margin: 18px 0;
      padding: 16px 20px;
      background: #eff6ff;
      border-left: 4px solid #0284c7;
      border-radius: 0 6px 6px 0;
    }
    .formula-title {
      font-weight: 700;
      font-size: 13px;
      color: #0369a1;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .formula-box ul {
      margin-left: 18px;
      margin-bottom: 0;
    }
    .formula-box li {
      color: #0c4a6e;
      margin-bottom: 4px;
    }

    /* Page Breaks & Print */
    @media print {
      .toolbar-screen { display: none !important; }
      body {
        background: white;
        font-size: 12pt;
      }
      .document-wrapper {
        box-shadow: none;
        padding: 0;
        margin: 0;
        max-width: 100%;
      }
      .page-break-before {
        page-break-before: always !important;
        break-before: page !important;
      }
      .chapter-section {
        page-break-inside: avoid;
      }
      .formula-box {
        page-break-inside: avoid;
      }
      pre {
        page-break-inside: avoid;
      }
      @page {
        margin: 1.8cm 1.5cm 1.8cm 1.5cm;
        @bottom-right {
          content: "StudyMate Academic Handbooks";
        }
      }
    }
  </style>
</head>
<body>
  <div class="toolbar-screen">
    <div>
      <strong>StudyMate Academic Repository</strong> — ${escapeHTML(title)}
    </div>
    <div>
      <button class="btn" onclick="window.print()">🖨️ Save as PDF / Print</button>
      <button class="btn btn-secondary" onclick="window.close()">Close Window</button>
    </div>
  </div>

  <div class="document-wrapper">
    <!-- Master Cover Page -->
    <div class="master-cover">
      <div class="cover-badge">Official Academic Handbook</div>
      <h1 class="cover-title">${escapeHTML(title)}</h1>
      <p class="cover-subtitle">${escapeHTML(subtitle)}</p>
      <div class="cover-divider"></div>
      <div class="cover-meta">
        <div><strong>Student:</strong> Payal Deshmukh</div>
        <div><strong>Course:</strong> B.Tech Computer Science</div>
        <div><strong>Institution:</strong> StudyMate Learning Platform</div>
        <div><strong>Edition:</strong> Comprehensive 2025 - 2026</div>
      </div>
    </div>

    <!-- Table of Contents -->
    <div class="toc-section">
      <h2 class="toc-heading">Table of Contents & Curriculum Map</h2>
      <ul class="toc-list">
        ${tocHTML}
      </ul>
    </div>

    <!-- Handbooks Content -->
    ${chaptersHTML}
  </div>

  <script>
    // Auto-trigger print dialog after small render delay if requested
    ${options.autoPrint ? `
      window.addEventListener('load', () => {
        setTimeout(() => {
          window.print();
        }, 600);
      });
    ` : ''}
  </script>
</body>
</html>`;
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatMarkdownContent(raw) {
  if (!raw) return '';
  let content = raw.trim();

  // Escape HTML first
  content = escapeHTML(content);

  // Preserve pre/code blocks
  const codeBlocks = [];
  content = content.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push(`<pre><code>${code.trim()}</code></pre>`);
    return placeholder;
  });

  // Headers
  content = content.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  content = content.replace(/^### (.*$)/gim, '<h4>$1</h4>');
  content = content.replace(/^## (.*$)/gim, '<h3>$1</h3>');

  // Bold & Italic
  content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Inline code
  content = content.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Markdown lists
  content = content.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
  content = content.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');

  // Wrap loose <li> in <ul>
  content = content.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  content = content.replace(/<\/ul>\s*<ul>/g, '');

  // Math equations / $$ block
  content = content.replace(/\$\$(.*?)\$\$/g, '<div class="math-display"><code>$1</code></div>');
  content = content.replace(/\$(.*?)\$/g, '<code>$1</code>');

  // Paragraphs
  content = content.split('\n\n').map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<pre') || p.startsWith('__CODE_BLOCK')) {
      return p;
    }
    return `<p>${p}</p>`;
  }).join('\n');

  // Restore code blocks
  codeBlocks.forEach((block, idx) => {
    content = content.replace(`__CODE_BLOCK_${idx}__`, block);
  });

  return content;
}

/**
 * Open a formatted printable window with all styling and trigger PDF Print
 */
export function openPrintablePDF(materials, autoPrint = true) {
  const html = generateHandbookHTML(materials, { autoPrint });
  const printWin = window.open('', '_blank');
  if (printWin) {
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
  } else {
    // Popup was blocked, trigger download as HTML fallback
    downloadOfflineHandbookHTML(materials);
  }
}

/**
 * Direct file download of the standalone offline Handbook HTML document
 */
export function downloadOfflineHandbookHTML(materials) {
  const html = generateHandbookHTML(materials, { autoPrint: false });
  const isAll = Array.isArray(materials) && materials.length > 1;
  const filename = isAll
    ? "StudyMate_All_Subjects_Engineering_Handbook.html"
    : `${materials[0].subject.replace(/[^a-zA-Z0-9]/g, '_')}_Complete_Handbook.html`;

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const element = document.createElement('a');
  element.href = URL.createObjectURL(blob);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
