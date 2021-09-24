import { LAY_THONG_TIN_PHIM } from "../types/DetailTypes";

const stateDefault = {
    filmDetail:{},
}

export const DetailReducer = (state = stateDefault,action)=> {
    switch (action.type) {
        case (LAY_THONG_TIN_PHIM): {
            state.filmDetail = action.filmDetail;
            return {...state}
        }

        default: return { ...state };
    }
}