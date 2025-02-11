import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  return (
    <Link to={`/product-details/${product._id}`}>
      <div className="border border-gray-300 rounded h-[180px] w-[150px] p-2">
        <img
          className="h-[100px] w-auto mx-auto object-contain"
          src={product.image.imageUrl}
          alt="product-image"
        />
        <p className="text-gray-800 font-semibold mt-2">{product.name.length < 10 ? product.name : `${product.name.slice(0, 9)}...`}</p>
        <p className="flex items-center gap-1">
          <span className="text-gray-800">Price:</span>
          <span className="text-gray-500">{product.price}</span>
          </p>
      </div>
    </Link>
  );
};

export default ProductCard;
