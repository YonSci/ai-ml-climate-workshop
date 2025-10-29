---
hide:
  - toc
---

# 🌍 GeoPandas for Climate and Meteorology

---

- A practical, hands‑on notebook introducing **GeoPandas** and the **geospatial stack** for climate & weather applications.  

You’ll learn how to load and inspect vector data (stations, administrative regions), perform spatial operations (joins, buffers, overlays), manage **CRS** (coordinate reference systems), and integrate with **xarray/rioxarray** to extract/aggregate values from NetCDF (e.g., CHIRPS, ERA5).

**What you’ll need** (install instructions below):
- Python 3.10+
- `geopandas`, `shapely`, `pyproj`, `matplotlib`
- For climate raster work: `xarray`, `rioxarray`, `rasterio`, `regionmask`, `salem`

## Outline: 

- Installing GeoPandas
- Create GeoDataFrame and Inspect 
- Plot GeoDataFrame
- Spatial Operations [Aggregation, Buffering, Dissolving, Overlay]
- Reprojection and CRS Management
- Extract Point  data from NetCDF file
- (Optional) Save sample data to GeoJSON
- Masking NetCDF with Shapefile [salem] 
- Reading and Writing Shapfile/GeoJSON file


## 🚀 Interactive Learning

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2FGeopandas_for_Climate_and_Meteorology_Workshop.ipynb)

**Click the Binder button above to launch an interactive Jupyter notebook for NumPy and Pandas climate data analysis!**




```python

```

```python

```

---
## Installing GeoPandas

```python

# Using conda (recommended for geospatial stack)
# !conda install -c conda-forge geopandas xarray rioxarray rasterio shapely pyproj regionmask matplotlib -y

# Using pip (ensure system has GEOS/PROJ/GDAL preinstalled or use wheels on manylinux)
# !pip install geopandas shapely matplotlib xarray rioxarray rasterio regionmask salem
```

```python
# Set working directory 

import os
os.chdir("c:\\Users\\yonas\\Documents\\ICPAC\\python-climate")

processed_data_dir = os.path.join("data", "processed")
raw_data_dir = os.path.join("data", "raw")
```

---
## Imports & Environment

```python

import os
import json
import numpy as np
import pandas as pd
import geopandas as gpd
from shapely.geometry import Point, Polygon, box
import matplotlib.pyplot as plt
import xarray as xr
import salem
import matplotlib.pyplot as plt
import cartopy.crs as ccrs
import cartopy.feature as cfeature
```

```python
# Print GeoPandas version
print(gpd.__version__)
```

> Output:
```text
1.1.1
```

---
## GeoPandas Fundamentals

- GeoPandas extends pandas with a **geometry** column (typically `shapely` geometries) and **CRS** metadata.

- It supports typical table operations (filter, groupby) plus spatial operations (buffer, intersection).

---
## Create sample data (stations & regions) for Ethiopia

- We’ll synthesize **station points** and **region polygons** roughly within Ethiopia’s bounds to avoid external downloads.

```python
#  Define Ethiopia bounding box
ethi_bbox = box(33, 3, 48, 15)

# Create GeoDataFrame for 3 regions: North, Center, South Ethiopia
regions = gpd.GeoDataFrame(
    {
        "region": ["North", "Center", "South"],
        "geometry": [
            box(36, 11, 44, 15),  # North
            box(36, 7,  44, 11),  # Center
            box(36, 3,  44, 7),   # South
        ],
    },
    crs="EPSG:4326"
)
```

---
## Inspect the dataframe

```python
# Display stations and regions
regions
```

> Output:
```text
   region                                       geometry
0   North  POLYGON ((44 11, 44 15, 36 15, 36 11, 44 11))
1  Center     POLYGON ((44 7, 44 11, 36 11, 36 7, 44 7))
2   South       POLYGON ((44 3, 44 7, 36 7, 36 3, 44 3))
```

```python
regions.crs
```

> Output:
```text
<Geographic 2D CRS: EPSG:4326>
Name: WGS 84
Axis Info [ellipsoidal]:
- Lat[north]: Geodetic latitude (degree)
- Lon[east]: Geodetic longitude (degree)
Area of Use:
- name: World.
- bounds: (-180.0, -90.0, 180.0, 90.0)
Datum: World Geodetic System 1984 ensemble
- Ellipsoid: WGS 84
- Prime Meridian: Greenwich
```

```python
# Get bounding box of all regions
regions.geometry.total_bounds  # minx, miny, maxx, maxy
```

> Output:
```text
array([36.,  3., 44., 15.])
```

```python
#  Print columns of regions GeoDataFrame
print("Regions columns:", regions.columns.tolist())
```

> Output:
```text
Regions columns: ['region', 'geometry']
```

```python
# Basic plot of bounding box 
regions.plot( figsize=(12, 6),
             edgecolor='black', 
             facecolor='none',
             column='region',
             legend=True,      
             )
```

> Output:
```text
<Axes: >
<Figure size 1200x600 with 1 Axes>
```

```python

```

```python
# Create GeoDataFrame for some weather stations in Ethiopia 
station_records = [
    {"station_id": "STA001", "lon": 37.5, "lat": 13.2, "elev_m": 2500},
    {"station_id": "STA002", "lon": 38.3, "lat": 10.2, "elev_m": 2100},
    {"station_id": "STA003", "lon": 39.5, "lat": 6.2,  "elev_m": 1500},
    {"station_id": "STA004", "lon": 42.0, "lat": 8.8,  "elev_m": 1800},
]

# Create DataFrame for station records
df = pd.DataFrame(station_records)

# Convert to GeoDataFrame with geometry column
gdf_stn = gpd.GeoDataFrame(
    df,
    geometry=gpd.points_from_xy(df["lon"], df["lat"]),
    crs="EPSG:4326",
)
```

---
## Data Loading & Inspection

```python
regions.crs
```

> Output:
```text
<Geographic 2D CRS: EPSG:4326>
Name: WGS 84
Axis Info [ellipsoidal]:
- Lat[north]: Geodetic latitude (degree)
- Lon[east]: Geodetic longitude (degree)
Area of Use:
- name: World.
- bounds: (-180.0, -90.0, 180.0, 90.0)
Datum: World Geodetic System 1984 ensemble
- Ellipsoid: WGS 84
- Prime Meridian: Greenwich
```

```python
gdf_stn.head()
```

> Output:
```text
  station_id   lon   lat  elev_m           geometry
0     STA001  37.5  13.2    2500  POINT (37.5 13.2)
1     STA002  38.3  10.2    2100  POINT (38.3 10.2)
2     STA003  39.5   6.2    1500   POINT (39.5 6.2)
3     STA004  42.0   8.8    1800     POINT (42 8.8)
```

```python
gdf_stn.plot(figsize=(10, 6), 
             color='red', 
             markersize=100,
             legend=True,
                )
```

> Output:
```text
<Axes: >
<Figure size 1000x600 with 1 Axes>
```

---

## Plot stations over regions

```python
# Plot stations over regions 

ax = regions.boundary.plot(edgecolor="0.2")
gdf_stn.plot(ax=ax, color="tab:red", markersize=30)
ax.set_title("Stations and synthetic regions")
plt.show()
```

> Output:
```text
<Figure size 640x480 with 1 Axes>
```

---

## Basic plotting with `.plot()`

```python

ax = regions.plot(column="region", legend=True, edgecolor="k")
gdf_stn.plot(ax=ax, color="black", markersize=25)
ax.set_title("Basic GeoPandas plotting")
plt.show()
```

> Output:
```text
<Figure size 640x480 with 1 Axes>
```

---
## Spatial Operations
### Spatial Join: map stations to regions

```python
# Spatial join: Find which stations fall within which regions 
stn_in_regions = gpd.sjoin(gdf_stn, 
                           regions, 
                           how="left", 
                           predicate="within") # or "intersects", 
# Select relevant columns 
stn_in_regions[["station_id","region","elev_m","geometry"]]
# Print the resulting GeoDataFrame
stn_in_regions
```

> Output:
```text
  station_id   lon   lat  elev_m           geometry  index_right  region
0     STA001  37.5  13.2    2500  POINT (37.5 13.2)            0   North
1     STA002  38.3  10.2    2100  POINT (38.3 10.2)            1  Center
2     STA003  39.5   6.2    1500   POINT (39.5 6.2)            2   South
3     STA004  42.0   8.8    1800     POINT (42 8.8)            1  Center
```

---
### Aggregation by region (example)

```python
# Compute average elevation of stations per region 
agg = stn_in_regions.groupby("region", dropna=False)["elev_m"].mean().reset_index(name="avg_elev_m")
agg
```

> Output:
```text
   region  avg_elev_m
0  Center      1950.0
1   North      2500.0
2   South      1500.0
```

```python
# Plot average elevation per region
agg.plot.bar(x="region", y="avg_elev_m", legend=False)
plt.ylabel("Average Elevation (m)")
plt.show()
```

> Output:
```text
<Figure size 640x480 with 1 Axes>
```


---
### Buffering (e.g., 50 km around stations): use a projected CRS in meters

```python
#  convert to projected CRS in meters (UTM zone 37N) 
stn_utm = gdf_stn.to_crs("EPSG:32637")

# copy the GeoDataFrame 
buf50 = stn_utm.copy()

# Create 50 km buffers around each station
buf50["geometry"] = stn_utm.buffer(50_000)  # 50 km

# Convert buffers back to WGS84 for plotting
buf50_wgs84 = buf50.to_crs("EPSG:4326")
```

```python
# Plot buffers around stations 
ax = regions.boundary.plot(edgecolor="0.2")
buf50_wgs84.boundary.plot(ax=ax, color="orange")
gdf_stn.plot(ax=ax, color="red", markersize=25)
ax.set_title("50 km buffers around stations")
plt.show()
```

> Output:
```text
<Figure size 640x480 with 1 Axes>
```

---
### Dissolving polygons by attribute

```python

# Dissolve regions by "region" column (no effect here since already unique)
regions_dissolved = regions.dissolve(by="region")

regions_dissolved
```

> Output:
```text
                                             geometry
region                                               
Center     POLYGON ((44 7, 44 11, 36 11, 36 7, 44 7))
North   POLYGON ((44 11, 44 15, 36 15, 36 11, 44 11))
South        POLYGON ((44 3, 44 7, 36 7, 36 3, 44 3))
```

### Overlay: intersection

```python
#  Select the north region
north = regions.query("region == 'North'")

# Convert to projected CRS in meters (UTM zone 37N)
north_utm = north.to_crs("EPSG:32637")

buf50_utm = buf50  # already EPSG:32637

# Perform intersection between buffers and north region
inter = gpd.overlay(buf50_utm, north_utm, how="intersection")

# Calculate area in square kilometers 
inter["area_km2"] = inter.area / 1e6

# Show relevant columns 
inter[["station_id","region","area_km2"]]

inter
```

> Output:
```text
  station_id   lon   lat  elev_m region  \
0     STA001  37.5  13.2    2500  North   

                                            geometry     area_km2  
0  POLYGON ((387211.687 1454838.236, 386491.715 1...  7841.371226
```

---
## Reprojection and CRS Management
- Check CRS: `.crs`
- Define CRS if missing: `.set_crs('EPSG:4326', inplace=True)`
- Transform: `.to_crs('EPSG:32637')`

```python
print("Stations CRS:", gdf_stn.crs)
```

> Output:
```text
Stations CRS: EPSG:4326
```

```python
print("Stations UTM CRS:", stn_utm.crs)
```

> Output:
```text
Stations UTM CRS: EPSG:32637
```

---
## Extract Point  data from NetCDF file

### One timestep for all stations

```python
# Choose the DataArray 
da = ds["precip"]

# pick one time step (latest here)
da = da.isel(time=-1)  

# Determine the CRS of the raster/grid and pass it to the grid_crs variable
grid_crs = getattr(da.rio, "crs", None) or getattr(ds.rio, "crs", None) or "EPSG:4326"

# Reproject stations to the grid CRS
stn = gdf_stn.to_crs(grid_crs)

# Use the correct spatial coord names from the grid or raster 
x_name = "x"
y_name = "y"

# Extract the lon/lat or x/y values from station geometries
xs = xr.DataArray(stn.geometry.x.values, dims="points")
ys = xr.DataArray(stn.geometry.y.values, dims="points")

# Extract the values at station points from the dataset
vals = da.sel({x_name: xs, y_name: ys}, method="nearest")

# Attach values back to GeoDataFrame 
out = stn.copy()
out["value"] = vals.values
out.head()
```

