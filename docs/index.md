---
hide:
  - toc
---

<style>
/* Aggressive hiding of "Home" title */
.md-nav__title:contains("Home"),
.md-header__title:contains("Home"),
.md-ellipsis:contains("Home"),
h1:first-child {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* Center the content */
.md-main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.md-content {
  margin: 0 auto;
}

.md-typeset {
  max-width: none;
}

/* Hide sidebars on DESKTOP only - allow them on mobile for drawer navigation */
@media (min-width: 76.25em) {
  /* Hide left sidebar on home page (desktop only) */
  .md-sidebar--primary {
    display: none !important;
  }
  
  /* Hide right sidebar (TOC) on home page (desktop only) */
  .md-sidebar--secondary {
    display: none !important;
  }
}

/* On mobile, ensure the drawer can open when hamburger is clicked */
@media (max-width: 76.1875em) {
  .md-sidebar--primary {
    /* Let Material handle the drawer visibility */
    display: block !important;
  }
}
</style>

<div class="hero-banner-compact">
  <div class="hero-content">
    <h1 class="hero-title">AI and Machine Learning for Weather and Climate Prediction</h1>
  </div>
</div>

## General Information: Workshop Overview

<div class="workshop-overview-highlight">
  <div class="overview-content">
    <div class="workshop-intro">
      <p style="font-size:1.05rem;margin:0;">
        🚀 <strong>Workshop AI &amp; Machine Learning for Weather and Climate Prediction</strong><br>
        Organized by <strong> International Livestock Research Institute (ILRI) </strong> in collaboration with <strong>ai-ml-climate-workshop (EMI) </strong>. This intensive, hands-on training is designed to build advanced technical capacity within the Ethiopian Meteorological Institute by focusing on the use of AI and ML for climate analysis, forecasting, early warning, and decision support.
      </p>
    </div>
    <div class="target-audience-highlight">
      <div class="audience-icon">🎯</div>
      <div class="audience-content">
        <h3>Target Audience</h3>
        <p>
          The workshop is aimed at <strong>early-career meteorologists</strong>, <strong>climate forecasters</strong>, and <strong>climate data analysts</strong> who want to apply <strong>AI and Machine Learning methods</strong> to improve operational weather and climate services.
        </p>
      </div>
    </div>
  </div>
</div>

## Format and Logistics

<div class="format-logistics-highlight">
  <div class="logistics-grid-enhanced">
    <div class="logistics-item">
      <div class="logistics-icon">📍</div>
      <div class="logistics-content">
        <h4>Location</h4>
        <p><strong>EMI offices, Addis Ababa, Ethiopia</strong></p>
      </div>
    </div>
    <div class="logistics-item">
      <div class="logistics-icon">👨‍🏫</div>
      <div class="logistics-content">
        <h4>Facilitators</h4>
        <p><strong>Yonas Mersha</strong>, <strong>Teferi Demissie</strong></p>
      </div>
    </div>
    <div class="logistics-item">
      <div class="logistics-icon">📅</div>
      <div class="logistics-content">
        <h4>When</h4>
        <p><strong>Dec 20-31, 2025</strong> <a href="#" class="calendar-link-enhanced"></a></p>
      </div>
    </div>

  </div>
</div>

## Learning Outcomes

<div class="learning-outcomes-highlight">
  <div class="outcomes-list">
    <div class="outcome-item">
      <div class="outcome-number">1</div>
      <div class="outcome-content">
        <p><strong>Ingest and prepare meteorological and climate datasets (gridded and station-based)</strong></p>
      </div>
    </div>
    <div class="outcome-item">
      <div class="outcome-number">2</div>
      <div class="outcome-content">
        <p><strong>Engineer predictors (features) relevant for forecasting rainfall, temperature, and seasonal anomalies</strong></p>
      </div>
    </div>
    <div class="outcome-item">
      <div class="outcome-number">3</div>
      <div class="outcome-content">
        <p><strong>Build AI/ML models for short-term, seasonal, and subseasonal prediction</strong></p>
      </div>
    </div>
    <div class="outcome-item">
      <div class="outcome-number">4</div>
      <div class="outcome-content">
        <p><strong>Assess model skill using proper validation and testing strategies for climate data</strong></p>
      </div>
    </div>
    <div class="outcome-item">
      <div class="outcome-number">5</div>
      <div class="outcome-content">
        <p><strong>Generate decision-ready outputs for early warning and climate services</strong></p>
      </div>
    </div>

  </div>
</div>


## Design & Flow

<div class="format-logistics-highlight">
  <div class="logistics-grid-enhanced">
    <div class="logistics-item">
      <div class="logistics-icon">📆</div>
      <div class="logistics-content">
        <h4>5-Day Structure</h4>
        <p>
          We start with Python fundamentals, then move into scientific data tools
          (NumPy, Pandas, Xarray), then mapping (Cartopy, GeoPandas), and finally
          build a real machine learning forecasting workflow.
        </p>
      </div>
    </div>
    <div class="logistics-item">
      <div class="logistics-icon">🧪</div>
      <div class="logistics-content">
        <h4>Learning Style</h4>
        <p>
          Every module follows the same pattern:
          short explanation → live demo → hands-on exercise.
          You’ll write and run actual code for climate data from the GHA.
        </p>
      </div>
    </div>
    <div class="logistics-item">
      <div class="logistics-icon">🤖</div>
      <div class="logistics-content">
        <h4>Final Goal</h4>
        <p>
          By Day 5 you’ll walk through an <strong>end-to-end ML pipeline</strong> for
          subseasonal / seasonal rainfall prediction:
          data download, preprocessing, feature engineering, model training,
          and basic skill assessment.
        </p>
      </div>
    </div>

  </div>
</div>

## Daily Themes

<div class="modules-highlight">
  <div class="modules-grid">

  <div class="module-item">
    <div class="module-number">Day&nbsp;1</div>
    <div class="module-content">
      <h4>Python Foundations</h4>
      <p>Core Python syntax, data structures, loops, and functions — no prior coding assumed.</p>
      <p><a href="day1/01-python-basics/"><code>day1/01-python-basics.md</code></a></p>
    </div>
  </div>

  <div class="module-item">
    <div class="module-number">Day&nbsp;2</div>
    <div class="module-content">
      <h4>Scientific Python</h4>
      <p>NumPy for arrays and gridded data; Pandas for tables, time series, and climate station data.</p>
      <p><a href="day2/01-numpy/"><code>day2/01-numpy.md</code></a>, <a href="day2/02-pandas/"><code>day2/02-pandas.md</code></a></p>
    </div>
  </div>

  <div class="module-item">
    <div class="module-number">Day&nbsp;3</div>
    <div class="module-content">
      <h4>Climate Data & Visualization</h4>
      <p>Matplotlib for plots; Xarray & NetCDF for multidimensional climate datasets such as CHIRPS/ERA5.</p>
      <p><a href="day3/01-matplotlib/"><code>day3/01-matplotlib.md</code></a>, <a href="day3/02-xarray-netcdf/"><code>day3/02-xarray-netcdf.md</code></a></p>
    </div>
  </div>

  <div class="module-item">
    <div class="module-number">Day&nbsp;4</div>
    <div class="module-content">
      <h4>Mapping & ML Concepts</h4>
      <p>Cartopy & GeoPandas for maps and regional masks, then ML fundamentals and workflow design.</p>
      <p><a href="day4/01-cartopy/"><code>day4/01-cartopy.md</code></a>, <a href="day4/02-geopandas/"><code>day4/02-geopandas.md</code></a>, <a href="day4/03-ml-intro/"><code>day4/03-ml-intro.md</code></a>, <a href="day4/04-ml-workflow/"><code>day4/04-ml-workflow.md</code></a></p>
    </div>
  </div>

  <div class="module-item">
    <div class="module-number">Day&nbsp;5</div>
    <div class="module-content">
      <h4>Forecast Pipeline</h4>
      <p>
        Subseasonal & seasonal rainfall prediction using ML:
        data download, feature prep, exploratory analysis, stationarity checks, model training,
        and skill evaluation.
      </p>
      <p>
        <a href="day5/01-ml-based-s2s-prediction/"><code>day5/01-ml-based-s2s-prediction.md</code></a> → <a href="day5/05-ml-based-s2s-prediction/"><code>day5/05-ml-based-s2s-prediction.md</code></a>
      </p>
    </div>
  </div>

  </div>
</div>


## Tools & Modules

<p>
This workshop will use openly available analytical and modeling tools from the climate and AI ecosystem, including:
</p>

- Interactive notebook environments for exploratory modeling  
- Machine learning libraries for regression, classification, and forecasting  
- Tooling for evaluating model skill and generating forecast products  
- Lightweight reproducible workflows for operational use at EMI  

## Curated Datasets

- <strong>CHIRPS Rainfall</strong>: High-resolution precipitation data for East Africa  
- <strong>ERA5 Reanalysis</strong>: Atmospheric, land, and ocean variables for model input and validation  
- <strong>ENSO / IOD indices</strong>: Large-scale drivers of regional seasonal variability, used as ML predictors  

---

## 🚀 Interactive Learning with Binder

Experience hands-on learning with our interactive Jupyter notebooks! No installation required - just click and start coding.

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/YonSci/ai-ml-climate-workshop/HEAD?labpath=notebooks%2FPython_Basics_for_Climate_and_Meteorology_Workshop1.ipynb)

