import React, { useState, useEffect } from "react";
import { fetchCats, type CatImage } from "../api/catApi";
import CatCatalog from "../components/CatCatalog/CatCatalog";

interface MainPageProps {
  isFavourite: (id: string) => boolean;
  onToggleFavourite: (cat: CatImage) => void;
}

const MainPage: React.FC<MainPageProps> = ({
  isFavourite,
  onToggleFavourite,
}) => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);
      const newCats = await fetchCats(0, 15);

      if (isMounted) {
        if (newCats.length === 0 || newCats.length < 15) {
          setHasMore(false);
        }

        setCats(newCats);
        setPage(1);
        setIsLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  const loadMoreCats = async () => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    try {
      const newCats = await fetchCats(page, 15);

      if (newCats.length === 0 || newCats.length < 15) {
        setHasMore(false);
      }

      setCats((prev) => [...prev, ...newCats]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load more cats:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <CatCatalog
      cats={cats}
      isFavourite={isFavourite}
      onToggleFavourite={onToggleFavourite}
      onLoadMore={loadMoreCats}
      hasMore={hasMore}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
    />
  );
};

export default MainPage;
