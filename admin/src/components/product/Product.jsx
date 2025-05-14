import { Link } from "react-router-dom";
import { deleteProduct } from "../../services/api/productApi";
import { useAuthContext } from "../../hooks/useAuth";
import { useProductContext } from "../../hooks/useProduct";
import { jwtDecode } from "jwt-decode";

const Product = ({ product, index }) => {
  const { products, setProducts } = useProductContext();
  const { user, dispatch } = useAuthContext();

  const handleDelete = async (productId) => {
      const token = user?.accessToken;

      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem("user");
          dispatch({ type: "LOGOUT" });
        } else {
        setProducts(products.filter((product) => product._id !== productId));
        await deleteProduct(productId, user?.accessToken);
      }
      }
  };

  return (
    <tr className="border-b border-gray-300">
      <td className="p-2">{index + 1}</td>
      <td className="p-2 flex flex-col items-center md:flex-row md:items-center gap-1">
        <img
          className="h-10 w-10 object-cover rounded-md"
          src={product.image.imageUrl}
          alt="product-image"
        />
        <span className="font-semibold text-sm md:text-[15px]">
          {product.name}
        </span>
      </td>
      <td className="p-2 text-sm md:text-[15px]">{product.price}</td>
      <td className="p-2 text-sm md:text-[15px]">{product.stock}</td>
      {/* actions */}
      <td className="p-2 flex items-center gap-2">
        {/* edit-link */}
        <Link to={`/update-product/${product._id}`}>
          <span className="material-symbols-outlined hover:text-green-600 text-[20px]">
            edit
          </span>
        </Link>
        {/* delete-btn */}
        <button
          className="hover:text-red-600"
          onClick={() => handleDelete(product._id)}
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default Product;
