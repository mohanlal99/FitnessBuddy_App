import React from "react";

const sizeClasses = {
  sm: "px-3 py-.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const colorClasses = {
  white: {
    solid: "bg-white text-black hover:bg-gray-100",
    outline:
      "border border-white text-white hover:bg-white hover:text-black",
    ghost: "text-white hover:bg-white/10",
  },
  blue: {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-blue-600 hover:bg-blue-100",
  },
  red: {
    solid: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
    ghost: "text-red-600 hover:bg-red-100",
  },
  green: {
    solid: "bg-green-600 text-white hover:bg-green-700",
    outline:
      "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
    ghost: "text-green-600 hover:bg-green-100",
  },
};

const Button = ({
  children,
  size = "md",
  color = "blue",
  variant = "solid",
  icon,
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex  items-center cursor-pointer justify-center font-medium rounded-2xl transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeClass = sizeClasses[size] || "";
  const colorClass = colorClasses[color]?.[variant] || "";
  const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "";

  const finalClasses =
    `${baseClasses} ${sizeClass} ${colorClass} ${disabledClass} ${className}`.trim();

  return (
    <button
      type={type}
      className={finalClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
