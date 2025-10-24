import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useCoverflowData } from "../../hooks/useCoverflowData";
import Coverflow from "./Coverflow";
import categories from "../../../data/categories";
import { useNavigate } from "react-router-dom";
import amazonIcon from "../../assets/icons/amazon.png";
import { useDispatch } from "react-redux";

const CoverflowManager = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const {
    layerData,
    amazonProducts,
    setInitialCategories,
    handleLayerClick,
    amazonStatus,
  } = useCoverflowData(navigate);

  console.log(amazonProducts);

  const dispatch = useDispatch();

  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToLayer2: () => {
      layer2Ref.current?.scrollIntoView({ behavior: "smooth" });
    },
  }));

  useEffect(() => {
    setInitialCategories(categories);
  }, []);

  useEffect(() => {
    if (layerData.layer2.length > 0) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          layer2Ref.current?.scrollIntoView({ behavior: "smooth" });
        });
      }, 300);
    }
  }, [layerData.layer2]);

  useEffect(() => {
    if (layerData.layer3.length > 0 || amazonProducts.length > 0) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          layer3Ref.current?.scrollIntoView({ behavior: "smooth" });
        });
      }, 300);
    }
  }, [layerData.layer3, amazonProducts]);

  return (
    <div className="flex flex-col gap-6">
      {/* Layer 1 */}
      <Coverflow
        categories={layerData.layer1}
        onItemClick={(item) => handleLayerClick(item, 1)}
      />

      {/* Layer 2 */}
      {layerData.layer2.length > 0 && (
        <div ref={layer2Ref}>
          <Coverflow
            categories={layerData.layer2}
            onItemClick={(item) => handleLayerClick(item, 2)}
          />
        </div>
      )}

      {/* Layer 3: eBay + Amazon side by side */}
      {(layerData.layer3.length > 0 || amazonProducts.length > 0) && (
        <div ref={layer3Ref} className="">
          {/* eBay Products */}
          {layerData.layer3.length > 0 && (
            <div className="p-4 rounded-xl shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <img src="/assets/icons/ebay.png" alt="eBay" className="h-6" />
                <h2 className="text-lg font-semibold text-white">
                  eBay Products
                </h2>
              </div>
              <Coverflow
                categories={layerData.layer3}
                onItemClick={(item) => handleLayerClick(item, 3)}
              />
            </div>
          )}

          {/* Amazon Products */}
          {amazonProducts.length > 0 && (
            <div className="p-4 rounded-xl shadow-sm flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <img src={amazonIcon} alt="Amazon" className="h-6" />
                <h2 className="text-lg font-semibold text-white">
                  Amazon Products
                </h2>
              </div>
              // Inside your Amazon products UI
              <Coverflow
                categories={amazonProducts}
                onItemClick={(item) => {
                  dispatch(setSelectedProduct(item));
                  navigate("/product"); // 👉 Go to product detail page
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
