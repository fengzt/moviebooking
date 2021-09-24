// import axios from "axios";
import { layDanhSachBanner } from "../../services/QuanLyPhimService";
import { IMG_CAROUSEL } from "../types/CarouselTypes";

export const SetCarouselAction = () => {
    return async dispatch => {
        try {
            const result = await layDanhSachBanner()
            console.log('banner',result)
            
            dispatch({
                type: IMG_CAROUSEL,
                arrImgCarousel: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}