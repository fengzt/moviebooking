import { LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP } from "../types/HomeMenuTypes";

const stateDefault = {
    arrHeThongRap: [],
}

export const HomeMenuReducer = (state = stateDefault, action) => {
    switch (action.type) {
      case LAY_THONG_TIN_LICH_CHIEU_HE_THONG_RAP: {
        state.arrHeThongRap = action.arrHeThongRap;
        return { ...state };
      }

      default:
        return { ...state };
    }
}