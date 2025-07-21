import React from "react";

const SectionTitle = ({
  title,
  position = "left",
  icon: Icon,
  iconSize = 24,
  iconColor = "#2563EB",
}) => {
  const titleAlignClass =
    position === "center"
      ? "text-center"
      : position === "right"
      ? "text-right"
      : "text-left";

  return (
    <div className="flex items-center space-x-2">
      {Icon && <Icon size={iconSize} color={iconColor} className="text-xl" />}
      <h2 className={`${titleAlignClass} text-xl font-medium`}>{title}</h2>
    </div>
  );
};

export default SectionTitle;
