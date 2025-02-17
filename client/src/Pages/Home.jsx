import Banner from "../Components/Banner";
import Categories from "../Components/Categories";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Products from "../Components/Products";
import SwiperCoverflow from "../Components/SwiperCoverflow";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Categories />
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
};
export default Home;
