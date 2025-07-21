import React, { useEffect } from "react";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const NotFound = ({ hidden }) => {
  const navigate = useNavigate();
  useEffect(() => {
    hidden(true);
  }, [hidden]);

  return (
    <div className="h-screen w-full grid place-items-center px-8 text-center">
      <div>
        {/* Replace with an actual icon or SVG if needed */}
        <div className="w-20 h-20 mx-auto bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-gray-600">🚩</span>
        </div>

        <h1 className="mt-10 text-3xl md:text-4xl font-bold text-blue-800 leading-snug">
          Error 404 <br /> It looks like something went wrong.
        </h1>

        <p className="mt-8 mb-14 text-[18px] text-gray-500 mx-auto md:max-w-sm">
          Don’t worry, our team is already on it. Please try refreshing the page
          or come back later.
        </p>

        <Button onClick={() => navigate("/")} className="w-full" size="lg">
          {" "}
          Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
