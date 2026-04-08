export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const DEFAULT_LIMIT = 15;

if (!API_KEY && import.meta.env.DEV) {
  console.warn('VITE_CAT_API_KEY not found in .env file');
}

export const fetchCats = async (
  page: number = 0,
  limit: number = DEFAULT_LIMIT,
): Promise<CatImage[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/images/search?limit=${limit}&page=${page}`,
      {
        headers: {
          ...(API_KEY && { 'x-api-key': API_KEY }),
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch cats:", error);
    return [];
  }
};