> Output:
```text
  station_id   lon   lat  elev_m           geometry     value
0     STA001  37.5  13.2    2500  POINT (37.5 13.2)  6.593847
1     STA002  38.3  10.2    2100  POINT (38.3 10.2)  5.579750
2     STA003  39.5   6.2    1500   POINT (39.5 6.2)  4.485852
3     STA004  42.0   8.8    1800     POINT (42 8.8)  2.406737
```

---
### Extract the time series for one station

```python
# Select a specific station (e.g., the first station)
station = gdf_stn.iloc[0]

# Extract the longitude and latitude of the station
lon = station.geometry.x
lat = station.geometry.y

# Extract the time series of precipitation data for the station
station_timeseries = ds["precip"].sel(x=lon, y=lat, method="nearest")

# Print the time series
station_timeseries
```

> Output:
```text
<xarray.DataArray 'precip' (time: 366)> Size: 3kB
array([ 8.90118385,  0.09824973,  9.84963881, 13.83217302,  4.82701112,
        3.02796085,  8.96099998,  0.95233107,  0.75084645,  0.90436388,
        5.74201964, 12.19744575, 20.36288197, 10.75139477,  3.28321376,
       17.41700677,  0.69764574, 15.74290292,  5.32697186,  3.15239653,
        9.84549182,  0.87593684,  8.01575844,  0.62819937,  5.59384104,
       12.14868406, 13.45459792, 18.11698855,  3.35912622,  3.72355798,
        5.03606898,  3.49338772, 12.95855409,  6.68114097,  7.4993605 ,
        8.3016419 ,  6.56083993,  2.40272902,  5.80579683,  9.99313429,
       15.82951358,  5.63553899,  2.18377796,  6.39631524, 16.71267785,
       11.76186451,  3.78251815,  1.67570394,  6.95784883, 15.35415267,
        3.77168257,  8.81742417,  8.53823945, 11.86166171, 11.40575333,
        1.64856121, 11.28622488,  5.83712258,  8.11210692,  1.27081348,
       16.54482488,  5.02891885,  2.49685149,  6.83131134,  6.57492208,
        2.25561692,  5.83733167, 12.02462412,  0.59350707, 27.85619701,
        0.9008682 , 10.48115929,  1.02154927,  5.90818961,  6.17478874,
       10.69234801, 10.61678972,  2.68351046, 17.6276772 ,  0.90080039,
        6.56512981,  5.40134233,  5.09189985,  8.36083916,  8.98695107,
        5.38177287,  1.50759598,  4.10376271, 27.96360062,  0.76229859,
        2.06080187,  4.10987403, 10.47795987,  4.9888542 ,  3.28217836,
       18.61593369,  8.18417935, 11.56894743,  6.08130478,  8.89417778,
...
        0.4699834 ,  3.15634966,  7.33356107,  7.12675824,  2.86563534,
        1.5205371 ,  7.42236143,  7.58697843, 22.52864212,  9.03096085,
        2.66926489, 15.64574595, 10.92660135, 11.62142626,  1.00915691,
       13.39591533, 10.3446771 ,  3.46757717,  2.01734248,  7.40245163,
        6.29116874,  2.3559016 ,  7.39040017, 16.80829489,  1.15275807,
       11.55917206,  4.85304436,  3.4175703 ,  2.51960312,  3.45029352,
        5.5147619 ,  2.05643934, 10.74473374,  4.42487023,  4.43166259,
        7.44804919, 15.9133309 , 14.3350987 ,  6.68431506,  0.94000862,
        1.37526922,  1.12974576,  8.12820603,  7.82927427, 16.11663327,
        3.03036053,  8.35559638,  9.82348928,  4.57551529,  7.89555544,
       17.4869349 ,  2.21683835,  5.36261982,  6.6627613 , 19.50267987,
        5.69839464, 25.87832717, 10.71372776,  1.10604522,  7.67118114,
        4.93233254,  3.32011665, 11.89581228,  6.08836126,  3.68824626,
        1.6512861 ,  4.26023167,  2.41110457,  2.65326915, 16.21881174,
        4.80258245,  8.27956227,  1.87075244, 12.61458757,  2.71844599,
        3.95416159,  7.533296  ,  5.13412516,  2.76724244,  7.7035626 ,
        7.18841443, 22.64938164, 17.08308499,  4.94037975,  8.3034956 ,
        7.84506904,  9.61600142, 16.80952201,  2.29957239, 10.01720154,
       13.90717451, 12.14652   ,  0.49778973,  3.61119683,  7.01184302,
        6.59384701])
Coordinates:
  * time         (time) datetime64[ns] 3kB 2020-01-01 2020-01-02 ... 2020-12-31
    y            float64 8B 13.25
    x            float64 8B 37.5
    spatial_ref  int64 8B 0
Attributes:
    units:    mm/day
```

```python
station_timeseries_pd = station_timeseries.to_series()
station_timeseries_pd
```

> Output:
```text
time
2020-01-01     8.901184
2020-01-02     0.098250
2020-01-03     9.849639
2020-01-04    13.832173
2020-01-05     4.827011
                ...    
2020-12-27    12.146520
2020-12-28     0.497790
2020-12-29     3.611197
2020-12-30     7.011843
2020-12-31     6.593847
Freq: D, Name: precip, Length: 366, dtype: float64
```

```python
# export to CSV dataframe
# station_timeseries_pd.to_csv(f"{processed_data_dir}/station_timeseries.csv", header=True)
```

---
### Extract the time series for mutiple station

```python
# Create an empty dictionary to store the time series for each station
station_timeseries = {}

# Iterate over each station in the GeoDataFrame
for index, station in gdf_stn.iterrows():
    # Extract the longitude and latitude of the station
    lon = station.geometry.x
    lat = station.geometry.y

    # Extract the time series of precipitation data for the station
    try:
        ts = ds["precip"].sel(x=lon, y=lat, method="nearest")
        # Store as pandas Series
        # Now station_timeseries is a dictionary where the keys are station IDs
        station_timeseries[station["station_id"]] = ts.to_series()  
    except KeyError as e:
        print(f"Error extracting data for station {station['station_id']}: {e}")
        station_timeseries[station["station_id"]] = None
```

```python
station_timeseries
```

> Output:
```text
{'STA001': time
 2020-01-01     8.901184
 2020-01-02     0.098250
 2020-01-03     9.849639
 2020-01-04    13.832173
 2020-01-05     4.827011
                 ...    
 2020-12-27    12.146520
 2020-12-28     0.497790
 2020-12-29     3.611197
 2020-12-30     7.011843
 2020-12-31     6.593847
 Freq: D, Name: precip, Length: 366, dtype: float64,
 'STA002': time
 2020-01-01     9.459547
 2020-01-02     0.704595
 2020-01-03     4.459861
 2020-01-04     4.469626
 2020-01-05    13.787346
                 ...    
 2020-12-27    10.400662
 2020-12-28     3.188982
 2020-12-29     0.771026
 2020-12-30     3.625833
 2020-12-31     5.579750
 Freq: D, Name: precip, Length: 366, dtype: float64,
 'STA003': time
 2020-01-01     5.355205
 2020-01-02     0.855645
 2020-01-03     1.000385
 2020-01-04     1.277393
 2020-01-05    25.535552
                 ...    
 2020-12-27     9.396427
 2020-12-28     5.579716
 2020-12-29     3.140024
 2020-12-30     4.106899
 2020-12-31     4.485852
 Freq: D, Name: precip, Length: 366, dtype: float64,
 'STA004': time
 2020-01-01     7.601374
 2020-01-02     1.734879
 2020-01-03     6.739741
 2020-01-04     6.055603
 2020-01-05     5.873361
                 ...    
 2020-12-27     2.466144
 2020-12-28     4.096557
 2020-12-29     2.505724
 2020-12-30    36.287754
 2020-12-31     2.406737
 Freq: D, Name: precip, Length: 366, dtype: float64}
```

```python
# Export all time series to separate CSV files
for station_id, ts in station_timeseries.items():
    if ts is not None:
        ts.to_csv(
            f"{processed_data_dir}/{station_id}_timeseries.csv", header=True)
        print(f"Exported time series for station {station_id} to {station_id}_timeseries.csv")
    else:
        print(f"No time series data for station {station_id} to export.")
```

> Output:
```text
Exported time series for station STA001 to STA001_timeseries.csv
Exported time series for station STA002 to STA002_timeseries.csv
Exported time series for station STA003 to STA003_timeseries.csv
Exported time series for station STA004 to STA004_timeseries.csv
```

---

## (Optional) Save sample data to GeoJSON

```python

# Export stations and regions to GeoJSON files
stations_fp = f"{processed_data_dir}/stations_demo.geojson"
regions_fp  = f"{processed_data_dir}/regions_demo.geojson"

# Export GeoDataFrames to GeoJSON files
gdf_stn.to_file(stations_fp, driver="GeoJSON")
regions.to_file(regions_fp, driver="GeoJSON")

print("Wrote:", stations_fp, "and", regions_fp)
```

> Output:
```text
Wrote: data\processed/stations_demo.geojson and data\processed/regions_demo.geojson
```

---
### Reading the Geojson file

```python
# reading the Geojson file stations_demo.geojson file 

gdf_stn_loaded = gpd.read_file(processed_data_dir + "/stations_demo.geojson")   
gdf_stn_loaded.head()
```

> Output:
```text
  station_id   lon   lat  elev_m           geometry
0     STA001  37.5  13.2    2500  POINT (37.5 13.2)
1     STA002  38.3  10.2    2100  POINT (38.3 10.2)
2     STA003  39.5   6.2    1500   POINT (39.5 6.2)
3     STA004  42.0   8.8    1800     POINT (42 8.8)
```

---
### Exporing as Shapefile

```python
# exporting as Shapefile 

gdf_stn_loaded.to_file(f"{processed_data_dir}/stations_demo.shp", driver="ESRI Shapefile")
```

---
### Load the Shapefile

```python
gha = gpd.read_file(raw_data_dir + "/shapefile/gha_region_icpac_2016/GHA.shp")

gha
```

> Output:
```text
    OBJECTID      COUNTRY  area  Shape_Leng  Shape_Area           land_under  \
0          1      Burundi   0.0    8.560371    2.193095                 None   
1          2     Djibouti   0.0    7.874779    1.781569                 None   
2          3      Eritrea   0.0   41.125347   10.077064                 None   
3          4     Ethiopia   0.0   49.028874   92.986294                 None   
4          5        Kenya   0.0   40.625985   47.319578                 None   
5          6       Rwanda   0.0    8.078222    2.054446                 None   
6          7      Somalia   0.0   53.331305   51.800944                 None   
7          8     Tanzania   0.0   57.988209   77.546629                 None   
8          9  South Sudan   0.0   46.515148   51.867644                 None   
9         10        Sudan   0.0   73.448957  158.194024  930459.06\r\n930459   
10        11       Uganda   0.0   25.099705   19.616329                 None   

                                             geometry  
0   POLYGON ((30.36003 -2.35343, 30.36209 -2.3525,...  
1   POLYGON ((42.66339 11.0715, 42.65628 11.07671,...  
2   MULTIPOLYGON (((43.14681 12.71384, 43.14167 12...  
3   POLYGON ((41.77824 11.54207, 41.77785 11.51077...  
4   MULTIPOLYGON (((39.40283 -4.65471, 39.40523 -4...  
5   POLYGON ((30.3675 -2.34399, 30.36209 -2.3525, ...  
6   MULTIPOLYGON (((41.9267 -1.16192, 41.9226 -1.1...  
7   MULTIPOLYGON (((40.42789 -10.38034, 40.42349 -...  
8   POLYGON ((31.79577 3.82198, 31.79585 3.82126, ...  
9   POLYGON ((24.32633 16.51445, 23.99918 16.50046...  
10  POLYGON ((32.75026 -0.99732, 32.40119 -0.99728...
```

```python
gha[3:5]
```

> Output:
```text
   OBJECTID   COUNTRY  area  Shape_Leng  Shape_Area land_under  \
3         4  Ethiopia   0.0   49.028874   92.986294       None   
4         5     Kenya   0.0   40.625985   47.319578       None   

                                            geometry  
3  POLYGON ((41.77824 11.54207, 41.77785 11.51077...  
4  MULTIPOLYGON (((39.40283 -4.65471, 39.40523 -4...
```

```python
# Check the shape of the GeoDataFrame
gha.shape
```

> Output:
```text
(11, 7)
```

```python
# Check the coordinate reference system (CRS) of the GeoDataFrame
gha.crs
```

