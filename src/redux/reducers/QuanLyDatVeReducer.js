import { ThongTinDatGhe } from "../../_core/Models/ThongTinDatGhe";
import { ThongTinDatVe } from "../../_core/Models/ThongTinDatVe";
import {
  CHUYEN_TAB_DONE,
  CHUYEN_TAB_FLEXIBLE,
  DANG_THONG_TIN_DAT_VE,
  DAT_VE,
  DAT_VE_HOAN_TAT,
  DAT_VE_REAL_TIME,
  LAY_THONG_TIN_DAT_VE,
} from "../types/QuanLyDatVeTypes";

const stateDefault = {
  chiTietDatGhe: new ThongTinDatGhe(),
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [
    // {
    //   daDat: false,
    //   giaVe: 82000,
    //   loaiGhe: "Thuong",
    //   maGhe: 51411,
    //   maRap: 476,
    //   stt: "11",
    //   taiKhoanNguoiDat: null,
    //   tenGhe: "11",
    // },
  ],
  thongTinDatVe: new ThongTinDatVe(),
  tabActive: "1",
};

export const QuanLyDatVeReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_THONG_TIN_DAT_VE: {
      state.chiTietDatGhe = action.chiTietDatGhe;
      return { ...state };
    }

    case DANG_THONG_TIN_DAT_VE: {
      // Tạo mảng danhSachGheCapNhat để xét điều kiện có push vào danhSachGheDangDat không
      const danhSachGheCapNhat = [...state.danhSachGheDangDat];

      // Kiểm tra gheDangDat có hay không có trong mảng danhSachGheDangDat
      const indexGheDangDat = danhSachGheCapNhat.findIndex(
        (ghe) => ghe.maGhe === action.gheDangDat.maGhe
      );
      if (indexGheDangDat !== -1) {
        danhSachGheCapNhat.splice(indexGheDangDat, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDangDat);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    case DAT_VE: {
      state.thongTindatVe = action.thongTindatVe;
      return { ...state };
    }

    case DAT_VE_HOAN_TAT: {
      state.danhSachGheDangDat = [];
      return { ...state };
    }

    case CHUYEN_TAB_DONE: {
      state.tabActive = "2";
      return { ...state };
    }

    case CHUYEN_TAB_FLEXIBLE: {
      state.tabActive = action.number;
      return { ...state };
    }
      
    case DAT_VE_REAL_TIME: {
      state.danhSachGheKhachDat = action.arrGheKhachDat;
      return {...state}
    }  
    default:
      return { ...state };
  }
};
