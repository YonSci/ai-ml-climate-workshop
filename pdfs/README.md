# Workshop PDFs Directory

This directory contains PDF versions of all workshop materials.

## Quick Start

### Generate PDFs

```bash
# From project root
python generate_pdfs.py
```

PDFs will be automatically generated in this directory.

## Directory Structure

```
pdfs/
├── 01-python-basics.pdf
├── 01-numpy.pdf
├── 02-pandas.pdf
├── 01-matplotlib.pdf
├── 02-xarray-netcdf.pdf
├── 01-cartopy.pdf
├── 02-geopandas.pdf
├── 03-ml-intro.pdf
├── 04-ml-workflow.pdf
├── 01-ml-based-s2s-prediction.pdf
├── 02-ml-based-s2s-prediction.pdf
├── 03-ml-based-s2s-prediction.pdf
├── 04-ml-based-s2s-prediction.pdf
├── 05-ml-based-s2s-prediction.pdf
├── setup.pdf
├── prerequisites.pdf
├── resources.pdf
├── faq.pdf
└── complete_workshop.zip
```

## File Naming Convention

- **Day lessons:** `##-lesson-name.pdf`
- **Reference materials:** `page-name.pdf`
- **Complete package:** `complete_workshop.zip`

## Generating PDFs

See `PDF_GENERATION_GUIDE.md` for detailed instructions.

### Option 1: WeasyPrint (Recommended)
```bash
pip install weasyprint markdown
python generate_pdfs.py
```

### Option 2: Pandoc
```bash
# Install Pandoc first
python generate_pdfs.py
```

## Updating PDFs

When lessons are updated:

```bash
# Regenerate all PDFs
python generate_pdfs.py

# Commit changes
git add pdfs/
git commit -m "Update PDFs"
git push
```

## Git Configuration

### Keep PDFs in Git (Current)

PDFs are committed to make them easily downloadable via GitHub Pages.

**Pros:**
- Easy distribution
- Version history
- No external hosting needed

**Cons:**
- Larger repository size
- Binary files in git

### Alternative: Generate on Demand

Add to `.gitignore`:
```
pdfs/*.pdf
!pdfs/README.md
```

Then regenerate PDFs as needed or use GitHub Actions.

## Download Links

PDFs are available at:
```
https://yonsci.github.io/ai-ml-climate-workshop/pdfs/
```

Or through the Downloads page:
```
https://yonsci.github.io/ai-ml-climate-workshop/downloads/
```

## File Sizes

Approximate sizes:
- Individual lessons: 1-6 MB
- Complete ZIP: ~15-20 MB
- Total: ~50-60 MB

## License

All PDF materials are licensed under MIT License, same as the workshop content.

## Support

For issues with PDF generation:
- Check `PDF_GENERATION_GUIDE.md`
- Verify dependencies are installed
- Test with a single file first
- Check console output for errors

---

**Last Updated:** Check individual PDF metadata for generation timestamp

