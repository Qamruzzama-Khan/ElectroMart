import { Link } from "react-router-dom";
import Product from "./Product";

const ProductList = ({ products }) => {
  return (
    <table className="min-w-full table-auto border-collapse rounded overflow-hidden mt-2">
      <thead className="bg-gray-200 text-gray-700">
        <tr>
          <th className="py-2 px-4 text-left font-medium">Sr.No</th>
          <th className="py-2 px-4 text-left font-medium">Product</th>
          <th className="py-2 px-4 text-left font-medium">Price</th>
          <th className="py-2 px-4 text-left font-medium">Stock</th>
          <th className="py-2 px-4 text-left font-medium">Actions</th>
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
