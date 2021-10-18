import React from "react";
import ReactDOM from "react-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import "antd/dist/antd.css";

// npm i @aspnet/signalr : set up SignalR từ ASP
import * as signalR from "@aspnet/signalr";
import { DOMAIN } from "./ulti/setting";

// import i18n : translation
import './i18n';

// Đoạn code để kết nối với Server -> Lắng nghe sự kiện từ Server
// Có cài đặt ở file booking.js
export const connection = new signalR.HubConnectionBuilder()
  .withUrl(`${DOMAIN}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();

// Vì connection là hàm bất đồng bộ nên cần đảm bảo đã kết nối Server mới render ra giao diện
connection
  .start()
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  })
  .catch((errors) => {
    console.log("errors", errors);
  });

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
