import { useState, useEffect } from "react";
import type { CatImage } from "../api/catApi";

const FAVOURITES_KEY = "cat_favourites";

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<CatImage[]>(() => {
    const saved = localStorage.getItem(FAVOURITES_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (cat: CatImage) => {
    if (!favourites.some((fav) => fav.id === cat.id)) {
      setFavourites([...favourites, cat]);
    }
  };

  const removeFromFavourites = (catId: string) => {
    setFavourites(favourites.filter((cat) => cat.id !== catId));
  };

  const isFavourite = (catId: string): boolean => {
    return favourites.some((cat) => cat.id === catId);
  };

  const toggleFavourite = (cat: CatImage) => {
    if (isFavourite(cat.id)) {
      removeFromFavourites(cat.id);
    } else {
      addToFavourites(cat);
    }
  };

  return { favourites, isFavourite, toggleFavourite };
};
