import React, { Fragment, useEffect } from "react";
import { Form, DatePicker, Space, InputNumber, Button, Select } from "antd";
import { useFormik } from "formik";
import { useState } from "react";
import {
  LayThongTinCumRapTheoHeThong,
  layThongTinHeThongRap,
  taoLichChieu,
} from "../../../services/QuanLyRapService";
import moment from "moment";
import * as Yup from "yup";
import { EditFilled } from "@ant-design/icons";

const Showtime = (props) => {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    validationSchema: Yup.object({
      cumRap: Yup.string().required("Required"),
      giaVe: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        let result = await taoLichChieu(values);
        alert("Tạo lịch chiếu thành công !");
      } catch (errors) {
        console.log("errors", errors.response?.data);
      }
    },
  });

  const [state, setState] = useState({
    arrHeThongRap: [],
    arrCumRap: [],
  });
  // console.log("arrHeThongRap", state.arrHeThongRap);

  // Lấy thông tin hệ thống rạp
  useEffect(async () => {
    try {
      const result = await layThongTinHeThongRap();
      setState({
        ...state,
        arrHeThongRap: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response?.content);
    }
  }, [state]);

  // ---------
  let thongTinPhim = {};
  if (localStorage.getItem("thongTinPhim")) {
    thongTinPhim = JSON.parse(localStorage.getItem("thongTinPhim"));
  }

  console.log("thongTinPhim", thongTinPhim);

  const convertHeThongRap = () => {
    return state.arrHeThongRap?.map((htr, index) => ({
      label: htr.tenHeThongRap,
      value: htr.maHeThongRap,
    }));
  };

  // Tổ chức file service ở component
  const handleChangeHeThongRap = async (value) => {
    try {
      const result = await LayThongTinCumRapTheoHeThong(value);
      console.log("result", result.data.content);

      setState({
        ...state,
        arrCumRap: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };

  const convertCumRapTheoHTR = () => {
    return state.arrCumRap?.map((cumRap, index) => {
      return { label: cumRap.tenCumRap, value: cumRap.maCumRap };
    });
  };

  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  };

  const onChangeDate = (value) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(value).format("DD/MM/YYYY hh:mm:ss")
    );
  };

  const onOk = () => {};

  const onChangeInputNumber = (value) => {
    formik.setFieldValue("giaVe", value);
  };

  return (
    <Fragment>
      <h3 className="text-2xl">Tạo lịch chiếu phim - {thongTinPhim.tenPhim}</h3>

      <div className="flex mt-8">
        <img
          src={thongTinPhim.hinhAnh}
          alt={thongTinPhim.hinhAnh}
          style={{ width: "300px", marginRight: "40px" }}
        />

        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 15 }}
          initialValues={{ remember: true }}
          onSubmitCapture={formik.handleSubmit}
        >
          <Form.Item label="Hệ thống rạp">
            <Select
              options={convertHeThongRap()}
              onChange={handleChangeHeThongRap}
              showSearch={{ filter, matchInputWidth: false }}
              placeholder="Hãy chọn hệ thống rạp"
            />
          </Form.Item>

          <Form.Item label="Cụm rạp">
            <Select
              options={convertCumRapTheoHTR()}
              onChange={handleChangeCumRap}
              placeholder="Hãy chọn cụm rạp"
              name="cumRap"
            />
            {formik.touched.cumRap && formik.errors.cumRap ? (
              <div className="text-red-500">{formik.errors.cumRap}</div>
            ) : null}
          </Form.Item>

          <Form.Item label="Ngày chiếu - Giờ chiếu">
            <Space direction="vertical" size={800} style={{ width: 800 }}>
              <DatePicker showTime onOk={onOk} onChange={onChangeDate} />
            </Space>
          </Form.Item>

          <Form.Item label="Giá vé">
            <InputNumber
              min={75000}
              max={150000}
              onChange={onChangeInputNumber}
              name="giaVe"
            />
            {formik.touched.giaVe && formik.errors.giaVe ? (
              <div className="text-red-500">{formik.errors.giaVe}</div>
            ) : null}
          </Form.Item>

          <Form.Item label="Tác vụ">
            <Button
              htmlType="submit"
              style={{
                backgroundColor: "#002766",
                color: "white",
                border: "none",
                display: "flex",
                alignItems: "center",
              }}
              shape="round"
              icon={<EditFilled />}
            >
              Tạo lịch chiếu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Fragment>
  );
};
export default Showtime;
