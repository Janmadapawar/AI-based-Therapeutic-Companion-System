import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");

  const fullText = "Hey, I am Sage";

  useEffect(() => {
    if (phase !== "typing") return;

    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("split"), 1000);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div style={styles.page}>

      {/* LEFT SIDE */}
      <div
        style={{
          ...styles.left,
          width: phase === "split" ? "35%" : "100%",
        }}
      >
        {/* Typewriter text */}
        <h1 style={styles.typeText}>{text}</h1>

        {/* 🐨 KOALA */}
        <div
          style={{
            ...styles.koala,
            transform: phase === "split"
              ? "translateX(-100px)"
              : "translateX(0)",
          }}
        >
          🐨
        </div>

        {/* Speech bubble */}
        {phase === "split" && (
          <div style={styles.cloud}>
            C'mon, let’s go 💫
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      {phase === "split" && (
        <div style={styles.right}>

          <p style={styles.quote}>
            “Your mind deserves the same care as your body —  
            pause, breathe, and begin again.”
          </p>

          <button
            onClick={() => navigate("/login")}
            style={styles.button}
          >
            Get Started →
          </button>

        </div>
      )}

      <style>{`

      @keyframes gradientMove {
        0% {background-position:0% 50%;}
        100% {background-position:100% 50%;}
      }

      @keyframes floatKoala {
        0% {transform: translateY(0);}
        50% {transform: translateY(-15px);}
        100% {transform: translateY(0);}
      }

      @keyframes fadeIn {
        from {opacity:0; transform:translateY(20px);}
        to {opacity:1; transform:translateY(0);}
      }

      @keyframes glowBtn {
        0% {box-shadow:0 0 8px #4facfe;}
        50% {box-shadow:0 0 25px #00c6ff;}
        100% {box-shadow:0 0 8px #4facfe;}
      }

      `}</style>

    </div>
  );
}

const styles = {

  page: {
    height: "100vh",
    overflow: "hidden",
    position: "relative",
    fontFamily: "Arial"
  },

  left: {
    position: "absolute",
    height: "100%",
    background: "linear-gradient(-45deg,#a1c4fd,#c2e9fb,#fbc2eb,#a6c1ee)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 12s ease infinite",
    transition: "0.8s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  right: {
    position: "absolute",
    right: 0,
    width: "65%",
    height: "100%",
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeIn 0.8s ease"
  },

  typeText: {
    position: "absolute",
    top: "22%",
    fontSize: "30px",
    fontWeight: "600"
  },

  koala: {
    fontSize: "180px", // 🐨 BIG koala
    animation: "floatKoala 3s ease-in-out infinite",
    transition: "0.8s ease"
  },

  cloud: {
    position: "absolute",
    top: "42%",
    left: "60%",
    background: "white",
    padding: "12px 20px",
    borderRadius: "20px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    fontSize: "14px",
    animation: "fadeIn 0.6s ease"
  },

  quote: {
    fontStyle: "italic",
    color: "#0b3d91", // 🔵 dark blue
    fontSize: "26px",
    textAlign: "center",
    maxWidth: "420px",
    marginBottom: "35px",
    lineHeight: "1.8"
  },

  button: {
    padding: "14px 30px",
    background: "linear-gradient(135deg,#4facfe,#00c6ff)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "17px",
    animation: "glowBtn 3s infinite",
    transition: "0.3s"
  }

};

export default Welcome;