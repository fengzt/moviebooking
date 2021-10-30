import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ID } from "../../../../ulti/setting";
import { CapNhatThongTinNguoiDungAction, LayThongTinNguoiDungAction } from "../../../../redux/actions/QuanLyNguoiDungAction";

const EditFilm = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  const { thongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);

  console.log('thongTinNguoiDung', thongTinNguoiDung);

  const dispatch = useDispatch();
  useEffect(() => {
    const action = LayThongTinNguoiDungAction();
    dispatch(action);
  }, [dispatch]);

  const formik = useFormik({
    //   Chỉ dùng thuộc tính này với trang Edit - dùng formik (default: false)
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung.taiKhoan,
      matKhau: thongTinNguoiDung.matKhau,
      email: thongTinNguoiDung.email,
      soDt: thongTinNguoiDung.soDT,
      maNhom: GROUP_ID,
      maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
      hoTen: thongTinNguoiDung.hoTen,
    },
    //  -- Validtation
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Required"),
      matKhau: Yup.string()
        .required("Required"),
      email: Yup.string()
        .required("Required")
        .email("Email không đúng định dạng !"),
      soDt: Yup.string()
        .required("Required")
        .min(10, "Số điện thoại phải 10 số !")
        .max(10, "Số điện thoại phải 10 số !"),
      hoTen: Yup.string()
        .required("Required"),
    }),

    onSubmit: (values) => {
      console.log("values", values);

      // -- Call API gửi lên server
      dispatch(CapNhatThongTinNguoiDungAction(values))
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
            value={formik.values.taiKhoan}
            disabled='true'
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
            value={formik.values.matKhau}
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
            value={formik.values.email}
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
            value={formik.values.soDt}
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
            value={formik.values.maLoaiNguoiDung}
          />
        </Form.Item>

        <Form.Item label="Họ tên">
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.hoTen}
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
            Cập nhật
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditFilm;
