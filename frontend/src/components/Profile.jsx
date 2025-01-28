import { useAuthContext } from "../hooks/useAuth";

const Profile = ({ user }) => {
  const { dispatch } = useAuthContext();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <div className="border border-gray-300 w-full md:w-fit mx-auto p-2 rounded flex flex-col items-center gap-2">
      <span className="material-symbols-outlined text-8xl text-gray-600">
        account_circle
      </span>
      <p className="text-gray-700 font-semibold text-lg">{user.user.name}</p>
      <p className="text-gray-500">{user.user.email}</p>
      <button
        className="bg-gray-200 py-2 px-6 rounded-full w-full md:w-fit hover:bg-red-600 hover:text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
