import { http } from "./baseService";

export class QuanLyNguoiDungService {
  layThongTinDangNhap = (thongTinDangNhap) => {
    return http.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap);
  };
}

// export 1 đối tượng, không phải lớp đối tượng
const quanLyNguoiDungService = new QuanLyNguoiDungService();
export const { layThongTinDangNhap } = quanLyNguoiDungService;
