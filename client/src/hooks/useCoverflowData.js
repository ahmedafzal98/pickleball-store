import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCategoryProducts,
  setSelectedProduct,
} from "../../store/features/productSlice";

export function useCoverflowData(navigate) {
  const dispatch = useDispatch();

  const [layerData, setLayerData] = useState({
    layer1: [],
    layer2: [],
    layer3: [],
  });

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

  const handleLayerClick = async (item, currentLayer = 0) => {
    if (!item) return;

    console.log(`Layer ${currentLayer} item clicked:`, item);

    const hasSubcategories =
      Array.isArray(item.subcategories) && item.subcategories.length > 0;

    if (currentLayer === 1) {
      // Layer 1 -> Layer 2
      if (hasSubcategories) {
        setLayerData((prev) => ({
          ...prev,
          layer2: item.subcategories,
          layer3: [], // Clear layer 3
        }));
      } else {
        // No subcategories, this is a final item
        console.log("Final item selected from Layer 1:", item);
        dispatch(setSelectedProduct(item));
        dispatch(fetchCategoryProducts(item.name));
        navigate("/product");
      }
    } else if (currentLayer === 2) {
      console.log("Hello 2");

      // Layer 2 -> Layer 3 or final
      if (hasSubcategories) {
        setLayerData((prev) => ({
          ...prev,
          layer3: item.subcategories,
        }));
      } else {
        // No subcategories, this is a final item
        console.log("Final item selected from Layer 2:", item);
        dispatch(setSelectedProduct(item));
        dispatch(fetchCategoryProducts(item.name));
        // navigate("/product");
      }
    } else if (currentLayer === 3) {
      console.log("Hello 3");

      // Layer 3 is always final (no more subcategories)
      // console.log("Final item selected from Layer 3:", item);
      // dispatch(setSelectedProduct(item));
      // dispatch(fetchCategoryProducts(item.name));
      // navigate("/product");
    }
  };

  return {
    layerData,
    setInitialCategories,
    handleLayerClick,
  };
}
