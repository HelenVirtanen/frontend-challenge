import React from "react";
import { type CatImage } from "../api/catApi";
import CatCatalog from "../components/CatCatalog/CatCatalog";

interface FavouritesProps {
  favourites: CatImage[];
  isFavourite: (id: string) => boolean;
  onToggleFavourite: (cat: CatImage) => void;
}

const FavouritesPage: React.FC<FavouritesProps> = ({
  favourites,
  isFavourite,
  onToggleFavourite,
}) => {
  return (
    <CatCatalog
      cats={favourites}
      isFavourite={isFavourite}
      onToggleFavourite={onToggleFavourite}
    />
  );
};

export default FavouritesPage;
