import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api/productApi";
import ProductCard from "./ProductCard";
import {MdChevronLeft, MdChevronRight} from "react-icons/md"

const ProductList = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data.data);
    };
    getProducts();
  }, []);

  const slideLeft = () => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 200
  }

  const slideRight = () => {
    const slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 200
  }

  return (
   <div className="flex items-center">
    <MdChevronLeft onClick={slideLeft} className="cursor-pointer opacity-50 hover:opacity-100 hidden md:inline-block" size={40} />
     <div id="slider" className="mx-auto w-full p-2  flex overflow-x-scroll gap-4 scroll-smooth scrollbar-hide">
      {products &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
    <MdChevronRight onClick={slideRight} className="cursor-pointer opacity-50 hover:opacity-100 hidden md:inline-block" size={40} />
   </div>
  );
};

export default ProductList;
