import { history } from "../../App";
import {
  layThongTinDangNhap,
  layThongTinNguoiDung,
} from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION, LAY_THONG_TIN_NGUOI_DUNG_ACTION } from "../types/QuanLyNguoiDungTypes";

export const QuanLyNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await layThongTinDangNhap(thongTinDangNhap);
      console.log("ThongTinDangNhap", result);

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
      }
      history.goBack();
    } catch (error) {
      console.log("error", error.content);
    }
  };
};

export const LayThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await layThongTinNguoiDung();
      console.log("ThongTinNguoiDung", result);

      if (result.data.statusCode === 200) {
        dispatch({
          type: LAY_THONG_TIN_NGUOI_DUNG_ACTION,
          thongTinNguoiDung: result.data.content,
        });
      }

    } catch (error) {
      console.log("error", error.content);
    }
  };
};


