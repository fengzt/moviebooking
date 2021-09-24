import {
  DANH_SACH_PHIM,
  PHIM_DANG_CHIEU,
  PHIM_SAP_CHIEU,
} from "../types/HomeListTypes";

const stateDefault = {
  arrPhim: [
    {
      maPhim: 1323,
      tenPhim: "test cập nhật",
      biDanh: "test-cap-nhat",
      trailer: "fsdfas",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/test-cap-nhat_gp10.jpg",
      moTa: "string",
      maNhom: "GP10",
      ngayKhoiChieu: "2001-02-12T00:00:00",
      danhGia: 8,
      hot: false,
      dangChieu: true,
      sapChieu: false,
    },
    {
      maPhim: 1338,
      tenPhim: "Fight for my way",
      biDanh: "fight-for-my-way",
      trailer: "https://www.youtube.com/embed/9l5KoxFqQZY",
      hinhAnh:
        "https://movienew.cybersoft.edu.vn/hinhanh/fight-for-my-way_gp10.jpg",
      moTa: "The story is about underdogs with big dreams and third-rate specs struggling to survive, and craving for success with a career they're underqualified for. A long time friendship is blossoming into romance between two immature friends Ko Dong-man (Park Seo-joon) and Choi Ae-ra (Kim Ji-won) whose childish dynamic hasn't changed despite reaching adulthood",
      maNhom: "GP10",
      ngayKhoiChieu: "2021-04-06T07:07:38.223",
      danhGia: 10,
      hot: true,
      dangChieu: false,
      sapChieu: true,
    },
  ],
  dangChieu: false,
  sapChieu: false,
  arrPhimDefault: [],
};

export const HomeListReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case DANH_SACH_PHIM: {
      state.arrPhim = action.arrPhim;
      state.arrPhimDefault = state.arrPhim;
      return { ...state };
    }

    case PHIM_DANG_CHIEU: {
      if (state.sapChieu === true) {
        state.sapChieu = !state.sapChieu;
      }
      state.dangChieu = !state.dangChieu;
      state.arrPhim = state.arrPhimDefault.filter(
        (phim) => phim.dangChieu === state.dangChieu
      );
      return { ...state };
    }

    case PHIM_SAP_CHIEU: {
      if (state.dangChieu === true) {
        state.dangChieu = !state.dangChieu;
      }
      state.sapChieu = !state.sapChieu;
      state.arrPhim = state.arrPhimDefault.filter(
        (phim) => phim.sapChieu === state.sapChieu
      );
      return { ...state };
    }
      
    default:
      return { ...state };
  }
};
