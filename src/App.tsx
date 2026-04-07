import { useState, useEffect, useCallback } from "react";
import { fetchCats } from "./api/catApi";
import type { CatImage } from "./api/catApi";
import Header from "./components/Header/Header";
import CatCard from "./components/CatCard/CatCard";

function App() {
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [cats, setCats] = useState<CatImage[]>([]);

  const loadCats = useCallback(async () => {
    const newCats = await fetchCats();
    setCats((prev) => [...prev, ...newCats]);
  }, []);

  useEffect(() => {
    loadCats();
    console.log("All cats", cats);
  }, []);

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <section
        style={{ padding: "50px 62px 48px", maxWidth: "1440px", width: "100%" }}
      >
        <ul style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
          {cats?.map((cat) => (
            <CatCard key={cat.id} cat={cat} isFavorite={false} onToggleFavorite={() => {}} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
