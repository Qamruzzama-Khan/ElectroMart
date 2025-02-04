import { useState } from "react";
import { createProduct } from "../../services/api/productApi";
import { useAuthContext } from "../../hooks/useAuth";
import GoBackBtn from "../../components/buttons/GoBackBtn";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    stock: 0,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const { user } = useAuthContext();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(form).forEach((key) => {
      formDataToSend.append(key, form[key]);
    });

    try {
      setIsSubmitting(true);
      const response = await createProduct(formDataToSend, user?.accessToken);
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
    setIsSubmitting(false);
    setForm({
      name: "",
      description: "",
      image: null,
      price: "",
      stock: 0,
    });
    setImagePreview(null);
    } catch (error) {
      setError(error.response.data.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto">
    <GoBackBtn />
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto flex flex-col gap-5"
    >
      <div className="flex flex-col items-center gap-4 md:flex-row md:items-start w-full">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex justify-center relative">
  {/* Label for Image Input */}
  <label htmlFor="image" className="cursor-pointer relative group">
    {/* Image Preview */}
    {imagePreview ? (
      <img
        className="h-56 w-auto mx-auto rounded-lg shadow-xl hover:scale-105 transition-transform duration-300"
        src={imagePreview}
        alt="product-image"
      />
    ) : (
      <div className="flex flex-col items-center justify-center w-56 h-56 border-4 border-dashed border-gray-300 rounded-lg shadow-md bg-gray-50 group-hover:bg-green-50 transition-all duration-300">
        <span className="material-symbols-outlined text-6xl text-gray-600 group-hover:text-green-500 transition-all duration-300">
          add_a_photo
        </span>
        <span className="text-gray-500 mt-2 group-hover:text-green-600 transition-all duration-300">
          Click to upload
        </span>
      </div>
    )}

    {/* Input for selecting image */}
    <input
      onChange={handleChange}
      className="absolute inset-0 opacity-0 cursor-pointer"
      type="file"
      name="image"
      id="image"
    />
  </label>
</div>
  
        {/* Form Inputs */}
        <div className="flex flex-col w-full gap-4 md:w-2/3">
          {/* Name */}
          <input
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="text"
            name="name"
            placeholder="Product Name"
          />
          {/* Description */}
          <input
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="text"
            name="description"
            placeholder="Description"
          />
          {/* Price */}
          <input
            value={form.price}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="text"
            name="price"
            placeholder="Price"
          />
          {/* Stock */}
          <input
            value={form.stock}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="number"
            name="stock"
            placeholder="Stock"
          />
          
          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-lg font-medium mt-2">
              {error}...
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-pink-700 text-white p-3 rounded-md hover:bg-pink-800 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Product"}
          </button>
        </div>
      </div>
    </form>
  </div>  
  );
};

export default AddProductPage;
