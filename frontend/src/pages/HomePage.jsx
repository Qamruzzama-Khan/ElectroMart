import React, {Suspense} from "react";
import CategoryList from "../components/category/CategoryList";

const ProductList = React.lazy(() => import("../components/product/ProductList"))

const HomePage = () => {
  
  return (
    <div className="mt-5">
      <img className="h-36 md:h-56 md:w-[800px] w-full mx-auto" src="apple-hero-image.jpg" alt="hero-image" />
     <div className="mt-6">
      <h3 className="text-xl md:text-2xl text-gray-500">New Arrival</h3>
      <Suspense>
      <ProductList />
      </Suspense>
     </div>
     <CategoryList />
    </div>
  );
};

export default HomePage;
