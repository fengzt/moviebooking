import { ACCESS_TOKEN, USER_LOGIN } from "../../ulti/setting";
import { DANG_NHAP_ACTION } from "../types/QuanLyNguoiDungTypes";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault = {
  userLogin: user,
};

export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      state.userLogin = action.thongTinDangNhap;
      localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
      localStorage.setItem(ACCESS_TOKEN, action.thongTinDangNhap.accessToken);
      return { ...state };
    }
    default:
      return { ...state };
  }
};