**Launch Interactive Environment** - Includes all lessons, sample climate data, and pre-configured Python environment.

> 💡 **What is Binder?** A free service that turns our GitHub repository into a live, interactive Jupyter environment. Perfect for following along with lessons or experimenting with code!

---

## 💬 Real-Time Collaboration

Join our dedicated real-time collaborative space for Q&A, notes, and discussions during training sessions:

<div class="collaboration-simple">
  <a href="https://mensuel.framapad.org/p/real-time-collaborative-pad-ahb0" target="_blank" class="collaboration-btn">
    🚀 Join Training Pad
  </a>
</div>

For more collaboration options, visit our [full collaboration guide](collaboration.md/).

## Requirements

<div class="requirements-highlight">
  <div class="requirements-content">
    <div class="requirement-main">
      <div class="req-icon-large">💻</div>
      <div class="req-text">
        <p>
          Bring a laptop (Windows, Linux, or macOS) that you control (admin rights).
          <strong>8 GB RAM recommended</strong>. We’ll install Python and required libraries locally
          or run provided notebooks.
        </p>
      </div>
    </div>
    <div class="no-prerequisites">
      <div class="prereq-icon">🎓</div>
      <div class="prereq-content">
        <h4>No prior Python or ML experience required</h4>
        <p>
          We start from first principles. By Day 2 you’ll already be working with real
          rainfall and climate data in code.
        </p>
      </div>
    </div>

  </div>
