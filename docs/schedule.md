# 🗓 Training Schedule

This 5-day workshop is designed for forecasters, climate analysts, and early-career scientists in the Greater Horn of Africa (GHA).  
Each day blends short lectures, live demos, and guided hands-on exercises using real climate data.

---

## 📍 Logistics Summary

| Item                 | Details                                                                                  |
|----------------------|------------------------------------------------------------------------------------------|
| Format               | In-person, instructor-led, hands-on                                                     |
| Tools                | Python, NumPy, Pandas, Matplotlib, Xarray, Cartopy, GeoPandas, Scikit-learn              |
| Focus Region         | Greater Horn of Africa (GHA)                                                             |
| Style                | Short theory → live coding → guided exercise → recap                                    |
| Final Outcome        | End-to-end ML-based subseasonal & seasonal rainfall prediction workflow                 |
| Assumed Background   | Climate / weather context is helpful; Python/ML experience not required                 |
| Requirements         | Laptop with admin rights and ~8 GB RAM; ability to run Python locally or via notebooks  |

---

## 📅 Day 1 — Python Foundations for Climate Work  
**Main goal:** Everyone gets comfortable with Python syntax, data structures, functions, and running notebooks.

**Reference material:**  
- `day1/01-python-basics.md` → **Python Basics for Climate and Meteorology**

| Time        | Session / Topic                                                | Description                                                                                   |
|-------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| 09:00–09:30 | Welcome & setup                                                | Intro to workshop goals, environment check, notebook usage                                   |
| 09:30–10:45 | Python essentials                                              | Variables, numbers, strings, lists, dictionaries, loops                                      |
| 10:45–11:00 | Break                                                          | —                                                                                             |
| 11:00–12:30 | Writing functions                                              | Defining functions, passing arguments, returning values                                      |
| 12:30–13:30 | Lunch                                                          | —                                                                                             |
| 13:30–15:00 | Working with simple climate data                               | Reading files, basic calculations, simple QA/QC                                              |
| 15:00–15:15 | Break                                                          | —                                                                                             |
| 15:15–16:45 | Hands-on mini exercises                                       | Compute daily rainfall summaries, write helper utilities                                     |
| 16:45–17:00 | Recap & Q/A                                                    | What we learned, what will be needed for Day 2                                               |

**End-of-day ability:**  
Everyone can run Python code, define a function, loop through data, and read/write basic climate-relevant values.

---

## 📅 Day 2 — Scientific Python: Arrays & Tables  
**Main goal:** Work efficiently with climate data using NumPy and Pandas.

**Reference material:**  
- `day2/01-numpy.md` → **NumPy for Climate and Meteorology**  
- `day2/02-pandas.md` → **Pandas for Climate and Meteorology**

| Time        | Session / Topic                                                      | Description                                                                                     |
|-------------|----------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| 09:00–09:15 | Day 1 recap                                                          | Questions from previous day                                                                     |
| 09:15–10:45 | NumPy arrays for climate grids                                       | Creating arrays, shapes, slicing, masking, statistics (e.g. mean rainfall, anomalies)          |
| 10:45–11:00 | Break                                                                | —                                                                                               |
| 11:00–12:30 | NumPy in practice                                                    | Spatial/temporal subsetting, basic math on climate grids                                       |
| 12:30–13:30 | Lunch                                                                | —                                                                                               |
| 13:30–15:00 | Pandas for station / timeseries data                                 | DataFrames, timestamps, grouping by date/region, aggregating rainfall by dekad/month           |
| 15:00–15:15 | Break                                                                | —                                                                                               |
| 15:15–16:45 | Hands-on with Pandas                                                 | Daily → monthly rainfall summaries, climatologies, anomaly computation                         |
| 16:45–17:00 | Recap & Q/A                                                          | Lead-in to gridded data and mapping                                                             |

**End-of-day ability:**  
Everyone can load CSV / station data, compute rainfall aggregates, and analyze time series for regions or stations.

---

## 📅 Day 3 — Gridded Climate Data, NetCDF & Visualization  
**Main goal:** Learn to work with multidimensional climate datasets (e.g. CHIRPS, ERA5) and make meaningful plots/maps.

**Reference material:**  
- `day3/01-matplotlib.md` → **Matplotlib for Climate and Meteorology**  
- `day3/02-xarray-netcdf.md` → **Xarray & NetCDF for Climate and Meteorology**

| Time        | Session / Topic                                                  | Description                                                                                                      |
|-------------|------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| 09:00–09:15 | Day 2 recap                                                      | Q/A and review                                                                                                   |
| 09:15–10:45 | Climate plotting with Matplotlib                                 | Time series, anomaly plots, rainfall trend visuals that are decision-friendly                                   |
| 10:45–11:00 | Break                                                            | —                                                                                                                |
| 11:00–12:30 | Intro to Xarray & NetCDF                                         | Opening gridded datasets, inspecting dimensions (`time`, `lat`, `lon`), selecting regions                       |
| 12:30–13:30 | Lunch                                                            | —                                                                                                                |
| 13:30–15:00 | Regional analysis with Xarray                                    | Clip to Greater Horn of Africa, compute regional averages, seasonal means                                       |
| 15:00–15:15 | Break                                                            | —                                                                                                                |
| 15:15–16:45 | Hands-on workflow                                                | Load CHIRPS-like rainfall, subset by bbox, compute and plot area-mean rainfall time series                      |
| 16:45–17:00 | Recap & Q/A                                                      | Transition to mapping and machine learning                                                                       |

