import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div style={{ color: "#fff", padding: 20 }}>
      <h1>مرحبًا بك في RB Accountant 🚀</h1>
      <p>لوحة التحكم قيد التطوير</p>
    </div>
  );
}

export default App;
