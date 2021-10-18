import { ThongTinDatVe } from "../_core/Models/ThongTinDatVe";
import { http } from "./baseService";

export class QuanLyDatVeService {
  layThongTinDatVe = (maLichChieu) => {
    return http.get(
      `/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`
    );
  };

  datVe = (thongTinDatVe = new ThongTinDatVe()) => {
    return http.post(`/api/QuanLyDatVe/DatVe`,thongTinDatVe);
  }
}

// export 1 đối tượng, không phải lớp đối tượng
const quanLyDatVeService = new QuanLyDatVeService();
export const { layThongTinDatVe, datVe } = quanLyDatVeService;
