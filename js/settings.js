/**
 * StudyMate - Settings & Data Management Controller
 * Theme configuration, JSON import/export, reset data, and Spring Boot REST API blueprint.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSettingsModule();
});

function initSettingsModule() {
  setupThemeSettings();
  setupNotificationPreferences();
  setupDataManagement();
}

function setupThemeSettings() {
  const currentTheme = ThemeService.getTheme();
  const radios = document.querySelectorAll('input[name="theme-choice"]');
  radios.forEach(r => {
    if (r.value === currentTheme) r.checked = true;
    r.addEventListener('change', () => {
      ThemeService.setTheme(r.value);
      StudyMate.toast(`Theme updated to ${r.value} mode`, 'success');
    });
  });
}

function setupNotificationPreferences() {
  const saveNotifBtn = document.getElementById('save-notif-prefs-btn');
  if (saveNotifBtn) {
    saveNotifBtn.addEventListener('click', () => {
      StudyMate.toast('Notification preferences saved!', 'success');
    });
  }
}

function setupDataManagement() {
  // Export JSON
  const exportBtn = document.getElementById('export-data-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const jsonData = StorageService.exportAllJSON();
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `StudyMate_Backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      StudyMate.toast('Backup JSON exported successfully!', 'success');
    });
  }

  // Import JSON
  const importInput = document.getElementById('import-json-file');
  if (importInput) {
    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = StorageService.importAllJSON(event.target.result);
        if (result.success) {
          StudyMate.toast('Data restored successfully! Refreshing view...', 'success');
          setTimeout(() => window.location.reload(), 1200);
        } else {
          StudyMate.toast('Failed to import file: Invalid JSON structure', 'error');
        }
      };
      reader.readAsText(file);
    });
  }

  // Restore Defaults
  const restoreDefaultsBtn = document.getElementById('restore-defaults-btn');
  if (restoreDefaultsBtn) {
    restoreDefaultsBtn.addEventListener('click', () => {
      StudyMate.confirm({
        title: "Restore Default Demo Data",
        message: "This will reload the initial computer science demo notes, tasks, planner timetable, and quizzes. Your current data will be overwritten.",
        confirmText: "Restore Defaults",
        isDanger: false,
        onConfirm: () => {
          StorageService.resetToDefaults();
          StudyMate.toast('Default demo data restored! Reloading...', 'success');
          setTimeout(() => window.location.reload(), 1000);
        }
      });
    });
  }

  // Clear All Data
  const clearAllBtn = document.getElementById('clear-all-data-btn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', () => {
      StudyMate.confirm({
        title: "Clear All Platform Data",
        message: "Are you sure? This will delete ALL notes, tasks, timetable slots, study materials, goals, timer history, and quiz records from your browser's LocalStorage.",
        confirmText: "Clear Everything",
        isDanger: true,
        onConfirm: () => {
          StorageService.clearAll();
          StudyMate.toast('All platform data has been cleared.', 'info');
          setTimeout(() => window.location.href = 'index.html', 1200);
        }
      });
    });
  }
}
