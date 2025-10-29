# 🚀 Interactive Binder Integration

This repository includes full Binder integration for interactive learning! Click any Binder badge to launch a live Jupyter environment with all the workshop materials.

## 🌟 What is Binder?

[Binder](https://mybinder.org/) is a free service that turns GitHub repositories into interactive Jupyter environments. No installation required - just click and code!

## 📚 Available Interactive Notebooks

### Day 1: Python Fundamentals
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2FPython_Basics_for_Climate_and_Meteorology_Workshop1.ipynb)

**Topics Covered:**
- Python syntax and data types
- Control flow and functions
- Climate-specific examples
- Hands-on exercises

### Setup Guide
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2FPython_Setup_for_Climate_and_Meteorology_Workshop.ipynb)

**Topics Covered:**
- Python installation options
- Virtual environments
- Jupyter setup
- Development tools

### Day 2: Scientific Python
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2FDay2_NumPy_Pandas_for_Climate.ipynb)

**Topics Covered:**
- NumPy for climate data arrays
- Pandas for time series analysis
- Statistical operations
- Data visualization basics

## 🛠 Technical Details

### Binder Configuration Files

- **`environment.yml`**: Conda environment specification with all dependencies
- **`runtime.txt`**: Python version specification
- **`postBuild`**: Post-installation script that sets up sample data

### Sample Data

The Binder environment automatically creates sample climate datasets:
- `data/sample/sample_temperature_gha.nc` - Temperature data for Greater Horn of Africa
- `data/sample/sample_precipitation_gha.nc` - Precipitation data
- `data/sample/sample_station_data.csv` - Station observation data
- `data/sample/station_metadata.csv` - Station metadata

### Environment Specifications

**Python Version:** 3.10
**Key Libraries:**
- NumPy, Pandas, Matplotlib, Seaborn
- Xarray, NetCDF4, Cartopy, GeoPandas
- Scikit-learn, SciPy
- Jupyter, JupyterLab, IPython widgets

## 🚀 Quick Start

1. **Click any Binder badge** in the lesson pages or above
2. **Wait 1-2 minutes** for the environment to build (first time only)
3. **Start coding!** All notebooks and data are ready to use

## 💡 Tips for Using Binder

### Performance
- Binder sessions are **free but limited** (max 2GB RAM, 6 hours)
- **Save your work** by downloading notebooks before sessions expire
- Sessions **reset** when inactive for 10+ minutes

### Best Practices
- **Work through lessons sequentially** for best learning experience
- **Experiment freely** - you can't break anything!
- **Download completed notebooks** to keep your progress

### Troubleshooting
- **Slow startup?** Binder builds the environment from scratch each time
- **Session expired?** Just click the Binder badge again
- **Missing packages?** All climate analysis packages are pre-installed

## 🔗 Alternative Access Methods

If Binder is unavailable, you can also:

1. **Clone the repository** and run locally:
   ```bash
   git clone https://github.com/YonSci/python-ml-gha-workshop.git
   cd python-ml-gha-workshop
   conda env create -f environment.yml
   conda activate climate-ml-workshop
   jupyter lab
   ```

2. **Use Google Colab** (upload notebooks manually):
   - Go to [colab.research.google.com](https://colab.research.google.com)
   - Upload the `.ipynb` files from the `notebooks/` directory

3. **Use local Jupyter** with pip:
   ```bash
   pip install -r requirements.txt
   jupyter lab
   ```

## 📖 Learning Path

**Recommended sequence:**
1. Start with **Setup Guide** to understand the environment
2. Work through **Day 1: Python Basics** 
3. Continue with **Day 2: NumPy & Pandas**
4. Proceed to additional days as notebooks become available

## 🤝 Contributing

Found an issue with the Binder setup? Please:
1. Check if the issue persists after restarting Binder
2. Open an issue on GitHub with details about the problem
3. Include the Binder session URL if possible

## 📝 License

This workshop content is available under the MIT License. The Binder service is provided free by the Jupyter community.

---

**Happy Learning! 🌍📊🐍**
