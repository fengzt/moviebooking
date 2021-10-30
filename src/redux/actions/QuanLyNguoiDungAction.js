import { history } from "../../App";
import {
  capNhatThongTinNguoiDung,
  dangKyNguoiDung,
  layDanhSachNguoiDung,
  layThongTinDangNhap,
  layThongTinNguoiDung,
  themNguoiDung,
  xoaNguoiDung,
} from "../../services/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  LAY_THONG_TIN_NGUOI_DUNG_ACTION,
  LAY_DANH_SACH_NGUOI_DUNG,
} from "../types/QuanLyNguoiDungTypes";

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
      console.log("error", error.response?.data);
    }
  };
};

export const LayDanhSachNguoiDungAction = (tuKhoa = "") => {
  return async (dispatch) => {
    try {
      const result = await layDanhSachNguoiDung(tuKhoa);

      console.log("DanhSachNguoiDung", result);

      dispatch({
        type: LAY_DANH_SACH_NGUOI_DUNG,
        arrNguoiDungDefault: result.data.content,
      });
    } catch (errors) {
      return console.log("errors", errors);
    }
  };
};

export const ThemNguoiDungAction = (values) => {
  return async (dispatch) => {
    try {
      const result = await themNguoiDung(values);
      console.log('result', result);
      alert('Thêm người dùng mới thành công !')
      history.push("/admin/users");
    } catch (errors) {
      console.log('errors',errors.response?.data)
    }
  }
}

export const CapNhatThongTinNguoiDungAction = (values) => {
  return async (dispatch) => {
    try {
      const result = await capNhatThongTinNguoiDung(values);
      console.log("result", result);
      alert("Cập nhập thông tin người dùng thành công !");
      history.push("/admin/users");
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const XoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await xoaNguoiDung(taiKhoan);
      console.log("result", result);
      alert("Xóa người dùng thành công !");
      dispatch(LayDanhSachNguoiDungAction())
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};

export const DangKyNguoiDungAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await dangKyNguoiDung(thongTinDangKy);
      console.log("result", result);
      alert("Đăng ký người dùng thành công !");
      history.push("/login")
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};