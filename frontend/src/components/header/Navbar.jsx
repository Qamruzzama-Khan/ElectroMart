import { Link } from "react-router-dom";
import { useCartContext } from "../../hooks/useCart";
import { useAuthContext } from "../../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const { cart } = useCartContext();
  const { user } = useAuthContext();
  const [isNavDialog, setIsNavDialog] = useState(false);

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
        <span className="text-pink-700 font-semibold text-2xl md:text-3xl">
          ElectroMart
        </span>
      </h1>
      <ul className="hidden md:flex items-center gap-5 text-xl  text-gray-600">
        <Link to="/">
          <li className="hover:text-pink-700 cursor-pointer">Home</li>
        </Link>

        <Link to="/cart">
          <li className="hover:text-pink-700  cursor-pointer flex items-start">
            <span className="material-symbols-outlined text-3xl">
              shopping_bag
            </span>
            {user && cart.totalItems > 0 && (
              <span className="bg-pink-700 text-white inline-block h-[22px] w-[22px] rounded-full flex items-center justify-center text-sm font-semibold">
                {cart.totalItems}
              </span>
            )}
          </li>
        </Link>

        {user && (
          <Link to="/my-orders">
            <li className="hover:text-pink-700 cursor-pointer">My Orders</li>
          </Link>
        )}

        <Link to={user ? "/profile" : "/auth"}>
          <li className="hover:text-pink-700 cursor-pointer">
            {user ? "Profile" : "Login"}
          </li>
        </Link>
      </ul>
      {/* menu-icon */}
      <span className="material-symbols-outlined text-3xl text-gray-500 md:hidden cursor-pointer" onClick={ToggleNavDialog}>
        {isNavDialog ? 'close' : 'menu'}
      </span>
    </nav>
     {/* nav-dialog */}
   {isNavDialog &&   <ul className="flex flex-col md:hidden gap-2 text-lg  text-gray-600 mt-4">
     <Link to="/" onClick={ToggleNavDialog}>
       <li className="hover:text-pink-700 cursor-pointer">Home</li>
     </Link>

     <Link to="/cart" onClick={ToggleNavDialog}>
       <li className="hover:text-pink-700 cursor-pointer flex items-start">
         <span className="material-symbols-outlined text-3xl">
           shopping_bag
         </span>
         {user && cart.totalItems > 0 && (
           <span className="bg-pink-700 text-white inline-block h-[22px] w-[22px] rounded-full flex items-center justify-center text-sm font-semibold">
             {cart.totalItems}
           </span>
         )}
       </li>
     </Link>

     {user && (
       <Link to="/my-orders" onClick={ToggleNavDialog}>
         <li className="hover:text-pink-700 cursor-pointer">My Orders</li>
       </Link>
     )}

     <Link to={user ? "/profile" : "/auth"} onClick={ToggleNavDialog}>
       <li className="hover:text-pink-700 cursor-pointer">
         {user ? "Profile" : "Login"}
       </li>
     </Link>
   </ul>}
    </div>
  );
};

export default Navbar;
