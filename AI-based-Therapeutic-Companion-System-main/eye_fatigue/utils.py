EAR_THRESHOLD = 0.25

def is_eye_closed(ear):
    return ear < EAR_THRESHOLD


def analyze(perclos, blink_rate):
    if perclos > 40:
        fatigue = "High Fatigue"
    elif perclos > 20:
        fatigue = "Moderate Fatigue"
    else:
        fatigue = "Alert"

    if blink_rate > 20:
        stress = "Possible Anxiety"
    elif blink_rate < 10:
        stress = "High Focus / Stress"
    else:
        stress = "Normal"

    return fatigue, stress


# ---------------- NEW LOGIC ----------------

def compute_score(blink_rate, perclos):
    score = 0

    # PERCLOS weight
    if perclos > 40:
        score += 2
    elif perclos > 20:
        score += 1

    # Blink rate weight
    if blink_rate > 25:
        score += 2
    elif blink_rate > 15:
        score += 1

    return score


def final_decision(score):
    if score >= 3:
        return "High Stress"
    elif score == 2:
        return "Moderate Stress"
    else:
        return "Low Stress"