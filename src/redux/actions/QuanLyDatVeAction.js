import { connection } from "../..";
import { datVe, layThongTinDatVe } from "../../services/QuanLyDatVeService";
import { ThongTinDatVe } from "../../_core/Models/ThongTinDatVe";

import {
  CHUYEN_TAB_DONE,
  DANG_THONG_TIN_DAT_VE,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  DAT_VE_REAL_TIME,
  LAY_THONG_TIN_DAT_VE,
} from "../types/QuanLyDatVeTypes";

import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const QuanLyDatVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await layThongTinDatVe(maLichChieu);
      console.log("ThongTinDatGhe", result);

      if (result.status == "200") {
        dispatch({
          type: LAY_THONG_TIN_DAT_VE,
          chiTietDatGhe: result.data.content,
        });
      }
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const DatVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
  return async (dispatch, getState) => {
    try {
      // Định nghĩa 1 action Loading riêng
      dispatch(displayLoadingAction);

      const result = await datVe(thongTinDatVe);
      console.log("ThongTinDatVe", result);

      if (result.status == "200") {
        dispatch({
          type: DAT_VE,
          thongTindatVe: result.data.content,
        });
      }

      // Người dùng: là người đang thao tác trên giao diện
      // Khách: là người đang thao tác ở 1 máy tính khác CÙNG 1 LÚC

      // Khách đặt vé thành công -> Gọi lại api Phòng vé ở giao diện Người dùng
      await dispatch(QuanLyDatVeAction(thongTinDatVe.maLichChieu));

      // Gọi case để Clear danhSachGheDangDat (Người dùng đặt)
      await dispatch({ type: DAT_VE_HOAN_TAT });

      // Gọi case để ẩn Loading
      await dispatch(hideLoadingAction);

      // Gọi connection báo server đã đặt vé thành công
      let { userLogin } = getState().QuanLyNguoiDungReducer;
      connection.invoke(
        "datGheThanhCong",
        userLogin.taiKhoan,
        thongTinDatVe.maLichChieu
      );

      // Gọi case để chuyển tab 2
      dispatch({ type: CHUYEN_TAB_DONE });

    } catch (error) {
      dispatch(hideLoadingAction);
      console.log("error", error);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  // Tham số getState tương ứng mapStateToProps và useSelector
  return async (dispatch,getState) => {
    
    // Đưa thông tin ghế lên reducer
    // Là 1 danhSachGheDangDat - 1 mảng
    await dispatch({
      type: DANG_THONG_TIN_DAT_VE,
      gheDangDat: ghe,
    });


    // Call api về backend (thông qua WebSockets - WS)
    // (1) Backend quy định cần 3 tham số cho hàm datGhe
    let { danhSachGheDangDat } = getState().QuanLyDatVeReducer;
    let { taiKhoan } = getState().QuanLyNguoiDungReducer.userLogin;
    console.log("dandanhSachGheDangDat", danhSachGheDangDat);
    console.log("taiKhoan", taiKhoan);
    console.log("maLichChieu", maLichChieu);
    
    // (2) Biến mảng thành chuỗi để chuẩn dữ liệu string do backend yêu cầu
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);


    // (3) Call api signalR về backend
    connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichChieu);
  }
}

export const datGheRealTimeAction = (arrGheKhachDat) => {
  return async (dispatch) => {
    await dispatch({
      type: DAT_VE_REAL_TIME,
      arrGheKhachDat,
    });
  }
}