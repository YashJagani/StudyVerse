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
    { data: registerData, error: registerError, isSuccess: registerIsSuccess },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    { data: loginData, error: loginError, isSuccess: loginIsSuccess },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  // reset the form data after signup
  const resetFormData = () => {
    setSignupInput({ name: "", email: "", password: "" });
    setLoginInput({ email: "", password: "" });
  };

  // validations for all the fields
  const validateForm = (inputData, type) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (Object.values(inputData).some((field) => !field.trim())) {
      toast.error("All fields are required.", {
        style: { color: "red" },
      });
      return false;
    }

    if (!emailRegex.test(inputData.email)) {
      toast.error("Invalid email address.", {
        style: { color: "red" },
      });
      return false;
    }

    if (inputData.password.length < 8) {
      toast.error("Password must be 8 characters or long.", {
        style: { color: "red" },
      });
      return false;
    }

    if (type === "signup" && !inputData.name.trim()) {
      toast.error("Name is required.", {
        style: { color: "red" },
      });
      return false;
    }

    return true;
  };

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
    if (!validateForm(inputData, type)) return;

    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  const handleKeyDown = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleRegistration(type);
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "registration successful.", {
        style: { color: "green" },
      });
      resetFormData();
    } else if (registerError && !registerIsSuccess) {
      toast.error(registerError.data.message || "registration failed.", {
        style: { color: "red" },
      });
    }

    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "login successful.", {
        style: { color: "green" },
      });
      resetFormData();
      navigate("/");
    } else if (loginError && !loginIsSuccess) {
      toast.error(loginError.data.message || "login failed", {
        style: { color: "red" },
      });
    }
  }, [
    registerIsSuccess,
    registerError,
    registerData,
    loginIsSuccess,
    loginError,
    loginData,
    navigate,
  ]);

  useEffect(() => {
    resetFormData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="flex w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden bg-white border border-gray-200">
        {/* studyverse image in the form */}
        <div className="w-1/2 bg-gray-100 relative">
          <img
            src={coverImage}
            alt="Cover_Image"
            className="object-cover w-full h-full transition-transform duration-700 ease-in-out transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent" />
        </div>

        {/* right side of the form */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-gray-50 rounded-r-lg shadow-inner">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            {isSignup ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {isSignup ? "Create an account." : "Login into your account."}
          </p>

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

          {/* animation */}
          <div className="relative overflow-hidden h-[300px]">
            <div
              className={`absolute w-full transition-all duration-700 ${
                isSignup
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              {/* login form */}
              <form className="space-y-5" onKeyDown={(e) => handleKeyDown(e, "login")}>
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="w-80 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 bg-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="w-80 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40 box-border"
                  />
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

            {/* signup form */}
            <div
              className={`absolute w-full transition-all duration-700 ${
                isSignup
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <form className="space-y-4" onKeyDown={(e) => handleKeyDown(e, "signup")}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
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
                    className="w-80 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
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
                    className="w-80 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
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
                    className="w-80 px-4 py-2 border border-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-black/40"
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
