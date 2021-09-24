import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { CarouselReducer } from "./reducers/CarouselReducer";
import { DetailReducer } from "./reducers/DetailReducer";
import { HomeListReducer } from "./reducers/HomeListReducer";
import { HomeMenuReducer } from "./reducers/HomeMenuReducer";
import { QuanLyNguoiDungReducer } from "./reducers/QuanLyNguoiDungReducer";
const rootReducer = combineReducers({
  // state ứng dụng
  CarouselReducer,
  HomeListReducer,
  HomeMenuReducer,
  DetailReducer,
  QuanLyNguoiDungReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