> Output:
```text
<Geographic 2D CRS: EPSG:4326>
Name: WGS 84
Axis Info [ellipsoidal]:
- Lat[north]: Geodetic latitude (degree)
- Lon[east]: Geodetic longitude (degree)
Area of Use:
- name: World.
- bounds: (-180.0, -90.0, 180.0, 90.0)
Datum: World Geodetic System 1984 ensemble
- Ellipsoid: WGS 84
- Prime Meridian: Greenwich
```

```python
# Get bounding box of all regions
gha.geometry.total_bounds  # minx, miny, maxx, maxy
```

> Output:
```text
array([ 21.838947  , -11.7457    ,  51.41303253,  23.14286   ])
```

```python
# Columns of the GeoDataFrame
gha.columns.tolist()
```

> Output:
```text
['OBJECTID',
 'COUNTRY',
 'area',
 'Shape_Leng',
 'Shape_Area',
 'land_under',
 'geometry']
```

```python
# Values of the COUNTRY column
gha.COUNTRY.values
```

> Output:
```text
array(['Burundi', 'Djibouti', 'Eritrea', 'Ethiopia', 'Kenya', 'Rwanda',
       'Somalia', 'Tanzania', 'South Sudan', 'Sudan', 'Uganda'],
      dtype=object)
```

```python
# Check the geometry of the GeoDataFrame
gha.geometry
```

> Output:
```text
0     POLYGON ((30.36003 -2.35343, 30.36209 -2.3525,...
1     POLYGON ((42.66339 11.0715, 42.65628 11.07671,...
2     MULTIPOLYGON (((43.14681 12.71384, 43.14167 12...
3     POLYGON ((41.77824 11.54207, 41.77785 11.51077...
4     MULTIPOLYGON (((39.40283 -4.65471, 39.40523 -4...
5     POLYGON ((30.3675 -2.34399, 30.36209 -2.3525, ...
6     MULTIPOLYGON (((41.9267 -1.16192, 41.9226 -1.1...
7     MULTIPOLYGON (((40.42789 -10.38034, 40.42349 -...
8     POLYGON ((31.79577 3.82198, 31.79585 3.82126, ...
9     POLYGON ((24.32633 16.51445, 23.99918 16.50046...
10    POLYGON ((32.75026 -0.99732, 32.40119 -0.99728...
Name: geometry, dtype: geometry
```

```python
# access the geometry of the GeoDataFrame  one row value
# gha.geometry.iloc[0].wkt
```

