import { Link } from "react-router-dom";
import { deleteProduct } from "../services/api/productApi";
import { useAuthContext } from "../hooks/useAuth";
import { useProductContext } from "../hooks/useProduct";

const Product = ({ product, index }) => {
  const { products, setProducts } = useProductContext();
  const { user } = useAuthContext();

  const handleDelete = async (productId) => {
    setProducts(products.filter((product) => product._id !== productId));
    const response = await deleteProduct(productId, user?.accessToken);
  };

  return (
    <tr className="border-b">
      <td className="py-3 px-4">{index + 1}</td>
      <td className="py-3 px-4 flex items-center space-x-3">
        <img
          className="h-10 w-10 object-cover rounded-md"
          src={product.image.imageUrl}
          alt="product-image"
        />
        <span className="font-semibold">{product.name}</span>
      </td>
      <td className="py-3 px-4">{product.price}</td>
      <td className="py-3 px-4">{product.stock}</td>
      {/* actions */}
      <td className="py-3 px-4 flex items-center gap-2">
        {/* edit-link */}
        <Link to={`/update-product/${product._id}`}>
          <span className="material-symbols-outlined">edit</span>
        </Link>
        {/* delete-btn */}
        <button onClick={() => handleDelete(product._id)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </td>
    </tr>
  );
};

export default Product;
