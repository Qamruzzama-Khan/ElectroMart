import { useState } from "react";
import { addItemTocart } from "../../services/api/cartApi";
import { useAuthContext } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetails = ({ product }) => {
  const { user } = useAuthContext();
  const { setCart } = useCartContext();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async (productId) => {
    if (user) {
      try {
        const response = await addItemTocart(productId, user?.accessToken);
        setCart(response.data.data);
        toast(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsAdded(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="flex flex-col  md:flex-row md:items-start gap-10 p-2 w-full md:w-fit mx-auto">
      <img className="h-56 w-56 mx-auto md:h-80 md:w-auto" src={product.image.imageUrl} alt="product-image" />
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold text-gray-800">{product.name}</p>
        <p className="text-lg text-gray-600">{product.description}</p>
        <p className="text-lg text-gray-500">{product.price}</p>

        {isAdded ? (
          <Link
            to="/cart"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-2 py-1 rounded w-full md:w-fit text-center"
          >
            Go To Cart
          </Link>
        ) : (
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-2 py-1 rounded w-full md:w-fit"
            onClick={() => handleAddToCart(product._id)}
          >
            Add To Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
