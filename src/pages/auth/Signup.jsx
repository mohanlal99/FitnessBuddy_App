import React, { useEffect, useState } from "react";
import SectionHeader from "../../components/ui/SectionHeader";
import {
  Eye,
  EyeClosed,
  LockIcon,
  LogIn,
  Mail,
  SigmaSquareIcon,
} from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [registerForm, setRegisterForm, , reset] = useForm({
    fullName: "",
    email: "",
    password: "",
    location: "",
    height: "",
    weight: "",
    age: "",
    gender: "",
    goals: "",
  });
  const { fullName, email, password, location, height, weight, age, gender } =
    registerForm;
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [eye, setEye] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const eyeClick = () => {
    setEye(!eye);
  };
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password, ...profile } = registerForm;

      if (!email || !password) {
        setError("Email and password are required.");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        ...profile,
        createdAt: new Date().toISOString(),
      });

      reset();
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already in use.");
      } else {
        setError(err.message);
      }
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-500 relative min-h-screen">
      <SectionHeader
        className="flex items-center justify-center md:rounded-br-xl min-h-60 bg-none shadow-none rounded-bl-2xl"
        title="Create Account"
        subTitle="Sign up to start your fitness journey"
        icon={SigmaSquareIcon}
      />
      <div className="w-full px-5 rounded-3xl py-8">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full">
          <form onSubmit={handleSignup} className="space-y-6 w-full">
            {/* Personal Information */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Full Name
              </label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="focus:outline-none w-full"
                  value={fullName}
                  onChange={setRegisterForm}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Email
              </label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <Mail size={20} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="focus:outline-none w-full"
                  value={email}
                  onChange={setRegisterForm}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <LockIcon size={20} />
                <input
                  name="password"
                  type={eye ? "text" : "password"}
                  placeholder="Create a password"
                  className="focus:outline-none w-full"
                  value={password}
                  onChange={setRegisterForm}
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

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Location
              </label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <input
                  type="text"
                  name="location"
                  placeholder="Enter your city"
                  className="focus:outline-none w-full"
                  value={location}
                  onChange={setRegisterForm}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Height (cm)
              </label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <input
                  type="number"
                  name="height"
                  placeholder="170"
                  className="focus:outline-none w-full"
                  value={height}
                  onChange={setRegisterForm}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Weight (kg)
              </label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <input
                  type="number"
                  placeholder="70"
                  name="weight"
                  className="focus:outline-none w-full"
                  value={weight}
                  onChange={setRegisterForm}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">Age</label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <input
                  type="number"
                  placeholder="25"
                  className="focus:outline-none w-full"
                  value={age}
                  name="age"
                  onChange={setRegisterForm}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Gender
              </label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <select
                  className="focus:outline-none w-full"
                  value={gender}
                  name="gender"
                  onChange={setRegisterForm}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-800">
                Fitness Goals
              </label>
              <div className="flex bg-gray-100 rounded-lg px-4 py-2 gap-2 items-center">
                <input
                  type="text"
                  name="goals"
                  value={registerForm.goals}
                  onChange={setRegisterForm}
                  placeholder="Enter your fitness goals"
                  className="focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Submit */}
            {error && (
              <p className="text-sm text-rose-500">
                {error || "Something went wrong!"}
              </p>
            )}

            <button
              type="submit"
              className={`w-full font-medium cursor-pointer py-2 px-4 rounded-lg ${
                isLoading
                  ? "bg-gray-300"
                  : "bg-blue-600 text-white hover:bg-blue-500 transition-all"
              }`}
              // onClick={handleSignup}
              disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Create Account"}
            </button>
          </form>

          <div className="flex justify-between items-center mt-3 text-blue-500 font-bold">
            <div className="text-xs text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/login"
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
              <p className="border-b border-b-black/10 w-full"></p>
              <p className="w-fit absolute left-1/2 -translate-1/2 bg-amber-50">
                Or continue with
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-2">
              <button className="px-4 py-2 cursor-pointer text-sm bg-black/5 rounded-lg w-full">
                Google
              </button>
              <button className="px-4 py-2 cursor-pointer text-sm bg-black/5 rounded-lg w-full">
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
