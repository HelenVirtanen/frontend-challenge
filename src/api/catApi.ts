export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const BASE_URL = 'https://api.thecatapi.com/v1';

export const fetchCats = async (page: number = 0, limit: number = 15): Promise<CatImage[]> => {
  const response = await fetch(`${BASE_URL}/images/search?limit=${limit}&page=${page}`);
  const data = await response.json();
  return data;
};