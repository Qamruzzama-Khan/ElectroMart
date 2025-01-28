import { useState } from "react";
import { createProduct } from "../services/api/productApi";
import { useAuthContext } from "../hooks/useAuth";
import GoBackBtn from "../components/buttons/GoBackBtn";
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
    setForm({
      name: "",
      description: "",
      image: null,
      price: "",
      stock: 0,
    });
    setImagePreview(null);
  };

  return (
    <div className="mt-5">
      <GoBackBtn />
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-2 rounded mt-5 items-start"
      >
        {/* div-1 */}
        <div className="w-[40%] text-center">
          {/* image */}
          <label htmlFor="image" className="cursor-pointer">
            {imagePreview ? (
              <img
                className="h-56 w-auto mx-auto"
                src={imagePreview}
                alt="product-image"
              />
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
          <button type="submit" className="bg-pink-700 text-white p-2 rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
