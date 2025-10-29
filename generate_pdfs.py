#!/usr/bin/env python3
"""
Generate PDF versions of workshop materials
Converts Markdown files to PDF using markdown-pdf or weasyprint
"""

import os
import sys
from pathlib import Path
import subprocess

def check_dependencies():
    """Check if required tools are installed"""
    print("Checking dependencies...")
    
    # Check if weasyprint is available
    try:
        import weasyprint
        print("✓ WeasyPrint found")
        return 'weasyprint'
    except ImportError:
        pass
    
    # Check if markdown-pdf is available
    try:
        result = subprocess.run(['markdown-pdf', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ markdown-pdf found")
            return 'markdown-pdf'
    except FileNotFoundError:
        pass
    
    # Check if pandoc is available
    try:
        result = subprocess.run(['pandoc', '--version'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            print("✓ Pandoc found")
            return 'pandoc'
    except FileNotFoundError:
        pass
    
    print("\n❌ No PDF generation tool found!")
    print("\nPlease install one of the following:")
    print("1. WeasyPrint (recommended):")
    print("   pip install weasyprint")
    print("\n2. Pandoc + wkhtmltopdf:")
    print("   - Install Pandoc: https://pandoc.org/installing.html")
    print("   - Install wkhtmltopdf: https://wkhtmltopdf.org/downloads.html")
    print("\n3. markdown-pdf (Node.js):")
    print("   npm install -g markdown-pdf")
    return None

def convert_with_weasyprint(md_file, output_dir):
    """Convert markdown to PDF using WeasyPrint"""
    import markdown
    from weasyprint import HTML, CSS
    from weasyprint.text.fonts import FontConfiguration
    
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
                @bottom-right {{
                    content: counter(page) " of " counter(pages);
                    font-size: 9pt;
                    color: #666;
                }}
            }}
            body {{
                font-family: 'Arial', sans-serif;
                font-size: 11pt;
                line-height: 1.6;
                color: #333;
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
            img {{
                max-width: 100%;
                height: auto;
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
    
    # Generate PDF
    output_file = output_dir / f"{md_file.stem}.pdf"
    font_config = FontConfiguration()
    HTML(string=styled_html).write_pdf(
        output_file,
        font_config=font_config
    )
    
    return output_file

def convert_with_pandoc(md_file, output_dir):
    """Convert markdown to PDF using Pandoc"""
    output_file = output_dir / f"{md_file.stem}.pdf"
    
    cmd = [
        'pandoc',
        str(md_file),
        '-o', str(output_file),
        '--pdf-engine=wkhtmltopdf',
        '--variable', 'geometry:margin=2cm',
        '--variable', 'fontsize=11pt',
        '--toc',
        '--toc-depth=3',
        '-V', 'colorlinks=true',
        '-V', 'linkcolor=blue',
        '-V', 'urlcolor=blue'
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error converting {md_file.name}: {result.stderr}")
        return None
    
    return output_file

def convert_with_markdown_pdf(md_file, output_dir):
    """Convert markdown to PDF using markdown-pdf"""
    output_file = output_dir / f"{md_file.stem}.pdf"
    
    cmd = [
        'markdown-pdf',
        str(md_file),
        '-o', str(output_file)
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error converting {md_file.name}: {result.stderr}")
        return None
    
    return output_file

def generate_pdfs(tool='weasyprint'):
    """Generate PDFs for all lesson files"""
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
            if tool == 'weasyprint':
                output_file = convert_with_weasyprint(md_file, output_dir)
            elif tool == 'pandoc':
                output_file = convert_with_pandoc(md_file, output_dir)
            elif tool == 'markdown-pdf':
                output_file = convert_with_markdown_pdf(md_file, output_dir)
            
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
    print("Workshop PDF Generator")
    print("=" * 60)
    
    # Check dependencies
    tool = check_dependencies()
    if not tool:
        sys.exit(1)
    
    # Generate PDFs
    converted, failed = generate_pdfs(tool)
    
    if failed > 0:
        sys.exit(1)

if __name__ == '__main__':
    main()

