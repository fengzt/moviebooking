import { IMG_CAROUSEL } from "../types/CarouselTypes";

const stateDefault = {
  arrImgCarousel: [
    {
      maBanner: 1,
      maPhim: 1282,
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png",
    },
  ],
};

export const CarouselReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case IMG_CAROUSEL: {
      state.arrImgCarousel = action.arrImgCarousel;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
