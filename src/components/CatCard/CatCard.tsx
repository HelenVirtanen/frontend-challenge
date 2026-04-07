import React, { useState } from "react";
import LikedIcon from "../../assets/icons/liked.svg";
import NotLikedIcon from "../../assets/icons/not-liked.svg";
import type { CatImage } from "../../api/catApi";
import styles from "./CatCard.module.css";

interface CatCardProps {
  cat: CatImage;
  isFavorite: boolean;
  onToggleFavorite: (cat: CatImage) => void;
}

const CatCard: React.FC<CatCardProps> = ({
  cat,
  isFavorite,
  onToggleFavorite,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.card}>
      {!imageLoaded && (
        <div className={styles.skeleton}>
          <span>🐱</span>
        </div>
      )}
      <img
        src={cat.url}
        alt={`Cat ${cat.id}`}
        className={`${styles.image} ${imageLoaded ? styles.imageVisible : styles.imageHidden}`}
        onLoad={() => setImageLoaded(true)}
      />
      <button
        className={styles.favoriteButton}
        aria-label={isFavorite ? "Удалить из избранного" : "В избранное"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(cat);
        }}
      >
        {isFavorite ? <LikedIcon /> : <NotLikedIcon />}
      </button>
    </div>
  );
};

export default CatCard;
