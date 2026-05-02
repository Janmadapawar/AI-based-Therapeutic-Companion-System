import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

function Reports() {

  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { name: "🏠 Home", path: "/dashboard" },
    { name: "🛌 Sleep Tracker", path: "/sleep" },
    { name: "😊 Mood Tracker", path: "/mood" },
    { name: "👀 Eye Fatigue", path: "/eye" },
    { name: "🤖 AI Chatbot", path: "/chatbot" },
    { name: "📊 Reports", path: "/reports" },
  ];

  const [sleepData, setSleepData] = useState([]);
  const [moodData, setMoodData] = useState([]);

  // ✅ Emoji mapping
  const moodEmojiMap = {
    5: "😁",
    4: "🙂",
    3: "😐",
    2: "😔",
    1: "😢"
  };

  useEffect(() => {

    const dummySleep = [
      { day: "Mon", hours: 6 },
      { day: "Tue", hours: 7 },
      { day: "Wed", hours: 5 },
      { day: "Thu", hours: 8 },
      { day: "Fri", hours: 6 },
      { day: "Sat", hours: 7 },
      { day: "Sun", hours: 9 },
    ];

    const dummyMood = [
      { day: "Mon", mood: 3 },
      { day: "Tue", mood: 4 },
      { day: "Wed", mood: 2 },
      { day: "Thu", mood: 5 },
      { day: "Fri", mood: 3 },
      { day: "Sat", mood: 4 },
      { day: "Sun", mood: 5 },
    ];

    setSleepData(dummySleep);
    setMoodData(dummyMood);

  }, []);

  return (

    <div style={{ display: "flex" }}>

      {/* ✅ Sidebar */}
      <div className="sidebar">
        <h2 className="logo">💙 AI Therapy</h2>

        {menu.map((item, i) => (
          <div
            key={i}
            className={`menuItem ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </div>
        ))}
      </div>

      {/* ✅ ORIGINAL PAGE */}
      <div className="reportsPage">

        <h1 className="title">📊 Weekly Reports</h1>

        {/* Sleep Chart */}
        <div className="chartBox">
          <h2>🛌 Sleep Analysis</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mood Chart */}
        <div className="chartBox">
          <h2>😊 Mood Analysis</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />

              {/* ✅ Emoji Y Axis */}
              <YAxis
                domain={[1, 5]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value) => moodEmojiMap[value]}
              />

              {/* ✅ Emoji Tooltip */}
              <Tooltip formatter={(value) => moodEmojiMap[value]} />

              <Bar dataKey="mood" fill="#f59e0b" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <style>{`

          /* ✅ Sidebar styles */
          .sidebar{
            width:230px;
            padding:25px 15px;
            background:rgba(255,255,255,0.25);
            backdrop-filter:blur(15px);
            border-right:1px solid rgba(255,255,255,0.3);
            min-height:100vh;
          }

          .logo{
            text-align:center;
            margin-bottom:30px;
            color:#333;
          }

          .menuItem{
            padding:12px;
            margin:6px 0;
            border-radius:10px;
            cursor:pointer;
            transition:.3s;
          }

          .menuItem:hover{
            background:rgba(255,255,255,0.5);
            transform:translateX(6px);
          }

          .active{
            background:linear-gradient(135deg,#a1c4fd,#c2e9fb);
            font-weight:600;
          }

          /* 👇 ORIGINAL CSS */
          .reportsPage{
            flex:1;
            padding:40px;
            min-height:100vh;
            background:linear-gradient(-45deg,#a1c4fd,#c2e9fb,#fbc2eb,#a6c1ee);
            background-size:400% 400%;
            animation:gradientMove 12s infinite alternate;
            font-family:Arial;
          }

          .title{
            text-align:center;
            margin-bottom:30px;
            animation:fadeDown .8s ease;
          }

          .chartBox{
            background:white;
            padding:25px;
            margin:20px auto;
            max-width:750px;
            border-radius:18px;
            box-shadow:0 10px 25px rgba(0,0,0,0.15);
            animation:cardPop .6s ease;
          }

          h2{
            margin-bottom:15px;
          }

          @keyframes gradientMove{
            0%{background-position:0% 50%;}
            100%{background-position:100% 50%;}
          }

          @keyframes cardPop{
            0%{transform:scale(.9);opacity:0}
            100%{transform:scale(1);opacity:1}
          }

          @keyframes fadeDown{
            0%{opacity:0;transform:translateY(-30px)}
            100%{opacity:1;transform:translateY(0)}
          }

        `}</style>

      </div>

    </div>
  );
}

export default Reports;