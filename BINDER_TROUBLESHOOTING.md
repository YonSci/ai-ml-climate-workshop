# 🔧 Binder Troubleshooting Guide

If you're getting the error "Could not resolve ref for gh:YonSci/python-ml-gha-workshop/HEAD", here are the steps to fix it:

## ✅ **Step 1: Verify Repository Details**

1. **Check your GitHub repository name**:
   - Go to your GitHub repository
   - Copy the exact repository name from the URL
   - It should be something like: `https://github.com/YonSci/[EXACT-REPO-NAME]`

2. **Ensure repository is public**:
   - Binder only works with public repositories
   - Go to Settings → General → Change repository visibility

## ✅ **Step 2: Update Binder URLs**

Replace `python-ml-gha-workshop` in all Binder URLs with your **exact repository name**.

**Current URL format:**
```
https://mybinder.org/v2/gh/YonSci/python-ml-gha-workshop/HEAD?labpath=day1%2FNotebook.ipynb
```

**Should be:**
```
https://mybinder.org/v2/gh/YonSci/[YOUR-EXACT-REPO-NAME]/HEAD?labpath=day1%2FNotebook.ipynb
```

## ✅ **Step 3: Verify File Structure**

Your repository should look like this:
```
your-repo/
├── day1/
│   ├── Python_Basics_for_Climate_and_Meteorology_Workshop1.ipynb
│   └── Python_Setup_for_Climate_and_Meteorology_Workshop.ipynb
├── day2/
│   └── Day2_NumPy_Pandas_for_Climate.ipynb
├── requirements.txt          # ← Must be in root
├── environment.yml           # ← Must be in root  
├── runtime.txt              # ← Must be in root
└── postBuild               # ← Must be in root
```

## ✅ **Step 4: Test with Simple URL**

Try this basic Binder URL first (replace `[YOUR-REPO-NAME]`):
```
https://mybinder.org/v2/gh/YonSci/[YOUR-REPO-NAME]/HEAD
```

This should launch a basic Jupyter environment without opening a specific notebook.

## ✅ **Step 5: Alternative Repository Names to Try**

Common variations:
- `ai-ml-climate-workshop`
- `python-ml-gha-workshop` 
- `climate-ml-workshop`
- `gha-workshop`

## ✅ **Step 6: Manual Fix Commands**

Run these commands to update all Binder URLs at once:

**Windows (PowerShell):**
```powershell
# Replace 'NEW-REPO-NAME' with your actual repository name
$oldName = "python-ml-gha-workshop"
$newName = "NEW-REPO-NAME"

Get-ChildItem -Path "docs" -Recurse -Filter "*.md" | ForEach-Object {
    (Get-Content $_.FullName) -replace $oldName, $newName | Set-Content $_.FullName
}
```

**Linux/Mac:**
```bash
# Replace 'NEW-REPO-NAME' with your actual repository name
find docs -name "*.md" -type f -exec sed -i 's/python-ml-gha-workshop/NEW-REPO-NAME/g' {} \;
```

## ✅ **Step 7: Test Individual Components**

1. **Test requirements.txt**:
   ```
   https://mybinder.org/v2/gh/YonSci/[YOUR-REPO]/HEAD
   ```

2. **Test specific notebook**:
   ```
   https://mybinder.org/v2/gh/YonSci/[YOUR-REPO]/HEAD?labpath=day1%2FPython_Basics_for_Climate_and_Meteorology_Workshop1.ipynb
   ```

## 🚨 **Common Issues & Solutions**

### Issue: "Repository not found"
**Solution**: Repository name is wrong or repository is private

### Issue: "No configuration files found"  
**Solution**: Move `requirements.txt` to repository root

### Issue: "Build failed"
**Solution**: Check `requirements.txt` for invalid package names

### Issue: "Notebook not found"
**Solution**: Check notebook path and filename exactly

## 📞 **Quick Help**

**What's your exact repository URL?** 
- Go to your GitHub repo
- Copy the URL from browser address bar
- Share this to get the correct Binder URL format

**Still not working?**
1. Try the basic Binder URL without `?labpath=...`
2. Check the Binder build logs for specific error messages
3. Verify all files are committed and pushed to GitHub

---

**Need immediate help?** Create a simple test repository with just one notebook and basic `requirements.txt` to verify Binder works with your account.
