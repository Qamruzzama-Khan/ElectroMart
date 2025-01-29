import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product-details/${product._id}`}>
      <div className="border border-gray-400 w-fit p-2 rounded">
        <img
          className="h-36 rounded mx-auto"
          src={product.image.imageUrl}
          alt="product-image"
        />
        <p className="text-gray-800 font-semibold">{product.name}</p>
        <p className="flex items-center gap-1">
          <span className="text-gray-800">Price:</span>
          <span className="text-gray-600">{product.price}</span>
          </p>
      </div>
    </Link>
  );
};

export default ProductCard;
