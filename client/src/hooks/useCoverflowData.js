import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProduct,
  fetchCategoryProducts,
  fetchAmazonProducts,
} from "../store/features/productSlice";

export function useCoverflowData(navigate) {
  const dispatch = useDispatch();

  const [layerData, setLayerData] = useState({
    layer1: [],
    layer2: [],
    layer3: [],
    layer4: [], // final products (leaf)
  });

  const { amazonProducts } = useSelector((state) => state.products);

  // -------------------------
  // Fetch categories from API
  // -------------------------
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/items/categories?fields=id,name,parent.id,parent.name,image.*,children.*&limit=-1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_DIRECTUS_TOKEN}`,
          },
        }
      );

      const data = await res.json();
      const tree = buildCategoryTree(data?.data || []);
      setLayerData({ layer1: tree, layer2: [], layer3: [], layer4: [] });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // -------------------------
  // Convert flat categories to tree
  // -------------------------
  const buildCategoryTree = (categories) => {
    const map = {};
    const roots = [];

    categories.forEach((cat) => {
      map[cat.id] = { ...cat, subcategories: [] };
    });

    categories.forEach((cat) => {
      if (cat.parent?.id) {
        map[cat.parent.id]?.subcategories.push(map[cat.id]);
      } else {
        roots.push(map[cat.id]);
      }
    });

    return roots;
  };

  // -------------------------
  // Handle layer click
  // -------------------------
  const handleLayerClick = async (item, currentLayer) => {
    if (!item) return;

    const hasSubcategories =
      Array.isArray(item.subcategories) && item.subcategories.length > 0;

    switch (currentLayer) {
      case 1:
        if (hasSubcategories) {
          setLayerData((prev) => ({
            ...prev,
            layer2: item.subcategories,
            layer3: [],
            layer4: [],
          }));
        } else {
          await fetchProductsForCategory(item);
        }
        break;

      case 2:
        if (hasSubcategories) {
          setLayerData((prev) => ({
            ...prev,
            layer3: item.subcategories,
            layer4: [],
          }));
        } else {
          await fetchProductsForCategory(item);
        }
        break;

      case 3:
        if (hasSubcategories) {
          setLayerData((prev) => ({
            ...prev,
            layer4: item.subcategories, // show backend products
          }));
          await fetchProductsForCategory(item); // also fetch leaf products from backend + Amazon
        } else {
          await fetchProductsForCategory(item);
        }
        break;

      case 4:
        dispatch(setSelectedProduct(item));
        navigate("/product");
        break;

      default:
        break;
    }
  };

  // -------------------------
  // Fetch leaf products: eBay + Amazon
  // -------------------------
  const fetchProductsForCategory = async (item) => {
    try {
      dispatch(setSelectedProduct(item));
      dispatch(fetchCategoryProducts(item.name)); // eBay / Directus
      dispatch(fetchAmazonProducts(item.name)); // Amazon, safe to fail
    } catch (err) {
      console.error("Error fetching leaf products:", err);
    }
  };

  return {
    layerData,
    amazonProducts,
    handleLayerClick,
  };
}
