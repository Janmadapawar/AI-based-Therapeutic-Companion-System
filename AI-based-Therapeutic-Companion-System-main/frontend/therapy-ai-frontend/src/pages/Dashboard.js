import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "🏠 Home", path: "/" },
    { name: "🛌 Sleep Tracker", path: "/sleep" },
    { name: "😊 Mood Tracker", path: "/mood" },
    { name: "👀 Eye Fatigue", path: "/eye" },
    { name: "🤖 AI Chatbot", path: "/chatbot" },
    { name: "📊 Reports", path: "/reports" }, // ✅ ADDED
  ];

  return (

    <div className="container">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">💙 AI Therapy</h2>

        {menu.map((item, index) => (
          <div
            key={index}
            className={`menuItem ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="dashboardPage">

        <h1 className="title">
          AI Therapy Companion Dashboard
        </h1>

        <div className="grid">

          <div onClick={() => navigate("/sleep")} className="card">
            <h2>🛌 Sleep Tracker</h2>
            <p>Track your daily sleep pattern</p>
          </div>

          <div onClick={() => navigate("/mood")} className="card">
            <h2>😊 Mood Tracker</h2>
            <p>Monitor your emotional wellbeing</p>
          </div>

          <div onClick={() => navigate("/eye")} className="card">
            <h2>👀 Eye Fatigue</h2>
            <p>Track screen time and eye health</p>
          </div>

          <div onClick={() => navigate("/chatbot")} className="card">
            <h2>🤖 AI Chatbot</h2>
            <p>Talk with your AI therapy assistant</p>
          </div>


        </div>
      </div>

      <style>{`

      .container{
        display:flex;
        min-height:100vh;
        font-family:Arial;
      }

      /* Sidebar (Soft Theme) */
      .sidebar{
        width:230px;
        padding:25px 15px;
        display:flex;
        flex-direction:column;
        background:rgba(255,255,255,0.2);
        backdrop-filter:blur(15px);
        border-right:1px solid rgba(255,255,255,0.3);
      }

      .logo{
        text-align:center;
        margin-bottom:30px;
        color:#333;
      }

      .menuItem{
        padding:12px 15px;
        margin:6px 0;
        border-radius:12px;
        cursor:pointer;
        transition:.25s;
        color:#333;
      }

      .menuItem:hover{
        background:rgba(255,255,255,0.4);
        transform:translateX(5px);
      }

      .active{
        background:linear-gradient(135deg,#a1c4fd,#c2e9fb);
        font-weight:600;
      }

      /* Dashboard */
      .dashboardPage{
        flex:1;
        padding:40px;
        background:linear-gradient(-45deg,#a1c4fd,#c2e9fb,#fbc2eb,#a6c1ee);
        background-size:400% 400%;
        animation:gradientMove 12s infinite alternate;
      }

      .title{
        text-align:center;
        margin-bottom:30px;
      }

      .grid{
        display:grid;
        grid-template-columns:repeat(2,1fr);
        gap:25px;
        max-width:800px;
        margin:auto;
      }

      .card{
        background:white;
        padding:35px;
        border-radius:18px;
        text-align:center;
        box-shadow:0 10px 25px rgba(0,0,0,0.15);
        cursor:pointer;
        transition:.25s;
      }

      .card:hover{
        transform:translateY(-8px) scale(1.03);
        box-shadow:0 18px 40px rgba(0,0,0,0.2);
      }

      @keyframes gradientMove{
        0%{background-position:0% 50%;}
        100%{background-position:100% 50%;}
      }

      `}</style>

    </div>
  );
}

export default Dashboard;