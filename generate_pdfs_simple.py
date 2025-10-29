#!/usr/bin/env python3
"""
Simple PDF generator using markdown2pdf or pdfkit (Windows-friendly)
Alternative to WeasyPrint which requires complex GTK installation on Windows
"""

import os
import sys
from pathlib import Path
import subprocess

def check_chrome_installed():
    """Check if Chrome or Chromium is installed"""
    chrome_paths = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
        os.path.expanduser(r"~\AppData\Local\Google\Chrome\Application\chrome.exe"),
    ]
    
    for path in chrome_paths:
        if os.path.exists(path):
            return path
    return None

def convert_with_chrome(md_file, output_dir, chrome_path):
    """Convert markdown to PDF using Chrome headless"""
    import markdown
    
    # Read markdown file
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(
        md_content,
        extensions=['extra', 'codehilite', 'toc', 'tables', 'fenced_code']
    )
    
    # Add CSS styling
    styled_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            @page {{
                size: A4;
                margin: 2cm;
            }}
            body {{
                font-family: Arial, sans-serif;
                font-size: 11pt;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
            }}
            h1 {{
                color: #009688;
                font-size: 24pt;
                margin-top: 20pt;
                border-bottom: 2px solid #009688;
                padding-bottom: 10pt;
            }}
            h2 {{
                color: #00695c;
                font-size: 18pt;
                margin-top: 15pt;
            }}
            h3 {{
                color: #00796b;
                font-size: 14pt;
                margin-top: 12pt;
            }}
            code {{
                background-color: #f5f5f5;
                padding: 2px 6px;
                border-radius: 3px;
                font-family: 'Courier New', monospace;
                font-size: 9pt;
            }}
            pre {{
                background-color: #f5f5f5;
                padding: 15px;
                border-radius: 5px;
                border-left: 4px solid #009688;
                overflow-x: auto;
                font-size: 9pt;
                line-height: 1.4;
            }}
            pre code {{
                background: none;
                padding: 0;
            }}
            table {{
                border-collapse: collapse;
                width: 100%;
                margin: 15px 0;
            }}
            th, td {{
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }}
            th {{
                background-color: #009688;
                color: white;
            }}
            blockquote {{
                border-left: 4px solid #009688;
                padding-left: 15px;
                margin-left: 0;
                color: #666;
                font-style: italic;
            }}
            .header {{
                text-align: center;
                color: #009688;
                margin-bottom: 30pt;
            }}
            .footer {{
                text-align: center;
                font-size: 9pt;
                color: #666;
                margin-top: 30pt;
                padding-top: 10pt;
                border-top: 1px solid #ddd;
            }}
        </style>
    </head>
    <body>
        <div class="header">
            <h1>AI/ML for Climate Workshop</h1>
            <p>International Livestock Research Institute (ILRI)</p>
        </div>
        {html_content}
        <div class="footer">
            <p>© 2025 ILRI - Python & AI/ML for Climate Prediction Training</p>
        </div>
    </body>
    </html>
    """
    
    # Save temporary HTML file
    temp_html = output_dir / f"{md_file.stem}_temp.html"
    with open(temp_html, 'w', encoding='utf-8') as f:
        f.write(styled_html)
    
    # Generate PDF using Chrome
    output_file = output_dir / f"{md_file.stem}.pdf"
    
    cmd = [
        chrome_path,
        '--headless',
        '--disable-gpu',
        '--print-to-pdf=' + str(output_file),
        '--no-margins',
        str(temp_html)
    ]
    
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        # Clean up temp file
        temp_html.unlink()
        return output_file
    except Exception as e:
        print(f"Error: {e}")
        if temp_html.exists():
            temp_html.unlink()
        return None

def generate_pdfs_chrome(chrome_path):
    """Generate PDFs using Chrome headless"""
    # Get the docs directory
    docs_dir = Path(__file__).parent / 'docs'
    output_dir = Path(__file__).parent / 'pdfs'
    output_dir.mkdir(exist_ok=True)
    
    # Find all lesson markdown files
    lesson_dirs = ['day1', 'day2', 'day3', 'day4', 'day5']
    lesson_files = []
    
    for day_dir in lesson_dirs:
        day_path = docs_dir / day_dir
        if day_path.exists():
            lesson_files.extend(day_path.glob('*.md'))
    
    # Also include key pages
    key_pages = ['setup.md', 'prerequisites.md', 'resources.md', 'faq.md']
    for page in key_pages:
        page_path = docs_dir / page
        if page_path.exists():
            lesson_files.append(page_path)
    
    print(f"\nFound {len(lesson_files)} files to convert")
    print(f"Output directory: {output_dir}\n")
    
    # Convert each file
    converted = 0
    failed = 0
    
    for md_file in sorted(lesson_files):
        print(f"Converting: {md_file.name}...", end=' ')
        
        try:
            output_file = convert_with_chrome(md_file, output_dir, chrome_path)
            
            if output_file and output_file.exists():
                size_kb = output_file.stat().st_size / 1024
                print(f"✓ ({size_kb:.1f} KB)")
                converted += 1
            else:
                print("✗ Failed")
                failed += 1
                
        except Exception as e:
            print(f"✗ Error: {e}")
            failed += 1
    
    print(f"\n{'='*60}")
    print(f"Conversion complete!")
    print(f"  ✓ Converted: {converted} files")
    if failed > 0:
        print(f"  ✗ Failed: {failed} files")
    print(f"  📁 Output: {output_dir}")
    print(f"{'='*60}\n")
    
    return converted, failed

def main():
    """Main function"""
    print("=" * 60)
    print("Workshop PDF Generator (Chrome Method)")
    print("=" * 60)
    
    # Check for markdown library
    try:
        import markdown
    except ImportError:
        print("\n❌ markdown library not found!")
        print("\nPlease install:")
        print("  pip install markdown")
        sys.exit(1)
    
    # Check for Chrome
    print("\nChecking for Google Chrome...")
    chrome_path = check_chrome_installed()
    
    if not chrome_path:
        print("\n❌ Google Chrome not found!")
        print("\nPlease install Google Chrome from:")
        print("  https://www.google.com/chrome/")
        print("\nOr use the online method (see WINDOWS_PDF_GUIDE.md)")
        sys.exit(1)
    
    print(f"✓ Chrome found: {chrome_path}")
    
    # Generate PDFs
    print("\nGenerating PDFs using Chrome headless mode...")
    converted, failed = generate_pdfs_chrome(chrome_path)
    
    if failed > 0:
        sys.exit(1)

if __name__ == '__main__':
    main()

