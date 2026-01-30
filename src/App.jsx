import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 ثانية

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "32px" }}>🚀 RB Accountants</h1>
      <p style={{ marginTop: "10px", opacity: 0.8 }}>
        الحل المحاسبي الأذكى للتجار
      </p>

      <button
        style={{
          marginTop: "40px",
          padding: "14px 32px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#00c2ff",
          color: "#000",
          fontWeight: "bold",
        }}
        onClick={() => alert("نبدأ الربط 🚀")}
      >
        ابدأ الآن
      </button>
    </div>
  );
}

export default App;
