# 🔍 Quiz Debugging Guide

## Changes Made

Added manual initialization scripts to both quiz pages with console logging to help identify any remaining issues.

---

## How to Debug

### 1. Open Browser Console

1. Navigate to the Python Basics quiz page
2. Press **F12** to open Developer Tools
3. Click on the **Console** tab

### 2. Check Console Output

You should see these messages:

```
✅ Initializing Python quiz...
✅ Quiz data available: {python-basics: {...}, numpy: {...}}
✅ Python basics data: {id: "python-basics", title: "...", questions: [...]}
✅ Rendering quiz manually...
```

### 3. Possible Issues & Solutions

#### Issue 1: "Quiz data not loaded!"
**Symptoms:**
```
❌ Quiz data not loaded!
```

**Cause:** The quiz data JavaScript file didn't load.

**Solution:**
- Check Network tab for 404 errors
- Verify files exist at `/js/python-basics-data.js` and `/js/numpy-data.js`

---

#### Issue 2: "Quiz data available: undefined"
**Symptoms:**
```
❌ Quiz data available: undefined
```

**Cause:** `window.quizData` object not created.

**Solution:**
- Check if quiz data files loaded (Network tab)
- Verify quiz data files start with: `window.quizData = window.quizData || {};`

---

#### Issue 3: "QuizRenderer is not defined"
**Symptoms:**
```
❌ ReferenceError: QuizRenderer is not defined
```

**Cause:** `quiz-system.js` didn't load.

**Solution:**
- Check Network tab for `/js/quiz-system.js`
- Verify file exists in `docs/js/`

---

#### Issue 4: No errors, but no quiz visible
**Symptoms:**
- Console shows success messages
- But no quiz appears on page

**Solution:**
- Inspect the `#python-basics-quiz` div
- Check if `.quiz-container` was added inside
- Look for CSS issues (check Styles tab)

---

## Quick Checks

### Check 1: Files Loaded
In Console, type:
```javascript
window.quizData
```
Should show: `{python-basics: {...}, numpy: {...}}`

### Check 2: Quiz System Loaded
In Console, type:
```javascript
typeof QuizRenderer
```
Should show: `"function"`

### Check 3: Container Exists
In Console, type:
```javascript
document.getElementById('python-basics-quiz')
```
Should show: `<div id="python-basics-quiz" ...>`

### Check 4: Quiz Rendered
In Console, type:
```javascript
document.querySelector('.quiz-container')
```
Should show: `<div class="quiz-container">...` if quiz rendered

---

## Manual Test

If auto-initialization fails, try manually in console:

```javascript
// Check quiz data
console.log(window.quizData['python-basics']);

// Try rendering manually
new QuizRenderer(window.quizData['python-basics'], 'python-basics-quiz');
```

---

## Network Tab Check

1. Open Developer Tools (F12)
2. Click **Network** tab
3. Reload the page
4. Filter by **JS**
5. Verify these files loaded (Status 200):
   - `quiz-system.js`
   - `python-basics-data.js`

---

## What You Should See

### Successful Load:
```
Initializing Python quiz...
Quiz data available: Object { python-basics: {…}, numpy: {…} }
Python basics data: Object { id: "python-basics", title: "Python Fundamentals Quiz", description: "...", questions: (10) […] }
Rendering quiz manually...
```

### Then on the page:
- ✅ Quiz title and description
- ✅ Progress bar
- ✅ Question 1 with options
- ✅ Previous/Next buttons
- ✅ Can select answers

---

## Still Not Working?

### Report These Details:

1. **Console Messages:** (Copy all messages from console)
2. **Network Errors:** (Any 404s or failed requests)
3. **Browser:** (Chrome, Firefox, Edge, etc.)
4. **What You See:** (Empty div? Error message? Partial content?)

---

## Common Solutions

### Clear Browser Cache
Sometimes old files are cached:
1. Press **Ctrl + Shift + R** (hard reload)
2. Or: Developer Tools → Network tab → Check "Disable cache"

### Restart MkDocs Server
Stop and restart to ensure fresh build:
```cmd
# In terminal: Ctrl+C to stop
mkdocs serve
```

---

## Expected HTML Structure

When quiz loads successfully:

```html
<div id="python-basics-quiz" data-quiz-id="python-basics">
  <div class="quiz-container">
    <div class="quiz-header">
      <h3>Python Fundamentals Quiz</h3>
      <div class="quiz-progress">
        <div class="progress-bar-quiz">
          <div class="progress-fill-quiz" style="width: 10%"></div>
        </div>
        <span class="progress-text-quiz">Question 1 of 10</span>
      </div>
    </div>
    <div class="quiz-body">
      <div class="question-container">
        <div class="question-card">
          <!-- Question content here -->
        </div>
      </div>
    </div>
    <div class="quiz-footer">
      <button class="quiz-btn quiz-btn-prev" disabled>← Previous</button>
      <button class="quiz-btn quiz-btn-next">Next →</button>
    </div>
  </div>
</div>
```

---

**Try the quiz now and check the console output!** 🔍

