import numpy as np
from sklearn.linear_model import LogisticRegression

# ---- TRAINING DATA (simple synthetic dataset) ----
# [blink_rate, perclos]
X = np.array([
    [8, 10],   # low stress
    [12, 15],
    [15, 18],
    [18, 22],
    [22, 28],
    [25, 35],
    [30, 40],
    [35, 45],  # high stress
])

# Labels: 0 = Low, 1 = Moderate, 2 = High
y = np.array([0, 0, 1, 1, 1, 2, 2, 2])

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X, y)


def predict_stress(blink_rate, perclos):
    data = np.array([[blink_rate, perclos]])
    pred = model.predict(data)[0]

    if pred == 0:
        return "Low Stress"
    elif pred == 1:
        return "Moderate Stress"
    else:
        return "High Stress"