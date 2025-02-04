import { useEffect, useState } from "react";
import { fetchOneProduct, updateProduct } from "../../services/api/productApi";
import { useAuthContext } from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import GoBackBtn from "../../components/buttons/GoBackBtn";
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
    <div className="mt-10 max-w-4xl mx-auto">
    <GoBackBtn />
    <form
      onSubmit={handleUpdate}
      className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto flex flex-col md:flex-row gap-5"
    >
      {/* Image Section */}
      <div className="w-full md:w-1/3 flex justify-center relative">
        {/* Image Preview */}
        <label htmlFor="image" className="cursor-pointer">
          {imagePreview ? (
            <div className="relative">
              <img
                className="h-56 w-auto mx-auto rounded-lg shadow-md hover:scale-105 transition-all duration-300"
                src={imagePreview}
                alt="product-image"
              />
              <span className="material-symbols-outlined text-gray-400 absolute bottom-[210px] left-[110px] text-4xl hover:text-gray-500">
                add_a_photo
              </span>
            </div>
          ) : (
            <span className="material-symbols-outlined text-7xl text-gray-500 hover:text-pink-700 transition-all duration-300">
              add_a_photo
            </span>
          )}
        </label>
        <input
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full hidden"
          type="file"
          name="image"
          id="image"
        />
      </div>
  
      {/* Form Inputs */}
      <div className="flex flex-col w-full gap-4 md:w-2/3">
        {/* Product Name */}
        <input
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="text"
          name="name"
          placeholder="Product Name"
        />
        {/* Product Description */}
        <input
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="text"
          name="description"
          placeholder="Description"
        />
        {/* Product Price */}
        <input
          value={form.price}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="text"
          name="price"
          placeholder="Price"
        />
        {/* Product Stock */}
        <input
          value={form.stock}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
          type="number"
          name="stock"
          placeholder="Stock"
        />
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-md transition-all duration-300"
        >
          Update
        </button>
      </div>
    </form>
  </div>  
  );
};

export default UpdateProductPage;
