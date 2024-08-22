import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminLogin = () => {
  const SET_PASSWORD = process.env.REACT_APP_MSP_PASSWORD;

  const [password, setPassword] = useState<string>("");

  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SET_PASSWORD) {
      setAuthenticated(true);
      navigate("/admin");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="h-full mt-20">
      <div className="flex flex-col items-center h-full justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-creame">
              Admin Login
            </h1>
            <form className="flex flex-col space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-creame">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className=" border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-creame focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="w-full flex justify-center items-center">
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-1/4 outline-dashed text-creame bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