> Output:
```text
'POLYGON ((30.36003000000005 -2.353429999999946, 30.362090000000023 -2.3524999999999636, 30.367500000000064 -2.3439899999999625, 30.373610000000042 -2.3343999999999596, 30.37895000000003 -2.3210999999999444, 30.382490000000075 -2.3168999999999755, 30.39336000000003 -2.310549999999978, 30.399010000000033 -2.3101199999999267, 30.404870000000074 -2.312339999999949, 30.40769000000006 -2.3155799999999545, 30.415520000000072 -2.324549999999931, 30.422900000000027 -2.3286599999999567, 30.430440000000033 -2.328589999999963, 30.44037000000003 -2.322619999999972, 30.44467000000003 -2.3220999999999776, 30.45053000000007 -2.321399999999926, 30.451860000000067 -2.3227099999999723, 30.45007000000004 -2.3335199999999645, 30.45106000000004 -2.338619999999935, 30.455260000000067 -2.3452199999999266, 30.45867000000004 -2.3476499999999305, 30.463500000000067 -2.3608599999999456, 30.478860000000054 -2.372079999999926, 30.485650000000078 -2.3737199999999348, 30.49890000000005 -2.3806099999999333, 30.51108000000005 -2.3948899999999753, 30.527340000000038 -2.396889999999928, 30.52824000000004 -2.3969999999999345, 30.531240000000025 -2.3988899999999376, 30.53866000000005 -2.403539999999964, 30.556030000000078 -2.40829999999994, 30.564410000000066 -2.4178799999999683, 30.54024000000004 -2.4328799999999546, 30.52762000000007 -2.4541999999999575, 30.516450000000077 -2.4686999999999557, 30.50261000000006 -2.5002699999999436, 30.49667000000005 -2.5196399999999244, 30.495100000000036 -2.5247699999999327, 30.48437000000007 -2.546829999999943, 30.476290000000063 -2.5696399999999358, 30.464900000000057 -2.581669999999974, 30.441230000000076 -2.6255899999999315, 30.438480000000027 -2.630679999999927, 30.43617000000006 -2.634969999999953, 30.433841467000036 -2.638887337999961, 30.428930000000037 -2.6471499999999537, 30.422200000000032 -2.6536599999999453, 30.419980000000066 -2.6578399999999647, 30.419940000000054 -2.6626299999999787, 30.419920000000047 -2.6651599999999576, 30.419890000000066 -2.6690199999999322, 30.42390000000006 -2.6742799999999534, 30.43241000000006 -2.6783699999999726, 30.443370000000073 -2.6812999999999647, 30.452120000000036 -2.691449999999975, 30.45760000000007 -2.6925399999999513, 30.469020000000057 -2.684099999999944, 30.48777000000007 -2.6741499999999405, 30.49771000000004 -2.6688799999999446, 30.50873000000007 -2.6575999999999453, 30.51547000000005 -2.6531799999999635, 30.52036000000004 -2.651809999999955, 30.526040000000023 -2.6555499999999483, 30.527220000000057 -2.6604599999999436, 30.524920000000066 -2.6773399999999583, 30.516730000000052 -2.6887799999999515, 30.502860000000055 -2.6964799999999514, 30.491880000000037 -2.7119199999999637, 30.485820000000047 -2.717519999999979, 30.48422000000005 -2.7189999999999372, 30.47932000000003 -2.7190499999999247, 30.474010000000078 -2.715689999999938, 30.465180000000032 -2.7189899999999625, 30.462780000000066 -2.7244999999999777, 30.460780000000057 -2.7259599999999296, 30.459910000000036 -2.7323999999999273, 30.45491000000004 -2.7374999999999545, 30.44124000000005 -2.7451899999999796, 30.435820000000035 -2.755579999999952, 30.44228000000004 -2.7626699999999573, 30.443460000000073 -2.767949999999928, 30.441680000000076 -2.7743999999999573, 30.444250000000068 -2.7824399999999514, 30.440000000000055 -2.796039999999948, 30.437290000000075 -2.7999699999999734, 30.434090000000026 -2.800679999999943, 30.43073000000004 -2.811519999999973, 30.425010000000043 -2.8120199999999613, 30.42276000000004 -2.8170999999999253, 30.424860000000024 -2.822369999999978, 30.42467000000005 -2.824359999999956, 30.42443000000003 -2.8267499999999472, 30.407260000000065 -2.8567699999999263, 30.40339000000006 -2.8604799999999386, 30.405460000000062 -2.862079999999935, 30.411190000000033 -2.8627299999999423, 30.41121000000004 -2.86295999999993, 30.411700000000053 -2.8696299999999724, 30.416070000000047 -2.873739999999941, 30.421800000000076 -2.8741599999999607, 30.427280000000053 -2.8720499999999447, 30.42963000000003 -2.8744199999999296, 30.432960000000037 -2.8764399999999455, 30.433730000000025 -2.8866899999999305, 30.436960000000056 -2.8937199999999734, 30.437730000000045 -2.9028299999999376, 30.448680000000024 -2.911609999999939, 30.458210000000065 -2.9119799999999714, 30.460720000000038 -2.9137799999999743, 30.462090000000046 -2.915589999999952, 30.458290000000034 -2.9210899999999356, 30.458980000000054 -2.9224499999999694, 30.46557000000007 -2.923759999999959, 30.46831000000003 -2.9257799999999747, 30.481630000000052 -2.9450299999999743, 30.485050000000058 -2.9479599999999664, 30.488210000000038 -2.9488999999999805, 30.498700000000042 -2.9520299999999793, 30.50210000000004 -2.9530399999999304, 30.504230000000064 -2.9528099999999426, 30.508890000000065 -2.952289999999948, 30.52556000000004 -2.9402899999999477, 30.547380000000032 -2.9209599999999796, 30.56218000000007 -2.903509999999926, 30.56687000000005 -2.8954899999999384, 30.56914000000006 -2.8956999999999766, 30.57164000000006 -2.897039999999947, 30.58722000000006 -2.915579999999977, 30.59632000000005 -2.9203299999999786, 30.612050000000067 -2.9285599999999476, 30.64262000000008 -2.949229999999943, 30.644270000000063 -2.9567299999999364, 30.643950000000075 -2.970859999999959, 30.645570000000077 -2.974269999999933, 30.64740000000006 -2.9767499999999245, 30.65605000000005 -2.980549999999937, 30.660390000000064 -2.984149999999943, 30.66620000000006 -2.99240999999995, 30.66763000000003 -2.9941199999999526, 30.67175000000003 -2.9931699999999637, 30.67811000000006 -2.987139999999954, 30.68309000000005 -2.9797399999999357, 30.68966000000006 -2.976759999999956, 30.69906000000003 -2.972499999999968, 30.702500000000043 -2.9729299999999625, 30.71611000000007 -2.9866399999999658, 30.723470000000077 -2.990949999999941, 30.73586000000006 -2.99545999999998, 30.743660000000034 -2.9965599999999313, 30.759420000000034 -2.9922999999999433, 30.76881000000003 -2.9929199999999696, 30.774350000000027 -2.9900299999999334, 30.780440000000056 -2.986849999999947, 30.787540000000035 -2.986569999999972, 30.799630000000036 -2.9821099999999774, 30.80606000000006 -2.9834399999999732, 30.812650000000076 -2.9783299999999713, 30.821120000000064 -2.9773499999999444, 30.834820000000036 -2.973109999999963, 30.843770000000063 -2.975569999999948, 30.84572000000003 -2.97691999999995, 30.846070000000054 -2.9771599999999694, 30.84120000000007 -2.9816999999999325, 30.83812000000006 -2.9845899999999688, 30.834780000000023 -2.990579999999966, 30.830660000000023 -2.9979799999999273, 30.817660000000046 -3.0171399999999267, 30.813230000000033 -3.023649999999975, 30.807390000000055 -3.037499999999966, 30.80078000000003 -3.04099999999994, 30.795790000000068 -3.0481699999999705, 30.792370000000062 -3.0498099999999795, 30.792170000000056 -3.0537199999999416, 30.808380000000056 -3.077759999999955, 30.81761000000006 -3.083059999999932, 30.818160000000034 -3.083439999999939, 30.828730000000064 -3.0907099999999446, 30.829230000000052 -3.099179999999933, 30.82832990600008 -3.104059968999934, 30.827380000000062 -3.109209999999962, 30.82860000000005 -3.120869999999968, 30.837410000000034 -3.1329299999999307, 30.84191000000004 -3.1390899999999533, 30.84773000000007 -3.154739999999947, 30.847720000000038 -3.1637799999999743, 30.84152000000006 -3.188699999999926, 30.841390000000047 -3.197879999999941, 30.84137000000004 -3.199389999999937, 30.83626000000004 -3.2086399999999458, 30.829400000000078 -3.216419999999971, 30.827220000000068 -3.221659999999929, 30.827270000000055 -3.2224899999999366, 30.827810000000056 -3.2318499999999517, 30.836140000000057 -3.248679999999979, 30.836930000000052 -3.25413999999995, 30.83030000000008 -3.259179999999958, 30.806160000000034 -3.2718399999999406, 30.79827000000006 -3.2751499999999396, 30.780980000000056 -3.279039999999952, 30.77941000000004 -3.279739999999947, 30.755100000000027 -3.2904799999999454, 30.74840000000006 -3.2885499999999297, 30.739940000000047 -3.2836599999999407, 30.735240000000033 -3.2844499999999357, 30.733060000000023 -3.288699999999949, 30.732390000000066 -3.2966599999999744, 30.728480000000047 -3.302659999999946, 30.72282000000007 -3.306449999999927, 30.704050000000052 -3.310109999999952, 30.68431000000004 -3.3177499999999327, 30.677910000000054 -3.3212899999999763, 30.67536000000007 -3.3238999999999805, 30.671730000000025 -3.3276199999999676, 30.670800000000042 -3.3285699999999565, 30.66145000000006 -3.3343699999999785, 30.64133000000004 -3.353709999999978, 30.638050000000078 -3.3595999999999435, 30.63743000000005 -3.3607099999999264, 30.63790000000006 -3.36197999999996, 30.642000000000053 -3.3730999999999653, 30.646250000000066 -3.3775399999999536, 30.661670000000072 -3.3860899999999674, 30.664690000000064 -3.3907899999999245, 30.668240000000026 -3.400449999999978, 30.66692000000006 -3.420379999999966, 30.663760000000025 -3.4243699999999535, 30.654400000000066 -3.429679999999962, 30.614090000000033 -3.461379999999963, 30.597270000000037 -3.4632799999999406, 30.58839000000006 -3.4665899999999397, 30.574170000000038 -3.4821399999999585, 30.564020000000028 -3.487609999999961, 30.557520000000068 -3.4900599999999713, 30.536470000000065 -3.493889999999965, 30.532830000000047 -3.496909999999957, 30.52559000000008 -3.509149999999977, 30.51194000000004 -3.5219099999999344, 30.507120000000043 -3.5207899999999768, 30.49998000000005 -3.5150899999999297, 30.491700000000037 -3.5114599999999427, 30.487580000000037 -3.511949999999956, 30.483970000000056 -3.520029999999963, 30.479620000000068 -3.5195999999999685, 30.468500000000063 -3.5358699999999317, 30.467610000000036 -3.5371699999999464, 30.45715000000007 -3.5485199999999395, 30.443520000000035 -3.5550499999999374, 30.442540000000065 -3.555529999999976, 30.44261000000006 -3.564959999999928, 30.44294000000008 -3.565719999999942, 30.447730000000035 -3.576889999999935, 30.44825000000003 -3.5842499999999404, 30.445400000000063 -3.6029099999999517, 30.43885000000006 -3.614919999999927, 30.43405000000007 -3.616329999999948, 30.427910000000054 -3.623049999999978, 30.425220000000024 -3.631119999999953, 30.419530000000066 -3.636449999999968, 30.41727000000003 -3.641529999999932, 30.413640000000044 -3.6452399999999443, 30.413010000000043 -3.65328999999997, 30.41005000000007 -3.656309999999962, 30.41193000000004 -3.662279999999953, 30.41080000000005 -3.6643499999999563, 30.405760000000043 -3.6648499999999444, 30.40420000000006 -3.6708399999999415, 30.404940000000067 -3.678889999999967, 30.39838000000003 -3.690209999999979, 30.394520000000057 -3.7035399999999754, 30.393910000000062 -3.705659999999966, 30.393710000000056 -3.7107199999999807, 30.390540000000044 -3.7158099999999763, 30.392610000000047 -3.7218299999999545, 30.40211000000005 -3.749409999999955, 30.402950000000033 -3.7518499999999335, 30.405820000000062 -3.768389999999954, 30.40497000000005 -3.777379999999937, 30.401580000000024 -3.7849899999999366, 30.402300000000025 -3.7888999999999555, 30.399350000000027 -3.7925999999999362, 30.39680000000004 -3.7893999999999437, 30.39268000000004 -3.789199999999937, 30.38829000000004 -3.784849999999949, 30.38417000000004 -3.78487999999993, 30.382520000000056 -3.7789099999999394, 30.37859000000003 -3.7743399999999383, 30.37584000000004 -3.774819999999977, 30.372840000000053 -3.7716199999999276, 30.36444000000006 -3.774219999999957, 30.360730000000046 -3.7753799999999273, 30.351060000000075 -3.770379999999932, 30.34764000000007 -3.772019999999941, 30.341500000000053 -3.7784999999999513, 30.33755000000008 -3.7798199999999724, 30.329500000000053 -3.785069999999962, 30.324400000000026 -3.7916699999999537, 30.321630000000027 -3.805569999999932, 30.321000000000026 -3.8203699999999685, 30.31905000000006 -3.823129999999935, 30.31075000000004 -3.8285399999999754, 30.309660000000065 -3.8428899999999544, 30.301300000000026 -3.8597299999999564, 30.291480000000035 -3.8653099999999654, 30.276400000000024 -3.8787099999999555, 30.27505000000008 -3.8792699999999627, 30.26430000000005 -3.883699999999976, 30.25992000000008 -3.887549999999976, 30.252320000000054 -3.9214699999999425, 30.240390000000048 -3.929809999999975, 30.237550000000056 -3.934249999999963, 30.23434000000003 -3.9501399999999762, 30.229280000000074 -3.962539999999933, 30.224450000000047 -3.9837799999999675, 30.22299000000004 -3.986349999999959, 30.22101765700006 -3.9898064179999437, 30.21992000000006 -3.9917299999999614, 30.218170000000043 -3.9948099999999727, 30.21810000000005 -4.004719999999963, 30.221250000000055 -4.017349999999965, 30.219810000000052 -4.026509999999973, 30.209460000000036 -4.041549999999972, 30.195520000000045 -4.049929999999961, 30.192980000000034 -4.051449999999932, 30.176750000000027 -4.0857299999999555, 30.173400000000072 -4.091539999999952, 30.17127000000005 -4.0925099999999475, 30.169760000000053 -4.093209999999942, 30.12742000000003 -4.1379799999999705, 30.11922000000004 -4.142649999999946, 30.10002000000003 -4.153579999999977, 30.08286000000004 -4.158749999999941, 30.07534000000004 -4.165469999999971, 30.07427000000007 -4.17674999999997, 30.071100000000058 -4.182299999999941, 30.069770000000062 -4.188519999999926, 30.06293000000005 -4.194309999999973, 30.062950000000058 -4.198229999999967, 30.05657000000008 -4.202869999999962, 30.054530000000057 -4.20679999999993, 30.055710000000033 -4.212539999999933, 30.05185000000006 -4.217169999999953, 30.050730000000044 -4.221549999999979, 30.052860000000067 -4.231199999999944, 30.052640000000054 -4.231799999999964, 30.051730000000077 -4.23419999999993, 30.052680000000066 -4.238789999999938, 30.048400000000072 -4.241299999999967, 30.04675000000003 -4.242279999999937, 30.046070000000043 -4.244359999999972, 30.051630000000046 -4.252369999999928, 30.049820000000068 -4.255609999999933, 30.03971000000007 -4.253369999999961, 30.039990000000046 -4.260729999999967, 30.035460000000057 -4.268129999999928, 30.034800000000075 -4.2734199999999305, 30.016260000000045 -4.276989999999955, 30.011450000000025 -4.281879999999944, 30.000540000000058 -4.292969999999968, 30.000000000000057 -4.293289999999956, 29.99574000000007 -4.295759999999973, 29.99001000000004 -4.295339999999953, 29.98545000000007 -4.299509999999941, 29.983150000000023 -4.297689999999932, 29.98013000000003 -4.298069999999939, 29.967800000000068 -4.299619999999948, 29.961650000000077 -4.306569999999965, 29.95419000000004 -4.322259999999972, 29.942780000000027 -4.331079999999929, 29.935500000000047 -4.338719999999967, 29.918800000000033 -4.3450299999999515, 29.898460000000057 -4.35505999999998, 29.88767000000007 -4.353969999999947, 29.884930000000054 -4.355139999999949, 29.880160000000046 -4.361349999999959, 29.87924000000004 -4.362539999999967, 29.875350000000026 -4.3634799999999245, 29.872160000000065 -4.366259999999954, 29.86832000000004 -4.3747999999999365, 29.854580000000055 -4.3781099999999356, 29.84563000000003 -4.3774799999999345, 29.84379000000007 -4.376109999999926, 29.840950000000078 -4.369779999999935, 29.83844000000005 -4.364169999999945, 29.835680000000025 -4.363269999999943, 29.83041000000003 -4.364689999999939, 29.821210000000065 -4.359449999999981, 29.81456000000003 -4.359259999999949, 29.812500000000057 -4.360059999999976, 29.809750000000065 -4.361129999999946, 29.80519000000004 -4.364609999999971, 29.801100000000076 -4.3710799999999495, 29.79976000000005 -4.375919999999951, 29.80027000000007 -4.383969999999977, 29.796590000000037 -4.394839999999931, 29.795800000000042 -4.39943999999997, 29.774980000000028 -4.412899999999979, 29.76499000000007 -4.42912999999993, 29.763460000000066 -4.43304999999998, 29.766230000000064 -4.454379999999958, 29.76523000000003 -4.458559999999977, 29.756710000000055 -4.4646099999999365, 29.749970000000076 -4.465709999999945, 29.738000000000056 -4.462689999999952, 29.728020000000072 -4.456869999999981, 29.725220000000036 -4.455239999999947, 29.72389116000005 -4.454826030999925, 29.72201000000007 -4.45423999999997, 29.719490000000064 -4.45345999999995, 29.69745000000006 -4.45650999999998, 29.695880000000045 -4.456179999999961, 29.68653000000006 -4.454249999999945, 29.671950000000038 -4.448639999999955, 29.660840000000064 -4.4465099999999325, 29.657429630000024 -4.445850307999933, 29.655050000000074 -4.445389999999975, 29.59782000000007 -4.444389999999942, 29.563390000000027 -4.443789999999979, 29.471730000000036 -4.444569999999942, 29.39148000000006 -4.44524999999993, 29.390090000000043 -4.432699999999954, 29.390360000000044 -4.388989999999978, 29.387880000000052 -4.357819999999947, 29.388850000000048 -4.338089999999966, 29.387450000000058 -4.31899999999996, 29.38530000000003 -4.289829999999938, 29.38208000000003 -4.2107599999999366, 29.380390000000034 -4.192709999999977, 29.37993000000006 -4.187809999999956, 29.378820000000076 -4.175839999999937, 29.36865000000006 -4.119369999999947, 29.367760000000033 -4.100029999999947, 29.36128000000008 -4.085419999999942, 29.356370000000027 -4.0693299999999795, 29.347840000000076 -4.041379999999947, 29.34385000000003 -4.033699999999953, 29.327030000000036 -4.012039999999956, 29.305900000000065 -3.989469999999926, 29.284250000000043 -3.973289999999963, 29.282570000000078 -3.97070999999994, 29.264190000000042 -3.9426299999999515, 29.25905000000006 -3.931959999999947, 29.25371000000007 -3.9180999999999244, 29.244600000000048 -3.8753299999999626, 29.24454000000003 -3.868199999999945, 29.241940000000056 -3.8530999999999267, 29.24024000000003 -3.8432399999999802, 29.23995000000008 -3.828959999999938, 29.231800000000078 -3.7905099999999265, 29.24040000000008 -3.728189999999927, 29.24174000000005 -3.7184799999999427, 29.241840000000025 -3.7137899999999604, 29.243130000000065 -3.6538399999999456, 29.245480000000043 -3.6421699999999646, 29.243520000000046 -3.603999999999928, 29.243430000000046 -3.602079999999944, 29.24132000000003 -3.560859999999934, 29.239180000000033 -3.533489999999972, 29.238214493000044 -3.5210509299999444, 29.23273468000008 -3.4882149699999445, 29.22850227400005 -3.4769821169999773, 29.227581024000074 -3.4745390419999467, 29.219360352000024 -3.425461053999925, 29.214799881000033 -3.409827947999929, 29.210151672000052 -3.393887996999979, 29.207550000000026 -3.3801199999999767, 29.204120000000046 -3.3619999999999663, 29.203800000000058 -3.353249999999946, 29.203478381000025 -3.3444689099999323, 29.202710000000025 -3.3234899999999357, 29.200920000000053 -3.3086699999999496, 29.203820000000064 -3.297179999999969, 29.207890000000077 -3.2901999999999703, 29.234290000000044 -3.269519999999943, 29.23455000000007 -3.268709999999942, 29.235020000000077 -3.2672599999999647, 29.23318000000006 -3.2642999999999347, 29.223520000000065 -3.2587499999999636, 29.217210000000023 -3.251359999999977, 29.212100000000078 -3.2391999999999257, 29.21252000000004 -3.232979999999941, 29.21909000000005 -3.219829999999945, 29.21905000000004 -3.214079999999967, 29.212590000000034 -3.2046799999999394, 29.210720000000038 -3.199169999999981, 29.212050000000033 -3.1901899999999728, 29.21777000000003 -3.1894699999999716, 29.21705000000003 -3.1848699999999326, 29.212230000000034 -3.182829999999967, 29.21813000000003 -3.17289999999997, 29.216480000000047 -3.1650899999999638, 29.22321000000005 -3.151369999999929, 29.22440000000006 -3.148939999999925, 29.222750000000076 -3.140889999999956, 29.223410000000058 -3.136289999999974, 29.229840000000024 -3.1383199999999647, 29.231630000000052 -3.1318699999999353, 29.238740000000064 -3.1336699999999382, 29.236420000000066 -3.1290899999999624, 29.238000000000056 -3.1249299999999494, 29.243940000000066 -3.1232899999999404, 29.24278000000004 -3.120309999999961, 29.24574000000007 -3.116149999999948, 29.240210000000047 -3.110429999999951, 29.240180000000066 -3.1055999999999244, 29.23929000000004 -3.104249999999979, 29.23625000000004 -3.0996399999999653, 29.23944000000006 -3.0961699999999723, 29.240990000000068 -3.0883399999999597, 29.246470000000045 -3.084169999999972, 29.24714000000006 -3.081169999999929, 29.242980000000045 -3.0758999999999332, 29.246150000000057 -3.070359999999937, 29.23971000000006 -3.064649999999972, 29.23995000000008 -3.0630499999999756, 29.24037000000004 -3.060269999999946, 29.242650000000026 -3.0574999999999477, 29.242170000000044 -3.0538199999999733, 29.23272000000003 -3.043519999999944, 29.231310000000065 -3.0375399999999786, 29.22488000000004 -3.03389999999996, 29.22440000000006 -3.030219999999929, 29.22667000000007 -3.0262899999999604, 29.225510000000043 -3.023309999999981, 29.214530000000025 -3.025669999999934, 29.21315000000004 -3.024759999999958, 29.21293000000003 -3.026369999999929, 29.202420000000075 -3.0291899999999714, 29.196920000000034 -3.028759999999977, 29.188190000000077 -3.0235099999999306, 29.17369000000008 -3.0107099999999605, 29.16883000000007 -3.0017599999999334, 29.162370000000067 -3.001299999999958, 29.153950000000066 -3.000689999999963, 29.151640000000043 -2.9979399999999714, 29.15665000000007 -2.9921599999999557, 29.15175000000005 -2.9765499999999747, 29.15238000000005 -2.9666499999999587, 29.148700000000076 -2.963449999999966, 29.145230000000026 -2.9574799999999755, 29.140210000000025 -2.956079999999929, 29.13068000000004 -2.95405999999997, 29.124870000000044 -2.9484899999999357, 29.123260000000073 -2.946939999999927, 29.117800000000045 -2.9417199999999752, 29.104580000000055 -2.9382699999999318, 29.09746000000007 -2.9316199999999526, 29.089990000000057 -2.93235999999996, 29.084670000000074 -2.929809999999975, 29.080850000000055 -2.920949999999948, 29.079270000000065 -2.9172699999999736, 29.079300000000046 -2.9029199999999378, 29.080080000000066 -2.900299999999959, 29.08222389200006 -2.8930559159999802, 29.081457138000076 -2.881033896999952, 29.067384720000064 -2.872255086999928, 29.059835434000036 -2.8627429009999332, 29.056350708000025 -2.8507409099999563, 29.04201316800004 -2.823921918999929, 29.039699554000038 -2.823666095999954, 29.028835297000057 -2.8278520109999477, 29.024511337000035 -2.829518079999957, 29.016759872000023 -2.8297119139999722, 29.008167267000033 -2.826085090999925, 28.996944427000074 -2.816052913999954, 28.993061066000053 -2.8055579659999808, 28.993246078000027 -2.793118953999965, 28.994848251000064 -2.7891440389999502, 28.998580933000028 -2.784915923999961, 29.01562000000007 -2.765619999999956, 29.01914000000005 -2.7636799999999653, 29.032590000000027 -2.761389999999949, 29.034460000000024 -2.7564599999999473, 29.032170000000065 -2.749659999999949, 29.038520000000062 -2.7438999999999396, 29.04057000000006 -2.7331799999999475, 29.04522000000003 -2.7219599999999673, 29.045639877000042 -2.7203199489999292, 29.049370000000067 -2.7057499999999663, 29.04994000000005 -2.6990699999999492, 29.05024000000003 -2.695509999999956, 29.046950000000038 -2.6653199999999515, 29.04762000000005 -2.660789999999963, 29.04776000000004 -2.6605299999999374, 29.05299000000008 -2.650519999999972, 29.053660000000036 -2.6445699999999306, 29.048850000000073 -2.6336599999999635, 29.046640000000025 -2.622729999999933, 29.051550000000077 -2.6143599999999765, 29.05478000000005 -2.6029199999999264, 29.05714000000006 -2.6014699999999493, 29.068250000000035 -2.599959999999953, 29.076720000000023 -2.592049999999972, 29.089650000000063 -2.5984399999999255, 29.10543000000007 -2.597659999999962, 29.115990000000068 -2.60427999999996, 29.12286000000006 -2.605389999999943, 29.126750000000072 -2.605139999999949, 29.135860000000037 -2.5963499999999726, 29.142480000000035 -2.594009999999969, 29.150040000000047 -2.594889999999964, 29.15393000000006 -2.596709999999973, 29.162000000000035 -2.607249999999965, 29.16891000000004 -2.61364999999995, 29.177970000000073 -2.6166299999999296, 29.186140000000023 -2.6193199999999592, 29.19160000000005 -2.621119999999962, 29.199690000000032 -2.6206399999999803, 29.21073000000007 -2.6226599999999394, 29.22613000000007 -2.6286099999999806, 29.230710000000045 -2.629129999999975, 29.240750000000048 -2.6263699999999517, 29.24658000000005 -2.62477999999993, 29.262290000000064 -2.6242899999999736, 29.275510000000054 -2.63098999999994, 29.283780000000036 -2.6377199999999448, 29.296060000000068 -2.6416699999999764, 29.30672000000004 -2.6487599999999247, 29.31075000000004 -2.6503799999999273, 29.316590000000076 -2.6509199999999282, 29.323560000000043 -2.6515699999999356, 29.327780000000075 -2.653919999999971, 29.33000000000004 -2.6572099999999637, 29.333240000000046 -2.6742799999999534, 29.331720000000075 -2.6784999999999286, 29.329650000000072 -2.684229999999957, 29.328800000000058 -2.6917699999999627, 29.33379000000008 -2.699079999999981, 29.345570000000066 -2.710019999999929, 29.346390000000042 -2.72121999999996, 29.353980000000035 -2.734389999999962, 29.35642000000007 -2.7424599999999373, 29.355540000000076 -2.746879999999976, 29.347080000000062 -2.7533599999999296, 29.341000000000065 -2.758009999999956, 29.338850000000036 -2.7642799999999284, 29.34145794400007 -2.7698617779999495, 29.342200000000048 -2.771449999999959, 29.345170000000053 -2.7778299999999376, 29.350510000000043 -2.78311999999994, 29.356250000000045 -2.792629999999974, 29.356130000000064 -2.800899999999956, 29.35253000000006 -2.808089999999936, 29.35274000000004 -2.8112199999999348, 29.366600000000062 -2.8313199999999483, 29.367030000000057 -2.83940999999993, 29.368870000000072 -2.8406799999999635, 29.37599000000006 -2.839339999999936, 29.383210000000076 -2.8239599999999427, 29.384990000000073 -2.8201599999999303, 29.394990000000064 -2.8134599999999637, 29.408360000000073 -2.8157399999999484, 29.413470000000075 -2.8147899999999595, 29.42387000000008 -2.81120999999996, 29.431310000000053 -2.80490999999995, 29.442260000000033 -2.8013299999999504, 29.451220000000035 -2.801629999999932, 29.462990000000048 -2.8099899999999707, 29.49138000000005 -2.8165599999999245, 29.496930000000077 -2.8192299999999477, 29.49890000000005 -2.8201799999999366, 29.513820000000067 -2.833469999999977, 29.525910000000067 -2.8370499999999765, 29.53358000000003 -2.835709999999949, 29.54123000000004 -2.83141999999998, 29.54740000000004 -2.825489999999945, 29.571790000000078 -2.8115099999999416, 29.58367000000004 -2.8091999999999757, 29.588590000000067 -2.80824999999993, 29.609410000000025 -2.809289999999976, 29.613830000000064 -2.809509999999932, 29.62915000000004 -2.805909999999926, 29.63892000000004 -2.7957099999999286, 29.64417000000003 -2.793829999999957, 29.645480000000077 -2.7938799999999446, 29.655850000000044 -2.794219999999939, 29.660550000000057 -2.797139999999956, 29.687790000000064 -2.814049999999952, 29.69237000000004 -2.815399999999954, 29.697910000000036 -2.821809999999971, 29.70751000000007 -2.819909999999936, 29.715720000000033 -2.8161799999999744, 29.742030000000057 -2.8137199999999325, 29.745220000000074 -2.810709999999972, 29.74795349900006 -2.805532158999938, 29.75231000000008 -2.797279999999944, 29.752900000000068 -2.7961599999999294, 29.75896000000006 -2.7774899999999434, 29.758020000000045 -2.7726699999999482, 29.759820000000047 -2.7689799999999423, 29.768750000000068 -2.76822999999996, 29.78770000000003 -2.761669999999981, 29.794340000000034 -2.7620899999999438, 29.800320000000056 -2.766659999999945, 29.803570000000036 -2.7730799999999363, 29.808170000000075 -2.777189999999962, 29.815960000000075 -2.77759999999995, 29.823090000000036 -2.7833099999999718, 29.83537000000007 -2.771729999999934, 29.841090000000065 -2.770539999999926, 29.846560000000068 -2.767289999999946, 29.867150000000038 -2.7657799999999497, 29.870100000000036 -2.7632299999999645, 29.87304000000006 -2.7567699999999604, 29.881020000000035 -2.7523499999999785, 29.885340000000042 -2.7477199999999584, 29.88803000000007 -2.7396499999999264, 29.91049000000004 -2.709139999999934, 29.917860000000076 -2.68384999999995, 29.92181000000005 -2.6800499999999374, 29.925590000000057 -2.663129999999967, 29.929820000000063 -2.653479999999945, 29.93151000000006 -2.649629999999945, 29.930890000000034 -2.643379999999979, 29.925550000000044 -2.634529999999927, 29.927700000000073 -2.62143999999995, 29.926720000000046 -2.5941799999999375, 29.91883000000007 -2.5745399999999563, 29.919170000000065 -2.564019999999971, 29.91928000000007 -2.5605299999999716, 29.920750000000055 -2.5552099999999314, 29.921710000000076 -2.5534999999999286, 29.929290000000037 -2.539989999999932, 29.93142000000006 -2.524819999999977, 29.937490000000025 -2.5069599999999355, 29.94085000000007 -2.5025799999999663, 29.947780000000023 -2.4979699999999525, 29.960920000000044 -2.492749999999944, 29.964210000000037 -2.4805999999999244, 29.96401000000003 -2.476819999999975, 29.96288000000004 -2.4555199999999786, 29.962200000000053 -2.442739999999958, 29.955790000000036 -2.418929999999932, 29.953160000000025 -2.3969899999999598, 29.951770000000067 -2.393799999999942, 29.94509000000005 -2.3784899999999425, 29.944300000000055 -2.3731999999999402, 29.944590000000062 -2.3714299999999753, 29.946090000000027 -2.36257999999998, 29.95315000000005 -2.350399999999979, 29.953490000000045 -2.333919999999978, 29.953550000000064 -2.331079999999929, 29.95822000000004 -2.3255499999999643, 29.958500000000072 -2.3255399999999327, 29.960480000000075 -2.325529999999958, 29.979780000000062 -2.3365399999999568, 29.985897341000054 -2.341680298999961, 29.992490000000032 -2.347219999999936, 30.000000000000057 -2.3477799999999434, 30.024340000000052 -2.3495999999999526, 30.03836000000007 -2.358949999999936, 30.05090000000007 -2.372099999999932, 30.054950000000076 -2.3788399999999683, 30.06370000000004 -2.393389999999954, 30.086880000000065 -2.4170499999999606, 30.105840000000057 -2.4322199999999725, 30.123980000000074 -2.4384999999999764, 30.132280000000037 -2.4391899999999396, 30.13829000000004 -2.4379999999999313, 30.15557000000007 -2.433029999999974, 30.166180000000054 -2.429969999999969, 30.169490000000053 -2.42901999999998, 30.174740000000043 -2.4265099999999507, 30.184280000000058 -2.4184699999999566, 30.19709000000006 -2.39638999999994, 30.202170000000024 -2.3899599999999737, 30.204170000000033 -2.387429999999938, 30.213900000000024 -2.380139999999926, 30.215370000000064 -2.3759599999999637, 30.216900000000066 -2.3562599999999634, 30.21855000000005 -2.351889999999969, 30.221550000000036 -2.349399999999946, 30.225690000000043 -2.3489799999999263, 30.23183000000006 -2.353019999999958, 30.24899000000005 -2.3642999999999574, 30.268620000000055 -2.3696199999999408, 30.28201000000007 -2.3710199999999304, 30.292850000000044 -2.3706299999999487, 30.30329000000006 -2.3702599999999734, 30.31886000000003 -2.363489999999956, 30.33976000000007 -2.362549999999942, 30.351000000000056 -2.3574899999999275, 30.36003000000005 -2.353429999999946))'
```

