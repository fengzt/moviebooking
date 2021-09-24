import axios from "axios";
import { ACCESS_TOKEN, DOMAIN, TOKEN_CYBERSOFT } from "../ulti/setting";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 5000,
});

// interceptors
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      TokenCybersoft: TOKEN_CYBERSOFT,
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
    };
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

// --------- cấu hình khác
// export class baseServices {
//   // put Json về backEnd
//   put = (url, model) => {
//     return axios({
//       url: `${DOMAIN}/${url}`,
//       method: "PUT",
//       data: model,
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
//       },
//     });
//   };

//   post = (url, model) => {
//     return axios({
//       url: `${DOMAIN}/${url}`,
//       method: "POST",
//       data: model,
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
//       },
//     });
//   };

//   get = (url, model) => {
//     return axios({
//       url: `${DOMAIN}/${url}`,
//       method: "GET",
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
//       },
//     });
//   };

//   delete = (url, model) => {
//     return axios({
//       url: `${DOMAIN}/${url}`,
//       method: "DELETE",
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
//       },
//     });
//   };
// }
