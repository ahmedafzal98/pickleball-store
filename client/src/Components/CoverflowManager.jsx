import React, { useEffect, useRef } from "react";
import { useCoverflowData } from "../hooks/useCoverflowData";
import Coverflow from "./Coverflow";
import categories from "../../data/categories";

export default function CoverflowManager() {
  const { layerData, setInitialCategories, handleLayerClick } =
    useCoverflowData();

  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  useEffect(() => {
    setInitialCategories(categories);
  }, []);

  // Scroll to Layer 2 when it becomes visible
  useEffect(() => {
    if (layerData.layer2.length > 0) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          layer2Ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }, 300);
    }
  }, [layerData.layer2]);

  // Scroll to Layer 3 when it becomes visible
  useEffect(() => {
    if (layerData.layer3.length > 0) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          layer3Ref.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }, 300);
    }
  }, [layerData.layer3]);

  return (
    <div className="flex flex-col gap-6">
      <Coverflow
        categories={layerData.layer1}
        onItemClick={(item) => handleLayerClick(item, 1)}
      />

      {layerData.layer2.length > 0 && (
        <div ref={layer2Ref}>
          <Coverflow
            categories={layerData.layer2}
            onItemClick={(item) => handleLayerClick(item, 2)}
          />
        </div>
      )}

      {layerData.layer3.length > 0 && (
        <div ref={layer3Ref}>
          <Coverflow categories={layerData.layer3} />
        </div>
      )}
    </div>
  );
}