---
### Access the geometry of the polygon

```python
# access the geometry type of the GeoDataFrame 
gha.geom_type
```

> Output:
```text
0          Polygon
1          Polygon
2     MultiPolygon
3          Polygon
4     MultiPolygon
5          Polygon
6     MultiPolygon
7     MultiPolygon
8          Polygon
9          Polygon
10         Polygon
dtype: object
```

```python
def coord_lister(geom):
    if geom.geom_type == 'Polygon':
        coords = list(geom.exterior.coords)
    elif geom.geom_type == 'MultiPolygon':
        coords = []
        for polygon in geom.geoms:
            coords.extend(list(polygon.exterior.coords))
    else:
        return None  # Or raise an exception, depending on your needs
    return coords

coordinates = gha.geometry.apply(coord_lister)
Burundi_coord = coordinates[1]

Burundi_coord
```

> Output:
```text
[(42.66339000000005, 11.071500000000071),
 (42.65628000000004, 11.076710000000048),
 (42.655950000000075, 11.077350000000024),
 (42.61602000000005, 11.076080000000047),
 (42.61346000000003, 11.076000000000022),
 (42.58200000000005, 11.070470000000057),
 (42.53864000000004, 11.057590000000062),
 (42.51484000000005, 11.042910000000063),
 (42.477550000000065, 11.035110000000032),
 (42.44233000000003, 11.018670000000043),
 (42.40759000000003, 11.007810000000063),
 (42.33676000000003, 11.00311000000005),
 (42.32669000000004, 11.003150000000062),
 (42.241010000000074, 11.003530000000069),
 (42.189500000000066, 10.994220000000041),
 (42.12985000000003, 10.98849000000007),
 (42.08161000000007, 10.984510000000057),
 (42.03777000000008, 10.966050000000052),
 (41.97532000000007, 10.96058000000005),
 (41.90728000000007, 10.955610000000036),
 (41.83618000000007, 10.980480000000057),
 (41.83203000000003, 10.97207000000003),
 (41.827240000000074, 10.959160000000054),
 (41.815990000000056, 10.959380000000067),
 (41.811150000000055, 10.962000000000046),
 (41.81107000000003, 10.965680000000077),
 (41.81103000000007, 10.967750000000024),
 (41.79848000000004, 10.968680000000063),
 (41.791630000000055, 10.97300000000007),
 (41.79135000000008, 10.97318000000007),
 (41.79119000000003, 10.973760000000027),
 (41.78896000000003, 10.981960000000072),
 (41.789540000000045, 10.987930000000063),
 (41.79159000000004, 10.992270000000076),
 (41.79168000000004, 10.992480000000057),
 (41.793150000000026, 10.995570000000043),
 (41.793420000000026, 10.996140000000025),
 (41.79650000000004, 10.999300000000062),
 (41.79844000000003, 11.005360000000053),
 (41.799720000000036, 11.00935000000004),
 (41.80377000000004, 11.062860000000057),
 (41.80316000000005, 11.073810000000037),
 (41.801690000000065, 11.099920000000054),
 (41.80310000000003, 11.119920000000036),
 (41.80905000000007, 11.204410000000053),
 (41.80953000000005, 11.229610000000037),
 (41.80954000000003, 11.229930000000024),
 (41.80973000000006, 11.239930000000072),
 (41.80985000000004, 11.24610000000007),
 (41.80989000000005, 11.24831000000006),
 (41.80850000000004, 11.26099000000005),
 (41.808440000000076, 11.265400000000056),
 (41.80774000000008, 11.318260000000066),
 (41.80182000000008, 11.362070000000074),
 (41.79982000000007, 11.371830000000045),
 (41.79457000000008, 11.39739000000003),
 (41.77887000000004, 11.459350000000029),
 (41.77785000000006, 11.510450000000048),
 (41.77785000000006, 11.510770000000036),
 (41.77824000000004, 11.542070000000024),
 (41.784740000000056, 11.564950000000067),
 (41.79113000000007, 11.58618000000007),
 (41.794080000000065, 11.60597000000007),
 (41.800220000000024, 11.64886000000007),
 (41.806610000000035, 11.670090000000073),
 (41.814220000000034, 11.684570000000065),
 (41.821740000000034, 11.697400000000073),
 (41.82925000000006, 11.710230000000024),
 (41.835210000000075, 11.723760000000027),
 (41.837090000000046, 11.728030000000047),
 (41.83740000000006, 11.728310000000022),
 (41.84537000000006, 11.733140000000049),
 (41.84677000000005, 11.733990000000063),
 (41.87738000000007, 11.74789000000004),
 (41.886520000000075, 11.74956000000003),
 (41.89200000000005, 11.755430000000047),
 (41.89695000000006, 11.781780000000026),
 (41.90103000000005, 11.787450000000035),
 (41.935190000000034, 11.803120000000035),
 (41.93823000000003, 11.805090000000064),
 (41.960740000000044, 11.819650000000024),
 (41.97784000000007, 11.834490000000073),
 (41.99994000000004, 11.865570000000048),
 (42.003720000000044, 11.879060000000038),
 (42.01308000000006, 11.891760000000033),
 (42.017750000000035, 11.900420000000054),
 (42.023750000000064, 11.911550000000034),
 (42.03786000000008, 11.92951000000005),
 (42.03986700000007, 11.932071000000064),
 (42.04101000000003, 11.933520000000044),
 (42.06662000000006, 11.975790000000075),
 (42.092760000000055, 12.002120000000048),
 (42.09595000000007, 12.005330000000072),
 (42.104340000000036, 12.018910000000062),
 (42.113350000000025, 12.033510000000035),
 (42.11837000000003, 12.038690000000031),
 (42.13201000000004, 12.063680000000033),
 (42.13414000000006, 12.06758000000002),
 (42.14033000000006, 12.072750000000042),
 (42.148520000000076, 12.073280000000068),
 (42.15232000000003, 12.07665000000003),
 (42.15644000000003, 12.094960000000071),
 (42.15932000000004, 12.103630000000067),
 (42.16267000000005, 12.113700000000051),
 (42.17022000000003, 12.128490000000056),
 (42.18477000000007, 12.142690000000073),
 (42.20581000000004, 12.176760000000058),
 (42.21976100000006, 12.202486000000022),
 (42.22308000000004, 12.208600000000047),
 (42.22482000000008, 12.211240000000032),
 (42.24022000000008, 12.234470000000044),
 (42.25772000000006, 12.255040000000065),
 (42.30411000000004, 12.292260000000056),
 (42.30907000000008, 12.294920000000047),
 (42.31388000000004, 12.300640000000044),
 (42.31723000000005, 12.304640000000063),
 (42.32973000000004, 12.342560000000049),
 (42.33039000000008, 12.351510000000076),
 (42.33714000000003, 12.371840000000077),
 (42.367350000000044, 12.413310000000024),
 (42.37378000000007, 12.422130000000038),
 (42.384780000000035, 12.433170000000075),
 (42.38631000000004, 12.439110000000028),
 (42.39403000000004, 12.44999000000007),
 (42.40976000000006, 12.467220000000054),
 (42.41819000000004, 12.476460000000031),
 (42.448870000000056, 12.510080000000073),
 (42.455400000000054, 12.51723000000004),
 (42.463970000000074, 12.523940000000039),
 (42.47453000000007, 12.524870000000021),
 (42.48315000000008, 12.522850000000062),
 (42.49074000000007, 12.516940000000034),
 (42.529720000000054, 12.501160000000027),
 (42.53526000000005, 12.49759000000006),
 (42.54029000000003, 12.491970000000038),
 (42.547510000000045, 12.490200000000073),
 (42.559510000000046, 12.481490000000065),
 (42.567090000000064, 12.47598000000005),
 (42.59113000000008, 12.451780000000042),
 (42.603800000000035, 12.442530000000033),
 (42.60973000000007, 12.435510000000022),
 (42.610370000000046, 12.43273000000005),
 (42.63197000000008, 12.414790000000039),
 (42.641770000000065, 12.403310000000033),
 (42.65243000000004, 12.395520000000033),
 (42.65996000000007, 12.390030000000024),
 (42.665440000000046, 12.387450000000058),
 (42.66973000000007, 12.376940000000047),
 (42.68811000000005, 12.362280000000055),
 (42.696480000000065, 12.359560000000045),
 (42.70048000000003, 12.371200000000044),
 (42.70948223800008, 12.377166062000072),
 (42.71996000000007, 12.384110000000021),
 (42.73894000000007, 12.385070000000042),
 (42.74776000000003, 12.392460000000028),
 (42.74899000000005, 12.394660000000044),
 (42.75654000000003, 12.40814000000006),
 (42.76979000000006, 12.414510000000064),
 (42.791600000000074, 12.41656000000006),
 (42.811240000000055, 12.425770000000057),
 (42.81818000000004, 12.432520000000068),
 (42.82216000000005, 12.44255000000004),
 (42.82242000000008, 12.454040000000077),
 (42.81851000000006, 12.45568000000003),
 (42.81270000000006, 12.468290000000025),
 (42.80922000000004, 12.469790000000046),
 (42.80036000000007, 12.473610000000065),
 (42.796790000000044, 12.477780000000052),
 (42.79592000000008, 12.503010000000074),
 (42.805390000000045, 12.510950000000037),
 (42.815510000000074, 12.525130000000047),
 (42.81866000000008, 12.534420000000068),
 (42.822640000000035, 12.537450000000035),
 (42.837330000000065, 12.538080000000036),
 (42.84056000000004, 12.540650000000028),
 (42.84641000000005, 12.54988000000003),
 (42.856400000000065, 12.548690000000022),
 (42.85844000000003, 12.55039000000005),
 (42.85724000000005, 12.573880000000031),
 (42.86208000000005, 12.581930000000057),
 (42.86075000000005, 12.587730000000022),
 (42.871830000000045, 12.591070000000059),
 (42.873650000000055, 12.595590000000072),
 (42.87326000000007, 12.599680000000035),
 (42.87006000000008, 12.608420000000024),
 (42.88772000000006, 12.624400000000037),
 (42.89427000000006, 12.624250000000075),
 (42.908390000000054, 12.616900000000044),
 (42.91852000000006, 12.616670000000056),
 (42.92046000000005, 12.617740000000026),
 (42.986150000000066, 12.653720000000021),
 (42.99684000000008, 12.652300000000025),
 (43.00000000000006, 12.657560000000046),
 (43.01008000000007, 12.661910000000034),
 (43.11415000000005, 12.705470000000048),
 (43.13463200000007, 12.706836000000067),
 (43.14279600000003, 12.675591000000054),
 (43.146667000000036, 12.667953000000068),
 (43.16490200000004, 12.631948000000023),
 (43.189617000000055, 12.60652200000004),
 (43.20695500000005, 12.576101000000051),
 (43.217625000000055, 12.563800000000072),
 (43.23942900000003, 12.538658000000055),
 (43.25198400000005, 12.522154000000057),
 (43.25550100000004, 12.516988000000026),
 (43.26894800000008, 12.497239000000036),
 (43.287247000000036, 12.475111000000027),
 (43.29055000000005, 12.463689000000045),
 (43.29224400000004, 12.461966000000075),
 (43.293427000000065, 12.460763000000043),
 (43.30281100000008, 12.459819000000039),
 (43.308392000000026, 12.461321000000055),
 (43.31251100000003, 12.465320000000077),
 (43.31406400000003, 12.46903100000003),
 (43.31153100000006, 12.477483000000063),
 (43.31332400000008, 12.48097000000007),
 (43.31635300000005, 12.481497000000047),
 (43.321083000000044, 12.47930100000002),
 (43.32354400000003, 12.474068000000045),
 (43.31951500000008, 12.455816000000027),
 (43.32098800000006, 12.442744000000062),
 (43.337803000000065, 12.403108000000032),
 (43.345646000000045, 12.395229000000029),
 (43.35169200000007, 12.389156000000071),
 (43.355808000000025, 12.383039000000053),
 (43.36760300000003, 12.32742600000006),
 (43.370430000000056, 12.29576000000003),
 (43.36991500000005, 12.287473000000034),
 (43.372025000000065, 12.276942000000076),
 (43.372307000000035, 12.274879000000055),
 (43.38905700000004, 12.252875000000074),
 (43.39881900000006, 12.240047000000061),
 (43.405197000000044, 12.22685000000007),
 (43.409065000000055, 12.200493000000051),
 (43.406574000000035, 12.176298000000031),
 (43.41344800000007, 12.161732000000029),
 (43.41605800000008, 12.14960300000007),
 (43.415493000000026, 12.133266000000049),
 (43.41698100000008, 12.108697000000063),
 (43.41550100000006, 12.091422000000023),
 (43.40360300000003, 12.049090000000035),
 (43.38468900000004, 12.007296000000053),
 (43.37974900000006, 11.998205000000041),
 (43.37280300000003, 11.985425000000077),
 (43.36664200000007, 11.97908300000006),
 (43.34712200000007, 11.974520000000041),
 (43.32299000000006, 11.977672000000041),
 (43.30944800000003, 11.977374000000054),
 (43.30437500000005, 11.974504000000024),
 (43.291153000000065, 11.960188000000073),
 (43.28535500000004, 11.958450000000028),
 (43.27020600000003, 11.960195000000056),
 (43.253502000000026, 11.96211500000004),
 (43.230946000000074, 11.95770600000003),
 (43.22355700000003, 11.954093000000057),
 (43.21020100000004, 11.955865000000074),
 (43.199020000000075, 11.954466000000025),
 (43.18975100000006, 11.951269000000025),
 (43.18168300000008, 11.946720000000028),
 (43.16669100000007, 11.928679000000045),
 (43.15959900000007, 11.922313000000031),
 (43.15687200000008, 11.920667000000037),
 (43.14693500000004, 11.91466900000006),
 (43.139942000000076, 11.904165000000035),
 (43.129421000000036, 11.894731000000036),
 (43.11330000000004, 11.875282000000027),
 (43.10223800000006, 11.859166000000073),
 (43.08445000000006, 11.841288000000077),
 (43.07294100000007, 11.834357000000068),
 (43.06952700000005, 11.830601000000058),
 (43.06917600000003, 11.829838000000052),
 (43.066422000000046, 11.823862000000076),
 (43.051559000000054, 11.810647000000074),
 (43.04598200000004, 11.809599000000048),
 (43.03732700000006, 11.810321000000044),
 (43.031525000000045, 11.808807000000058),
 (43.02287700000005, 11.809299000000067),
 (43.00159800000006, 11.800991000000067),
 (43.00000000000006, 11.801023000000043),
 (42.98679400000003, 11.801142000000027),
 (42.97688700000003, 11.79880600000007),
 (42.97578000000004, 11.798546000000044),
 (42.97083300000003, 11.79540000000003),
 (42.96561800000006, 11.790188000000057),
 (42.96129600000006, 11.782205000000033),
 (42.95629500000007, 11.775610000000029),
 (42.94635800000003, 11.76655900000003),
 (42.942398000000026, 11.767076000000031),
 (42.93690500000008, 11.774515000000065),
 (42.93526500000007, 11.774079000000029),
 (42.93379600000003, 11.769502000000045),
 (42.92891700000007, 11.771183000000065),
 (42.92340900000005, 11.777472000000046),
 (42.90074200000004, 11.776193000000035),
 (42.897034000000076, 11.77785700000004),
 (42.890949000000035, 11.777025000000037),
 (42.88166000000007, 11.780378000000042),
 (42.87582000000003, 11.780004000000076),
 (42.85723900000005, 11.770614000000023),
 (42.84574100000003, 11.768318000000022),
 (42.838978000000054, 11.766967000000022),
 (42.82809800000007, 11.757006000000047),
 (42.81374400000004, 11.748932000000025),
 (42.786354000000074, 11.743572000000029),
 (42.77978100000007, 11.740906000000052),
 (42.77174000000008, 11.733662000000038),
 (42.76160800000008, 11.710350000000062),
 (42.751446000000044, 11.701295000000073),
 (42.750256000000036, 11.696862000000067),
 (42.751225000000034, 11.685662000000036),
 (42.74643700000007, 11.676992000000041),
 (42.73816700000003, 11.669750000000022),
 (42.717926000000034, 11.657386000000031),
 (42.71595400000007, 11.649825000000021),
 (42.71266600000007, 11.648261000000048),
 (42.709084000000075, 11.642333000000065),
 (42.703411000000074, 11.637122000000033),
 (42.70072200000004, 11.628422000000057),
 (42.69220000000007, 11.602557000000047),
 (42.69250500000004, 11.59082600000005),
 (42.68762600000008, 11.575488000000064),
 (42.68169400000005, 11.568212000000074),
 (42.679489000000046, 11.560655000000054),
 (42.67983600000008, 11.55214200000006),
 (42.676765000000046, 11.549195000000054),
 (42.65982400000007, 11.55563600000005),
 (42.657681000000025, 11.552217000000041),
 (42.653271000000075, 11.553886000000034),
 (42.644993000000056, 11.56250700000004),
 (42.642063000000064, 11.56333200000006),
 (42.63383500000003, 11.565648000000067),
 (42.633339000000035, 11.563355000000058),
 (42.63959900000003, 11.560511000000076),
 (42.64720500000004, 11.553740000000062),
 (42.644138000000055, 11.551251000000036),
 (42.63249200000007, 11.552560000000028),
 (42.611462000000074, 11.567101000000036),
 (42.60564000000005, 11.56786900000003),
 (42.58660900000007, 11.557549000000051),
 (42.58241700000008, 11.558064000000059),
 (42.57830000000007, 11.564327000000048),
 (42.571537000000035, 11.564418000000046),
 (42.56374000000005, 11.574189000000047),
 (42.562820000000045, 11.575341000000037),
 (42.557503000000054, 11.578861000000074),
 (42.534260000000074, 11.585379000000046),
 (42.53582400000005, 11.580298000000028),
 (42.53509900000006, 11.578239000000053),
 (42.53004800000008, 11.58451400000007),
 (42.52587100000005, 11.586179000000072),
 (42.52537200000006, 11.583656000000076),
 (42.52674500000006, 11.581569000000059),
 (42.51478600000007, 11.576898000000028),
 (42.51382400000006, 11.574841000000049),
 (42.515648000000056, 11.571598000000051),
 (42.51557200000008, 11.56565900000004),
 (42.51826100000005, 11.564241000000038),
 (42.519333000000074, 11.56810100000007),
 (42.52097700000007, 11.568769000000032),
 (42.523735000000045, 11.565743000000055),
 (42.52772900000008, 11.567989000000068),
 (42.53028100000006, 11.566806000000042),
 (42.528557000000035, 11.55993200000006),
 (42.53119300000003, 11.55742900000007),
 (42.53224200000005, 11.556434000000024),
 (42.531265000000076, 11.55299800000006),
 (42.53328300000004, 11.546992000000046),
 (42.53579300000007, 11.545714000000032),
 (42.53464100000008, 11.543985000000077),
 (42.528339000000074, 11.54360900000006),
 (42.526676000000066, 11.54133100000007),
 (42.52893400000005, 11.535554000000047),
 (42.522114000000045, 11.53127500000005),
 (42.52088200000003, 11.526463000000035),
 (42.52245700000003, 11.522073000000034),
 (42.551559000000054, 11.50076400000006),
 (42.55384800000007, 11.497285000000034),
 (42.558254000000034, 11.495616000000041),
 (42.560745000000054, 11.490065000000072),
 (42.56656300000003, 11.489067000000034),
 (42.56950000000006, 11.486566000000039),
 (42.57232700000003, 11.484161000000029),
 (42.579533000000026, 11.482225000000028),
 (42.583885000000066, 11.476419000000021),
 (42.59241900000006, 11.469407000000047),
 (42.59380300000004, 11.468429000000071),
 (42.60073500000004, 11.463547000000062),
 (42.60677300000003, 11.461855000000071),
 (42.631245000000035, 11.460834000000034),
 (42.63249200000007, 11.466795000000047),
 (42.63626500000004, 11.469963000000064),
 (42.63893500000006, 11.47774400000003),
 (42.64613700000007, 11.475806000000034),
 (42.65547600000008, 11.476599000000022),
 (42.671749000000034, 11.472927000000027),
 (42.68016400000005, 11.474191000000076),
 (42.684315000000026, 11.47091400000005),
 (42.68648900000005, 11.476403000000062),
 (42.690262000000075, 11.479340000000036),
 (42.69045600000004, 11.481622000000073),
 (42.68727500000006, 11.482600000000048),
 (42.688995000000034, 11.487892000000045),
 (42.68995300000006, 11.490841000000046),
 (42.687988000000075, 11.500525000000039),
 (42.68221300000005, 11.504514000000029),
 (42.668720000000064, 11.506998000000067),
 (42.66527200000007, 11.510495000000049),
 (42.66740000000004, 11.512765000000059),
 (42.66025900000005, 11.519300000000044),
 (42.66007200000007, 11.522522000000038),
 (42.663872000000026, 11.527529000000072),
 (42.67275200000006, 11.528787000000023),
 (42.68338000000006, 11.538298000000054),
 (42.68529100000006, 11.541720000000055),
 (42.68925500000006, 11.541436000000033),
 (42.69247800000005, 11.538632000000064),
 (42.69714000000005, 11.538338000000067),
 (42.711014000000034, 11.546193000000073),
 (42.71872700000006, 11.547465000000045),
 (42.72113400000006, 11.548824000000025),
 (42.72907300000003, 11.553300000000036),
 (42.744503000000066, 11.555844000000036),
 (42.75228500000003, 11.561943000000042),
 (42.75447500000007, 11.561789000000033),
 (42.772560000000055, 11.560509000000025),
 (42.78640000000007, 11.56583100000006),
 (42.78994000000006, 11.568770000000029),
 (42.79378100000008, 11.57653300000004),
 (42.80368000000004, 11.583521000000076),
 (42.80928000000006, 11.583672000000035),
 (42.81345700000003, 11.582003000000043),
 (42.82140400000003, 11.583039000000042),
 (42.82511500000004, 11.581607000000076),
 (42.828865000000064, 11.582932000000028),
 (42.83359500000006, 11.587234000000024),
 (42.836388000000056, 11.586964000000023),
 (42.84053000000006, 11.58299500000004),
 (42.84752700000007, 11.582665000000077),
 (42.85129500000005, 11.585371000000066),
 (42.848820000000046, 11.59161400000005),
 (42.849552000000074, 11.593904000000066),
 (42.85327500000005, 11.593160000000069),
 (42.85554100000007, 11.588529000000051),
 (42.85902800000008, 11.587559000000056),
 (42.86060700000007, 11.583857000000023),
 (42.86485300000004, 11.587014000000067),
 (42.867413000000056, 11.58651800000007),
 (42.86875200000003, 11.582359000000054),
 (42.87152500000008, 11.580710000000067),
 (42.87762800000007, 11.583381000000031),
 (42.886948000000075, 11.58232700000002),
 (42.90474700000004, 11.587127000000066),
 (42.91152200000005, 11.58794800000004),
 (42.92037200000004, 11.586898000000076),
 (42.929050000000075, 11.589991000000055),
 (42.936203000000035, 11.590655000000027),
 (42.95895400000006, 11.59277000000003),
 (42.96406200000007, 11.591085000000021),
 (42.96888700000005, 11.586185000000057),
 (42.976414000000034, 11.590212000000065),
 (42.99081000000007, 11.585859000000028),
 (43.00000000000006, 11.59096900000003),
 (43.00725600000004, 11.594646000000068),
 (43.01330200000007, 11.595476000000076),
 (43.033070000000066, 11.59800000000007),
 (43.04150800000008, 11.596354000000076),
 (43.04956800000008, 11.591021000000069),
 (43.054951000000074, 11.590224000000035),
 (43.059109000000035, 11.59192900000005),
 (43.06406400000003, 11.59940000000006),
 (43.07201400000008, 11.59866100000005),
 (43.08634600000005, 11.594390000000033),
 (43.09414300000003, 11.590199000000041),
 (43.09902200000005, 11.581113000000073),
 (43.10486600000007, 11.580556000000058),
 (43.11803100000003, 11.58614300000005),
 (43.13353700000005, 11.591323000000045),
 (43.14690400000006, 11.598292000000072),
 (43.148983000000044, 11.601028000000042),
 (43.14939500000003, 11.601567000000045),
 (43.14884900000004, 11.604774000000077),
 (43.14647700000006, 11.606560000000059),
 (43.13409800000005, 11.607200000000034),
 (43.133106000000055, 11.609707000000071),
 (43.13609700000006, 11.61211000000003),
 (43.137226000000055, 11.613019000000065),
 (43.14672900000005, 11.615763000000072),
 (43.15404100000006, 11.612248000000022),
 (43.15762700000005, 11.608650000000068),
 (43.15913400000005, 11.604086000000052),
 (43.15624600000007, 11.59781300000003),
 (43.15681500000005, 11.593457000000058),
 (43.16267400000004, 11.58232300000003),
 (43.17317600000007, 11.572212000000036),
 (43.18447100000003, 11.540655000000072),
 (43.186401000000046, 11.535261000000048),
 (43.19819300000006, 11.519661000000042),
 (43.20102700000007, 11.518115000000023),
 (43.21478300000007, 11.518193000000053),
 (43.233040000000074, 11.505264000000068),
 (43.236893000000066, 11.50006200000007),
 (43.24122200000005, 11.484294000000034),
 (43.248951000000034, 11.472739000000047),
 (43.25469000000004, 11.46960000000007),
 (43.19215000000003, 11.367780000000039),
 (43.00000000000006, 11.054950000000076),
 (42.99663000000004, 11.042580000000044),
 (42.98590000000007, 11.021900000000073),
 (42.961640000000045, 10.984410000000025),
 (42.952210000000036, 10.984970000000033),
 (42.94473000000005, 10.983640000000037),
 (42.91083000000003, 10.977640000000065),
 (42.867770000000064, 10.977700000000027),
 (42.85775000000007, 10.977240000000052),
 (42.85304000000008, 10.975040000000035),
 (42.84095000000008, 10.975550000000055),
 (42.83523000000008, 10.977540000000033),
 (42.828940000000046, 10.979730000000075),
 (42.796020000000055, 10.98553000000004),
 (42.79142000000007, 10.987930000000063),
 (42.78893000000005, 10.995050000000049),
 (42.788110000000074, 11.016520000000071),
 (42.78466000000003, 11.028790000000072),
 (42.76488000000006, 11.06355000000002),
 (42.76451000000003, 11.064190000000053),
 (42.75744000000003, 11.070560000000057),
 (42.746300000000076, 11.072190000000035),
 (42.73612000000003, 11.064830000000029),
 (42.72789000000006, 11.061330000000055),
 (42.717820000000074, 11.058790000000045),
 (42.71133000000003, 11.06009000000006),
 (42.69790000000006, 11.053030000000035),
 (42.693490000000054, 11.053580000000068),
 (42.683440000000076, 11.06254000000007),
 (42.67828000000003, 11.070940000000064),
 (42.66339000000005, 11.071500000000071)]
```

