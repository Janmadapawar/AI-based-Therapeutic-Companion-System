import cv2
import time
from eye_detection import get_eye_landmarks
from feature_extraction import calculate_EAR
from utils import is_eye_closed, analyze, compute_score, final_decision
DURATION = 30  

cap = cv2.VideoCapture(0)

closed_frames = 0
total_frames = 0
blink_count = 0
eye_closed_prev = False

start_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    total_frames += 1
    h, w, _ = frame.shape

    landmarks = get_eye_landmarks(frame)

    if landmarks:
        ear = calculate_EAR(landmarks, w, h)
        eye_closed = is_eye_closed(ear)

        if eye_closed:
            closed_frames += 1

        if eye_closed and not eye_closed_prev:
            blink_count += 1

        eye_closed_prev = eye_closed

        cv2.putText(frame, f"EAR: {ear:.2f}", (20, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)

    elapsed = time.time() - start_time
    if elapsed >= DURATION:
        break

    cv2.imshow("Eye Monitor", frame)
    if cv2.waitKey(1) & 0xFF == 27:
        break

cap.release()
cv2.destroyAllWindows()

# ---- FINAL CALC ----
perclos = (closed_frames / total_frames) * 100
blink_rate = (blink_count / DURATION) * 60

fatigue, _ = analyze(perclos, blink_rate)

score = compute_score(blink_rate, perclos)
stress = final_decision(score)

print("\n---- REPORT ----")
print(f"PERCLOS: {perclos:.2f}%")
print(f"Blink Rate: {blink_rate:.2f}")
print(f"Fatigue Level: {fatigue}")
print(f"Stress Level: {stress}")
print(f"Risk Score: {score}/4")
