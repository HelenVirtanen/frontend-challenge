import React, { useEffect, useRef, useCallback } from "react";
import CatCard from "../CatCard/CatCard";
import type { CatImage } from "../../api/catApi";
import styles from "./CatCatalog.module.css";

interface CatCatalogProps {
  cats: CatImage[];
  isFavourite: (id: string) => boolean;
  onToggleFavourite: (cat: CatImage) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  isLoadingMore?: boolean;
}

const CatCatalog: React.FC<CatCatalogProps> = ({
  cats,
  isFavourite,
  onToggleFavourite,
  onLoadMore,
  hasMore = false,
  isLoading = false,
  isLoadingMore = false,
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (
        entry.isIntersecting &&
        hasMore &&
        !isLoading &&
        !isLoadingMore &&
        onLoadMore
      ) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, isLoadingMore, onLoadMore],
  );

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: "100px",
    });

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [handleObserver, cats]);

  if (isLoading && cats.length === 0) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.spinnerCard}>
          <span>🐱</span>
        </div>
      </div>
    );
  }

  if (cats.length === 0 && !isLoading) {
    return <div className={styles.empty}>Любимых котиков пока нет...</div>;
  }

  return (
    <>
      <div className={styles.grid}>
        {cats.map((cat) => (
          <div key={cat.id} className={styles.gridCard}>
            <CatCard
              cat={cat}
              isFavourite={isFavourite(cat.id)}
              onToggleFavourite={onToggleFavourite}
            />
          </div>
        ))}
      </div>

      {hasMore && !isLoading && (
        <div ref={loaderRef} className={styles.loaderTrigger} />
      )}

      {isLoadingMore && (
        <div className={styles.loadingMessage}>
          <p>...загружаются еще котики...</p>
        </div>
      )}
    </>
  );
};

export default CatCatalog;
