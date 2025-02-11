import Product from "./Product";
import { useProductContext } from "../../hooks/useProduct";
import { useEffect } from "react";
import { fetchProducts } from "../../services/api/productApi";

const ProductList = () => {
  const { products, setProducts } = useProductContext();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data.data);
      console.log(response.data.data)
    };
    getProducts();
  }, []);

  return (
    <table className="min-w-full table-auto border-collapse rounded mt-2">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="py-2 px-2 text-left font-medium md:text-lg">Sr.No</th>
          <th className="py-2 px-4 text-left font-medium md:text-lg">Product</th>
          <th className="py-2 px-4 text-left font-medium md:text-lg">Price</th>
          <th className="py-2 px-4 text-left font-medium md:text-lg">Stock</th>
          <th className="py-2 px-4 text-left font-medium md:text-lg">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white text-gray-800">
        {products &&
          products.map((product, index) => (
            <Product key={product._id} product={product} index={index} />
          ))}
      </tbody>
    </table>
  );
};

export default ProductList;
