import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api/productApi";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data.data);
    };
    getProducts();
  }, []);

  return (
    <div className="mx-auto w-fit grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:grid-cols-5 xl:grid-cols-6 p-2">
      {products &&
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  );
};

export default Products;
