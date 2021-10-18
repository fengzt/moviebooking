import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { DetailReducer } from "./reducers/DetailReducer";
import { HomeListReducer } from "./reducers/HomeListReducer";
import { HomeMenuReducer } from "./reducers/HomeMenuReducer";
import { LoadingReducer } from "./reducers/LoadingReducer";
import { QuanLyDatVeReducer } from "./reducers/QuanLyDatVeReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
import { QuanLyPhimReducer } from "./reducers/QuanLyPhimReducer";

const rootReducer = combineReducers({
  // state ứng dụng
  CarouselReducer,
  HomeListReducer,
  HomeMenuReducer,
  DetailReducer,
  QuanLyNguoiDungReducer,
  QuanLyDatVeReducer,
  LoadingReducer,
  QuanLyPhimReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
