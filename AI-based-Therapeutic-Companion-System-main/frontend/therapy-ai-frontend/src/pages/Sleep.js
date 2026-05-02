import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HealthContext } from "../context/HealthContext";  // ✅ IMPORTANT

function Sleep() {

const { setSleepScore } = useContext(HealthContext); // ✅ FIXED

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

const questions = [
"My sleep was refreshing.",
"I fell asleep quickly.",
"My sleep was deep.",
"I woke up energetic.",
"I had pleasant dreams.",
"I did not wake up often.",
"My sleep environment was comfortable.",
"I slept enough hours.",
"I feel mentally fresh.",
"My body feels rested."
];

const [index,setIndex] = useState(0);
const [score,setScore] = useState(0);
const [finished,setFinished] = useState(false);
const [result,setResult] = useState("");

const emojiRain = (emoji) => {

const container = document.querySelector(".page");

for(let i=0;i<50;i++){

const span = document.createElement("span");

span.innerText = emoji;

span.style.position = "absolute";
span.style.left = Math.random()*100 + "vw";
span.style.top = "-120px";

span.style.fontSize = (20 + Math.random()*20) + "px";

span.style.pointerEvents = "none";
span.style.zIndex = "0";

span.style.animation = `rainFall ${2 + Math.random()*2}s linear forwards`;

container.appendChild(span);

setTimeout(()=>span.remove(),4000);

}
};

const answer = (val,emoji) => {

setScore(score + val);
emojiRain(emoji);

if(index < questions.length-1){
  setIndex(index+1);
}else{
  setFinished(true);

  let finalScore = score + val;
  let percent = Math.round((finalScore/(questions.length*5))*100);

  // ✅ SAVE TO CONTEXT (MOST IMPORTANT LINE 🔥)
  setSleepScore(percent);

  let msg="";
  if(percent>=80) msg="🌟 Amazing sleep!";
  else if(percent>=60) msg="🙂 Good sleep!";
  else if(percent>=40) msg="😐 Average sleep";
  else msg="😴 Poor sleep";

  setResult(percent+"% — "+msg);
}
};

return(

<div style={{display:"flex"}}>

{/* Sidebar */}
<div className="sidebar">
  <h2 className="logo">💙 AI Therapy</h2>

  {menu.map((item,i)=>(
    <div
      key={i}
      className={`menuItem ${location.pathname===item.path?"active":""}`}
      onClick={()=>navigate(item.path)}
    >
      {item.name}
    </div>
  ))}
</div>

<div className="page">

<div className="container">

<h1>🌙 Sleep Tracker</h1>

{!finished ? (

<>
<div className="question">
{questions[index]}
</div>

<button className="option" onClick={()=>answer(5,"😍")}>😍 Strongly Agree</button>
<button className="option" onClick={()=>answer(4,"😊")}>😊 Agree</button>
<button className="option" onClick={()=>answer(3,"😐")}>😐 Neutral</button>
<button className="option" onClick={()=>answer(2,"😕")}>😕 Disagree</button>
<button className="option" onClick={()=>answer(1,"😴")}>😴 Strongly Disagree</button>

<p className="progress">
Question {index+1} / {questions.length}
</p>
</>

) : (

<div className="card">
<h2>Your Sleep Score</h2>
<h3>{result}</h3>
</div>

)}

</div>

<style>{`
/* (same CSS unchanged) */
.sidebar{
width:230px;
padding:25px 15px;
background:rgba(255,255,255,0.25);
backdrop-filter:blur(15px);
border-right:1px solid rgba(255,255,255,0.3);
min-height:100vh;
}

.logo{text-align:center;margin-bottom:30px;color:#333;}

.menuItem{padding:12px;margin:6px 0;border-radius:10px;cursor:pointer;transition:.3s;}
.menuItem:hover{background:rgba(255,255,255,0.5);transform:translateX(6px);}
.active{background:linear-gradient(135deg,#a1c4fd,#c2e9fb);font-weight:600;}

.page{
display:flex;justify-content:center;align-items:center;height:100vh;
background:linear-gradient(-45deg,#a1c4fd,#c2e9fb,#fbc2eb,#a6c1ee);
background-size:400% 400%;
animation:bgMove 12s infinite alternate;
position:relative;overflow:hidden;flex:1;
}

@keyframes bgMove{
0%{background-position:0% 50%;}
100%{background-position:100% 50%;}
}

.container{
background:white;padding:35px;border-radius:20px;width:420px;
box-shadow:0 15px 30px rgba(0,0,0,0.2);
text-align:center;position:relative;z-index:2;
}

.question{font-size:20px;margin-bottom:25px;}

.option{
display:block;width:100%;padding:12px;margin:8px 0;
border:none;border-radius:12px;cursor:pointer;background:#f2f2f2;
}

.progress{color:gray;margin-top:10px;}

.card{
padding:20px;background:#f7f7ff;border-radius:15px;
}
`}</style>

</div>

</div>

);

}

export default Sleep;