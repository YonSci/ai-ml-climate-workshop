"""\
# Setup

Follow these steps **before Day 1**.

## 1) Install Conda (Miniforge or Mambaforge recommended)
- Windows: <https://github.com/conda-forge/miniforge>
- macOS/Linux: same link. Choose the installer for your OS/CPU.

## 2) Create the environment
```bash
mamba create -n gha-climate python=3.11 -y || conda create -n gha-climate python=3.11 -y
conda activate gha-climate
pip install -U pip
pip install xarray rioxarray netCDF4 cdsapi cfgrib eccodes cartopy geopandas scikit-learn matplotlib jupyterlab