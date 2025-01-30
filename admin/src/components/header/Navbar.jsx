import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  const [isNavDialog, setIsNavDialog] = useState();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  const ToggleNavDialog = () => {
    setIsNavDialog(!isNavDialog)
  }

  return (
    <div>
    <nav className="mt-4 flex items-center justify-between">
      <h1 className="flex items-center">
        <span className="material-symbols-outlined text-pink-700 text-4xl md:text-5xl">
          cable
        </span>
        <span className="text-pink-700 font-semibold text-xl md:text-3xl">
          ElectroMart
        </span>
      </h1>
      <ul className="hidden md:flex items-center gap-5 text-xl text-gray-600">

     {user && user?.user.status === "admin" 
     &&  
     <Link to="/">
          <li className="hover:text-pink-700 cursor-pointer">Products</li>
        </Link>
        }

        {user && user?.user.status === "admin" 
     &&  <Link to="/orders">
          <li className="hover:text-pink-700 cursor-pointer">Orders</li>
        </Link>}
       
       
        {user && user?.user.status === "admin" 
     && 
          <Link>
            <li
              className="text-white cursor-pointer bg-red-500 px-3 rounded-full hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </li>
          </Link>
}
      </ul>

      {/* Mobile menu icon */}
     {user && user?.user.status === "admin" &&  <span
        className="material-symbols-outlined text-3xl text-gray-500 md:hidden cursor-pointer"
        onClick={ToggleNavDialog}
      >
        {isNavDialog ? 'close' : 'menu'}
      </span>}
    </nav>

    {/* Mobile nav dialog */}
    {isNavDialog && (
      <ul className="flex flex-col md:hidden gap-2 text-lg text-gray-600 mt-4">

      {user && user?.user.status === "admin" && <Link to="/">
          <li className="hover:text-pink-700 cursor-pointer">Products</li>
        </Link>}

       {user && user?.user.status === "admin" &&  <Link to="/orders">
          <li className="hover:text-pink-700 cursor-pointer">Orders</li>
        </Link>}
        {user && user?.user.status === "admin" && 
          <Link>
            <li
              className="border border-pink-600 cursor-pointer  px-3 rounded-full w-fit hover:bg-pink-600 hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </li>
          </Link>
        }
      </ul>
    )}
  </div>
  );
};

export default Navbar;
