import { http } from "./baseService";

export class QuanLyNguoiDungService {
  layThongTinDangNhap = (thongTinDangNhap) => {
    return http.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  layThongTinNguoiDung = () => {
    return http.post(
      `/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
    );
  };
}

// export 1 đối tượng, không phải lớp đối tượng
const quanLyNguoiDungService = new QuanLyNguoiDungService();
export const { layThongTinDangNhap, layThongTinNguoiDung } = quanLyNguoiDungService;
