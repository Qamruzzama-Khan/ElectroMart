import { Link } from "react-router-dom";
import Product from "./Product";

const ProductList = ({ products }) => {
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
