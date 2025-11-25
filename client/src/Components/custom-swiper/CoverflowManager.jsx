import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useCoverflowData } from "../../hooks/useCoverflowData";
import Coverflow from "./Coverflow";
import { useNavigate } from "react-router-dom";
import amazonIcon from "../../assets/icons/amazon.png";

const CoverflowManager = forwardRef((props, ref) => {
  const navigate = useNavigate();

  const { layerData, amazonProducts, handleLayerClick } =
    useCoverflowData(navigate);

  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const layer4Ref = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToLayer2: () => {
      layer2Ref.current?.scrollIntoView({ behavior: "smooth" });
    },
  }));

  // Auto scroll to each layer
  useEffect(() => {
    if (layerData.layer2?.length)
      layer2Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [layerData.layer2]);
  useEffect(() => {
    if (layerData.layer3?.length)
      layer3Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [layerData.layer3]);
  useEffect(() => {
    if (layerData.layer4?.length || amazonProducts?.length)
      layer4Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [layerData.layer4, amazonProducts]);

  return (
    <div className="flex flex-col gap-6">
      {/* Layer 1 */}
      <Coverflow
        categories={layerData.layer1}
        onItemClick={(item) => handleLayerClick(item, 1)}
      />

      {/* Layer 2 */}
      {layerData.layer2?.length > 0 && (
        <div ref={layer2Ref}>
          <Coverflow
            categories={layerData.layer2}
            onItemClick={(item) => handleLayerClick(item, 2)}
          />
        </div>
      )}

      {/* Layer 3 */}
      {layerData.layer3?.length > 0 && (
        <div ref={layer3Ref}>
          <Coverflow
            categories={layerData.layer3}
            onItemClick={(item) => handleLayerClick(item, 3)}
          />
        </div>
      )}

      {/* Layer 4: Leaf Products */}
      {(layerData.layer4?.length > 0 || amazonProducts?.length > 0) && (
        <div ref={layer4Ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* eBay / backend products */}
          {layerData.layer4?.length > 0 && (
            <div className="p-4 rounded-xl shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <img src="/assets/icons/ebay.png" alt="eBay" className="h-6" />
                <h2 className="text-lg font-semibold text-white">
                  eBay Products
                </h2>
              </div>
              <Coverflow
                categories={layerData.layer4}
                onItemClick={(item) => handleLayerClick(item, 4)}
              />
            </div>
          )}

          {/* Amazon products */}
          {amazonProducts?.length > 0 && (
            <div className="p-4 rounded-xl shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <img src={amazonIcon} alt="Amazon" className="h-6" />
                <h2 className="text-lg font-semibold text-white">
                  Amazon Products
                </h2>
              </div>
              <Coverflow
                categories={amazonProducts}
                onItemClick={(item) => {
                  dispatch(setSelectedProduct(item));
                  navigate("/product");
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
});

export default CoverflowManager;
