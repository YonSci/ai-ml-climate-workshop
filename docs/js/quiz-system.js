// ============================================
// INTERACTIVE QUIZ & ASSESSMENT SYSTEM
// ============================================

(function() {
  'use strict';
  
  // Quiz Manager
  const QuizManager = {
    // Storage key for localStorage
    STORAGE_KEY: 'climate_workshop_quiz_scores',
    
    // Get all quiz scores from localStorage
    getScores: function() {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : {};
      } catch (e) {
        console.log('Error reading quiz scores:', e);
        return {};
      }
    },
    
    // Save quiz score to localStorage
    saveScore: function(quizId, score, totalQuestions, answers) {
      try {
        const scores = this.getScores();
        scores[quizId] = {
          score: score,
          total: totalQuestions,
          percentage: Math.round((score / totalQuestions) * 100),
          completedAt: new Date().toISOString(),
          answers: answers
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scores));
        return true;
      } catch (e) {
        console.log('Error saving quiz score:', e);
        return false;
      }
    },
    
    // Get score for specific quiz
    getQuizScore: function(quizId) {
      const scores = this.getScores();
      return scores[quizId] || null;
    },
    
    // Calculate overall progress
    calculateOverallProgress: function() {
      const scores = this.getScores();
      const quizIds = Object.keys(scores);
      
      if (quizIds.length === 0) {
        return { completed: 0, averageScore: 0, totalQuizzes: 0 };
      }
      
      let totalPercentage = 0;
      quizIds.forEach(id => {
        totalPercentage += scores[id].percentage;
      });
      
      return {
        completed: quizIds.length,
        averageScore: Math.round(totalPercentage / quizIds.length),
        totalQuizzes: quizIds.length
      };
    },
    
    // Reset all scores
    reset: function() {
      if (confirm('Are you sure you want to reset all quiz scores? This cannot be undone.')) {
        localStorage.removeItem(this.STORAGE_KEY);
        location.reload();
      }
    }
  };
  
  // Quiz Renderer
  class QuizRenderer {
    constructor(quizData, containerId) {
      this.quizData = quizData;
      this.container = document.getElementById(containerId);
      this.currentQuestion = 0;
      this.userAnswers = {};
      this.quizCompleted = false;
      
      if (this.container) {
        this.render();
      }
    }
    
    render() {
      // Check if quiz was already completed
      const savedScore = QuizManager.getQuizScore(this.quizData.id);
      
      if (savedScore && !this.container.dataset.allowRetake) {
        this.renderCompletedQuiz(savedScore);
        return;
      }
      
      // Render quiz interface
      this.container.innerHTML = `
        <div class="quiz-container">
          <div class="quiz-header">
            <h3>${this.quizData.title}</h3>
            <p class="quiz-description">${this.quizData.description || ''}</p>
            <div class="quiz-progress">
              <div class="progress-bar-quiz">
                <div class="progress-fill-quiz" style="width: 0%"></div>
              </div>
              <span class="progress-text-quiz">Question <span class="current-q">1</span> of ${this.quizData.questions.length}</span>
            </div>
          </div>
          
          <div class="quiz-body">
            <div class="question-container"></div>
          </div>
          
          <div class="quiz-footer">
            <button class="quiz-btn quiz-btn-prev" disabled>← Previous</button>
            <button class="quiz-btn quiz-btn-next">Next →</button>
            <button class="quiz-btn quiz-btn-submit" style="display: none;">Submit Quiz</button>
          </div>
        </div>
      `;
      
      this.renderQuestion(0);
      this.attachEventListeners();
    }
    
    renderQuestion(index) {
      const question = this.quizData.questions[index];
      const questionContainer = this.container.querySelector('.question-container');
      
      let optionsHTML = '';
      
      if (question.type === 'multiple-choice') {
        optionsHTML = question.options.map((option, i) => `
          <label class="quiz-option">
            <input type="radio" name="q${index}" value="${i}" 
              ${this.userAnswers[index] === i ? 'checked' : ''}>
            <span class="option-text">${option}</span>
          </label>
        `).join('');
      } else if (question.type === 'multiple-select') {
        optionsHTML = question.options.map((option, i) => `
          <label class="quiz-option">
            <input type="checkbox" name="q${index}" value="${i}"
              ${this.userAnswers[index] && this.userAnswers[index].includes(i) ? 'checked' : ''}>
            <span class="option-text">${option}</span>
          </label>
        `).join('');
      } else if (question.type === 'true-false') {
        optionsHTML = `
          <label class="quiz-option">
            <input type="radio" name="q${index}" value="true"
              ${this.userAnswers[index] === 'true' ? 'checked' : ''}>
            <span class="option-text">True</span>
          </label>
          <label class="quiz-option">
            <input type="radio" name="q${index}" value="false"
              ${this.userAnswers[index] === 'false' ? 'checked' : ''}>
            <span class="option-text">False</span>
          </label>
        `;
      }
      
      questionContainer.innerHTML = `
        <div class="question-card">
          <div class="question-number">Question ${index + 1}</div>
          <div class="question-text">${question.question}</div>
          ${question.code ? `<pre class="question-code"><code>${this.escapeHtml(question.code)}</code></pre>` : ''}
          <div class="question-options">
            ${optionsHTML}
          </div>
          ${question.hint ? `
            <details class="question-hint">
              <summary>💡 Hint</summary>
              <p>${question.hint}</p>
            </details>
          ` : ''}
        </div>
      `;
      
      // Update progress
      const progress = ((index + 1) / this.quizData.questions.length) * 100;
      this.container.querySelector('.progress-fill-quiz').style.width = progress + '%';
      this.container.querySelector('.current-q').textContent = index + 1;
      
      // Update button states
      const prevBtn = this.container.querySelector('.quiz-btn-prev');
      const nextBtn = this.container.querySelector('.quiz-btn-next');
      const submitBtn = this.container.querySelector('.quiz-btn-submit');
      
      prevBtn.disabled = index === 0;
      
      if (index === this.quizData.questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
      } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
      }
    }
    
    attachEventListeners() {
      const prevBtn = this.container.querySelector('.quiz-btn-prev');
      const nextBtn = this.container.querySelector('.quiz-btn-next');
      const submitBtn = this.container.querySelector('.quiz-btn-submit');
      
      prevBtn.addEventListener('click', () => this.previousQuestion());
      nextBtn.addEventListener('click', () => this.nextQuestion());
      submitBtn.addEventListener('click', () => this.submitQuiz());
      
      // Save answers on change
      this.container.addEventListener('change', (e) => {
        if (e.target.type === 'radio') {
          this.userAnswers[this.currentQuestion] = 
            e.target.value === 'true' || e.target.value === 'false' 
              ? e.target.value 
              : parseInt(e.target.value);
        } else if (e.target.type === 'checkbox') {
          if (!this.userAnswers[this.currentQuestion]) {
            this.userAnswers[this.currentQuestion] = [];
          }
          const value = parseInt(e.target.value);
          if (e.target.checked) {
            this.userAnswers[this.currentQuestion].push(value);
          } else {
            const index = this.userAnswers[this.currentQuestion].indexOf(value);
            if (index > -1) {
              this.userAnswers[this.currentQuestion].splice(index, 1);
            }
          }
        }
      });
    }
    
    previousQuestion() {
      if (this.currentQuestion > 0) {
        this.currentQuestion--;
        this.renderQuestion(this.currentQuestion);
      }
    }
    
    nextQuestion() {
      if (this.currentQuestion < this.quizData.questions.length - 1) {
        this.currentQuestion++;
        this.renderQuestion(this.currentQuestion);
      }
    }
    
    submitQuiz() {
      // Check if all questions answered
      const unanswered = [];
      this.quizData.questions.forEach((q, i) => {
        if (this.userAnswers[i] === undefined || 
            (Array.isArray(this.userAnswers[i]) && this.userAnswers[i].length === 0)) {
          unanswered.push(i + 1);
        }
      });
      
      if (unanswered.length > 0) {
        if (!confirm(`You haven't answered question(s): ${unanswered.join(', ')}.\n\nSubmit anyway?`)) {
          return;
        }
      }
      
      // Grade quiz
      const results = this.gradeQuiz();
      
      // Save score
      QuizManager.saveScore(
        this.quizData.id,
        results.score,
        this.quizData.questions.length,
        this.userAnswers
      );
      
      // Show results
      this.renderResults(results);
    }
    
    gradeQuiz() {
      let score = 0;
      const questionResults = [];
      
      this.quizData.questions.forEach((question, index) => {
        const userAnswer = this.userAnswers[index];
        let correct = false;
        
        if (question.type === 'multiple-choice' || question.type === 'true-false') {
          correct = userAnswer === question.correctAnswer;
        } else if (question.type === 'multiple-select') {
          if (Array.isArray(userAnswer) && Array.isArray(question.correctAnswer)) {
            const sorted1 = [...userAnswer].sort();
            const sorted2 = [...question.correctAnswer].sort();
            correct = sorted1.length === sorted2.length && 
                     sorted1.every((val, i) => val === sorted2[i]);
          }
        }
        
        if (correct) score++;
        
        questionResults.push({
          question: question.question,
          userAnswer: userAnswer,
          correctAnswer: question.correctAnswer,
          correct: correct,
          explanation: question.explanation,
          options: question.options
        });
      });
      
      return {
        score: score,
        total: this.quizData.questions.length,
        percentage: Math.round((score / this.quizData.questions.length) * 100),
        questionResults: questionResults
      };
    }
    
    renderResults(results) {
      const passed = results.percentage >= 70;
      
      this.container.innerHTML = `
        <div class="quiz-results">
          <div class="results-header ${passed ? 'passed' : 'failed'}">
            <div class="results-icon">${passed ? '🎉' : '📚'}</div>
            <h3>${passed ? 'Congratulations!' : 'Keep Learning!'}</h3>
            <div class="results-score">
              <span class="score-big">${results.score}</span>
              <span class="score-divider">/</span>
              <span class="score-total">${results.total}</span>
            </div>
            <div class="results-percentage">${results.percentage}%</div>
            <p class="results-message">
              ${passed 
                ? 'Great job! You\'ve mastered this topic.' 
                : 'Review the material and try again. You can do it!'}
            </p>
          </div>
          
          <div class="results-breakdown">
            <h4>Question Breakdown</h4>
            ${results.questionResults.map((result, index) => `
              <div class="result-item ${result.correct ? 'correct' : 'incorrect'}">
                <div class="result-header">
                  <span class="result-icon">${result.correct ? '✓' : '✗'}</span>
                  <span class="result-number">Question ${index + 1}</span>
                </div>
                <div class="result-question">${result.question}</div>
                ${!result.correct ? `
                  <div class="result-explanation">
                    <strong>Correct answer:</strong> 
                    ${this.formatAnswer(result.correctAnswer, result.options)}
                    ${result.explanation ? `<br><em>${result.explanation}</em>` : ''}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
          
          <div class="results-actions">
            <button class="quiz-btn quiz-btn-retake" onclick="location.reload()">
              🔄 Retake Quiz
            </button>
            <button class="quiz-btn quiz-btn-continue" onclick="window.location.href='../assessments/'">
              → Continue to Assessments
            </button>
          </div>
        </div>
      `;
    }
    
    renderCompletedQuiz(savedScore) {
      this.container.innerHTML = `
        <div class="quiz-completed">
          <div class="completed-icon">✓</div>
          <h3>Quiz Already Completed</h3>
          <div class="completed-score">
            Score: ${savedScore.score}/${savedScore.total} (${savedScore.percentage}%)
          </div>
          <p>Completed on: ${new Date(savedScore.completedAt).toLocaleDateString()}</p>
          <button class="quiz-btn" onclick="location.reload()">Retake Quiz</button>
        </div>
      `;
    }
    
    formatAnswer(answer, options) {
      if (Array.isArray(answer)) {
        return answer.map(i => options[i]).join(', ');
      } else if (typeof answer === 'number') {
        return options[answer];
      } else {
        return answer;
      }
    }
    
    escapeHtml(text) {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, m => map[m]);
    }
  }
  
  // Export to window for global access
  window.QuizManager = QuizManager;
  window.QuizRenderer = QuizRenderer;
  
  // Auto-initialize quizzes on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Look for quiz containers
    const quizContainers = document.querySelectorAll('[data-quiz-id]');
    
    quizContainers.forEach(container => {
      const quizId = container.dataset.quizId;
      // Quiz data should be defined globally or loaded
      if (window.quizData && window.quizData[quizId]) {
        new QuizRenderer(window.quizData[quizId], container.id);
      }
    });
  });
  
})();

