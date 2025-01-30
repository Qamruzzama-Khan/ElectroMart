import ProductList from "../components/product/ProductList";

const HomePage = () => {
  return (
    <div className="mt-5">
      <img className="h-40 md:h-80 w-full mx-auto" src="apple-hero-image.jpg" alt="hero-image" />
     <div className="mt-6">
      <h3 className="text-xl md:text-2xl text-gray-500">New Arrival</h3>
      <ProductList />
     </div>
    </div>
  );
};

export default HomePage;
