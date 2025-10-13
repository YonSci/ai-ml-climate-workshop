# 🌍 Python & AI/ML for Climate Prediction Training

[![MkDocs](https://img.shields.io/badge/docs-mkdocs-blue)](https://yonsci.github.io/python-ml-gha-workshop/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Material for MkDocs](https://img.shields.io/badge/material-mkdocs-teal)](https://squidfunk.github.io/mkdocs-material/)

A comprehensive training website for **Python and AI/ML applications in meteorology and climate science**, specifically designed for the Greater Horn of Africa (GHA) region.

## 📖 About

This foundational training program is organized in partnership with the **UK Met Office** and supported through the **Pan-African Seasonal Systems East Africa (PASS-EA) project** under the **WISER Africa program**, funded by the **United Kingdom Foreign, Commonwealth & Development Office (FCDO)**.

### 🎯 Mission
Strengthen the capacity of **National Meteorological and Hydrological Services (NMHSs)** from 11 countries across the GHA to produce and deliver reliable weather and climate forecasts that safeguard lives and livelihoods.

## 🚀 Features

- **📚 Interactive Learning Materials**: Comprehensive lessons on Python, xarray/NetCDF, and AI/ML
- **💻 Hands-on Approach**: Jupyter Notebook-based exercises and real-world examples
- **🤝 Real-time Collaboration**: Integrated collaborative platform for Q&A and discussions
- **📱 Responsive Design**: Mobile-friendly interface with modern Material Design
- **🎨 Professional Styling**: Clean, accessible design with consistent branding
- **🔗 Partner Integration**: Showcases supporting organizations and funders

## 📋 Training Content

### Sessions
- **Python Basics**: Fundamental programming concepts for climate science
- **Xarray & NetCDF**: Working with multidimensional climate datasets
- **Climate Datasets**: ERA5, CHIRPS, and other essential data sources
- **AI/ML Introduction**: Machine learning applications in forecasting
- **Case Studies**: Real-world examples from the GHA region
- **Advanced Topics**: Deep dive into specialized techniques
- **Project Work**: Hands-on application of learned concepts

## 🛠️ Technical Stack

- **[MkDocs](https://www.mkdocs.org/)**: Static site generator
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)**: Modern theme with advanced features
- **[Framapad](https://framapad.org/)**: Real-time collaborative platform
- **Custom CSS & JavaScript**: Enhanced user experience and functionality

## 🏗️ Project Structure

```
python-ml-gha-workshop/
├── docs/                          # Documentation source files
│   ├── assets/                    # Images, logos, and static files
│   ├── day1/                      # Day 1 lesson materials
│   ├── js/                        # Custom JavaScript
│   ├── collaboration.md           # Real-time collaboration guide
│   ├── index.md                   # Homepage content
│   ├── setup.md                   # Installation and setup guide
│   └── styles.css                 # Custom styling
├── overrides/                     # Theme customizations
│   └── partials/
│       └── footer.html            # Custom footer with partner logos
├── site/                          # Generated static site (auto-generated)
├── mkdocs.yml                     # MkDocs configuration
├── requirements.txt               # Python dependencies
├── README.md                      # This file
└── LICENSE.md                     # MIT License
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YonSci/python-ml-gha-workshop.git
   cd python-ml-gha-workshop
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Serve the site locally**
   ```bash
   mkdocs serve
   ```

5. **Open in browser**
   Navigate to `http://127.0.0.1:8000/python-ml-gha-workshop/`

### Building for Production

```bash
mkdocs build
```

The static site will be generated in the `site/` directory.

## 🎨 Customization

### Styling
- **Custom CSS**: Edit `docs/styles.css` for visual customizations
- **Theme Colors**: Modify the color palette in `mkdocs.yml`
- **Layout**: Customize templates in the `overrides/` directory

### Content
- **Pages**: Add new markdown files in the `docs/` directory
- **Navigation**: Update the `nav` section in `mkdocs.yml`
- **Assets**: Place images and files in `docs/assets/`

### Collaboration Platform
- **Framapad Integration**: Update collaboration links in `docs/collaboration.md`
- **Custom Platforms**: Modify the collaboration options as needed

## 🤝 Contributing

We welcome contributions to improve the training materials and website functionality!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Test your changes locally before submitting
- Update documentation as needed
- Ensure responsive design compatibility
- Add appropriate comments for complex functionality

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🏢 Partners & Supporters

<div align="center">

| Partner | Description |
|---------|-------------|
| **UK Met Office** | Leading meteorological service providing expertise and guidance |
| **ILRI** | International Livestock Research Institute |
| **AICCRA** | Accelerating Impacts of CGIAR Climate Research for Africa |
| **FCDO** | United Kingdom Foreign, Commonwealth & Development Office |

</div>

## 📞 Contact & Support

- **Facilitator**: [Yonas Mersha](mailto:yonas.mersha14@gmail.com)
- **GitHub**: [@YonSci](https://github.com/YonSci)
- **LinkedIn**: [Yonas Mersha](https://www.linkedin.com/in/yonas-mersha-baab561b5/)



<div align="center">

**🌍 Transforming weather forecasting capabilities across the Greater Horn of Africa through cutting-edge technology and data science**

[🚀 Visit the Training Site](https://yonsci.github.io/python-ml-gha-workshop/) | [📝 View Documentation](https://yonsci.github.io/python-ml-gha-workshop/) | [🤝 Join Collaboration](https://mensuel.framapad.org/p/real-time-collaborative-pad-ahb0)

</div>
