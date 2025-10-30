# Elastic Net Regression (L1 + L2 Regularization)

**Elastic Net** blends **Lasso (L1)** and **Ridge (L2)** penalties.  
It combines Lasso's feature selection with Ridge's stability under multicollinearity.

1. Concept (why Elastic Net?)  
2. Math (objective, parameters)  
3. Code (fit and compare with OLS / Ridge / Lasso)  
4. Interpretation (what the coefficients mean, grouping effect)  
5. Assumptions (what stays the same from linear regression, what to watch out for)  
6. Seasonal rainfall forecasting example (OND rainfall ~ SST, soil moisture, wind index)  

## 1. Concept

- **Problem:** Many predictors, some highly correlated (e.g., climate indices, land/ocean variables). OLS becomes unstable; Lasso may drop correlated variables arbitrarily; Ridge keeps them but never zeros anyone out.
- **Elastic Net idea:** Use **both** L1 and L2 penalties to get the best of both worlds.
  - **L1 (Lasso)** → sparsity / feature selection (coefficients can be exactly 0).
  - **L2 (Ridge)** → stability with correlated predictors (grouping effect, discourages huge coefficients).

**When Elastic Net shines**
- You have groups of correlated predictors and want to **keep groups** rather than arbitrarily picking one (Lasso) or keeping all with wobbly weights (OLS).
- You want a model that's both **interpretable** and **stable** for forecasting.

## 2. Math

For predictors \(X \in \mathbb{R}^{n \times p}\), target \(y \in \mathbb{R}^{n}\), coefficients \(\beta \in \mathbb{R}^{p}\), the Elastic Net objective used (conceptually) is:

$$
\min_{\beta} \; \underbrace{\|y - X\beta\|_2^2}_{\text{RSS}} \;+\; \alpha \left( (1 - \text{l1\_ratio}) \|\beta\|_2^2 \;+\; \text{l1\_ratio} \|\beta\|_1 \right)
$$

- **RSS**: residual sum of squares (fit the data)
- **\(\alpha \ge 0\)**: overall regularization strength (bigger \(\alpha\) → stronger shrinkage)
- **\(\text{l1\_ratio} \in [0,1]\)**:
  - 0 → pure Ridge (L2 only)
  - 1 → pure Lasso (L1 only)
  - in-between → Elastic Net blend

> In scikit-learn, `ElasticNet(alpha=..., l1_ratio=...)` implements this (up to constant factors).  
> There is no simple closed-form like Ridge; optimization is done via coordinate descent.

## 3. Code Setup (Synthetic Data with Correlated Predictors)

We'll create a synthetic regression problem with **3 correlated predictors** and some noise.

We'll fit and compare:
- OLS (`LinearRegression`)
- Ridge
- Lasso
- ElasticNet (with a reasonable `l1_ratio`)

We'll examine:
- Coefficients
- R² and RMSE
- Coefficient paths vs. `alpha` (for Elastic Net)


```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet, ElasticNetCV
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import r2_score, mean_squared_error

np.random.seed(2025)

n = 100

# Correlated predictors (like multiple climate indices)
x1 = np.random.normal(0, 1, size=n)
x2 = 0.7*x1 + np.random.normal(0, 0.5, size=n)  # correlated with x1
x3 = 0.6*x1 - 0.2*x2 + np.random.normal(0, 0.5, size=n)  # correlated with both

# True relationship uses all, but not equally
y_true = 3.0 + 2.5*x1 + 1.0*x2 + 0.0*x3
y = y_true + np.random.normal(0, 1.5, size=n)

X = np.column_stack([x1, x2, x3])
feature_names = ["x1", "x2", "x3"]

print("Correlation matrix of predictors:")
print(np.round(np.corrcoef(X.T), 3))
```

## 4. Fit & Compare: OLS vs Ridge vs Lasso vs Elastic Net

We'll standardize features for the penalized models.  
Then we’ll compare coefficients, R², and RMSE on the same data (for demonstration).

```python
models = {
    "OLS": LinearRegression(),
    "Ridge(alpha=5)": Pipeline([("scaler", StandardScaler()), ("ridge", Ridge(alpha=5))]),
    "Lasso(alpha=0.2)": Pipeline([("scaler", StandardScaler()), ("lasso", Lasso(alpha=0.2, max_iter=10000))]),
    "ElasticNet(alpha=0.3,l1_ratio=0.5)": Pipeline([
        ("scaler", StandardScaler()),
        ("enet", ElasticNet(alpha=0.3, l1_ratio=0.5, max_iter=10000))
    ])
}

rows = []
for name, model in models.items():
    model.fit(X, y)
    yhat = model.predict(X)
    
    # Extract coefficients consistently
    if name == "OLS":
        coefs = model.coef_
        intercept = model.intercept_
    else:
        step = list(model.named_steps.values())[-1]  # last step (ridge/lasso/enet)
        coefs = step.coef_
        intercept = step.intercept_
    
    r2 = r2_score(y, yhat)
    rmse = mean_squared_error(y, yhat, squared=False)
    rows.append([name, intercept, *coefs, r2, rmse])

df = pd.DataFrame(rows, columns=["Model", "Intercept"] + feature_names + ["R2", "RMSE"])
df
```

