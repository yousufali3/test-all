import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [lastData, setLastData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://the-it-studio-assignment-backend.onrender.com/api/data/all"
        );
        const result = await response.json();
        if (JSON.stringify(result) !== JSON.stringify(lastData)) {
          setData(result);
          setLastData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [lastData]);

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Test />
    </div>
  );
};

export default App;
