import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Products from "../Components/Products";

const Home = () => {
  return (
    <>
      <Navbar />
      <Banner />
      <Products />
      <NewsLetter />
      <Footer />
    </>
  );
};
export default Home;
