import {
  LAY_THONG_TIN_PHIM,
} from "../types/QuanLyPhimTypes";

const stateDefault = {
  thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case LAY_THONG_TIN_PHIM: {
      console.log("thongTinPhim", action.thongTinPhim);
      state.thongTinPhim = action.thongTinPhim;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
