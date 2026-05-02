from flask import Flask, request, jsonify
from eye_detection import get_eye_landmarks
from feature_extraction import calculate_EAR
from utils import is_eye_closed, analyze, compute_score, final_decision
from flask_cors import CORS
import uuid
import cv2, numpy as np, base64

app = Flask(__name__)
CORS(app)

sessions = {}

# -------------------------
# START SESSION
# -------------------------
@app.route("/start-session", methods=["POST"])
def start_session():
    session_id = str(uuid.uuid4())

    sessions[session_id] = {
        "closed_frames": 0,
        "total_frames": 0,
        "blink_count": 0,
        "eye_closed_prev": False
    }

    return jsonify({"session_id": session_id})


# -------------------------
# UPDATE FRAME
# -------------------------
@app.route("/update-frame", methods=["POST"])
def update_frame():
    data = request.json
    session_id = data.get("session_id")
    image_data = data.get("image")

    if session_id not in sessions:
        return jsonify({"error": "Invalid session_id"})

    session = sessions[session_id]

    try:
        encoded_data = image_data.split(",")[1]
        nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    except:
        return jsonify({"error": "Image decode failed"})

    if frame is None:
        return jsonify({"error": "Invalid frame"})

    h, w, _ = frame.shape
    landmarks = get_eye_landmarks(frame)

    if landmarks:
        ear = calculate_EAR(landmarks, w, h)
        eye_closed = is_eye_closed(ear)

        if eye_closed:
            session["closed_frames"] += 1

        if eye_closed and not session["eye_closed_prev"]:
            session["blink_count"] += 1

        session["eye_closed_prev"] = eye_closed

    session["total_frames"] += 1

    return jsonify({"status": "frame recorded"})


# -------------------------
# FINAL RESULT
# -------------------------
@app.route("/get-results", methods=["POST"])
def get_results():
    data = request.json
    session_id = data.get("session_id")

    if session_id not in sessions:
        return jsonify({"error": "Invalid session_id"})

    session = sessions.pop(session_id)

    closed_frames = session["closed_frames"]
    total_frames = session["total_frames"]
    blink_count = session["blink_count"]

    if total_frames == 0:
        return jsonify({"error": "No frames recorded"})

    perclos = (closed_frames / total_frames) * 100
    duration_sec = total_frames * 0.5
    blink_rate = (blink_count / duration_sec) * 60

    fatigue, _ = analyze(perclos, blink_rate)
    score = compute_score(blink_rate, perclos)
    stress = final_decision(score)

    return jsonify({
        "perclos": round(perclos, 2),
        "blink_rate": round(blink_rate, 2),
        "fatigue": fatigue,
        "stress": stress,
        "score": score
    })


if __name__ == "__main__":
    app.run(debug=True)