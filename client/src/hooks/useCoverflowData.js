import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryProducts,
  setSelectedProduct,
  fetchAmazonProducts,
} from "../../store/features/productSlice";

export function useCoverflowData(navigate) {
  const dispatch = useDispatch();

  const [layerData, setLayerData] = useState({
    layer1: [],
    layer2: [],
    layer3: [], // eBay products
  });

  // ✅ Keep Amazon products separate
  const { amazonProducts, amazonStatus } = useSelector(
    (state) => state.products
  );

  // Initialize Layer 1 categories
  const setInitialCategories = (categories) => {
    const cleanCategories = categories.map((cat) => ({
      ...cat,
      subcategories: cat.subcategories || [],
    }));

    setLayerData({
      layer1: cleanCategories,
      layer2: [],
      layer3: [],
    });
  };

  // Handle clicks on any layer
  const handleLayerClick = async (item, currentLayer = 0) => {
    if (!item) return;

    const hasSubcategories =
      Array.isArray(item.subcategories) && item.subcategories.length > 0;

    if (currentLayer === 1) {
      // Layer 1 -> Layer 2
      if (hasSubcategories) {
        setLayerData((prev) => ({
          ...prev,
          layer2: item.subcategories,
          layer3: [], // clear eBay products
        }));
      } else {
        // Final category selected
        dispatch(setSelectedProduct(item));
        dispatch(fetchCategoryProducts(item.name));
        dispatch(fetchAmazonProducts(item.name));
        navigate("/product");
      }
    } else if (currentLayer === 2) {
      // Layer 2 -> Layer 3 (eBay)
      if (hasSubcategories) {
        setLayerData((prev) => ({
          ...prev,
          layer3: item.subcategories, // eBay products
        }));

        // Fetch Amazon products separately
        dispatch(fetchAmazonProducts(item.name));
      } else {
        dispatch(setSelectedProduct(item));
        dispatch(fetchCategoryProducts(item.name));
        dispatch(fetchAmazonProducts(item.name));
      }
    } else if (currentLayer === 3) {
      // Final Layer clicked
      dispatch(setSelectedProduct(item));
      navigate("/product");
    }
  };

  // Optional: reset layer3 if Amazon products update (no merge, just keep separate)
  useEffect(() => {
    if (amazonProducts.length === 0 && layerData.layer3.length === 0) return;
    // No state merge needed, CoverflowManager will render Amazon and eBay separately
  }, [amazonProducts]);

  return {
    layerData,
    amazonProducts, // pass separately for side-by-side display
    setInitialCategories,
    handleLayerClick,
    amazonStatus, // optional, useful for showing loading state
  };
}
