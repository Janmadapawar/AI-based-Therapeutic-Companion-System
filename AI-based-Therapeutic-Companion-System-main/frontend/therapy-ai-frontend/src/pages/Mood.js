import React, { useState, useContext } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { HealthContext } from "../context/HealthContext";

function Mood(){

const navigate = useNavigate();
const location = useLocation();

const { setMoodScore } = useContext(HealthContext);

const menu = [
  { name: "🏠 Home", path: "/dashboard" },
  { name: "🛌 Sleep Tracker", path: "/sleep" },
  { name: "😊 Mood Tracker", path: "/mood" },
  { name: "👀 Eye Fatigue", path: "/eye" },
  { name: "🤖 AI Chatbot", path: "/chatbot" },
  { name: "📊 Reports", path: "/reports" },
];

const [moods,setMoods] = useState({});
const [card,setCard] = useState(null);

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

const setMood=(time,emoji)=>{

const updated={...moods,[time]:emoji};

setMoods(updated);

emojiRain(emoji);

if(time==="evening"){

const values=Object.values(updated);

let counts={};

values.forEach(m=>counts[m]=(counts[m]||0)+1);

const overall=Object.keys(counts).reduce((a,b)=>counts[a]>counts[b]?a:b);

let score = 5;

if (overall === "😁") score = 9;
else if (overall === "🙂") score = 7;
else if (overall === "😐") score = 5;
else score = 3;

setMoodScore(score);

let moodName="";

if(overall==="😁") moodName="Fantastic Day";
else if(overall==="🙂") moodName="Good Day";
else if(overall==="😐") moodName="Neutral Day";
else moodName="Tough Day";

setCard(
<div className="card">
<h2>{overall}</h2>
<h3>{moodName}</h3>
<p>Your overall mood today</p>
</div>
);

}

};

return(

<div style={{display:"flex"}}>

{/* ✅ Sidebar */}
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

{/* ✅ ORIGINAL CODE */}
<div className="page">

<div className="container">

<h1>😊 Mood Tracker</h1>

<div className="row">
Morning<br/>
<span onClick={()=>setMood("morning","😁")} className="moodBtn">😁</span>
<span onClick={()=>setMood("morning","🙂")} className="moodBtn">🙂</span>
<span onClick={()=>setMood("morning","😐")} className="moodBtn">😐</span>
<span onClick={()=>setMood("morning","😔")} className="moodBtn">😔</span>
</div>

<div className="row">
Afternoon<br/>
<span onClick={()=>setMood("afternoon","😁")} className="moodBtn">😁</span>
<span onClick={()=>setMood("afternoon","🙂")} className="moodBtn">🙂</span>
<span onClick={()=>setMood("afternoon","😐")} className="moodBtn">😐</span>
<span onClick={()=>setMood("afternoon","😔")} className="moodBtn">😔</span>
</div>

<div className="row">
Evening<br/>
<span onClick={()=>setMood("evening","😁")} className="moodBtn">😁</span>
<span onClick={()=>setMood("evening","🙂")} className="moodBtn">🙂</span>
<span onClick={()=>setMood("evening","😐")} className="moodBtn">😐</span>
<span onClick={()=>setMood("evening","😔")} className="moodBtn">😔</span>
</div>

{card}

</div>

<style>{`

/* ✅ Sidebar */
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

/* 👇 YOUR ORIGINAL CSS (unchanged) */
.page{
display:flex;
justify-content:center;
align-items:center;
height:100vh;
background:linear-gradient(-45deg,#a1c4fd,#c2e9fb,#fbc2eb,#a6c1ee);
background-size:400% 400%;
animation:bgMove 12s infinite alternate;
position:relative;
overflow:hidden;
flex:1;
}

@keyframes bgMove{
0%{background-position:0% 50%;}
100%{background-position:100% 50%;}
}

.container{
background:white;
padding:35px;
border-radius:20px;
width:420px;
text-align:center;
box-shadow:0 15px 30px rgba(0,0,0,0.2);
position:relative;
z-index:2;
}

.row{
margin:18px 0;
}

.moodBtn{
font-size:30px;
margin:6px;
cursor:pointer;
transition:.2s;
}

.moodBtn:hover{
transform:scale(1.4) rotate(10deg);
}

.card{
margin-top:20px;
padding:20px;
background:#f7f7ff;
border-radius:15px;
animation:pop .5s ease;
}

@keyframes pop{
0%{transform:scale(.6);opacity:0}
100%{transform:scale(1);opacity:1}
}

@keyframes rainFall{

0%{
transform:translateY(-120px) translateX(0) rotate(0deg);
opacity:1;
}

50%{
transform:translateY(50vh) translateX(40px) rotate(180deg);
}

100%{
transform:translateY(110vh) translateX(-40px) rotate(360deg);
opacity:0;
}

}

`}</style>

</div>

</div>

);

}

export default Mood;