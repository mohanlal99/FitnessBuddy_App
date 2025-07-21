import React from "react";

const SectionHeader = ({ title, subTitle, icon: Icon, image, className , ...rest}) => {
  return (
    <div  className={`flex  xl:items-center justify-between gap-6 px-4 py-4 md:px-6 md:py-2 bg-gradient-to-br from-rose-800 to-blue-500 text-white md:rounded-br-full rounded-b-2xl shadow-lg ${className}`} {...rest}>
      <div className="flex flex-col justify-center items-start md:max-w-[60%] space-y-2 md:space-y-4">
        {Icon && (
          <div className="bg-white/20 p-3 rounded-full">
            <Icon className="text-white md:h-10 md:w-10" />
          </div>
        )}
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-extrabold tracking-wide text-ellipsis text-nowrap ">{title}</h2>
        <p className="text-sm font-medium leading-snug">{subTitle}</p>
      </div>

      {image && (
        <div className="hidden sm:flex w-full md:w-80 h-44 md:h-44 rounded-lg overflow-hidden shadow-md">
          <img
            src={image}
            alt="header banner"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
