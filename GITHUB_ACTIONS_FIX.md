# 🔧 GitHub Actions Deployment Fix

## ❌ Original Error

```
/home/runner/work/_temp/eed3f1ab-0a8f-401c-a570-4a3534cf4576.sh: line 1: mkdocs: command not found
Error: Process completed with exit code 127.
```

## 🔍 Root Cause

The GitHub Actions workflow was trying to run `mkdocs` without installing it first. The workflow environment doesn't have MkDocs or its dependencies installed by default.

## ✅ Solution Applied

### 1. Created GitHub Actions Workflow
Created `.github/workflows/deploy-docs.yml` with:
- Proper Python setup (Python 3.10)
- Installation of MkDocs and all required plugins
- Build step using `mkdocs build --strict`
- Deployment to GitHub Pages using official actions

### 2. Created Documentation Requirements File
Created `docs-requirements.txt` with all MkDocs dependencies:
- mkdocs
- mkdocs-material (theme)
- mkdocs-minify-plugin
- mkdocs-git-revision-date-localized-plugin

## 🚀 GitHub Pages Configuration

Before pushing, you need to configure GitHub Pages to use GitHub Actions:

### Step-by-Step Instructions:

1. **Go to your repository settings:**
   ```
   https://github.com/YonSci/ai-ml-climate-workshop/settings/pages
   ```

2. **Configure Pages:**
   - Under "Build and deployment"
   - **Source:** Select "GitHub Actions" (NOT "Deploy from a branch")
   
   ![GitHub Pages Settings](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/publishing-source-drop-down.webp)

3. **Save the settings**

## 📝 Commands to Deploy

Run these commands to commit and push your changes:

```cmd
cd c:\Users\yonas\Documents\ICPAC\python-ml-gha-workshop

git add .github\workflows\deploy-docs.yml docs-requirements.txt GITHUB_ACTIONS_FIX.md

git commit -m "Add GitHub Actions workflow for MkDocs deployment"

git push origin main
```

## 🔍 Workflow Details

The new workflow (`.github/workflows/deploy-docs.yml`) will:

1. **Trigger on:**
   - Push to `main` branch
   - Manual dispatch (you can trigger it manually from GitHub)

2. **Build Job:**
   - Checkout the repository with full git history
   - Set up Python 3.10
   - Install MkDocs and plugins
   - Build the documentation site
   - Upload the built site as an artifact

3. **Deploy Job:**
   - Deploy the built site to GitHub Pages
   - Make it available at: `https://yonsci.github.io/ai-ml-climate-workshop/`

## ✅ Verification Steps

After pushing the changes:

1. **Check the workflow run:**
   - Go to: `https://github.com/YonSci/ai-ml-climate-workshop/actions`
   - You should see a workflow run starting
   - Click on it to watch the progress

2. **Verify the build:**
   - The "build" job should complete successfully
   - The "deploy" job should complete successfully
   - Total time: ~2-3 minutes

3. **Check your site:**
   - After deployment completes, visit: `https://yonsci.github.io/ai-ml-climate-workshop/`
   - Your documentation should be live!

## 🛠️ Local Testing

To test the documentation build locally before pushing:

```cmd
cd c:\Users\yonas\Documents\ICPAC\python-ml-gha-workshop

pip install -r docs-requirements.txt

mkdocs serve
```

Then open your browser to `http://127.0.0.1:8000/` to preview the site.

To build without serving:
```cmd
mkdocs build
```

## 🔧 Troubleshooting

### If the workflow fails:

1. **Check the workflow logs:**
   - Go to Actions tab in your repository
   - Click on the failed workflow run
   - Expand the failed step to see error details

2. **Common issues:**
   - **Missing plugin:** Add it to `docs-requirements.txt` and the workflow
   - **Python version mismatch:** Ensure workflow uses Python 3.10
   - **Permissions:** Make sure GitHub Pages is configured to use Actions

3. **Test locally first:**
   - Always test `mkdocs build` locally before pushing
   - This catches most configuration errors

### If GitHub Pages doesn't update:

1. **Check Pages settings:**
   - Ensure "Source" is set to "GitHub Actions"
   - NOT "Deploy from a branch"

2. **Check workflow permissions:**
   - Go to: Settings → Actions → General → Workflow permissions
   - Ensure "Read and write permissions" is enabled

3. **Clear browser cache:**
   - GitHub Pages can be cached
   - Try hard refresh (Ctrl+F5) or incognito mode

## 📋 Files Created

- ✅ `.github/workflows/deploy-docs.yml` - GitHub Actions workflow
- ✅ `docs-requirements.txt` - Documentation dependencies
- ✅ `GITHUB_ACTIONS_FIX.md` - This documentation

## 🎯 Summary

The GitHub Actions deployment will now:
- ✅ Install MkDocs and all plugins automatically
- ✅ Build your documentation site
- ✅ Deploy to GitHub Pages
- ✅ Update automatically on every push to `main`

No more "mkdocs: command not found" errors!

---

**Status:** ✅ Fix applied - Ready for deployment  
**Next:** Configure GitHub Pages settings and push changes

