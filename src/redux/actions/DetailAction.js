
import { layThongTinPhim } from "../../services/QuanLyRapService";
import { LAY_THONG_TIN_PHIM } from "../types/DetailTypes";

export const DetailAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await layThongTinPhim(maPhim);
      console.log("ThongTinPhim", result);  
      
      // call API thành công: check khi gọi action ở Component cần lấy giá trị, dùng useDispatch trong useEffect
      dispatch({
        type: LAY_THONG_TIN_PHIM,
        filmDetail: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
