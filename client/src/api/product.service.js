const API_URL = import.meta.env.VITE_API_URL;
const AMAZON_API_URL = import.meta.env.VITE_AMAZON_API_URL;

// 1. Fetch all products
export async function fetchAllProducts() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function searchProducts(query) {
  const response = await fetch(`${API_URL}?q=pickleball ${query || ""}`);
  return response.json();
}

export async function fetchProductsByCategory(category) {
  const url = `${API_URL}?q=${category || ""}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchAmazonProductsByKeyword(keyword) {
  try {
    const url = `${AMAZON_API_URL}/search?keyword=pickleball ${keyword}`;
    const response = await fetch(url);
    const data = await response.json();

    // Data Transformation/Shaping (CRUCIAL to keep here)
    return (
      data?.SearchResult?.Items?.map((item) => ({
        id: item.ASIN,
        source: "amazon",
        title: item.ItemInfo?.Title?.DisplayValue || "Amazon Product",
        image_url: item.Images?.Primary?.Medium?.URL,
        price: {
          value: item.Offers?.Listings?.[0]?.Price?.Amount || "N/A",
          currency: item.Offers?.Listings?.[0]?.Price?.Currency || "USD",
        },
        itemWebUrl: item.DetailPageURL || "#",
      })) || []
    );
  } catch (error) {
    console.error("Amazon Service Error:", error);
    // Return an empty array or throw error for Redux to handle
    return [];
  }
}