### Elastic Net coefficient paths (vary `alpha`, fixed `l1_ratio`)

We'll fix `l1_ratio = 0.5` and sweep `alpha` on a log scale.  
Watch how the coefficients shrink and (sometimes) hit zero as `alpha` increases. 

```python
alpha_grid = np.logspace(-3, 1, 40)  # 0.001 to 10
coef_paths = {name: [] for name in feature_names}

for a in alpha_grid:
    pipe = Pipeline([("scaler", StandardScaler()),
                     ("enet", ElasticNet(alpha=a, l1_ratio=0.5, max_iter=10000))])
    pipe.fit(X, y)
    coef = pipe.named_steps["enet"].coef_
    for i, name in enumerate(feature_names):
        coef_paths[name].append(coef[i])

# Plot each coefficient vs alpha (one plot)
for name in feature_names:
    plt.plot(alpha_grid, coef_paths[name], label=f"{name}")
plt.xscale("log")
plt.xlabel("alpha (log scale)")
plt.ylabel("coefficient (standardized space)")
plt.title("Elastic Net coefficient paths (l1_ratio=0.5)")
plt.legend()
plt.show()
```

### Coefficients vs `l1_ratio` (fixed `alpha`)

Now fix `alpha = 0.3` and vary `l1_ratio` from 0 (Ridge-like) to 1 (Lasso-like).  
See how we can smoothly move between Ridge and Lasso behavior.

```python
l1_grid = np.linspace(0.0, 1.0, 21)
coef_l1 = {name: [] for name in feature_names}

for l1 in l1_grid:
    pipe = Pipeline([("scaler", StandardScaler()),
                     ("enet", ElasticNet(alpha=0.3, l1_ratio=l1, max_iter=10000))])
    pipe.fit(X, y)
    coef = pipe.named_steps["enet"].coef_
    for i, name in enumerate(feature_names):
        coef_l1[name].append(coef[i])

for name in feature_names:
    plt.plot(l1_grid, coef_l1[name], label=f"{name}")
plt.xlabel("l1_ratio (0=Ridge, 1=Lasso)")
plt.ylabel("coefficient (standardized space)")
plt.title("Elastic Net coefficients vs l1_ratio (alpha=0.3)")
plt.legend()
plt.show()
```

## 5. Interpretation (how to explain Elastic Net)

1. **Blending selection and stability**  
   - L1 part encourages **sparsity** (drops weak features).  
   - L2 part encourages **grouping** (keeps correlated features together with moderated weights).

2. **Compared to Lasso**  
   - Lasso often picks **one** among correlated predictors and zeros the rest.
   - Elastic Net tends to **share** weight across correlated predictors, which can better reflect the physics (e.g., multiple climate modes contributing).

3. **Compared to Ridge**  
   - Ridge keeps all predictors with small coefficients (no exact zeros).  
   - Elastic Net can zero truly weak signals while keeping groups.

4. **Hyperparameters**  
   - `alpha`: overall penalty strength. Larger → heavier shrinkage.  
   - `l1_ratio`: mix of L1 vs L2. Near 0 → Ridge-like; near 1 → Lasso-like.  
   - Normally pick via **cross-validation** (`ElasticNetCV`).

5. **Communication to stakeholders**  
   - *"We include both ocean and land predictors. Elastic Net keeps them together when they tell the same story, and it drops weak signals. This gives a stable and interpretable seasonal forecast."*

## 6. Assumptions & Practical Notes

Mostly inherited from linear regression:
1. **Linearity** in predictors (if nonlinear, add features or use nonlinear models).
2. **Independent errors** (watch out for autocorrelation in time series like seasonal rainfall).
3. **Homoscedasticity** (constant variance of residuals).

Practical details:
- **Scaling matters** for penalized models; always standardize predictors.
- **Outliers** can still distort results; consider robust preprocessing.
- **Choose alpha & l1_ratio with cross-validation** to balance bias/variance and sparsity/stability.
- For **climate/seasonal forecasting**, prefer stable coefficients and test on held-out years to ensure **generalization**.

## 7. Seasonal Forecast Example: OND Rainfall ~ SST + Soil Moisture + Wind Index

Let's simulate a small seasonal forecasting problem like you'd present to NMHS/ICPAC:

