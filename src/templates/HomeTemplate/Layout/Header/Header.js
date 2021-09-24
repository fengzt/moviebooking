import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";


export const Header = () => {

  return (
    <header className="fixed w-full z-10 p-4 bg-black bg-opacity-20 text-white">
      <div className="container flex justify-between items-center h-16 mx-auto">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            className="ml-4 w-16 h-16"
            src="https://i.imgur.com/lC22izJ.png"
            alt="logo"
          />
        </NavLink>
          <ul className="items-stretch hidden h-7 md:flex md:m-0">
            <li className="flex m-0">
              <NavLink
                to="/home"
                activeClassName="border-b-2 border-white"
                className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="flex m-0">
              <NavLink
                to="/contact"
                activeClassName="border-b-2 border-white"
                className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
              >
                Liên hệ
              </NavLink>
            </li>
            <li className="flex m-0">
              <NavLink
                to="/news"
                activeClassName="border-b-2 border-white"
                className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
              >
                Tin tức
              </NavLink>
            </li>
            <li className="flex m-0">
              <NavLink
                to="/application"
                activeClassName="border-b-2 border-white"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white"
              >
                Ứng dụng
              </NavLink>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden md:flex">
            <button
              onClick={() => {
                history.push("/register");
              }}
              className="self-center px-8 py-3 font-semibold rounded"
            >
              Đăng Ký
            </button>
            <button
              onClick={() => {
                history.push("/login");
              }}
              className="self-center px-8 py-3 font-semibold rounded"
            >
              Đăng Nhập
            </button>
          </div>
      </div>
    </header>
  );
};
