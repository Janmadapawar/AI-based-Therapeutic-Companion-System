import React, { createContext, useState } from "react";

export const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [sleepScore, setSleepScore] = useState(0);
  const [moodScore, setMoodScore] = useState(0);
  const [eyeFatigueScore, setEyeFatigueScore] = useState(0);

  return (
    <HealthContext.Provider
      value={{
        sleepScore,
        setSleepScore,
        moodScore,
        setMoodScore,
        eyeFatigueScore,
        setEyeFatigueScore
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};