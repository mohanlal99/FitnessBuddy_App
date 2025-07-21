import React from "react";

const Box = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  shadow = true,
  rounded = "rounded-2xl",
  ...rest
}) => {
  const paddingMap = {
    none: "",
    sm: "p-2 md:p-3",
    md: "p-3 md:p-5",
    lg: "p-5 md:p-8",
  };

  let variantClasses = "";
  if (variant === "primary") variantClasses = "bg-blue-500 text-white";
  else if (variant === "secondary")
    variantClasses = "bg-gray-100 text-gray-700";
  else if (variant === "outline")
    variantClasses = "border border-gray-300 bg-transparent text-gray-800";

  const shadowClass = shadow ? "shadow-md" : "";

  const combinedClassName = `mt-4 ${variantClasses} ${paddingMap[padding]} ${shadowClass} ${rounded} ${className}`;

  return (
    <div className={combinedClassName.trim()} {...rest}>
      {children}
    </div>
  );
};

export default Box;
