import Signup from "../components/Signup";
import Login from "../components/Login";
import { useState } from "react";

const AuthPage = () => {
  const [authComp, setAuthComp] = useState("login");

  return (
    <div className="mt-20">
      <div className="border border-gray-400 rounded flex flex-col gap-3 p-2 md:p-5 md:w-[50%] mx-auto">
        <h4 className="uppercase text-pink-700 font-semibold w-fit mx-auto">
          {authComp}
        </h4>
        {authComp === "signup" && <Signup />}
        {authComp === "login" && <Login />}

        <div className="flex items-center gap-1">
          {authComp === "login" ? (
            <span>If you don't have an account ?</span>
          ) : (
            <span>If you have an account ?</span>
          )}

          <button
            className="text-pink-700 font-semibold"
            onClick={() =>
              setAuthComp(authComp === "login" ? "signup" : "login")
            }
          >
            {authComp === "login" ? "signup" : "login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
