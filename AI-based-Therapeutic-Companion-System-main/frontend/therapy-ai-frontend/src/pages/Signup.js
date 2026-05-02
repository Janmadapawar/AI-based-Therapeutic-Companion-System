import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const [otp,setOtp] = useState("");
  const [generatedOtp,setGeneratedOtp] = useState("");

  const generateOTP = () => {

    const otpValue = Math.floor(100000 + Math.random()*900000).toString();
    setGeneratedOtp(otpValue);

    alert("Demo OTP: " + otpValue);
  };

  const handleSignup = () => {

    const emailPattern = /\S+@\S+\.\S+/;

    if(!name){
      alert("Enter full name");
      return;
    }

    if(!emailPattern.test(email)){
      alert("Enter valid email");
      return;
    }

    if(password.length < 6){
      alert("Password must be at least 6 characters");
      return;
    }

    if(password !== confirm){
      alert("Passwords do not match");
      return;
    }

    if(otp !== generatedOtp){
      alert("Invalid OTP");
      return;
    }

    navigate("/dashboard");
  };

  return (

    <div style={styles.page}>

      <div style={styles.sparkles}>
        {/* ✨ 🌙 ⭐ 💫 ✨ */}
      </div>

      <div style={styles.card}>

        <h2 style={styles.title}>📝 Signup</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e)=>setConfirm(e.target.value)}
          style={styles.input}
        />

        <div style={{display:"flex", gap:"10px"}}>

          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            style={{...styles.input, flex:1}}
          />

          <button
            onClick={generateOTP}
            style={styles.otpButton}
          >
            Send OTP
          </button>

        </div>

        <button
          onClick={handleSignup}
          style={styles.signupButton}
        >
          Signup ✨
        </button>

        <p style={{marginTop:"15px"}}>
          Already have an account?
        </p>

        <button
          onClick={() => navigate("/login")}
          style={styles.login}
        >
          Login
        </button>

      </div>

      <style>{`

      @keyframes gradientMove {
        0% {background-position:0% 50%;}
        100% {background-position:100% 50%;}
      }

      @keyframes float {
        0% {transform:translateY(0)}
        50% {transform:translateY(-20px)}
        100% {transform:translateY(0)}
      }

      @keyframes cardPop {
        0% {transform:scale(.8); opacity:0}
        100% {transform:scale(1); opacity:1}
      }

      @keyframes glow {
        0% {box-shadow:0 0 5px #6c5ce7}
        50% {box-shadow:0 0 20px #a29bfe}
        100% {box-shadow:0 0 5px #6c5ce7}
      }

      `}</style>

    </div>
  );
}

const styles = {

  page:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    background:"linear-gradient(-45deg,#a1c4fd,#c2e9fb,#fbc2eb,#a6c1ee)",
    backgroundSize:"400% 400%",
    animation:"gradientMove 12s infinite alternate"
  },

  sparkles:{
    position:"absolute",
    top:"15%",
    fontSize:"28px",
    opacity:"0.7",
    animation:"float 6s ease-in-out infinite"
  },

  card:{
    background:"white",
    padding:"40px",
    borderRadius:"18px",
    boxShadow:"0 15px 40px rgba(0,0,0,0.15)",
    width:"320px",
    textAlign:"center",
    animation:"cardPop .6s ease"
  },

  title:{
    marginBottom:"15px"
  },

  input:{
    width:"100%",
    padding:"12px",
    marginTop:"12px",
    borderRadius:"10px",
    border:"1px solid #ddd",
    outline:"none",
    transition:"0.2s"
  },

  otpButton:{
    marginTop:"12px",
    padding:"10px",
    border:"none",
    borderRadius:"10px",
    background:"#00b894",
    color:"white",
    cursor:"pointer"
  },

  signupButton:{
    width:"100%",
    padding:"12px",
    marginTop:"20px",
    background:"#6c5ce7",
    color:"white",
    border:"none",
    borderRadius:"12px",
    cursor:"pointer",
    fontSize:"16px",
    animation:"glow 3s infinite"
  },

  login:{
    border:"none",
    background:"none",
    color:"#6c5ce7",
    cursor:"pointer",
    fontWeight:"bold"
  }

};

export default Signup;