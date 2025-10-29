---
title: Assessments & Quizzes
description: Test your knowledge with interactive quizzes
---

<script src="../js/quiz-system.js"></script>

# 🎯 Workshop Assessments

Test your understanding of Python, data analysis, and machine learning concepts through our interactive quizzes. Each quiz provides instant feedback and helps track your progress throughout the workshop.

---

## 📊 Your Progress

<div id="overall-progress" style="background: linear-gradient(135deg, rgba(0,150,136,0.05), rgba(0,150,136,0.02)); padding: 2rem; border-radius: 16px; margin: 2rem 0; border: 2px solid rgba(0,150,136,0.2);">
  <h3 style="color: var(--md-primary-fg-color); margin-top: 0;">Overall Progress</h3>
  <div id="progress-stats"></div>
  <button onclick="QuizManager.reset()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #f44336; color: white; border: none; border-radius: 8px; cursor: pointer;">Reset All Progress</button>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const progress = QuizManager.calculateOverallProgress();
  const statsDiv = document.getElementById('progress-stats');
  
  if (progress.completed === 0) {
    statsDiv.innerHTML = `
      <p style="font-size: 1.1rem;">You haven't completed any quizzes yet. Start with the Python Basics quiz below!</p>
    `;
  } else {
    statsDiv.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1.5rem; margin: 1rem 0;">
        <div style="text-align: center;">
          <div style="font-size: 3rem; font-weight: 700; color: var(--md-primary-fg-color);">${progress.completed}</div>
          <div style="color: #666;">Quizzes Completed</div>
        </div>
        <div style="text-align: center;">
          <div style="font-size: 3rem; font-weight: 700; color: #4caf50;">${progress.averageScore}%</div>
          <div style="color: #666;">Average Score</div>
        </div>
      </div>
    `;
  }
});
</script>

---

## 📚 Available Quizzes

### Day 1: Python Fundamentals

<div class="quiz-card" style="background: white; border-radius: 12px; padding: 1.5rem; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #009688;">
  <div style="display: flex; justify-content: space-between; align-items: start;">
    <div style="flex: 1;">
      <h4 style="margin: 0 0 0.5rem 0; color: #009688;">🐍 Python Basics Quiz</h4>
      <p style="margin: 0 0 1rem 0; color: #666;">Test your knowledge of Python fundamentals: variables, data types, control structures, and functions.</p>
      <div style="display: flex; gap: 1rem; font-size: 0.9rem; color: #999;">
        <span>📝 10 Questions</span>
        <span>⏱️ ~15 minutes</span>
        <span>🎯 Difficulty: Beginner</span>
      </div>
    </div>
    <div style="margin-left: 1rem;">
      <a href="../quizzes/python-basics/" class="md-button md-button--primary">Take Quiz</a>
    </div>
  </div>
  <div id="python-basics-status" style="margin-top: 1rem;"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const score = QuizManager.getQuizScore('python-basics');
  const statusDiv = document.getElementById('python-basics-status');
  if (score) {
    const passed = score.percentage >= 70;
    statusDiv.innerHTML = `
      <div style="padding: 0.75rem; background: ${passed ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)'}; border-radius: 8px; border-left: 4px solid ${passed ? '#4caf50' : '#ff9800'};">
        <strong>✓ Completed:</strong> ${score.score}/${score.total} (${score.percentage}%)
        ${passed ? '🎉 Passed!' : '📚 Keep practicing!'}
        <span style="color: #666; font-size: 0.85rem; margin-left: 1rem;">
          ${new Date(score.completedAt).toLocaleDateString()}
        </span>
      </div>
    `;
  }
});
</script>

---

### Day 2: Scientific Python

<div class="quiz-card" style="background: white; border-radius: 12px; padding: 1.5rem; margin: 1rem 0; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border-left: 4px solid #2196f3;">
  <div style="display: flex; justify-content: space-between; align-items: start;">
    <div style="flex: 1;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2196f3;">🔢 NumPy for Climate Data Quiz</h4>
      <p style="margin: 0 0 1rem 0; color: #666;">Assess your understanding of NumPy arrays, operations, and climate data manipulation.</p>
      <div style="display: flex; gap: 1rem; font-size: 0.9rem; color: #999;">
        <span>📝 10 Questions</span>
        <span>⏱️ ~15 minutes</span>
        <span>🎯 Difficulty: Intermediate</span>
      </div>
    </div>
    <div style="margin-left: 1rem;">
      <a href="../quizzes/numpy/" class="md-button md-button--primary">Take Quiz</a>
    </div>
  </div>
  <div id="numpy-status" style="margin-top: 1rem;"></div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const score = QuizManager.getQuizScore('numpy');
  const statusDiv = document.getElementById('numpy-status');
  if (score) {
    const passed = score.percentage >= 70;
    statusDiv.innerHTML = `
      <div style="padding: 0.75rem; background: ${passed ? 'rgba(76,175,80,0.1)' : 'rgba(255,152,0,0.1)'}; border-radius: 8px; border-left: 4px solid ${passed ? '#4caf50' : '#ff9800'};">
        <strong>✓ Completed:</strong> ${score.score}/${score.total} (${score.percentage}%)
        ${passed ? '🎉 Passed!' : '📚 Keep practicing!'}
        <span style="color: #666; font-size: 0.85rem; margin-left: 1rem;">
          ${new Date(score.completedAt).toLocaleDateString()}
        </span>
      </div>
    `;
  }
});
</script>

---

## 🎓 Assessment Guidelines

### How Quizzes Work

1. **Interactive Format** - Multiple choice, multiple select, and true/false questions
2. **Instant Feedback** - Get immediate results with explanations
3. **Code Examples** - Some questions include code snippets to analyze
4. **Hints Available** - Use hints if you get stuck
5. **Retake Anytime** - Improve your score by retaking quizzes

### Scoring

- **Passing Score:** 70% or higher
- **Excellent:** 90% or higher
- **Mastery:** 100%

Each quiz tracks your:
- Score (correct answers / total questions)
- Percentage
- Completion date
- Individual question results

### Tips for Success

✅ **Before the Quiz:**
- Review the lesson materials thoroughly
- Try the code examples yourself
- Take notes on key concepts

✅ **During the Quiz:**
- Read questions carefully
- Use hints when needed
- Think about the code snippets
- Don't rush - take your time

✅ **After the Quiz:**
- Review incorrect answers
- Read the explanations
- Go back to lesson material if needed
- Retake to improve your score

---

## 📖 More Quizzes Coming Soon!

We're continuously adding more quizzes to help you assess your learning:

- 📊 **Pandas Quiz** - Data manipulation and time series
- 📈 **Matplotlib Quiz** - Data visualization
- 🌍 **Xarray & NetCDF Quiz** - Multidimensional climate data
- 🗺️ **Cartopy & GeoPandas Quiz** - Geospatial analysis
- 🤖 **Machine Learning Basics Quiz** - ML fundamentals
- 🌦️ **ML for Climate Quiz** - Seasonal prediction

---

## 💡 Need Help?

If you're struggling with the quizzes:

1. **Review the Lessons** - Go back to the relevant lesson page
2. **Check the Hints** - Use the hint feature in each question
3. **Ask for Help** - Use the collaboration tools to discuss with peers
4. **Practice More** - Try the Jupyter notebooks with real data
5. **Retake Quizzes** - Practice makes perfect!

---

## 🏆 Track Your Progress

Your quiz scores are saved locally in your browser. You can:

- ✅ See which quizzes you've completed
- ✅ View your scores and percentages
- ✅ Retake quizzes to improve
- ✅ Track your overall progress
- ✅ Reset progress to start fresh

**Note:** Progress is stored in your browser's localStorage. Clearing browser data will reset your progress.

---

## 🎯 Learning Objectives

Our assessments are designed to verify that you can:

### Python Fundamentals
- Create and manipulate Python data structures
- Write functions and control flow logic
- Handle exceptions and errors
- Use list comprehensions effectively

### NumPy
- Create and manipulate n-dimensional arrays
- Perform vectorized operations
- Apply broadcasting rules
- Use boolean indexing and masking

### Pandas
- Work with DataFrames and Series
- Filter, group, and aggregate data
- Handle time series data
- Clean and prepare data

### Data Visualization
- Create effective plots with Matplotlib
- Customize visualizations
- Choose appropriate chart types
- Present climate data clearly

### Machine Learning
- Understand ML concepts and workflow
- Prepare data for ML models
- Train and evaluate models
- Apply ML to climate prediction

---

**Ready to test your knowledge?** Start with the first quiz above! 🚀

