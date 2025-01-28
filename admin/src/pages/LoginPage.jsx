import { useState } from "react";
import { useAuthContext } from "../hooks/useAuth";
import { loginUser } from "../services/api/userApi";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { dispatch } = useAuthContext();
  const [error, setError] = useState("");
  const [show, setShow] = useState("");
  const navigate = useNavigate();

  const ToggleShow = (value) => {
    if (show) {
      setShow("");
    } else {
      setShow(value);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await loginUser(form);
      if (response.data.data.user.status === "admin") {
        dispatch({ type: "LOGIN", payload: response.data.data });
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setIsSubmitting(false);
        setForm({ email: "", password: "" });
        navigate(-1);
      } else {
        setError("Sorry your not admin...!");
      }
    } catch (error) {
      setError(error.response.data.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 p-2 w-full md:w-[50%] mx-auto mt-20">
      <h4 className="text-xl text-pink-700 ">Login</h4>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-2"
      >
        {/* email */}
        <input
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded w-full"
          type="email"
          placeholder="Email"
          name="email"
        />
        {/* password */}
        <div className="flex items-center border border-gray-300 rounded w-full  focus-within:ring-1 focus-within:ring-pink-500">
          <input
            value={form.password}
            onChange={handleChange}
            className="w-full focus:outline-none p-2 rounded"
            type={show === "password" ? "text" : "password"}
            placeholder="Password"
            name="password"
          />
          <span
            className="material-symbols-outlined text-xl mr-2 text-gray-600 cursor-pointer"
            onClick={() => ToggleShow("password")}
          >
            {show === "password" ? "visibility" : "visibility_off"}
          </span>
        </div>

        {error && <div className="text-red-600 text-lg">{error}...!</div>}

        {/* login-button */}
        <button
          type="submit"
          className="bg-pink-600 hover:bg-pink-700 w-full p-2 rounded text-white"
        >
          {isSubmitting ? "login..." : "login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
