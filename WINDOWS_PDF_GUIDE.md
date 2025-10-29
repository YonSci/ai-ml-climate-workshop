# 📄 PDF Generation Guide for Windows

Simple methods to generate PDFs on Windows without complex dependencies.

## ⚡ Quick Start (Recommended for Windows)

### Method 1: Using Chrome Headless (Easiest!)

This method uses Google Chrome which you likely already have installed.

```cmd
# Install markdown library only
pip install markdown

# Generate PDFs using Chrome
python generate_pdfs_simple.py
```

**That's it!** PDFs will be in the `pdfs/` directory.

---

## 🔧 Method 1: Chrome Headless (Detailed)

### Requirements:
- ✅ Google Chrome (probably already installed)
- ✅ Python with markdown library

### Installation:

```cmd
# Install markdown library
pip install markdown
```

### Generate PDFs:

```cmd
cd c:\Users\yonas\Documents\ICPAC\python-ml-gha-workshop

python generate_pdfs_simple.py
```

### What It Does:
1. Converts Markdown → HTML with styling
2. Uses Chrome's built-in PDF printer
3. Creates professional PDFs with ILRI branding
4. No complex dependencies!

---

## 📝 Method 2: Online Conversion (No Installation)

If you want to avoid installing anything:

### Using Online Tools:

1. **Markdown to PDF Online**:
   - Visit: https://www.markdowntopdf.com/
   - Or: https://www.md2pdf.com/
   - Upload your `.md` files
   - Download generated PDFs

2. **Using GitHub**:
   - View the lesson on GitHub
   - Print the page (Ctrl+P)
   - Select "Save as PDF"
   - Done!

3. **Using Your Documentation Site**:
   - Open lesson on deployed site
   - Press Ctrl+P (Print)
   - Select "Save as PDF"
   - Configure margins and save

---

## 🖨️ Method 3: Browser Print (Manual but Reliable)

### For Each Lesson Page:

1. **Open the deployed site**:
   ```
   https://yonsci.github.io/ai-ml-climate-workshop/day1/01-python-basics/
   ```

2. **Open Print Dialog**:
   - Press `Ctrl+P`
   - Or right-click → Print

3. **Configure Settings**:
   - **Destination:** Save as PDF
   - **Layout:** Portrait
   - **Paper size:** A4
   - **Margins:** Default
   - **Options:** 
     - ✅ Background graphics
     - ❌ Headers and footers (optional)

4. **Save the PDF**:
   - Click "Save"
   - Name it appropriately (e.g., `01-python-basics.pdf`)

### Batch Print Script:

Save this as `print_pages.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Batch Print Workshop Pages</title>
</head>
<body>
    <h1>Workshop PDF Generator</h1>
    <p>Click links to open pages, then Ctrl+P to print each</p>
    
    <h2>Day 1</h2>
    <ul>
        <li><a href="https://yonsci.github.io/ai-ml-climate-workshop/day1/01-python-basics/" target="_blank">Python Basics</a></li>
    </ul>
    
    <h2>Day 2</h2>
    <ul>
        <li><a href="https://yonsci.github.io/ai-ml-climate-workshop/day2/01-numpy/" target="_blank">NumPy</a></li>
        <li><a href="https://yonsci.github.io/ai-ml-climate-workshop/day2/02-pandas/" target="_blank">Pandas</a></li>
    </ul>
    
    <!-- Add more links for all lessons -->
    
    <script>
        // Auto-print function (optional)
        function printAll() {
            const links = document.querySelectorAll('a');
            links.forEach((link, index) => {
                setTimeout(() => {
                    const win = window.open(link.href, '_blank');
                    setTimeout(() => {
                        win.print();
                    }, 2000);
                }, index * 5000);
            });
        }
    </script>
    
    <button onclick="printAll()">Auto Print All (Advanced)</button>
</body>
</html>
```

---

## 🔧 Method 4: Using Pandoc (If Installed)

If you have Pandoc installed or want to install it:

### Installation:

```cmd
# Using Chocolatey (if you have it)
choco install pandoc

# Or download installer from:
# https://pandoc.org/installing.html
```

### Generate PDFs:

