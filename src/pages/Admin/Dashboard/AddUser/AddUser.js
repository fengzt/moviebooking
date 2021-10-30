import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { GROUP_ID } from "../../../../ulti/setting";
import { ThemNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungAction";

const AddUser = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUP_ID,
      maLoaiNguoiDung: "",
      hoTen: "",
    },
    //  -- Validtation
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

      // -- Call API gửi lên server
      const action = ThemNguoiDungAction(values);
      dispatch(action);
    },
  });

  const handleChangeMLND = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
      >
        <h3 className="text-2xl">Thêm Người Dùng Mới</h3>
        <Form.Item label="Tài khoản">
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
            <div className="text-red-500">{formik.errors.taiKhoan}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Mật khẩu">
          <Input
            type="password"
            name="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.matKhau && formik.errors.matKhau ? (
            <div className="text-red-500">{formik.errors.matKhau}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Email">
          <Input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500">{formik.errors.email}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Số điện thoại">
          <Input
            name="soDt"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.soDt && formik.errors.soDt ? (
            <div className="text-red-500">{formik.errors.soDt}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Mã loại người dùng">
          <Select
            name="maLoaiNguoiDung"
            options={[
              { label: "QuanTri", value: "QuanTri" },
              { label: "KhachHang", value: "KhachHang" },
            ]}
            onChange={handleChangeMLND}
            showSearch={{ filter, matchInputWidth: false }}
          />
        </Form.Item>

        <Form.Item label="Họ tên">
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.hoTen && formik.errors.hoTen ? (
            <div className="text-red-500">{formik.errors.hoTen}</div>
          ) : null}
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 font-bold"
          >
            Thêm Người Dùng
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddUser;
