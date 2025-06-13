import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoryProducts } from "../../store/features/productSlice";

export function useCoverflowData() {
  const dispatch = useDispatch();

  const [layerData, setLayerData] = useState({
    layer1: [],
    layer2: [],
    layer3: [],
  });

  const setInitialCategories = (categories) => {
    setLayerData((prev) => ({
      ...prev,
      layer1: categories,
      layer2: [],
      layer3: [],
    }));
  };

  const handleLayerClick = (item, currentLayer = 1) => {
    const hasSubcategories =
      Array.isArray(item.subcategories) && item.subcategories.length > 0;

    if (hasSubcategories) {
      const nextLayer = currentLayer + 1;

      // Show subcategories in the next layer
      setLayerData((prev) => ({
        ...prev,
        [`layer${nextLayer}`]: item.subcategories,
        // Clear layer3 if we are updating layer2
        ...(nextLayer === 2 ? { layer3: [] } : {}),
      }));
    } else {
      console.log("No subcategories");

      // Fetch products for this category
      dispatch(fetchCategoryProducts(item.name));

      // Clear deeper layers if no subcategories
      setLayerData((prev) => {
        if (currentLayer === 1) {
          return { ...prev, layer2: [], layer3: [] };
        } else if (currentLayer === 2) {
          return { ...prev, layer3: [] };
        } else {
          return prev;
        }
      });
    }
  };

  return {
    layerData,
    setInitialCategories,
    handleLayerClick,
  };
}
