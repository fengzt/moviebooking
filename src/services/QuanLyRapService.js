import { GROUP_ID } from "../ulti/setting";
import { http } from "./baseService";

export class QuanLyRapService {
  layThongTinHeThongRap = () => {
    return http.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`
    );
  };
  layThongTinPhim = (maPhim) => {
    return http.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };
}

// export 1 đối tượng, không phải lớp đối tượng
const quanLyRapService = new QuanLyRapService();
export const { layThongTinHeThongRap, layThongTinPhim } = quanLyRapService;
