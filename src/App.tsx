import { useState } from "react";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage";
import FavouritesPage from "./pages/FavouritesPage";
import { useFavourites } from "./hooks/useFavourites";

function App() {
  const [activeTab, setActiveTab] = useState<"all" | "favourites">("all");
  const { favourites, isFavourite, toggleFavourite } = useFavourites();

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {activeTab === "all" ? (
          <MainPage
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
          />
        ) : (
          <FavouritesPage
            favourites={favourites}
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
          />
        )}
      </main>
    </>
  );
}

export default App;
