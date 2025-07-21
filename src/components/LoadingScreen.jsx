import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 h-full  z-50 w-full bg-gradient-to-b from-blue-600 to-blue-400 flex items-center justify-center">
      <div className="text-center text-white space-y-2">
        <h1 className="text-4xl font-extrabold tracking-widest">
          FitnessBuddy
        </h1>
        <p className="text-lg animate-pulse">Loading your fitness journey...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
