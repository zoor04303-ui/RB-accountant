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
    <div style={{ color: "white", textAlign: "center", marginTop: "40px" }}>
      <h1>🚀 RB Accountant</h1>
      <p>التطبيق اشتغل بنجاح</p>
    </div>
  );
}

export default App;
