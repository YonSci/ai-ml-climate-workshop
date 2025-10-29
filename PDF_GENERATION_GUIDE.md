# 📄 PDF Generation Guide

Complete guide for generating PDF versions of workshop materials.

## Quick Start

### Option 1: Using WeasyPrint (Recommended)

```bash
# Install WeasyPrint
pip install weasyprint markdown

# Generate PDFs
python generate_pdfs.py
```

### Option 2: Using Pandoc

```bash
# Install Pandoc (Windows)
choco install pandoc

# Or download from: https://pandoc.org/installing.html

# Generate PDFs
python generate_pdfs.py
```

### Option 3: Using MkDocs PDF Export Plugin

```bash
# Install the plugin
pip install mkdocs-pdf-export-plugin

# Add to mkdocs.yml:
# plugins:
#   - pdf-export:
#       verbose: true
#       media_type: print
#       combined: true
#       combined_output_path: pdf/workshop-complete.pdf

# Build with PDFs
mkdocs build
```

---

## Method 1: WeasyPrint (Best Quality)

### Installation

```bash
# Windows
pip install weasyprint markdown

# The script will also install:
pip install Pygments  # For code highlighting
```

### Generate PDFs

```bash
# Generate all PDFs
python generate_pdfs.py

# PDFs will be in the 'pdfs/' directory
```

### What Gets Generated

The script converts all markdown files in:
- `docs/day1/` - Day 1 lessons
- `docs/day2/` - Day 2 lessons
- `docs/day3/` - Day 3 lessons
- `docs/day4/` - Day 4 lessons
- `docs/day5/` - Day 5 lessons
- Key pages: `setup.md`, `prerequisites.md`, `resources.md`, `faq.md`

### PDF Features

- **Professional styling** with ILRI branding
- **Syntax highlighting** for code blocks
- **Page numbers** in footer
- **Table of contents** (if markdown has TOC)
- **Clickable links** (preserved from markdown)
- **A4 page size** with proper margins
- **Print-optimized** layout

---

## Method 2: Pandoc (Cross-Platform)

### Installation

#### Windows:
```cmd
# Using Chocolatey
choco install pandoc

# Or download installer from:
# https://pandoc.org/installing.html

# Also need wkhtmltopdf for PDF generation
choco install wkhtmltopdf
```

#### Linux:
```bash
sudo apt-get install pandoc wkhtmltopdf
```

#### macOS:
```bash
brew install pandoc wkhtmltopdf
```

### Generate PDFs

```bash
# Single file
pandoc docs/day1/01-python-basics.md -o pdfs/01-python-basics.pdf \
  --pdf-engine=wkhtmltopdf \
  --variable geometry:margin=2cm \
  --toc

# Or use the script
python generate_pdfs.py
```

---

## Method 3: MkDocs PDF Plugin

### Installation

```bash
pip install mkdocs-pdf-export-plugin
```

### Configuration

Add to `mkdocs.yml`:

```yaml
plugins:
  - search
  - pdf-export:
      verbose: true
      media_type: print
      enabled_if_env: ENABLE_PDF_EXPORT
      combined: true
      combined_output_path: pdf/complete-workshop.pdf
```

### Generate

```bash
# Set environment variable
export ENABLE_PDF_EXPORT=1  # Linux/Mac
set ENABLE_PDF_EXPORT=1     # Windows

# Build site with PDFs
mkdocs build

# PDFs will be in site/pdf/ directory
```

---

## Manual PDF Generation

### Using Browser Print

For individual pages:

1. Open the page in your browser
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. Select "Save as PDF"
4. Configure settings:
   - **Layout:** Portrait
   - **Margins:** Default
   - **Background graphics:** On
   - **Headers/Footers:** Optional
5. Save the PDF

### Using Chrome DevTools

For better control:

```javascript
// Open DevTools Console (F12)
// Run this in console:
window.print();
```

Then use "Save as PDF" option.

---

## Creating Combined PDFs

### Combine Individual PDFs

#### Using PyPDF2:

```python
from PyPDF2 import PdfMerger

merger = PdfMerger()

files = [
    'pdfs/01-python-basics.pdf',
    'pdfs/01-numpy.pdf',
    'pdfs/02-pandas.pdf',
    # Add all files in order
]

for pdf in files:
    merger.append(pdf)

merger.write('pdfs/complete_workshop.pdf')
merger.close()
```

#### Using pdftk (Command Line):

```bash
# Install pdftk
sudo apt-get install pdftk  # Linux
brew install pdftk-java     # Mac

# Combine PDFs
pdftk pdfs/*.pdf cat output pdfs/complete_workshop.pdf
```

---

## Customizing PDF Output

### Edit generate_pdfs.py

Modify the CSS in the `convert_with_weasyprint()` function:

