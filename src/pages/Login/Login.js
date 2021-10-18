import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { QuanLyNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { NavLink } from "react-router-dom";

export default function Login(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },

    // Validation

    onSubmit: (values) => {
      console.log("values", values);
      const action = QuanLyNguoiDungAction(values);
      dispatch(action);
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        formik.handleSubmit(event);
      }}
      className="lg:w-1/2 xl:max-w-screen-sm"
    >
      <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
        <div className="cursor-pointer flex items-center">
          <div>
            <NavLink to="/">
              <img
                className="ml-4 w-16 h-16"
                src="https://i.imgur.com/lC22izJ.png"
                alt="logo"
              />
            </NavLink>
          </div>
          <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
            Cyber Movie
          </div>
        </div>
      </div>
      <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          Đăng nhập
        </h2>
        <div className="mt-12">
          <div>
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              Tài khoản
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Nhập tên tài khoản của bạn"
              name="taiKhoan"
              onChange={formik.handleChange}
            />
          </div>
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Mật khẩu
              </div>
              <div>
                <NavLink
                  to="/login"
                  className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800
                                  cursor-pointer"
                >
                  Quên mật khẩu ?
                </NavLink>
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              onChange={formik.handleChange}
              name="matKhau"
              placeholder="Nhập mật khẩu của bạn"
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
            >
              Đăng nhập
            </button>
          </div>
          <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
            Bạn chưa có tài khoản ?{" "}
            <NavLink
              to="/register"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
