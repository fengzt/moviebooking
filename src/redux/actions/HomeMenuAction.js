import { layThongTinHeThongRap } from "../../services/QuanLyRapService";
import { LAY_THONG_TIN_HE_THONG_RAP } from "../types/HomeMenuTypes";



export const HomeMenuAction = () => {
  return async (dispatch) => {
    try {
      const result = await layThongTinHeThongRap();
      console.log("ThongTinHeThongRap", result);

      dispatch({
        type: LAY_THONG_TIN_HE_THONG_RAP,
        arrHeThongRap: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
