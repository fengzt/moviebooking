import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  datGheAction,
  datGheRealTimeAction,
  DatVeAction,
  QuanLyDatVeAction,
} from "../../redux/actions/QuanLyDatVeAction";
import style from "./Booking.module.css";
import "../../assets/Styles/Seats/Seats.css";
import {
  CloseCircleOutlined,
  MehOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { CHUYEN_TAB_FLEXIBLE } from "../../redux/types/QuanLyDatVeTypes";
import _ from "lodash";
import { ThongTinDatVe } from "../../_core/Models/ThongTinDatVe";
import { Tabs } from "antd";
import moment from "moment";
import { LayThongTinNguoiDungAction } from "../../redux/actions/QuanLyNguoiDungAction";
import { connection } from "../..";
import { DANG_XUAT } from "../../redux/types/QuanLyNguoiDungTypes";
import { history } from "../../App";

// filter shadow css

// Tab 1: Booking
export function Booking(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { chiTietDatGhe, danhSachGheDangDat, danhSachGheKhachDat } =
    useSelector((state) => state.QuanLyDatVeReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = QuanLyDatVeAction(props.match.params.id);
    dispatch(action);

    // Có cài đặt ở index.js
    // Cài đặt sự kiện lắng nghe server khi có 1 client đã đặt ghế thành công
    // Khi đó, danhSachGheKhachDat sẽ được cập nhật -> ghế khách đặt sẽ có class gheKhachDat
    // Hàm "datVeThanhCong" được định nghĩa trên Server (BackEnd định nghĩa)
    connection.on("datVeThanhCong", () => {
      dispatch(action);
    });

    // Load danhSachGheKhachDat ngay khi vừa vào trang booking
    // invoke để gửi dữ liệu về server
    connection.invoke("loadDanhSachGhe", props.match.params.id);

    // Load danhSachGheDangDat từ server về
    // Ở dạng real-time, load liên tục -> lắng nghe từ Server ở các client
    // on để lắng nghe thông báo từ server
    connection.on("loadDanhSachGheDaDat", (dsGheKhachDat) => {
      console.log("danhSachGheKhachDat", dsGheKhachDat);

      // (1) Loại userLogin ra khỏi mảng danhSachGheKhachDat
      dsGheKhachDat = dsGheKhachDat.filter(
        (item) => item.taiKhoan !== userLogin.taiKhoan
      );
      console.log("dsGheKhachDat", dsGheKhachDat);

      // (2) Gộp all danhSachGhe của các khách vào 1 mảng
      // Dùng redux
      let arrGheKhachDat = dsGheKhachDat.reduce((result, item, index) => {
        let arrGhe = JSON.parse(item.danhSachGhe);
        return [...result, ...arrGhe];
      }, []);

      console.log("arrGheKhachDat", arrGheKhachDat);

      // 2* Check trùng maGhe, tránh trùng nhau
      arrGheKhachDat = _.uniqBy(arrGheKhachDat, "maGhe");

      // (3) dispatch dữ liệu lên redux
      const action = datGheRealTimeAction(arrGheKhachDat);
      dispatch(action);
    });

    // ---
    // Cài đặt sự kiện khi reload trang booking
    window.addEventListener("beforeunload", clearGhe);

    return () => {
      clearGhe();
      window.removeEventListener("beforeunload", clearGhe);
    };
    
  }, [dispatch, props.match.params.id]);

  const clearGhe = (event) => {
    // Gọi từ backEnd => dùng invoke
    connection.invoke("huyDat", userLogin.taiKhoan, props.match.params.id);
  };

  const { danhSachGhe, thongTinPhim } = chiTietDatGhe;

  // console.log("chiTietDatGhe", chiTietDatGhe);
  console.log("danhSachGheDangDat", danhSachGheDangDat);
  // console.log("userLogin", userLogin);

  const renderGhe = () => {
    return danhSachGhe.map((ghe, index) => {
      let classGheDaDat = ghe.daDat ? "gheDaDat" : "";
      let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDangDat = "";
      let classGheKhachDat = "";
      let classGheNguoiDungDat = "";

      // Ghế người dùng đã đặt
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheNguoiDungDat = "gheNguoiDungDat";
      }

      // Ghế khách đặt
      const indexGheKhachDat = danhSachGheKhachDat.findIndex(
        (gheKhachDat) => gheKhachDat.maGhe === ghe.maGhe
      );

      if (indexGheKhachDat !== -1) {
        classGheKhachDat = "gheKhachDat";
      }

      // Ghế đang đặt
      const indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === ghe.maGhe
      );

      if (indexGheDangDat !== -1) {
        classGheDangDat = "gheDangDat";
      }

      return (
        <Fragment key={index}>
          {
            <button
              onClick={() => {
                const action = datGheAction(ghe, props.match.params.id);
                dispatch(action);
              }}
              disabled={ghe.daDat || classGheKhachDat !== ""}
              className={`ghe ${classGheDaDat} ${classGheVip} ${classGheDangDat} ${classGheNguoiDungDat} ${classGheKhachDat}`}
            >
              {ghe.daDat ? (
                classGheNguoiDungDat !== "" ? (
                  <UserOutlined style={{ fontSize: "1.25rem" }} />
                ) : (
                  <CloseCircleOutlined style={{ fontSize: "1.25rem" }} />
                )
              ) : classGheKhachDat !== "" ? (
                <MehOutlined style={{ fontSize: "1.25rem" }} />
              ) : (
                ghe.stt
              )}
            </button>
          }
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-9 mx-12 mt-2">
          {/* Div cho màn hình */}
          <div className="">
            <div className={`${style["rectangle"]} w-full`}></div>
            <div className={`${style["trapezoid"]} w-full text-center`}>
              <p className="pt-2 text-gray-400 font-bold tracking-widest">
                MÀN HÌNH
              </p>
            </div>
          </div>

          {/* Div cho ghế */}
          <div className="text-center">{renderGhe()}</div>

          {/* div chú thích */}
          <div className="my-2 text-center mx-12">
            <table className="table-fixed min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 p-5">
                <tr>
                  <th className="w-1/7">Ghế đã đặt</th>
                  <th className="w-1/7">Ghế thường</th>
                  <th className="w-1/7">Ghế Vip</th>
                  <th className="w-1/7">Ghế {userLogin.hoTen} đặt</th>
                  <th className="w-1/7">Ghế Khách đặt</th>
                  <th className="w-1/7">Ghế thường đang đặt</th>
                  <th className="w-1/7">Ghế Vip đang đặt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button className="ghe gheDaDat" style={{ cursor: "auto" }}>
                      <CloseCircleOutlined style={{ fontSize: "1.25rem" }} />
                    </button>
                  </td>
                  <td>
                    <button className="ghe" style={{ cursor: "auto" }}></button>
                  </td>
                  <td>
                    <button
                      className="ghe gheVip"
                      style={{ cursor: "auto" }}
                    ></button>
                  </td>

                  <td>
                    <button
                      className="ghe gheNguoiDungDat"
                      style={{ cursor: "auto" }}
                    >
                      <UserOutlined style={{ fontSize: "1.25rem" }} />
                    </button>
                  </td>

                  <td>
                    <button
                      className="ghe gheKhachDat"
                      style={{ cursor: "auto" }}
                    >
                      <MehOutlined style={{ fontSize: "1.25rem" }} />
                    </button>
                  </td>

                  <td>
                    <button
                      className="ghe gheDangDat"
                      style={{ cursor: "auto" }}
                    ></button>
                  </td>
                  <td>
                    <button
                      className="ghe gheVip gheDangDat"
                      style={{ cursor: "auto" }}
                    ></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={`${style["rightSide"]} col-span-3`}>
          <div className="mx-3">
            <p className="text-center text-green-500 font-bold mt-3 text-3xl">
              {danhSachGheDangDat
                .reduce((tongTien, ghe) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}{" "}
              đ
            </p>
            <hr />
            <div className="mt-3">
              <p className="text-xl font-bold">{thongTinPhim.tenPhim}</p>
              <p>Địa điểm: {thongTinPhim.tenCumRap}</p>
              <p>
                Ngày chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}{" "}
                || {thongTinPhim.tenRap}
              </p>
            </div>
            <hr />

            <div className="mt-3">
              <table className="table-fixed min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="text-left">
                      <p className="text-red-500">Ghế</p>
                    </th>
                    <th className="text-right">
                      <p>
                        {" "}
                        {danhSachGheDangDat
                          .reduce((tongTien, ghe) => {
                            return (tongTien += ghe.giaVe);
                          }, 0)
                          .toLocaleString()}{" "}
                        đ
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render danhSachGheDangDat của người dùng */}
                  {_.sortBy(danhSachGheDangDat, ["maGhe"]).map((ghe, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-left">{ghe.stt}</td>
                        <td className="text-right">
                          {ghe.giaVe.toLocaleString()} đ
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <hr />
            <div className="mt-3">
              <p className="">Email</p>
              <p>{userLogin.email}</p>
            </div>
            <hr />
            <div className="mt-3">
              <p className="">Phone</p>
              <p>{userLogin.soDT}</p>
            </div>
            <hr />
          </div>
          <div className={`${style["booking"]} mb-0 flex flex-col justify-end`}>
            <button
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = props.match.params.id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                const action = DatVeAction(thongTinDatVe);
                dispatch(action);
              }}
            >
              <div className="text-center w-full bg-green-500 text-white font-bold py-3">
                ĐẶT VÉ
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tab 2 - ResultBooking
// https://lodash.com/docs/4.17.15#head - Dùng _.first(array.property-first-seen)
export function ResultBooking(props) {
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const action = LayThongTinNguoiDungAction();
    dispatch(action);
  }, [dispatch]);

  console.log("thongTinNguoiDung", thongTinNguoiDung);

  const renderLichSuVe = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ve, index) => {
      const seats = _.first(ve.danhSachGhe);

      return (
        <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
          <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
            <img
              className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
              src={ve.hinhAnh}
              alt={ve.hinhAnh}
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 title-font font-medium">
                <span>{ve.tenPhim}</span>
                <br />
                <span>{seats.tenHeThongRap}</span>
                <span> - {seats.tenCumRap}</span>
              </h2>
              <p className="text-gray-500">
                Giờ chiếu: {moment(ve.ngayDat).format("hh:mm a")} - Ngày chiếu:{" "}
                {moment(ve.ngayDat).format("DD-MM-YYYY")}
              </p>
              <p className="text-gray-500">
                Ghế đã đặt:{" "}
                {_.sortBy(ve.danhSachGhe, ["maGhe"]).map((ghe, index) => {
                  return (
                    <span key={index} className="text-red-300 font-bold">
                      [ {ghe.tenGhe} ]{" "}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mt-5 ml-5">
      <section className="text-gray-600 body-font">
        <div className="container p-5 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-purple-900">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Hãy xem lại thông tin địa điểm và thời gian đã đặt vé. Chúc bạn
              xem phim vui vẻ !
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderLichSuVe()}</div>
        </div>
      </section>
    </div>
  );
}

// Control Tab
const { TabPane } = Tabs;

export function BookingPage(props) {
  const { tabActive } = useSelector((state) => state.QuanLyDatVeReducer);
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const dispatch = useDispatch();

  // Để khi thoát trang, vào lại mặc định là tab 1
  useEffect(() => {
    return dispatch({
      type: CHUYEN_TAB_FLEXIBLE,
      number: "1",
    });
  }, []);

  const operations = (
    <Fragment>
      <div className="pr-24 text-center">
        <NavLink to="/profile">
          <img
            src="https://picsum.photos/200/200"
            width={50}
            height={50}
            className="rounded-xl inline"
            alt={userLogin.hoTen}
          />
        </NavLink>
        <button
          onClick={() => {
            dispatch({ type: DANG_XUAT });
            history.push("/login");
          }}
          className="block bg-green-300 rounded pl-2 pr-2 leading-6 text-white"
        >
          Đăng xuất
        </button>
      </div>
    </Fragment>
  );
  return (
    <div className="card-container mt-5 ml-5">
      <Tabs
        tabBarExtraContent={operations}
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch({
            type: CHUYEN_TAB_FLEXIBLE,
            number: key.toString(),
          });
        }}
        className="p-5"
      >
        <TabPane tab="01. CHỌN VÉ - THANH TOÁN" key="1">
          <Booking {...props} />
        </TabPane>
        <TabPane tab="02. KẾT QUẢ DẶT VÉ" key="2">
          <ResultBooking />
        </TabPane>
        <TabPane
          tab={
            <div>
              <NavLink to="/">
                <HomeOutlined
                  style={{
                    marginRight: "0",
                    textAlign: "center",
                    fontSize: "30px",
                  }}
                />
              </NavLink>
            </div>
          }
          key="3"
        ></TabPane>
      </Tabs>
    </div>
  );
}
