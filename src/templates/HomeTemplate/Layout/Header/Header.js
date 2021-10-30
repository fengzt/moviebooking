import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";

// useTranslation từ thư viện i18n
import { useTranslation } from "react-i18next";

import { Select } from "antd";
import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../../../ulti/setting";
import { DANG_XUAT } from "../../../../redux/types/QuanLyNguoiDungTypes";

const { Option } = Select;

export const Header = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  function handleChange(value) {
    i18n.changeLanguage(value);
  }

  const renderIsLogin = () => {
    if (localStorage.getItem(USER_LOGIN)) {
      let user = JSON.parse(localStorage.getItem(USER_LOGIN));
      return (
        <Fragment>
          <NavLink to="/profile">
            <span className="p-6 text-white font-semibold">
              Xin chào {user.taiKhoan} !
            </span>
          </NavLink>
          <button
            onClick={() => {
              dispatch({ type: DANG_XUAT });
              history.push("/login");
            }}
            className="self-center px-8 py-3 font-semibold"
          >
            Đăng xuất
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          onClick={() => {
            history.push("/register");
          }}
          className="self-center px-8 py-3 font-semibold rounded"
        >
          {t("Đăng kí")}
        </button>
        <button
          onClick={() => {
            history.push("/login");
          }}
          className="self-center px-8 py-3 font-semibold rounded"
        >
          {t("Đăng nhập")}
        </button>
      </Fragment>
    );
  };

  return (
    <header className="fixed w-full z-10 p-4 bg-gray-800 text-white">
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
              {t("Trang chủ")}
            </NavLink>
          </li>
          <li className="flex m-0">
            <NavLink
              to="/contact"
              activeClassName="border-b-2 border-white"
              className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
            >
              {t("Liên hệ")}
            </NavLink>
          </li>
          <li className="flex m-0">
            <NavLink
              to="/news"
              activeClassName="border-b-2 border-white"
              className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
            >
              {t("Tin tức")}
            </NavLink>
          </li>
          <li className="flex m-0">
            <NavLink
              to="/application"
              activeClassName="border-b-2 border-white"
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white"
            >
              {t("Ứng dụng")}
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden md:flex">
          <Select
            defaultValue="vi"
            style={{ width: 100 }}
            onChange={handleChange}
          >
            <Option value="en">En</Option>
            <Option value="vi">Vi</Option>
            <Option value="chi">Chi</Option>
          </Select>
          {renderIsLogin()}
        </div>
      </div>
    </header>
  );
};
