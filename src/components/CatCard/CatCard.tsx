import React, { useState } from "react";
import LikedIcon from "../../assets/icons/liked.svg";
import NotLikedIcon from "../../assets/icons/not-liked.svg";
import type { CatImage } from "../../api/catApi";
import styles from "./CatCard.module.css";

interface CatCardProps {
  cat: CatImage;
  isFavourite: boolean;
  onToggleFavourite: (cat: CatImage) => void;
}

const CatCard: React.FC<CatCardProps> = ({
  cat,
  isFavourite,
  onToggleFavourite,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
      {(isHovered || isFavourite) && (
        <button
          className={styles.favouriteButton}
          aria-label={isFavourite ? "Удалить из избранного" : "В избранное"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavourite(cat);
          }}
        >
          {isFavourite ? <LikedIcon /> : <NotLikedIcon />}
        </button>
      )}
    </div>
  );
};

export default CatCard;
