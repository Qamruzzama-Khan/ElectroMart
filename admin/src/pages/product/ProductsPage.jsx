import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api/productApi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";
import ProductList from "../components/ProductList";
import { useProductContext } from "../../hooks/useProduct";

const ProductsPage = () => {
  const { products, setProducts } = useProductContext();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data.data);
      console.log(response.data.data);
    };
    getProducts();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h4 className="text-lg text-gray-700 font-semibold">Listed Products</h4>
        {/* add-product-btn */}
        <Link to="/add-product">
          <button className="flex items-center text-lg text-gray-700 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100">
            <span className="material-symbols-outlined">add</span>
            <span>New Product</span>
          </button>
        </Link>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;
