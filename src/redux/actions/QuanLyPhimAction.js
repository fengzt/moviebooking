import { history } from "../../App";
import {
  capNhatPhimUpload,
  layThongTinPhim,
  themPhimUploadHinh,
  xoaPhim,
} from "../../services/QuanLyPhimService";
import {
  LAY_THONG_TIN_PHIM,
} from "../types/QuanLyPhimTypes";
import { HomeListAction } from "./HomeListAction";

export const QuanLyPhimAction = (phim) => {
  return async (dispatch) => {
    try {
      await themPhimUploadHinh(phim);
      alert("Thêm phim thành công !");
      history.push('/admin/films')
      // console.log("themPhim", result);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await layThongTinPhim(maPhim);
      console.log(result);

      dispatch({
        type: LAY_THONG_TIN_PHIM,
        thongTinPhim: result.data.content,
      });
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await capNhatPhimUpload(formData);
      alert("Cập nhật phim thành công !");
      console.log("result", result.data.content);
      history.push("/admin/films");

    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await xoaPhim(maPhim);
      alert("Xóa phim thành công !");
      console.log("result", result.data.content);

      // Sau khi xóa, lấy lại danh sách phim
      dispatch(HomeListAction())
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};