import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProduct,
  fetchCategoryProducts,
  fetchAmazonProducts,
} from "../store/features/productSlice";

export function useCoverflowData(navigate) {
  const dispatch = useDispatch();
  const { amazonProducts } = useSelector((state) => state.products);

  const [layers, setLayers] = useState({
    layer1: [],
    layer2: [],
    layer3: [],
    layer4: [], // leaf products
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // -------------------------
  // Fetch categories from API
  // -------------------------
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://pickleball-admin.onrender.com/api/categories"
      );
      const data = await res.json();
      const tree = buildCategoryTree(data || []);
      setLayers({ layer1: tree, layer2: [], layer3: [], layer4: [] });
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Build tree from flat categories
  // -------------------------
  const buildCategoryTree = (categories) => {
    const map = {};
    const roots = [];

    categories.forEach((cat) => {
      map[cat.id] = { ...cat, subcategories: [] };
    });

    categories.forEach((cat) => {
      if (cat.parent !== null && map[cat.parent]) {
        map[cat.parent].subcategories.push(map[cat.id]);
      } else {
        roots.push(map[cat.id]);
      }
    });

    return roots;
  };

  // -------------------------
  // Handle layer click
  // -------------------------
  const handleLayerClick = async (category, currentLayer) => {
    if (!category) return;

    const hasChildren =
      Array.isArray(category.subcategories) &&
      category.subcategories.length > 0;

    switch (currentLayer) {
      case 1:
        if (hasChildren) {
          setLayers((prev) => ({
            ...prev,
            layer2: category.subcategories,
            layer3: [],
            layer4: [],
          }));
        } else {
          await fetchLeafProducts(category);
        }
        break;

      case 2:
        if (hasChildren) {
          setLayers((prev) => ({
            ...prev,
            layer3: category.subcategories,
            layer4: [],
          }));
        } else {
          await fetchLeafProducts(category);
        }
        break;

      case 3:
        if (hasChildren) {
          setLayers((prev) => ({
            ...prev,
            layer4: [], // reset leaf products
          }));
        } else {
          await fetchLeafProducts(category);
        }
        break;

      case 4:
        dispatch(setSelectedProduct(category));
        navigate("/product");
        break;

      default:
        break;
    }
  };

  // -------------------------
  // Fetch leaf products (eBay + Amazon)
  // -------------------------
  const fetchLeafProducts = async (category) => {
    try {
      setLoading(true);
      dispatch(setSelectedProduct(category));
      dispatch(fetchCategoryProducts(category.name)); // backend / eBay
      dispatch(fetchAmazonProducts(category.name)); // Amazon
    } catch (err) {
      console.error("Error fetching leaf products:", err);
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  return {
    layers,
    amazonProducts,
    loading,
    error,
    handleLayerClick,
  };
}
