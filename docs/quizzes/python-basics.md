---
title: Python Fundamentals Quiz
description: Test your understanding of Python basics
---

# 🎯 Python Fundamentals Quiz

Test your knowledge of Python basics including variables, data types, control flow, and functions.

<script src="../../js/python-basics-data.js"></script>
<script src="../../js/quiz-system.js"></script>

<div id="python-basics-quiz" data-quiz-id="python-basics"></div>

<script>
// Manual initialization with retry logic
(function() {
  let attempts = 0;
  const maxAttempts = 10;
  
  function tryInitQuiz() {
    attempts++;
    
    if (window.QuizRenderer && window.quizData && window.quizData['python-basics']) {
      const container = document.getElementById('python-basics-quiz');
      if (container && !container.querySelector('.quiz-container')) {
        console.log('✓ Initializing Python Basics Quiz');
        new QuizRenderer(window.quizData['python-basics'], 'python-basics-quiz');
      }
    } else if (attempts < maxAttempts) {
      // Try again in 100ms
      setTimeout(tryInitQuiz, 100);
    } else {
      console.error('Failed to load quiz after', maxAttempts, 'attempts');
      console.log('QuizRenderer:', typeof window.QuizRenderer);
      console.log('quizData:', window.quizData);
    }
  }
  
  // Start trying to initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitQuiz);
  } else {
    tryInitQuiz();
  }
})();
</script>

---

## 📚 Related Lessons

Before taking this quiz, make sure you've completed:

- [Day 1: Python Basics](../day1/01-python-basics.md)

## 💡 Tips

- Read each question carefully
- Use the hints if you're stuck
- You can navigate back to review or change answers
- You can retake the quiz as many times as you want
- A score of 70% or higher is considered passing

## 🎓 After Completing

Once you've completed this quiz:

1. Review any questions you got wrong
2. Go back to the lesson material if needed
3. Continue to the next day's content
4. Check out the [Assessments page](../../assessments/) for more quizzes

---

**Good luck!** 🍀

