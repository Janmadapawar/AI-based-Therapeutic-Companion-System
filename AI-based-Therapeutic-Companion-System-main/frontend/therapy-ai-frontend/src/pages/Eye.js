import React, { useState, useContext, useRef } from "react";

import Webcam from "react-webcam";
import { HealthContext } from "../context/HealthContext";

function Eye() {

  const { setEyeFatigueScore } = useContext(HealthContext);

  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const SESSION_DURATION = 30;
  const FRAME_INTERVAL = 500;

  const startSession = async () => {
    setResult(null);
    setRunning(true);
    setProgress(0);

    const startRes = await fetch("http://127.0.0.1:5000/start-session", {
      method: "POST",
    });

    const startData = await startRes.json();
    const session_id = startData.session_id;

    const totalFrames = (SESSION_DURATION * 1000) / FRAME_INTERVAL;
    let framesRecorded = 0;

    const interval = setInterval(async () => {
      framesRecorded++;

      const imageSrc = webcamRef.current.getScreenshot();


      

      try {
        await fetch("http://127.0.0.1:5000/update-frame", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id, image: imageSrc }),
        });
      } catch (err) {
        console.error("Frame error:", err);
      }

      setProgress((framesRecorded / totalFrames) * 100);

      if (framesRecorded >= totalFrames) {
        clearInterval(interval);
        setRunning(false);

        try {
          const res = await fetch("http://127.0.0.1:5000/get-results", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id }),
          });

          const data = await res.json();
          setResult(data);
        } catch (err) {
          console.error("Result error:", err);
        }
      }
    }, FRAME_INTERVAL);
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "50px",
      flexWrap: "wrap",
      padding: "40px",
      fontFamily: "'Segoe UI', sans-serif",
      backgroundColor: "#f5f6fa",
      minHeight: "100vh"
    }}>

      {/* LEFT: Webcam */}
      <div style={{
        width: "800px",
        height: "500px",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        backgroundColor: "#e3e6f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={800}
          height={500}
          style={{ borderRadius: "20px", objectFit: "cover" }}
        />
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        flex: "1",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h1 style={{ color: "#3a3f58", marginBottom: "30px" }}>
          Eye Fatigue Detection
        </h1>

        <button
          onClick={startSession}
          disabled={running}
          style={{
            padding: "18px 40px",
            fontSize: "17px",
            fontWeight: "600",
            color: "#fff",
            background: "linear-gradient(135deg, #6c63ff, #9a94ff)",
            border: "none",
            borderRadius: "35px",
            cursor: running ? "not-allowed" : "pointer",
            boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
            marginBottom: "20px"
          }}
        >
          {running ? "Analyzing..." : "Start 30-sec Session"}
        </button>

        {/* Progress Bar */}
        {running && (
          <div style={{
            width: "100%",
            height: "14px",
            backgroundColor: "#d8d9e3",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "20px"
          }}>
            <div style={{
              width: `${progress}%`,
              height: "100%",
              background: "linear-gradient(90deg, #6c63ff, #b7b3ff)",
              transition: "width 0.2s"
            }}></div>
          </div>
        )}

        {/* RESULT */}
        {result && (
          <div style={{
            padding: "25px",
            borderRadius: "20px",
            backgroundColor: "#f0f2f8",
            boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
            width: "100%",
            textAlign: "left"
          }}>
            <p><strong>PERCLOS:</strong> {result.perclos}%</p>
            <p><strong>Blink Rate:</strong> {result.blink_rate}</p>
            <p><strong>Fatigue:</strong> {result.fatigue}</p>
            <p><strong>Stress:</strong> {result.stress}</p>
            <p><strong>Score:</strong> {result.score}</p>
          </div>
        )}

        {/* 🐱 DANCING CAT */}
        {!running && !result && (
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <img
              src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
              alt="dancing cat"
              style={{
                width: "200px",
                borderRadius: "20px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.2)"
              }}
            />
            <p style={{ marginTop: "10px", color: "#555" }}>
              Ready when you are 😺
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Eye;