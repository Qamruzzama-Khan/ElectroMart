import { useEffect, useState } from "react";
import { fetchOneProduct, updateProduct } from "../services/api/productApi";
import { useAuthContext } from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import GoBackBtn from "../components/buttons/GoBackBtn";
import { toast } from "react-toastify";

const UpdateProductPage = () => {
  const { productId } = useParams();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    stock: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const getOneProduct = async () => {
      const response = await fetchOneProduct(productId, user?.accessToken);
      console.log(response.data.data);
      setForm(response.data.data);
      setImagePreview(response.data.data.image.imageUrl);
    };
    getOneProduct();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // handling file input
    if (name === "image" && files) {
      const newFile = files[0];

      setForm((prevForm) => ({
        ...prevForm,
        image: newFile,
      }));

      // update image preview and
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(newFile);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(form).forEach((key) => {
      formDataToSend.append(key, form[key]);
    });
    const response = await updateProduct(
      productId,
      formDataToSend,
      user?.accessToken
    );
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
    navigate("/");
  };

  return (
    <div className="mt-5">
      <GoBackBtn />
      <form onSubmit={handleUpdate} className="flex items-start gap-2 mt-5">
        {/* div-1 */}
        <div className="w-fit relative">
          {/* image */}
          <label htmlFor="image" className="cursor-pointer">
            {imagePreview ? (
              <div>
                <img
                  className="h-56 w-auto mx-auto"
                  src={imagePreview}
                  alt="product-image"
                />
                <span className="material-symbols-outlined text-gray-500 absolute top-2 right-2 text-4xl">
                  add_a_photo
                </span>
              </div>
            ) : (
              <span className="material-symbols-outlined text-9xl text-gray-500">
                add_a_photo
              </span>
            )}
          </label>
          <input
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded w-full"
            type="file"
            name="image"
            id="image"
            hidden
          />
        </div>

        {/* div-2 */}
        <div className="flex flex-col w-[60%] gap-2">
          {/* name */}
          <input
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            type="text"
            name="name"
            placeholder="Name"
          />
          {/* desc */}
          <input
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            type="text"
            name="description"
            placeholder="Description"
          />
          {/* price */}
          <input
            value={form.price}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            type="text"
            name="price"
            placeholder="Price"
          />
          {/* stock */}
          <input
            value={form.stock}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
            type="number"
            name="stock"
            placeholder="Stock"
          />
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductPage;
