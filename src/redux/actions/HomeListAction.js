import { layDanhSachPhim } from "../../services/QuanLyPhimService";
import {DANH_SACH_PHIM} from '../types/HomeListTypes'

export const HomeListAction = () => {
  return async (dispatch) => {
    try {
      const result = await layDanhSachPhim();
        console.log("DanhSachPhim", result);
        
        dispatch({
            type: DANH_SACH_PHIM,
            arrPhim: result.data.content
        })
    } catch (error) {
      console.log(error);
    }
  };
};
