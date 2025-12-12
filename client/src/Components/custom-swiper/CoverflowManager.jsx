import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useDispatch } from "react-redux";
import { useCoverflowData } from "../../hooks/useCoverflowData";
import Coverflow from "./Coverflow";
import { useNavigate } from "react-router-dom";
import amazonIcon from "../../assets/icons/amazon.png";
import Loader from "../shared/Loader";

const CoverflowManager = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { layers, amazonProducts, handleLayerClick, loading, error } =
    useCoverflowData(navigate);

  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);
  const layer4Ref = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollToLayer2: () =>
      layer2Ref.current?.scrollIntoView({ behavior: "smooth" }),
  }));

  // Auto scroll
  useEffect(() => {
    if (layers.layer2?.length)
      layer2Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [layers.layer2]);
  useEffect(() => {
    if (layers.layer3?.length)
      layer3Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [layers.layer3]);
  useEffect(() => {
    if (layers.layer4?.length || amazonProducts?.length)
      layer4Ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [layers.layer4, amazonProducts]);

  return (
    <div className="flex flex-col gap-6">
      {loading && <Loader />}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Layer 1 */}
      <Layer
        title=""
        data={layers.layer1}
        onClick={(item) => handleLayerClick(item, 1)}
      />

      {/* Layer 2 */}
      {layers.layer2?.length > 0 && (
        <div ref={layer2Ref}>
          <Layer
            title="Subcategories"
            data={layers.layer2}
            onClick={(item) => handleLayerClick(item, 2)}
          />
        </div>
      )}

      {/* Layer 3 */}
      {layers.layer3?.length > 0 && (
        <div ref={layer3Ref}>
          <Layer
            title="Sub-Subcategories"
            data={layers.layer3}
            onClick={(item) => handleLayerClick(item, 3)}
          />
        </div>
      )}

      {/* Layer 4: Leaf Products */}
      {(layers.layer4?.length > 0 || amazonProducts?.length > 0) && (
        <div ref={layer4Ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {layers.layer4?.length > 0 && (
            <ProductLayer
              title="eBay Products"
              icon="/assets/icons/ebay.png"
              products={layers.layer4}
              onClick={(item) => handleLayerClick(item, 4)}
            />
          )}

          {amazonProducts?.length > 0 && (
            <ProductLayer
              title="Amazon Products"
              icon={amazonIcon}
              products={amazonProducts}
              onClick={(item) => {
                dispatch(setSelectedProduct(item));
                navigate("/product");
              }}
            />
          )}
        </div>
      )}
    </div>
  );
});

const Layer = ({ title, data, onClick }) => (
  <>
    <h2 className="text-lg font-semibold mb-3">{title}</h2>
    <Coverflow categories={data} onItemClick={onClick} />
  </>
);

const ProductLayer = ({ title, icon, products, onClick }) => (
  <div className="p-4 rounded-xl shadow-sm bg-white flex flex-col">
    <div className="flex items-center gap-2 mb-3">
      <img src={icon} alt={title} className="h-6" />
      <h2 className="text-lg font-semibold">{title}</h2>
    </div>
    <Coverflow categories={products} onItemClick={onClick} />
  </div>
);

export default CoverflowManager;
