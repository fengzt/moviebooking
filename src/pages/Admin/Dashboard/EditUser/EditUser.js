import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Switch } from "antd";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhimUploadAction,
  layThongTinPhimAction,
} from "../../../../redux/actions/QuanLyPhimAction";
import { GROUP_ID } from "../../../../ulti/setting";

const EditFilm = (props) => {
  const [componentSize, setComponentSize] = useState("default");

  //   Tạo biến src để hiển thị hình ở giao diện, trước khi gửi về api
  const [imgSrc, setImgSrc] = useState("");
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    const action = layThongTinPhimAction(props.match.params.id);
    dispatch(action);
  }, [props.match.params.id]);

  const formik = useFormik({
    //   Chỉ dùng thuộc tính này với trang Edit - dùng formik (default: false)
    enableReinitialize: true,
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      sapChieu: thongTinPhim.sapChieu,
      dangChieu: thongTinPhim.dangChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      maNhom: GROUP_ID,
      //   hình ảnh upload từ local là dạng chuỗi
      //   cơ chế BackEnd: null là không thay đổi
      hinhAnh: null,
    },
    //  -- Validtation
    validationSchema: Yup.object({
      tenPhim: Yup.string().required("Required"),
      trailer: Yup.string().required("Required"),
      moTa: Yup.string().required("Required"),
      danhGia: Yup.string().required("Required"),
      ngayKhoiChieu: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      console.log("values", values);
      // thêm mã nhóm vào Values gửi đi
      values.maNhom = GROUP_ID;

      // Dùng formData để gửi dữ liệu
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh" && key !== "ngayKhoiChieu") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
          if (key === "ngayKhoiChieu") {
            let ngayKhoiChieu = moment(values.ngayKhoiChieu).format(
              "DD/MM/YYYY"
            );
            formData.append("ngayKhoiChieu", ngayKhoiChieu);
          }
        }
      }

      // -- Call API gửi lên server
      dispatch(capNhatPhimUploadAction(formData));
    },
  });

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeDatePiker = (values) => {
    // bỏ .format("DD/MM/YYYY") vì values date không định dạng mới load được FE
    // bị config với set value ở hiển thị FE
    // Cụ thể thông tin lấy từ BE về là chuỗi "DD/MM/YYYY", còn value đưa về ở formik là date
    let ngayKhoiChieu = moment(values);
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

  const handleChangeFile = async (e) => {
    //   Lấy file từ event.target.file
    let file = e.target.files[0];
    // console.log("file", file);

    // Vì setFieldValue là hàm bất đồng bộ
    // Đảm bảo set value vào formik trước khi chạy hàm onload ra hình ảnh ở giao diện
    await formik.setFieldValue("hinhAnh", file);

    // Tạo đối tượng reader để đọc file
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      // console.log("e", e.target.result);
      setImgSrc(e.target.result); // setImgSrc bằng giá trị của file
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
        <h3 className="text-2xl">Chỉnh sửa phim {thongTinPhim.tenPhim}</h3>
        <Form.Item label="Tên phim">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tenPhim}
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
            value={formik.values.trailer}
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
            value={formik.values.moTa}
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
            value={moment(formik.values.ngayKhoiChieu)}
          />
          {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? (
            <div className="text-red-500">{formik.errors.ngayKhoiChieu}</div>
          ) : null}
        </Form.Item>
        <Form.Item label="Sắp chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Đang chiếu" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>
        <Form.Item label="Đánh giá sao">
          <InputNumber
            name="danhGia"
            max={10}
            min={1}
            onChange={handleChangeInputNumber("danhGia")}
            onBlur={formik.handleBlur}
            value={formik.values.danhGia}
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
          <img
            // Nếu không đổi thì mặc định imgSrc = "" => Load tấm ảnh từ API trả về
            // Nếu đổi thì setImgSrc
            src={imgSrc === "" ? thongTinPhim.hinhAnh : imgSrc}
            style={{ width: "200px", height: "150px", paddingTop: "10px" }}
            alt=""
          />
        </Form.Item>

        <Form.Item label="Tác vụ">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 font-bold"
          >
            Cập Nhật
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditFilm;
