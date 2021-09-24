import { GROUP_ID } from "../ulti/setting";
import { http } from "./baseService";

export class QuanLyPhimService {
  layDanhSachBanner = () => {
    return http.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachPhim = () => {
    return http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
  };

}

// export 1 đối tượng, không phải lớp đối tượng
const quanLyPhimService = new QuanLyPhimService();
export const { layDanhSachBanner, layDanhSachPhim } = quanLyPhimService;