### Ploting the Polygon

```python
gha.at[0,'geometry']
```

> Output:
```text
<POLYGON ((30.36 -2.353, 30.362 -2.352, 30.368 -2.344, 30.374 -2.334, 30.379...>
```

```python
gha.at[1,'geometry']
```

> Output:
```text
<POLYGON ((42.663 11.072, 42.656 11.077, 42.656 11.077, 42.616 11.076, 42.61...>
```

---
### Plot Greater Horn of Africa regions

```python
# Plot Greater Horn of Africa regions
fig, ax = plt.subplots(1, 1, figsize=(10, 10))
gha.plot(column="COUNTRY", 
         legend=True, 
         edgecolor="k", 
         ax=ax,
         )
ax.set_title("Greater Horn of Africa Regions")
plt.show()
```

> Output:
```text
<Figure size 1000x1000 with 1 Axes>
```

```python
fig, ax = plt.subplots(figsize=(18,6)) 
gha.plot(alpha=1.0, cmap ='tab20c', column='COUNTRY', edgecolor='black', ax=ax, legend=True )
ax.set_title('Greater Horn of Africa', fontsize=18)
ax.set_axisbelow(True)
ax.yaxis.grid(color='gray', linestyle='dashdot')
ax.xaxis.grid(color='gray', linestyle='dashdot')
ax.set_xlabel("Longitude (Degrees)", fontsize=12)
ax.set_ylabel("Latitude (Degrees)", fontsize=12)
leg = ax.get_legend()
leg.set_bbox_to_anchor((1.45,1.01))
plt.show()
```

