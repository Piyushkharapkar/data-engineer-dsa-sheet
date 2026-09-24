/**
 * Main Application Controller & UI Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Tab Switcher
  const tabs = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      // Update active tab button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active tab pane
      tabContents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });

  // Initialize Engines
  let digitRecognizer = null;
  let nlpAnalyzer = null;
  let boundaryPlayground = null;

  try {
    if (window.DigitRecognizer) {
      digitRecognizer = new window.DigitRecognizer();
    }
  } catch (err) {
    console.error('Failed to init Digit Recognizer:', err);
  }

  try {
    if (window.NLPAnalyzer) {
      nlpAnalyzer = new window.NLPAnalyzer();
    }
  } catch (err) {
    console.error('Failed to init NLP Analyzer:', err);
  }

  try {
    if (window.DecisionBoundaryPlayground) {
      boundaryPlayground = new window.DecisionBoundaryPlayground();
    }
  } catch (err) {
    console.error('Failed to init Decision Boundary Playground:', err);
  }
});
