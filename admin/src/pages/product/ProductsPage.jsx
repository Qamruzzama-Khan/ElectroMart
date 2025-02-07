import { Link } from "react-router-dom";
import React, {Suspense} from "react";

const ProductList = React.lazy(() => import("../../components/product/ProductList"))

const ProductsPage = () => {

  return (
    <div className="mt-5">
      <div className="flex flex-row  items-center justify-between">
        <h4 className="md:text-lg text-gray-700 font-semibold">Listed Products</h4>
        {/* add-product-btn */}
        <Link to="/add-product">
          <button className="flex items-center md:text-lg text-gray-700 hover:text-green-700">
            <span className="material-symbols-outlined">add</span>
            <span>New Product</span>
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
     <Suspense>
     <ProductList />
     </Suspense>
      </div>
    </div>
  );
};

export default ProductsPage;
