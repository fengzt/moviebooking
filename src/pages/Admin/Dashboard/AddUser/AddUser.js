import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { QuanLyPhimAction } from "../../../../redux/actions/QuanLyPhimAction";
import { GROUP_ID } from "../../../../ulti/setting";

const AddFilm = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  //   Tạo biến src để hiển thị hình ở giao diện, trước khi gửi về api
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      sapChieu: false,
      dangChieu: false,
      hot: false,
      danhGia: 0,
      //   hình ảnh upload từ local là dạng chuỗi
      hinhAnh: {},
    },
    //  -- Validtation
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Required"),
      trailer: Yup.string().required("Required"),
      moTa: Yup.string().required("Required"),
      danhGia: Yup.string().required("Required"),
      ngayKhoiChieu: Yup.string().required("Required"),
      hinhAnh: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      console.log("values", values);
      // thêm mã nhóm vào Values gửi đi
      values.maNhom = GROUP_ID;

      // Dùng formData để gửi dữ liệu
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      console.log("formData", formData.get("File"));

      // -- Call API gửi lên server
      const action = QuanLyPhimAction(formData);
      dispatch(action);
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeDatePiker = (values) => {
    let ngayKhoiChieu = moment(values).format("DD/MM/YYYY");
    return formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  // closure function
  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    //   Lấy file từ event.target.file
    let file = e.target.files[0];
    // console.log("file", file);

    // Tạo đối tượng reader để đọc file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // console.log("e", e.target.result);
      setImgSrc(e.target.result); // setImgSrc bằng giá trị của file
      formik.setFieldValue("hinhAnh", file);
    };
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
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tenPhim && formik.errors.tenPhim ? (
            <div className="text-red-500">{formik.errors.tenPhim}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.trailer && formik.errors.trailer ? (
            <div className="text-red-500">{formik.errors.trailer}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Mô tả">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.moTa && formik.errors.moTa ? (
            <div className="text-red-500">{formik.errors.moTa}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            name="ngayKhoiChieu"
            format={"DD/MM/YYYY"}
            onChange={handleChangeDatePiker}
            onBlur={formik.handleBlur}
          />
          {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
            <div className="text-red-500">{formik.errors.ngayKhoiChieu}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Đánh giá sao">
          <InputNumber
            name="danhGia"
            max={10}
            min={1}
            onChange={handleChangeInputNumber("danhGia")}
            onBlur={formik.handleBlur}
          />
          {formik.touched.danhGia && formik.errors.danhGia ? (
            <div className="text-red-500">{formik.errors.danhGia}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <input
            name="hinhAnh"
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpg, image/jpeg, image/gif"
            onBlur={formik.handleBlur}
          />
          {formik.touched.hinhAnh && formik.errors.hinhAnh ? (
            <div className="text-red-500">{formik.errors.hinhAnh}</div>
          ) : null}
          <img
            src={imgSrc}
            style={{ width: "200px", height: "150px", paddingTop: "10px" }}
            alt=""
          />
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

export default AddFilm;