**Predictors**
- `sst_anom`: Niño3.4-like SST anomaly (°C)
- `soil_moisture_idx`: land moisture memory (dimensionless)
- `wind_index`: low-level moisture transport (dimensionless)

**Target**
- `rain_ond`: OND seasonal rainfall (mm)

We will fit **Elastic Net** and briefly compare it with OLS, Ridge, and Lasso.  
This mirrors real-world teleconnection forecasting where predictors are correlated and you want both stability and parsimony.

```python
np.random.seed(404)

n_years = 50

sst_anom = np.random.normal(0.0, 1.0, size=n_years)
soil_moisture_idx = 0.6*sst_anom + np.random.normal(0.0, 0.6, size=n_years)  # correlated with SST
wind_index = np.random.normal(0.0, 1.0, size=n_years)  # may add some independent signal

# True model: SST and soil moisture matter most; wind weaker
rain_ond = 100 + 26*sst_anom + 14*soil_moisture_idx + 4*wind_index + np.random.normal(0.0, 20.0, size=n_years)

Xc = np.column_stack([sst_anom, soil_moisture_idx, wind_index])
yc = rain_ond

# Build models with scaling for penalized ones
ols = LinearRegression()
ridge = Pipeline([("scaler", StandardScaler()), ("ridge", Ridge(alpha=10))])
lasso = Pipeline([("scaler", StandardScaler()), ("lasso", Lasso(alpha=0.2, max_iter=10000))])
enet = Pipeline([("scaler", StandardScaler()), ("enet", ElasticNet(alpha=0.3, l1_ratio=0.5, max_iter=10000))])

models_c = {"OLS": ols, "Ridge": ridge, "Lasso": lasso, "ElasticNet": enet}

report = []
for name, m in models_c.items():
    m.fit(Xc, yc)
    yhat = m.predict(Xc)
    if name == "OLS":
        coefs = m.coef_
        intercept = m.intercept_
    else:
        last = list(m.named_steps.values())[-1]
        coefs = last.coef_
        intercept = last.intercept_
    r2 = r2_score(yc, yhat)
    rmse = mean_squared_error(yc, yhat, squared=False)
    report.append([name, intercept, *coefs, r2, rmse])

pd.DataFrame(report, columns=["Model", "Intercept", "coef_SST", "coef_Soil", "coef_Wind", "R2", "RMSE"])
```

### Narrative for seasonal forecast users

- **Elastic Net** balances selection and stability.  
  - If SST and soil moisture are correlated, ENet tends to keep **both** with moderated weights (grouping), reflecting the physical co-variability of ocean and land memory.  
  - If `wind_index` is weak, ENet can shrink it toward zero.

- **Why this helps operations**  
  - Seasonal outlooks need **stable, believable coefficients** month-to-month.  
  - ENet avoids the flip/flop behavior of OLS when predictors are correlated, while still simplifying like Lasso when a predictor is weak.

Try **`ElasticNetCV`** to select `alpha` and `l1_ratio` automatically with cross-validation on past years.

```python
# Quick demo: ElasticNetCV to pick alpha and l1_ratio via cross-validation
enet_cv = Pipeline([
    ("scaler", StandardScaler()),
    ("enetcv", ElasticNetCV(l1_ratio=[0.2, 0.5, 0.8, 1.0],  # 1.0 ~ Lasso
                            alphas=np.logspace(-3, 1, 20),
                            max_iter=10000, cv=5, random_state=0))
])
enet_cv.fit(Xc, yc)
best = enet_cv.named_steps["enetcv"]
print("Best alpha:", best.alpha_)
print("Best l1_ratio:", best.l1_ratio_)

yhat_cv = enet_cv.predict(Xc)
print("R² (CV-chosen):", round(r2_score(yc, yhat_cv), 4))
print("RMSE (CV-chosen):", round(mean_squared_error(yc, yhat_cv, squared=False), 4))
```

## 8. Exercises

1. **Train/Test Split (Forecast realism)**  
   Split by time (first 35 years = train, last 15 = test). Fit OLS, Ridge, Lasso, ElasticNet on train and compare **test** R²/RMSE. Which generalizes best?

2. **Hyperparameter Sweep**  
   Use `ElasticNetCV` with a wider grid of `l1_ratio` and `alpha`. Do results change if you include an IOD-like index that's correlated with SST?

3. **Communication Exercise**  
   Convert ENet coefficients to a policy message:
   - "A +1°C Niño3.4 anomaly is associated with +__ mm OND rainfall, **controlling** for soil moisture and winds."
   - "Soil moisture memory contributes +__ mm."  
   - "Wind transport contributes +__ mm (if retained)."

4. **Diagnostics**  
   Plot residuals vs. predictions; check for curvature or heteroscedasticity. If you see structure, consider nonlinear features (e.g., interactions, lags) or other teleconnection indices.
