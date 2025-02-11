import { useEffect, useState } from "react";
import GoBackBtn from "../../components/buttons/GoBackBtn";
import { fetchProducts } from "../../services/api/productApi";
import ProductCard from "../../components/product/ProductCard";
import { useParams } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState()
  const {category} = useParams();

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetchProducts();
      console.log(response.data.data)
      setProducts(response.data.data)
    }
    getProducts();
    console.log("category is : ", category)
  }, [])

  return (
   <div className="mt-7">
     <GoBackBtn />
      <div className="min-h-screen flex mt-5 p-2 border border-black gap-4">
        {/* Sidebar */}
        <div className="p-2 border border-black">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>

          <div className="mb-4">
            <p className="font-medium">Filter by Price</p>
            <select
              name="price"
              id="price"
              className="w-full rounded bg-gray-200 text-black p-2 mt-2"
            >
              <option value="" disabled>
                Select Price Range
              </option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
              <option value="range">Custom Range</option>
            </select>
          </div>

          <div className="mb-4">
            <p className="font-medium">Filter by Color</p>
            <select
              name="color"
              id="color"
              className="w-full rounded bg-gray-200 text-black p-2 mt-2"
            >
              <option value="" disabled>
                Select Color
              </option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="black">Black</option>
              <option value="white">White</option>
            </select>
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-wrap w-full border border-black gap-4">
  {products && products.map((product) => (
      <ProductCard key={product._id} product={product} />
  ))}
</div>
      </div>
    </div>
  );
};

export default ProductsPage;
