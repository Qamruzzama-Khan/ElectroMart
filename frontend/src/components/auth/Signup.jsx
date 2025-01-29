import { useState } from "react";
import { signupUser } from "../../services/api/userApi";
import { useAuthContext } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const TogglePass = (value) => {
    if (value === "password") {
      setShowPass(!showPass);
    }
    if (value === "confirmPassword") {
      setShowConfirmPass(!showConfirmPass);
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
      const response = await signupUser(form);
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
      {/* name */}
      <input
        value={form.name}
        onChange={handleChange}
        className="border border-gray-400 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
        type="text"
        placeholder="Name"
        name="name"
      />
      {/* email */}
      <input
        value={form.email}
        onChange={handleChange}
        className="border border-gray-400 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-pink-500"
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
          type={showPass ? "text" : "password"}
          placeholder="Password"
          name="password"
        />
        <span
          className="material-symbols-outlined text-xl mr-2 text-gray-600 cursor-pointer"
          onClick={() => TogglePass("password")}
        >
          {showPass ? "visibility" : "visibility_off"}
        </span>
      </div>

      {/* confirm-password */}
      <div className="flex items-center border border-gray-400 rounded w-full  focus-within:ring-1 focus-within:ring-pink-500">
        <input
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full focus:outline-none p-2 rounded"
          type={showConfirmPass ? "text" : "password"}
          placeholder="Confirm Password"
          name="confirmPassword"
        />
        <span
          className="material-symbols-outlined text-xl mr-2 text-gray-600 cursor-pointer"
          onClick={() => TogglePass("confirmPassword")}
        >
          {showConfirmPass ? "visibility" : "visibility_off"}
        </span>
      </div>

      {error && <div className="text-red-600 text-lg">{error}...!</div>}

      {/* signup-button */}
      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-700 w-full p-2 rounded text-white "
      >
        {isSubmitting ? "signup..." : "signup"}
      </button>
    </form>
  );
};

export default Signup;
