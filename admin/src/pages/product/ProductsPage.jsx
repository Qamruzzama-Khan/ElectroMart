import { useEffect} from "react";
import { fetchProducts } from "../../services/api/productApi";
import { Link } from "react-router-dom";
import ProductList from "../../components/product/ProductList"
import { useProductContext } from "../../hooks/useProduct";

const ProductsPage = () => {
  const { products, setProducts } = useProductContext();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      setProducts(response.data.data);
    };
    getProducts();
  }, []);

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
      <ProductList products={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
