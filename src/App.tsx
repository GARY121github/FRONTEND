import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <h1>Loading...</h1> : <Outlet />;
};

export default App;
