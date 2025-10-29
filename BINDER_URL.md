# 🚀 Correct Binder URL

## ✅ Your Repository Information

**GitHub Repository Name:** `ai-ml-climate-workshop`  
**GitHub URL:** https://github.com/YonSci/ai-ml-climate-workshop

## 🔗 Correct Binder URLs

### Launch Full Binder Environment
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD
```

### Launch Specific Notebooks

**Day 1 - Python Basics:**
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday1%2FPython_Basics_for_Climate_and_Meteorology_Workshop1.ipynb
```

**Day 2 - NumPy:**
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday2%2FNumpy_for_Climate_and_Meteorology_Workshop.ipynb
```

**Day 2 - Pandas:**
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday2%2FPandas_for_Climate_and_Meteorology_Workshop.ipynb
```

**Day 3 - Matplotlib:**
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday3%2FMatplotlib_for_Climate_and_Meteorology_Workshop.ipynb
```

**Day 3 - Xarray:**
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday3%2FXarray_for_Climate_and_Meteorology_Workshop.ipynb
```

**Day 4 - Cartopy:**
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday4%2FCartopy_for_Climate_and_Meteorology_Workshop.ipynb
```

**Day 4 - GeoPandas:**
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday4%2FGeopandas_for_Climate_and_Meteorology_Workshop.ipynb
```

**Day 5 - ML Workflows:**
```
https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday5%2F01-download-preprocessing-chrips-data.ipynb
```

## 📋 Binder Badge Markdown

Use these badges in your documentation:

**Basic Badge:**
```markdown
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD)
```

**With Specific Notebook:**
```markdown
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2Fday1%2FPython_Basics_for_Climate_and_Meteorology_Workshop1.ipynb)
```

## 🔍 Troubleshooting

If you still get "Could not resolve ref" error:

1. **Verify repository is public:**
   - Go to https://github.com/YonSci/ai-ml-climate-workshop
   - Check Settings → General → Repository visibility
   - It should say "Public"

2. **Check that files are pushed:**
   - Verify `environment.yml` exists in the root directory
   - Verify `runtime.txt` exists in the root directory
   - Verify `postBuild` exists in the root directory

3. **Clear Binder cache:**
   - Sometimes Binder caches old builds
   - Wait a few minutes and try again
   - Or try: `https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/main` (using 'main' instead of 'HEAD')

## ✅ Next Steps

1. Make sure your repository is public on GitHub
2. Push all the changes (environment.yml, runtime.txt, etc.)
3. Use the correct URL: `https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD`
4. Wait 5-10 minutes for the first build

---

**Note:** The previous URL using `python-ml-gha-workshop` was incorrect. Your repository is actually named `ai-ml-climate-workshop`.

