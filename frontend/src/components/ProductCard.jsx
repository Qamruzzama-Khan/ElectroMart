import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product-details/${product._id}`}>
      <div className="border border-gray-400 w-fit p-2 rounded">
        <img
          className="h-36 rounded mx-auto w-[110px]"
          src={product.image.imageUrl}
          alt="product-image"
        />
        <p className="text-gray-800 font-semibold">{product.name}</p>
        <p className="text-gray-600">{product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
