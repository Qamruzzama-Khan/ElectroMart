import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuth";
import { loginUser } from "../../services/api/userApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
      dispatch({ type: "LOGIN", payload: response.data.data });
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setIsSubmitting(false);
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
      navigate(-1);
    } catch (error) {
      setError(error.response.data.message);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
      {/* email */}
      <input
        value={form.email}
        onChange={handleChange}
        className="border border-gray-400 p-2 rounded w-full"
        type="email"
        placeholder="Email"
        name="email"
      />
      {/* password */}
      <div className="flex items-center border border-gray-400 rounded w-full  focus-within:ring-1 focus-within:ring-pink-500">
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
        className="bg-pink-600 hover:bg-pink-700 w-full p-2 rounded text-white "
      >
        {isSubmitting ? "login..." : "login"}
      </button>
    </form>
  );
};

export default Login;
