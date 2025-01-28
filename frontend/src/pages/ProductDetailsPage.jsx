import { useEffect, useState } from "react";
import GoBackBtn from "../components/buttons/GoBackBtn";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../services/api/productApi";
import ProductDetails from "../components/ProductDetails";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const getOneProduct = async () => {
      const response = await fetchOneProduct(productId);
      setProduct(response.data.data);
    };
    getOneProduct();
  }, []);

  return (
    <div className="mt-10">
      <GoBackBtn />
      {product && <ProductDetails product={product} />}
    </div>
  );
};

export default ProductDetailsPage;
