import { GROUP_ID } from "../ulti/setting";
import { http } from "./baseService";

export class QuanLyPhimService {
  layDanhSachBanner = () => {
    return http.get(`/api/QuanLyPhim/LayDanhSachBanner`);
  };

  layDanhSachPhim = (tenPhim = '') => {
    if (tenPhim != '') {
      return http.get(
        `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}&tenPhim=${tenPhim}`
      );
    }
    return http.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP_ID}`);
  };

  themPhimUploadHinh = (phim) => {
    return http.post(`/api/QuanLyPhim/ThemPhimUploadHinh`, phim);
  };

  layThongTinPhim = (maPhim) => {
    return http.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`);
  }

  capNhatPhimUpload = (formData) => {
    return http.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  }

  xoaPhim = (maPhim) => {
    return http.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`);
  }
}

// export 1 đối tượng, không phải lớp đối tượng
const quanLyPhimService = new QuanLyPhimService();
export const {
  layDanhSachBanner,
  layDanhSachPhim,
  themPhimUploadHinh,
  layThongTinPhim,
  capNhatPhimUpload,
  xoaPhim,
} = quanLyPhimService;
