import { useState, useEffect } from "react";
import DisplayCard from "./components/DisplayCard";
import BanList from "./components/BanList";
import History from "./components/History";
import "./App.css";

const API_KEY = ""; // Optional – can be empty unless rate-limited

function App() {
  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState({ origin: [], breed: [] });
  const [history, setHistory] = useState([]);

  const fetchCat = async () => {
    try {
      const res = await fetch("https://api.thecatapi.com/v1/images/search?has_breeds=1", {
        headers: {
          "x-api-key": API_KEY
        }
      });
      const data = await res.json();
      const item = data[0];
      const breed = item.breeds?.[0];

      if (
        banList.origin.includes(breed?.origin) ||
        banList.breed.includes(breed?.name)
      ) {
        fetchCat(); // Try again if current one is banned
      } else {
        setCat(item);
        setHistory(prev => [...prev, item]);
      }
    } catch (err) {
      console.error("Failed to fetch cat:", err);
    }
  };

  const handleBan = (type, value) => {
    if (!banList[type].includes(value)) {
      setBanList(prev => ({
        ...prev,
        [type]: [...prev[type], value]
      }));
    }
  };

  const handleUnban = (type, value) => {
    setBanList(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="app">
      <h1>🐱 Veni Vici - Discover Cats</h1>
      <button onClick={fetchCat}>Discover</button>

      {cat && (
        <DisplayCard item={cat} onBan={handleBan} />
      )}

      <BanList banList={banList} onUnban={handleUnban} />
      <History items={history} />
    </div>
  );
}

export default App;
