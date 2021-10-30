import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { DangKyNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { NavLink } from "react-router-dom";
import { GROUP_ID } from "../../ulti/setting";
import * as Yup from "yup";

export default function Login(props) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUP_ID,
      hoTen: "",
    },

    // Validation
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Required"),
      matKhau: Yup.string()
        .required("Required")
        .min(8, "Mật khẩu phải 8 kí tự !")
        .max(8, "Mật khẩu phải 8 kí tự !"),
      email: Yup.string()
        .required("Required")
        .email("Email không đúng định dạng !"),
      soDt: Yup.string()
        .required("Required")
        .min(10, "Số điện thoại phải 10 số !")
        .max(10, "Số điện thoại phải 10 số !"),
      hoTen: Yup.string()
        .required("Required")
        .matches(/^[A-Z a-z]+$/, "Họ tên không được chứa số !"),
    }),

    onSubmit: (values) => {
      console.log("values", values);
      const action = DangKyNguoiDungAction(values);
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
      <div className="py-4 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
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
      <div className="mt-2 px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
        <h2
          className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
        >
          Đăng ký
        </h2>
        <div className="mt-8">
          <div>
            <div className="text-sm font-bold text-gray-700 tracking-wide">
              Tài khoản
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="Nhập tên tài khoản của bạn"
              name="taiKhoan"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
              <div className="text-red-500">{formik.errors.taiKhoan}</div>
            ) : null}
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Mật khẩu
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              onChange={formik.handleChange}
              name="matKhau"
              onBlur={formik.handleBlur}
              placeholder="Nhập mật khẩu của bạn"
            />
            {formik.touched.matKhau && formik.errors.matKhau ? (
              <div className="text-red-500">{formik.errors.matKhau}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Email
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              name="email"
              onBlur={formik.handleBlur}
              placeholder="Nhập email của bạn"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Số điện thoại
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              type="password"
              onChange={formik.handleChange}
              name="soDt"
              onBlur={formik.handleBlur}
              placeholder="Nhập số điện thoại của bạn"
            />
            {formik.touched.soDt && formik.errors.soDt ? (
              <div className="text-red-500">{formik.errors.soDt}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-bold text-gray-700 tracking-wide">
                Họ tên
              </div>
            </div>
            <input
              className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              onChange={formik.handleChange}
              name="hoTen"
              onBlur={formik.handleBlur}
              placeholder="Nhập họ tên của bạn"
            />
            {formik.touched.hoTen && formik.errors.hoTen ? (
              <div className="text-red-500">{formik.errors.hoTen}</div>
            ) : null}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                          shadow-lg"
            >
              Đăng ký
            </button>
          </div>
          <div className="mt-4 text-sm font-display font-semibold text-gray-700 text-center">
            Bạn đã có tài khoản ?{" "}
            <NavLink
              to="/login"
              className="cursor-pointer text-indigo-600 hover:text-indigo-800"
            >
              Đăng nhập
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
}
