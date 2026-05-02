import React, { useState, useEffect, useRef, useContext } from "react";
import { HealthContext } from "../context/HealthContext";

function Chatbot() {

  // 🌿 Get real scores from context
  const { sleepScore, moodScore, eyeFatigueScore } = useContext(HealthContext);

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [options, setOptions] = useState([]);
  const [intent, setIntent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState("normal");
  const chatEndRef = useRef(null);

  // 🌿 Initial welcome message
  useEffect(() => {
    setChat([
      {
        sender: "bot",
        text: "Hey 😊 I'm Sage, your AI therapy companion. How are you feeling today?",
      },
    ]);
  }, []);

  // 🌿 Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // 🌿 Send message to backend
  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat(prev => [...prev, userMsg]);
    setIsTyping(true);

    // 🔥 Add memory + context (NO backend change needed)
    const lastMessages = chat
      .slice(-2)
      .map(m => `${m.sender}: ${m.text}`)
      .join("\n");

    const enrichedMessage = `
Conversation:
${lastMessages}

User says: ${message}

Context:
- Sleep Score: ${sleepScore}
- Mood Score: ${moodScore}
- Eye Fatigue: ${eyeFatigueScore}
`;

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: enrichedMessage,
          scores: {
            sleep: sleepScore,
            mood: moodScore,
            eye_fatigue: eyeFatigueScore
          }
        })
      });

      const data = await res.json();

      setTimeout(() => {
        setChat(prev => [
          ...prev,
          {
            sender: "bot",
            text: data.response || "I'm here for you 💙 Tell me more."
          }
        ]);

        setOptions(data.options || []);
        setIntent(data.intent || "");
        setIsTyping(false);
      }, 800);

    } catch (error) {
      console.error(error);
      setChat(prev => [
        ...prev,
        { sender: "bot", text: "Something went wrong 💙 Please try again." }
      ]);
      setIsTyping(false);
    }

    setMessage("");
  };

  // 🌿 Handle option click (natural flow)
  const handleOption = async (option) => {

    const userMsg = { sender: "user", text: option };
    setChat(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/option", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          option: option,
          intent: intent,
          scores: {
            sleep: sleepScore,
            mood: moodScore,
            eye_fatigue: eyeFatigueScore
          }
        })
      });

      const data = await res.json();

      setTimeout(() => {
        setChat(prev => [
          ...prev,
          {
            sender: "bot",
            text: data.response || "I'm here for you 💙"
          }
        ]);
        setIsTyping(false);
      }, 700);

    } catch (error) {
      console.error(error);
      setIsTyping(false);
    }
  };

  // 🌿 Enter key support
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>🌿 Sage AI Therapy</h2>

      {/* Chat window */}
      <div style={{
        height: "350px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
        background: "#f9f9f9"
      }}>
        {chat.map((msg, i) => (
          <div key={i} style={{
            textAlign: msg.sender === "user" ? "right" : "left",
            marginBottom: "8px"
          }}>
            <p>
              <b>{msg.sender === "user" ? "You" : "Sage"}:</b> {msg.text}
            </p>
          </div>
        ))}

        {isTyping && <p>🌿 Sage is typing...</p>}

        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your thoughts..."
        style={{ width: "70%", padding: "8px", borderRadius: "6px" }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginLeft: "10px",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Send
      </button>

      {/* Options */}
      <div style={{ marginTop: "10px" }}>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOption(opt)}
            style={{
              margin: "5px",
              padding: "6px 10px",
              borderRadius: "20px",
              cursor: "pointer"
            }}
          >
            {opt}
          </button>
        ))}
      </div>

    </div>
  );
}

export default Chatbot;