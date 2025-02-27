import SwiperGallery from "../Components/SwiperGallery";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Product = () => {
  return (
    <>
      <Navbar />

      <section className="flex items-center mt-6">
        <div className="w-1/2">
          <SwiperGallery />
        </div>
        <div className="bg-green-800 w-2/3">ali</div>
      </section>
      <Footer />
    </>
  );
};
export default Product;
