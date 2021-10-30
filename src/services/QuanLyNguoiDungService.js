import { http } from "./baseService";
import { GROUP_ID } from "../ulti/setting";

export class QuanLyNguoiDungService {
  layThongTinDangNhap = (thongTinDangNhap) => {
    return http.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  dangKyNguoiDung = (thongTinDangKy) => {
    return http.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
  };

  layThongTinNguoiDung = () => {
    return http.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`);
  };

  layDanhSachNguoiDung = (tuKhoa = "") => {
    if (tuKhoa !== "") {
      return http.get(
        `/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUP_ID}&tuKhoa=${tuKhoa}`
      );
    }
    return http.get(
      `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP_ID}`
    );
  };

  themNguoiDung = (values) => {
    return http.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, values);
  };

  capNhatThongTinNguoiDung = (values) => {
    return http.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values);
  };

  xoaNguoiDung = (taiKhoan) => {
    return http.delete(
      `/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
  };
}

// export 1 đối tượng, không phải lớp đối tượng
const quanLyNguoiDungService = new QuanLyNguoiDungService();
export const {
  layThongTinDangNhap,
  layThongTinNguoiDung,
  layDanhSachNguoiDung,
  themNguoiDung,
  capNhatThongTinNguoiDung,
  xoaNguoiDung,
  dangKyNguoiDung,
} = quanLyNguoiDungService;
