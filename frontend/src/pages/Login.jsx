import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import coverImage from "@/assets/cover.png";

import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
    registerIsSuccess,
    loginIsSuccess,
    navigate,
  ]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="flex w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden bg-white border border-gray-200">
        {/* Left Side - Illustration */}
        <div className="w-1/2 bg-gray-100 relative">
          <img
            src={coverImage}
            alt="Cover_Image"
            className="object-cover w-full h-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-50 rounded-r-lg shadow-inner">
          <h2
            className={`text-3xl font-bold text-center text-gray-800 mb-4 transition-transform duration-500 ${
              isSignup
                ? "translate-y-0 opacity-100"
                : "translate-y-0 opacity-100"
            }`}
          >
            {isSignup ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-center text-gray-500 mb-6 transition-opacity duration-500">
            {isSignup ? "Create an account." : "Login into your account."}
          </p>

          {/* Toggle Button */}
          <div className="w-80 flex justify-center mb-6">
            <button
              onClick={() => setIsSignup(false)}
              className={`px-4 py-2 w-1/2 text-sm font-semibold rounded-l-lg transition-all duration-300 ${
                !isSignup
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`px-4 py-2 w-1/2 text-sm font-semibold rounded-r-lg transition-all duration-300 ${
                isSignup
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Signup
            </button>
          </div>

          {/* Form Sliding Effect */}
          <div className="relative overflow-hidden h-[300px]">
            <div
              className={`absolute w-full transition-all duration-700 ${
                isSignup
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              {/* Login Form */}
              <form className="space-y-5">
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="block mx-1 text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="name@gmail.com"
                    required
                    className="w-80 mx-1 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mx-1 text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="password"
                    required
                    className="w-80 mx-1 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 box-border"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-black"
                    />
                    <span className="ml-2 mx-1 text-gray-600">Remember me</span>
                  </label>
                  <a href="/" className="text-black hover:underline mr-10">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleRegistration("login")}
                  className="w-80 py-2 text-white bg-black rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-black/40"
                >
                  Login
                </button>
              </form>
            </div>

            {/* Signup Form */}
            <div
              className={`absolute w-full transition-all duration-700 ${
                isSignup
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mx-1 text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="name"
                    required
                    className="w-80 mx-1 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mx-1 text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="name@gmail.com"
                    required
                    className="w-80 mx-1 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mx-1 text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="password"
                    required
                    className="w-80 mx-1 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRegistration("signup")}
                  className="w-80 py-2 text-white bg-black rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-black/40"
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