> Output:
```text
<Figure size 1800x600 with 1 Axes>
```

### Making Subplots

```python
# Making Subplots

fig, ((ax1, ax2, ax3, ax4), (ax5, ax6, ax7, ax8), (ax9, ax10, ax11, ax12)) = plt.subplots(3, 4, figsize=(15,15)) 
fig.suptitle("Greater Horn of Africa", fontsize=18)
gha.loc[gha.COUNTRY == "Ethiopia"].plot(ax=ax1, facecolor='Blue',  edgecolor='black')
ax1.set_title("Ethiopia") 
gha.loc[gha.COUNTRY == "Kenya"].plot(ax=ax2, facecolor='Green',  edgecolor='black')
ax2.set_title("Kenya")
gha.loc[gha.COUNTRY == "Uganda"].plot(ax=ax3, facecolor='Red',  edgecolor='black')
ax3.set_title("Uganda")
gha.loc[gha.COUNTRY == "Tanzania"].plot(ax=ax4, facecolor='Orange',  edgecolor='black')
ax4.set_title("Tanzania")
gha.loc[gha.COUNTRY == "Rwanda"].plot(ax=ax5, facecolor='Purple',  edgecolor='black')
ax5.set_title("Rwanda")
gha.loc[gha.COUNTRY == "Burundi"].plot(ax=ax6, facecolor='Yellow',  edgecolor='black')
ax6.set_title("Burundi")
gha.loc[gha.COUNTRY == "South Sudan"].plot(ax=ax7, facecolor='Cyan',  edgecolor='black')
ax7.set_title("South Sudan")
gha.loc[gha.COUNTRY == "Somalia"].plot(ax=ax8, facecolor='Magenta',  edgecolor='black')
ax8.set_title("Somalia")
gha.loc[gha.COUNTRY == "Djibouti"].plot(ax=ax9, facecolor='Brown',  edgecolor='black')
ax9.set_title("Djibouti")
gha.loc[gha.COUNTRY == "Eritrea"].plot(ax=ax10, facecolor='Pink',  edgecolor='black')
ax10.set_title("Eritrea")
gha.loc[gha.COUNTRY == "Sudan"].plot(ax=ax11, facecolor='Gray',  edgecolor='black')
ax11.set_title("Sudan")
plt.show()
```

