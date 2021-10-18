import { layDanhSachPhim } from "../../services/QuanLyPhimService";
import {DANH_SACH_PHIM} from '../types/HomeListTypes'

export const HomeListAction = (tenPhim='') => {
  return async (dispatch) => {
    try {
      const result = await layDanhSachPhim(tenPhim);
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
