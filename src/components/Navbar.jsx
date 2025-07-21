import React from "react";
import { navItems } from "../config/site";
import { Link, useLocation } from "react-router-dom";

const Navbar = React.memo(() => {
  const location = useLocation();

  return (
    <header id="navbar" className="fixed bottom-0 w-full bg-lime-50 shadow-2xl z-10 xl:h-20">
      <nav className="">
        <ul className="flex justify-between items-center px-4 py-3 md:py-4">
          {navItems.map(({ path, isExternal, id, title, icon: Icon }) => {
            const isActive = location.pathname === path;
            const linkClasses = `flex flex-col xl:flex-row xl:gap-2 items-center font-medium gap-1 px-3 py-1 rounded-md transition-colors ${
              isActive
                ? "text-blue-600 bg-gray-400/35 xl:py-3"
                : "text-gray-500 hover:text-blue-500"
            }`;

            return (
              <li key={id}>
                  <Link target={isExternal?'_blank':'_self'} to={path} className={`${linkClasses}`}>
                    <Icon  className="w-6 h-6 " />
                    <span className="hidden sm:block font-medium">{title}</span>
                  </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
})

export default Navbar;