```cmd
# Single file
pandoc docs/day1/01-python-basics.md -o pdfs/01-python-basics.pdf ^
  --pdf-engine=wkhtmltopdf ^
  --variable geometry:margin=2cm ^
  --toc

# Or use a batch script
```

Save as `generate_with_pandoc.bat`:

```batch
@echo off
echo Generating PDFs with Pandoc...

mkdir pdfs 2>nul

for %%f in (docs\day1\*.md) do (
    echo Converting %%f...
    pandoc "%%f" -o "pdfs\%%~nf.pdf" --variable geometry:margin=2cm
)

for %%f in (docs\day2\*.md) do (
    echo Converting %%f...
    pandoc "%%f" -o "pdfs\%%~nf.pdf" --variable geometry:margin=2cm
)

echo Done!
pause
```

---

## 💡 Troubleshooting

### Chrome Method Issues:

**"Chrome not found" error:**
```cmd
# Check if Chrome is installed
dir "C:\Program Files\Google\Chrome\Application\chrome.exe"

# If not, download from:
# https://www.google.com/chrome/
```

**"markdown module not found":**
```cmd
pip install markdown
```

**PDFs look wrong:**
- Check the HTML is being generated correctly
- Look for temporary HTML files in pdfs/ directory
- Open temp HTML in browser to preview before PDF

### General Issues:

**Script fails completely:**
```cmd
# Check Python version
python --version

# Reinstall markdown
pip uninstall markdown
pip install markdown

# Try running with verbose output
python generate_pdfs_simple.py
```

**PDFs are too large:**
- This is normal for content-rich lessons
- Consider compressing images in markdown files
- Or use online PDF compressors after generation

---

## 🎯 Recommended Workflow for Windows

### Option A: Chrome Method (Best for Windows)

```cmd
# One-time setup
pip install markdown

# Generate PDFs
python generate_pdfs_simple.py

# Commit PDFs
git add pdfs/*.pdf
git commit -m "Add generated PDFs"
git push
```

### Option B: Manual Print (Most Reliable)

1. Deploy your site to GitHub Pages
2. Visit each lesson page
3. Print to PDF (Ctrl+P)
4. Save in pdfs/ directory
5. Commit and push

### Option C: Hybrid Approach

1. Use Chrome method for most lessons
2. Manually print any that fail
3. Review all PDFs before committing
4. Push to repository

---

## 📦 Creating Complete ZIP

After generating individual PDFs:

### Using Windows Explorer:
1. Navigate to `pdfs/` folder
2. Select all PDF files
3. Right-click → Send to → Compressed (zipped) folder
4. Rename to `complete_workshop.zip`

### Using PowerShell:
```powershell
# Create ZIP file
Compress-Archive -Path pdfs\*.pdf -DestinationPath pdfs\complete_workshop.zip
```

### Using Command Prompt (with 7-Zip):
```cmd
# If you have 7-Zip installed
cd pdfs
"C:\Program Files\7-Zip\7z.exe" a -tzip complete_workshop.zip *.pdf
```

---

## ✅ Verification Checklist

Before committing PDFs:

- [ ] All lesson PDFs generated
- [ ] File sizes are reasonable (<10MB each)
- [ ] Open and check a few PDFs manually
- [ ] Verify formatting looks good
- [ ] Code blocks are readable
- [ ] Images display correctly
- [ ] Complete ZIP created
- [ ] File names match download page links

---

## 🚀 Quick Commands Summary

```cmd
# Method 1: Chrome (Recommended)
pip install markdown
python generate_pdfs_simple.py

# Method 2: Manual Print
# Just use Ctrl+P on each page!

# Method 3: Pandoc
choco install pandoc
# Use batch script above

# After generation:
git add pdfs/
git commit -m "Add workshop PDFs"
git push origin main
```

---

## 📞 Need Help?

If all methods fail:

1. **Use the deployed site** + manual printing (most reliable)
2. **Ask someone with Linux/Mac** to run the original script
3. **Use GitHub Actions** (setup once, automatic after)
4. **Use online converters** for individual files

---

## 🎉 Success!

Once PDFs are generated and pushed:
- ✅ Download page will have working links
- ✅ Learners can download offline materials
- ✅ Professional branded PDFs available
- ✅ Complete workshop package accessible

**You're all set!** 🚀

