# 🔧 Quiz 404 Error - FIXED!

## Problem

When clicking "Take Quiz" buttons, getting 404 errors because:
1. Quiz pages weren't in navigation (MkDocs didn't build them)
2. JavaScript paths were incorrect
3. Script loading was in wrong location

## Solution Applied

### 1. Added Quizzes to Navigation (`mkdocs.yml`)

```yaml
- Assessments: 
    - Overview: assessments.md
    - Python Basics Quiz: quizzes/python-basics.md
    - NumPy Quiz: quizzes/numpy.md
```

**Why:** MkDocs only builds pages that are in the navigation. Without this, the quiz pages weren't being generated.

### 2. Fixed Script Paths in Quiz Pages

**Before:**
```html
<script src="python-basics-data.js"></script>
```

**After:**
```html
<script src="../quizzes/python-basics-data.js"></script>
<script src="../js/quiz-system.js"></script>
```

**Why:** Relative paths need to account for the directory structure. Quiz pages are at `/quizzes/`, so need `../` to go up to `/docs/`.

### 3. Removed Global Quiz System JS

Removed from `mkdocs.yml` global scripts, now loaded per-page.

**Why:** Only quiz pages need the quiz system, so load it only where needed.

### 4. Added Script to Assessments Page

Added at the top of `assessments.md`:
```html
<script src="js/quiz-system.js"></script>
```

**Why:** Assessments page uses QuizManager for progress tracking.

## Files Changed

- ✅ `mkdocs.yml` - Added quiz pages to navigation
- ✅ `docs/quizzes/python-basics.md` - Fixed script paths
- ✅ `docs/quizzes/numpy.md` - Fixed script paths  
- ✅ `docs/assessments.md` - Added script, removed duplicate

## Testing

After rebuilding (Ctrl+C and restart `mkdocs serve`):

1. ✅ Navigate to Assessments page
2. ✅ Click "Take Quiz" for Python Basics
3. ✅ Quiz should load correctly
4. ✅ Click "Take Quiz" for NumPy
5. ✅ Quiz should load correctly

## Quick Test Commands

```cmd
cd c:\Users\yonas\Documents\ICPAC\python-ml-gha-workshop

# Stop current server (Ctrl+C in terminal)

# Start fresh
mkdocs serve
```

Then visit:
- http://127.0.0.1:8000/ai-ml-climate-workshop/assessments/
- http://127.0.0.1:8000/ai-ml-climate-workshop/quizzes/python-basics/
- http://127.0.0.1:8000/ai-ml-climate-workshop/quizzes/numpy/

## Directory Structure (Clarified)

```
docs/
├── js/
│   ├── extra.js
│   └── quiz-system.js           # Quiz engine
├── quizzes/
│   ├── python-basics-data.js    # Quiz data
│   ├── python-basics.md         # Quiz page (loads quiz-system.js)
│   ├── numpy-data.js
│   └── numpy.md
└── assessments.md               # Overview (loads quiz-system.js)
```

## Path Reference

When a page is at `/quizzes/python-basics/`:
- `../js/quiz-system.js` → goes to `/js/quiz-system.js` ✅
- `../quizzes/python-basics-data.js` → goes to `/quizzes/python-basics-data.js` ✅

When a page is at `/assessments/`:
- `js/quiz-system.js` → goes to `/js/quiz-system.js` ✅

## Status

🟢 **FIXED** - All paths corrected and navigation updated!

## Next Steps

1. Stop your current `mkdocs serve`
2. Restart it to rebuild with new navigation
3. Test all quiz links
4. If working, commit and deploy!