**End-of-day ability:**  
Everyone can open NetCDF, slice by region/time, compute spatial means, and plot useful climate figures.

---

## 📅 Day 4 — Mapping & Intro to Machine Learning  
**Main goal:** Create geospatial climate maps and understand how ML forecasting pipelines are structured.

**Reference material:**  
- `day4/01-cartopy.md` → **Cartopy for Climate and Meteorology**  
- `day4/02-geopandas.md` → **GeoPandas for Climate and Meteorology**  
- `day4/03-ml-intro.md` → **Intro to Machine Learning for Climate Prediction**  
- `day4/04-ml-workflow.md` → **ML Workflow / Project Structure**

| Time        | Session / Topic                                                         | Description                                                                                               |
|-------------|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| 09:00–09:15 | Day 3 recap                                                             | Q/A                                                                                                       |
| 09:15–10:45 | Mapping with Cartopy                                                     | Plotting climate fields on a map, coastlines, borders, projections, shaded rainfall maps                 |
| 10:45–11:00 | Break                                                                   | —                                                                                                         |
| 11:00–12:30 | GeoPandas for boundaries & masking                                      | Shapefiles, country/region masks, clipping rainfall to areas of interest (e.g. target basin / admin area)|
| 12:30–13:30 | Lunch                                                                   | —                                                                                                         |
| 13:30–14:30 | Why Machine Learning for climate forecasting?                           | Predictors vs predictands, seasonal/subseasonal lead time, skill questions                               |
| 14:30–15:15 | ML concepts                                                             | Features, targets, train/validation/test, "don’t leak the future", evaluation thinking                   |
| 15:15–15:30 | Break                                                                   | —                                                                                                         |
| 15:30–16:30 | ML workflow & project structure                                         | Walk through directory layout, data pipeline, reproducibility, how we will build the forecast system     |
| 16:30–17:00 | Prep for Day 5                                                          | Define target variable (rainfall), define predictors (climate indices, reanalysis fields, etc.)          |

**End-of-day ability:**  
Everyone can generate a map for GHA, mask data to an AOI, and explain what the ML model will try to predict and why.

---

## 📅 Day 5 — ML-based Subseasonal & Seasonal Prediction (Capstone)  
**Main goal:** Build the full pipeline: data prep → EDA → stationarity check → model training → evaluation.

**Reference material:**  
All in `day5/`  
- `day5/01-ml-based-s2s-prediction.md` → Download & preprocess observations (e.g. CHIRPS rainfall)  
- `day5/02-ml-based-s2s-prediction.md` → Download & preprocess predictors  
- `day5/03-ml-based-s2s-prediction.md` → Exploratory data analysis (EDA)  
- `day5/04-ml-based-s2s-prediction.md` → Stationarity / stability checks  
- `day5/05-ml-based-s2s-prediction.md` → Train and evaluate ML model

| Time        | Session / Topic                                                                     | Description                                                                                                 |
|-------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| 09:00–09:20 | Day 4 recap                                                                         | Roles of predictors (drivers) and predictand (rainfall index)                                              |
| 09:20–10:30 | Step 1: Download & preprocess rainfall data (Notebook 01)                           | Clean CHIRPS-like data, clip to region, aggregate appropriately                                           |
| 10:30–10:45 | Break                                                                               | —                                                                                                           |
| 10:45–11:45 | Step 2: Download & preprocess predictors (Notebook 02)                              | Large-scale drivers (e.g. reanalysis, indices); temporal alignment                                        |
| 11:45–12:30 | Step 3: Exploratory Data Analysis (Notebook 03)                                     | Correlations, lead–lag signals, spatial/temporal patterns                                                  |
| 12:30–13:30 | Lunch                                                                               | —                                                                                                           |
| 13:30–14:30 | Step 4: Stationarity & sanity checks (Notebook 04)                                  | Trend / drift / bias inspection before modeling                                                            |
| 14:30–15:30 | Step 5: Train ML model & generate predictions (Notebook 05)                         | Fit model(s), make forecasts, evaluate skill                                                               |
| 15:30–15:45 | Break                                                                               | —                                                                                                           |
| 15:45–16:30 | Interpreting skill & limitations                                                    | What is “good enough”? Forecast usability for NMHS decision support                                       |
| 16:30–17:00 | Wrap-up, next steps for operations                                                  | How to adapt this pipeline at your NMHS / institution                                                      |

**End-of-day ability:**  
Participants have seen the full operational-style pipeline:
1. Get data  
2. Prepare predictors/targets  
3. Explore and validate  
4. Train model  
5. Assess skill for climate services

---

## ✅ After the Workshop You Will Be Able To

- Load, clean, analyze, and visualize climate data (station + gridded) using Python  
- Produce geospatial climate maps for specific regions in the GHA  
- Understand how an ML-based seasonal or subseasonal forecast product is built  
- Reproduce the full workflow end-to-end using the provided notebooks and project structure

---

## 🔗 Helpful Links

- 💻 [Setup & Environment](setup.md)  
- 📘 [Prerequisites](prerequisites.md)  
- 🤝 [Collaboration / Shared Notes](collaboration.md)  
- 📚 [FAQ](faq.md)  
- 📜 [Code of Conduct](code_of_conduct.md)
