import { GROUP_ID } from "../ulti/setting";
import { http } from "./baseService";

export class QuanLyRapService {
  layThongTinLichChieuHeThongRap = () => {
    return http.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
    );
  };
  layThongTinPhim = (maPhim) => {
    return http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };

  layThongTinHeThongRap = () => {
    return http.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };

  LayThongTinCumRapTheoHeThong = (maHeThongRap) => {
    return http.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`
    );
  };

  taoLichChieu = (thongTinLichChieu) => {
    return http.post(`/api/QuanLyDatVe/TaoLichChieu`,thongTinLichChieu);
  }
}

// export 1 đối tượng, không phải lớp đối tượng
const quanLyRapService = new QuanLyRapService();
export const {
  layThongTinLichChieuHeThongRap,
  layThongTinPhim,
  layThongTinHeThongRap,
  LayThongTinCumRapTheoHeThong,
  taoLichChieu,
} = quanLyRapService;