> Output:
```text
<Figure size 1500x1500 with 12 Axes>
```

---
### Merge the GeoDataframe

```python
# Merge geometries of all countries into a single geometry

gha_merged = gha.geometry.union_all()
gha_merged
```

> Output:
```text
<MULTIPOLYGON (((39.582 -9.1, 39.576 -9.1, 39.573 -9.098, 39.572 -9.094, 39....>
```

```python
# Export the merged geometry to a new GeoDataFrame as shapefile

# Convert the multipolygon to a GeoDataFrame
gdf_merged = gpd.GeoDataFrame({'geometry': [gha_merged]}, crs=gha.crs)

# Export the GeoDataFrame to a shapefile
gdf_merged.to_file(f"{processed_data_dir}/gha_merged.shp", driver="ESRI Shapefile")
```

```python
# from gha select ethiiopia only
et_gha = gha[gha.COUNTRY == "Ethiopia"]
et_gha
```

> Output:
```text
   OBJECTID   COUNTRY  area  Shape_Leng  Shape_Area land_under  \
3         4  Ethiopia   0.0   49.028874   92.986294       None   

                                            geometry  
3  POLYGON ((41.77824 11.54207, 41.77785 11.51077...
```

```python
et_gha.crs
```

> Output:
```text
<Geographic 2D CRS: EPSG:4326>
Name: WGS 84
Axis Info [ellipsoidal]:
- Lat[north]: Geodetic latitude (degree)
- Lon[east]: Geodetic longitude (degree)
Area of Use:
- name: World.
- bounds: (-180.0, -90.0, 180.0, 90.0)
Datum: World Geodetic System 1984 ensemble
- Ellipsoid: WGS 84
- Prime Meridian: Greenwich
```

```python
et_gha.plot()
```

> Output:
```text
<Axes: >
<Figure size 640x480 with 1 Axes>
```

```python
# et_gha.to_file(f"{processed_data_dir}/et_gha.shp", driver="ESRI Shapefile")
```

---
## Masking NetCDF with Shapefile [salem]

```python
tamsat_2019_june = xr.open_dataset("data/raw/tamsat_2019_june.nc")
tamsat_2019_june
```

> Output:
```text
<xarray.Dataset> Size: 521kB
Dimensions:  (time: 1, lat: 321, lon: 401)
Coordinates:
  * time     (time) datetime64[ns] 8B 2019-06-01
  * lat      (lat) float64 3kB 15.0 14.96 14.93 14.89 ... 3.113 3.075 3.037 3.0
  * lon      (lon) float64 3kB 33.0 33.04 33.08 33.11 ... 47.89 47.92 47.96 48.0
Data variables:
    rfe      (time, lat, lon) float32 515kB ...
Attributes: (12/13)
    CDI:          Climate Data Interface version 2.0.5 (https://mpimet.mpg.de...
    Conventions:  CF-1.5
    institution:  TAMSAT Research Group, Meteorology Department, University o...
    title:        TAMSAT Rain Fall Estimate (RFE)
    contact:      tamsat@reading.ac.uk
    history:      Sun Oct 02 19:59:08 2022: cdo enssum rfe2019_06-dk1.v3.nc r...
    ...           ...
    latmax:       15.0
    lonmin:       33.0
    lonmax:       48.0
    latres:       0.0375
    lonres:       0.0375
    CDO:          Climate Data Operators version 2.0.5 (https://mpimet.mpg.de...
```

```python
shp_world = salem.read_shapefile(salem.get_demo_file('world_borders.shp'))
shp_world.plot()
```

> Output:
```text
<Axes: >
<Figure size 640x480 with 1 Axes>
```

```python
# remove other countries
shp_ethio = shp_world.loc[shp_world['CNTRY_NAME'] == 'Ethiopia'] 
shp_ethio.plot()
```

> Output:
```text
<Axes: >
<Figure size 640x480 with 1 Axes>
```

```python
shp_ethio = shp_world.loc[shp_world['CNTRY_NAME'] == 'Ethiopia']
rfe_et = tamsat_2019_june['rfe'].salem.roi(shape=shp_ethio)

fig, ax = plt.subplots(figsize=(10, 8))  # Create figure and axes
rfe_et.isel(time=0).plot(ax=ax, cmap='viridis', cbar_kwargs={'label': 'Precipitation'})
shp_ethio.plot(ax=ax, facecolor="none", edgecolor="black", linewidth=3) 
ax.set_title('TAMSAT Precipitation over Ethiopia')
ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')
plt.show()
```

> Output:
```text
<Figure size 1000x800 with 2 Axes>
```

```python


shp_ethio = shp_world.loc[shp_world['CNTRY_NAME'] == 'Ethiopia']
rfe_et = tamsat_2019_june['rfe'].salem.roi(shape=shp_ethio)

fig, ax = plt.subplots(figsize=(10, 8), subplot_kw={'projection': ccrs.PlateCarree()})

# Add the precipitation data
im = rfe_et.isel(time=0).plot(ax=ax, cmap='viridis', add_colorbar=False)

# Add the country boundary
ax.add_geometries(shp_ethio['geometry'], crs=ccrs.PlateCarree(), facecolor='none', edgecolor='black', linewidth=1)

# Add coastlines and borders for context
ax.coastlines(resolution='110m')
ax.add_feature(cfeature.BORDERS, linewidth=0.5)
ax.add_feature(cfeature.LAND, facecolor='lightgray')
ax.add_feature(cfeature.OCEAN, facecolor='lightblue')

# Set the title and labels
ax.set_title('TAMSAT Precipitation over Ethiopia')
ax.set_xlabel('Longitude')
ax.set_ylabel('Latitude')

# Add colorbar
cbar = plt.colorbar(im, ax=ax, orientation='vertical', pad=0.02, aspect=16, shrink=0.6)
cbar.set_label('Precipitation (mm)')

# Set the extent of the plot (optional, but recommended)
ax.set_extent([shp_ethio.bounds.minx.min(), shp_ethio.bounds.maxx.max(), shp_ethio.bounds.miny.min(), shp_ethio.bounds.maxy.max()], crs=ccrs.PlateCarree())

plt.show()
```

> Output:
```text
<Figure size 1000x800 with 2 Axes>
```

```python

```
