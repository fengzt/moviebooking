import { ACCESS_TOKEN, USER_LOGIN } from "../../ulti/setting";
import { ThongTinNguoiDung } from "../../_core/Models/ThongTinNguoiDung";
import {
  DANG_NHAP_ACTION,
  DANG_XUAT,
  LAY_THONG_TIN_NGUOI_DUNG_ACTION,
} from "../types/QuanLyNguoiDungTypes";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: user,
  thongTinNguoiDung: new ThongTinNguoiDung(),
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      state.userLogin = action.thongTinDangNhap;
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
      localStorage.setItem(ACCESS_TOKEN, action.thongTinDangNhap.accessToken);
      return { ...state };
    }

    case LAY_THONG_TIN_NGUOI_DUNG_ACTION: {
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };
    }

    case DANG_XUAT: {
      state.userLogin = {};
      localStorage.removeItem(USER_LOGIN);
      localStorage.removeItem(ACCESS_TOKEN);
      return { ...state };
    }
      
    default:
      return { ...state };
  }
};