```python
# Change colors
h1 {
    color: #YOUR_COLOR;
    border-bottom: 2px solid #YOUR_COLOR;
}

# Change fonts
body {
    font-family: 'YOUR_FONT', sans-serif;
}

# Change page size
@page {
    size: Letter;  # or A4, Legal, etc.
    margin: 1.5cm;
}
```

### Custom Headers/Footers

```python
@page {
    @top-center {
        content: "Workshop Title";
        font-size: 10pt;
        color: #666;
    }
    @bottom-right {
        content: "Page " counter(page);
    }
}
```

---

## GitHub Actions Integration

### Automatic PDF Generation

Create `.github/workflows/generate-pdfs.yml`:

```yaml
name: Generate PDFs

on:
  push:
    branches: [main]
    paths:
      - 'docs/**/*.md'

jobs:
  generate-pdfs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: |
          pip install weasyprint markdown Pygments
      
      - name: Generate PDFs
        run: python generate_pdfs.py
      
      - name: Upload PDFs
        uses: actions/upload-artifact@v3
        with:
          name: workshop-pdfs
          path: pdfs/
      
      - name: Commit PDFs
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add pdfs/
          git commit -m "Update PDFs" || echo "No changes"
          git push
```

---

## Troubleshooting

### WeasyPrint Issues

**Error: "cairo" library not found**

Windows:
```bash
# Download GTK3 runtime
# https://github.com/tschoonj/GTK-for-Windows-Runtime-Environment-Installer/releases
# Install and add to PATH
```

Linux:
```bash
sudo apt-get install python3-dev python3-pip python3-setuptools \
  python3-wheel python3-cffi libcairo2 libpango-1.0-0 \
  libpangocairo-1.0-0 libgdk-pixbuf2.0-0 libffi-dev shared-mime-info
```

### Pandoc Issues

**Error: "wkhtmltopdf" not found**

```bash
# Windows
choco install wkhtmltopdf

# Linux
sudo apt-get install wkhtmltopdf

# Mac
brew install wkhtmltopdf
```

### Font Issues

**Missing fonts in PDF**

```python
# In generate_pdfs.py, add font paths:
from weasyprint.text.fonts import FontConfiguration

font_config = FontConfiguration()
# Use system fonts or specify custom font directories
```

### Large File Sizes

**PDFs too large**

1. **Optimize images** before PDF generation
2. **Reduce image quality** in CSS:
   ```css
   img {
       image-rendering: optimizeSpeed;
   }
   ```
3. **Compress PDFs** after generation:
   ```bash
   gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
      -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
      -sOutputFile=output.pdf input.pdf
   ```

---

## Quality Checklist

Before distributing PDFs:

- [ ] All pages render correctly
- [ ] Code blocks are readable
- [ ] Images are clear
- [ ] Links work (if applicable)
- [ ] Page numbers are correct
- [ ] Table of contents is accurate
- [ ] Headers/footers display properly
- [ ] No content is cut off
- [ ] File size is reasonable (<5MB per file)
- [ ] Metadata is set (title, author)

---

## Distribution

### Hosting Options

1. **GitHub Releases:**
   - Create a release
   - Attach PDF files
   - Versioned downloads

2. **GitHub Pages (current):**
   - Store in `pdfs/` directory
   - Link from documentation
   - Automatic hosting

3. **Cloud Storage:**
   - Google Drive
   - Dropbox
   - OneDrive
   - Share links in docs

### File Naming Convention

```
Workshop_Day1_PythonBasics.pdf
Workshop_Day2_NumPy.pdf
Workshop_Day2_Pandas.pdf
Workshop_CompletePackage.zip
```

---

## Automation Script

### Batch Generate All PDFs

```bash
#!/bin/bash
# generate_all_pdfs.sh

echo "Generating PDFs for workshop materials..."

# Create output directory
mkdir -p pdfs

# Generate individual PDFs
python generate_pdfs.py

# Create ZIP archive
cd pdfs
zip -r complete_workshop.zip *.pdf
cd ..

echo "Done! PDFs are in pdfs/ directory"
echo "Complete package: pdfs/complete_workshop.zip"
```

---

## Maintenance

### Updating PDFs

When lesson content changes:

```bash
# Regenerate all PDFs
python generate_pdfs.py

# Or regenerate specific lesson
python generate_pdfs.py --file docs/day1/01-python-basics.md

# Commit updated PDFs
git add pdfs/
git commit -m "Update PDFs for revised lessons"
git push
```

### Version Control

Consider `.gitignore` for PDFs if regenerating on-demand:

```
# .gitignore
pdfs/*.pdf
!pdfs/README.md
```

Or keep PDFs in git for easy distribution.

---

## Resources

- [WeasyPrint Documentation](https://weasyprint.readthedocs.io/)
- [Pandoc Manual](https://pandoc.org/MANUAL.html)
- [MkDocs PDF Plugin](https://github.com/zhaoterryy/mkdocs-pdf-export-plugin)
- [PyPDF2 Documentation](https://pypdf2.readthedocs.io/)

---

**Ready to generate PDFs? Run the script and check the output!**