</div>

## Quick Links

<div class="logistics-grid" style="max-width:1200px;margin:2rem auto;">
  <div class="logistics-card">
    <div class="card-icon">💻</div>
    <h3><a href="setup/" class="calendar-link">Setup & Installation</a></h3>
    <p>Prepare Python, required libraries, and data access tools.</p>
  </div>

  <div class="logistics-card">
    <div class="card-icon">📅</div>
    <h3><a href="schedule/" class="calendar-link">Daily Schedule</a></h3>
    <p>See the 5-day plan including topics and exercises.</p>
  </div>

  <div class="logistics-card">
    <div class="card-icon">📚</div>
    <h3><a href="day1/01-python-basics/" class="calendar-link">Start Learning</a></h3>
    <p>Begin Day 1: Python Foundations (recommended start here).</p>
  </div>
  
  <div class="logistics-card">
    <div class="card-icon">🎯</div>
    <h3><a href="assessments/" class="calendar-link">Assessments</a></h3>
    <p>Interactive quizzes with auto-grading and progress tracking.</p>
  </div>

  <div class="logistics-card">
    <div class="card-icon">⬇️</div>
    <h3><a href="downloads/" class="calendar-link">Downloads</a></h3>
    <p>PDF versions of all lessons for offline study and reference.</p>
  </div>
  
  <div class="logistics-card">
    <div class="card-icon">❓</div>
    <h3><a href="faq/" class="calendar-link">FAQ</a></h3>
    <p>Common questions about laptops, data, pace, and expectations.</p>
  </div>
  



</div>



---

## Contact Information

Please email for more information: [yonas.yigezu@un.org](mailto:yonas.yigezu@un.org) | [demissie@cgiar.org](mailto:demissie@cgiar.org)
