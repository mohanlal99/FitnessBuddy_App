import React, { useState } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import { Eye, EyeClosed, LockIcon, LogIn, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/userAuthSlice";
import useForm from "../../hooks/useForm";

const SignIn = () => {
  const [form, handleChange, handleSubmit, reset] = useForm({
    email: "mq@gmail.com",
    password: "123456",
  });
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [eye, setEye] = useState(false);

  const eyeClick = () => {
    setEye(!eye);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(login(form));
    setIsLoading(false);
  };

  return (
    <div className="bg-blue-500 overflow-hidden relative h-screen">
      <SectionHeader
        className="flex items-center justify-center md:rounded-br-xl min-h-60 bg-none shadow-none rounded-bl-2xl"
        title="Welcome Back!"
        subTitle="Sign in to continue your fitness journey"
        icon={LogIn}
      />
      <div className="absolute w-full top-100% left-0 overflow-auto px-5  rounded-2xl">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full   overflow-auto">
          <form onSubmit={handleLogin} className="space-y-6 w-full">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Email
              </label>
              <div className="flex bg-black/5 rounded-lg px-2 items-center space-x-2">
                <Mail />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2  focus:border-none w-full"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="flex bg-black/5 rounded-lg px-2 items-center space-x-2">
                <LockIcon />
                <input
                  name="password"
                  type={eye ? "text" : "password"}
                  placeholder="Enter your password"
                  className="px-4 py-2  focus:border-none w-full"
                  value={form.password}
                  onChange={handleChange}
                />
                <span className="cursor-pointer">
                  {eye ? (
                    <Eye onClick={eyeClick} />
                  ) : (
                    <EyeClosed onClick={eyeClick} />
                  )}
                </span>
              </div>
            </div>


            <button
              type="button"
              className={`w-full py-2 px-4 rounded-lg cursor-pointer ${
                isLoading ? "bg-gray-300" : "bg-blue-600 text-white"
              }`}
              onClick={handleLogin}
              disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
            <div className="flex justify-between items-center mt-3 text-blue-500 font-bold">
              <div className="text-xs text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/auth/register"
                  className="text-blue-600 hover:scale-105 font-medium">
                  Sign in
                </Link>
              </div>
              <Link to={"#"} className="text-sm">
                Forgot Password?
              </Link>
            </div>

          <div className="my-4 text-center mt-5">
            <div className="text-[12px] text-gray-500 mb-5">
              <p className=" border-b border-b-black/10 w-full "></p>
              <p className="w-fit absolute left-1/2 -translate-1/2 bg-amber-50">
                Or continue with
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="px-4 py-2 cursor-pointer text-sm  bg-black/5 rounded-lg w-full">
                Google
              </button>
              <button className="px-4 py-2 cursor-pointer text-sm  bg-black/5 rounded-lg w-full">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
