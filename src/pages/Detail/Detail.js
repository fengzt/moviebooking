import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
// import { styleDetail } from "../../assets/Styles/Detail/Detail.css";
import "../../assets/Styles/Cirle/Circle.css";

// https://github.com/tsamantanis/react-glassmorphism
// keyword: glassmorphism

import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { DetailAction } from "../../redux/actions/DetailAction";
import { HomeMenuAction } from "../../redux/actions/HomeMenuAction";
import { HomeListAction } from "../../redux/actions/HomeListAction";

import moment from "moment";
import { Rate } from "antd";
import { NavLink } from "react-router-dom";
// http://circle.firchow.net/
// Tạo hiệu ứng vòng tròn quá trình
// keyword: rating circle css

let activeTab = "";

function callback(key) {
  console.log(key);
}

function Detail(props) {
  const { filmDetail } = useSelector((state) => state.DetailReducer);
  const dispatch = useDispatch();
  const [tabPosition] = useState("left");

  // dispatch lấy thông tin hệ thống rạp: để footer hiển thị
  useEffect(() => {
    const action = HomeMenuAction();
    dispatch(action);
  }, [dispatch]);

  // dispatch lấy thông tin danh sách phim: để footer hiển thị
  useEffect(() => {
    const action = HomeListAction();
    dispatch(action);
  }, [dispatch]);

  // dispatch lấy thông tin chi tiết phim
  useEffect(() => {
    const { id } = props.match.params;
    const action = DetailAction(id);
    dispatch(action);
  }, [dispatch, props.match.params]);

  // if ((key = activeKey)) {
  //   activeTab = "border border-b-0 rounded-t-lg";
  // }

  const { TabPane } = Tabs;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${filmDetail.hinhAnh})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CustomCard
        style={{ paddingTop: "150px", minHeight: "100vh" }}
        effectColor="#C780FF" // required
        color="#f0f0f0" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="container">
          <div className="grid grid-cols-3 gap-4">
            <div className="justify-self-end">
              <img
                src={filmDetail.hinhAnh}
                alt="..."
                style={{ height: "300px", width: "200px" }}
              />
            </div>
            <div className="grid grid-cols-5 items-center">
              <div className="col-span-4">
                <p>
                  Ngày chiếu:{" "}
                  {moment(filmDetail.ngayKhoiChieu).format("DD.MM.YYYY")}
                </p>
                <h3 className="text-2xl text-gray-200 font-bold">
                  {filmDetail.tenPhim}
                </h3>
                <p className=" text-gray-200 font-medium text-justify">
                  {filmDetail.moTa?.length > 150
                    ? filmDetail.moTa.substr(0, 150) + "..."
                    : filmDetail.moTa}
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className={`c100 p${filmDetail.danhGia * 10} big`}>
                <span style={{ color: "#fadb14" }}>{filmDetail.danhGia}</span>
                <div className="slice">
                  <div className="bar"></div>
                  <div className="fill"></div>
                </div>
              </div>
              <div
                className="absolute font-bold"
                style={{ top: "24rem", right: "22.5rem" }}
              >
                <p className="m-0">Đánh giá</p>
                <Rate />
              </div>
            </div>
          </div>
        </div>

        {/* tab information */}
        <div className="mx-80" style={{ minHeight: "300px" }}>
          <div
            style={{ minHeight: "300px" }}
            className="flex -mx-4 overflow-x-auto overflow-y-hidden sm:justify-center text-gray-800 mt-12 bg-white"
          >
            <Tabs
              onChange={callback}
              centered="true"
              style={{ justifyContent: "center" }}
            >
              <TabPane
                style={{ minWidth: "500px" }}
                tab={
                  <div
                    className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-coolGray-900 ${activeTab}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>Lịch chiếu</span>
                  </div>
                }
                key="1"
              >
                <Tabs tabPosition={tabPosition}>
                  {filmDetail.heThongRapChieu?.map((cumRap, index) => {
                    // return console.log('cumRap',cumRap);
                    return (
                      <TabPane
                        tab={
                          <img
                            src={cumRap.logo}
                            alt={cumRap.logo}
                            className="rounded w-8 h-8"
                          />
                        }
                        key={index}
                      >
                        {cumRap.cumRapChieu?.map((rap, index) => {
                          return (
                            <div
                              className="flex mb-6 overflow-hidden items-center"
                              key={index}
                            >
                              <div className="mr-4 w-20 h-24">
                                <img
                                  src={rap.hinhAnh}
                                  alt={rap.hinhAnh}
                                  className="w-full h-full"
                                  onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src =
                                      "https://picsum.photos/200/200";
                                  }}
                                />
                              </div>
                              <div>
                                <h3 className="text-xl">{rap.tenCumRap}</h3>
                                <p>{rap.diaChi}</p>
                                <div className="grid grid-cols-3 gap-3">
                                  {rap.lichChieuPhim
                                    ?.slice(0, 6)
                                    .map((lichChieu, index) => {
                                      return (
                                        <div
                                          className="rounded-lg border px-1 py-2 text-center hover:bg-green-300"
                                          key={index}
                                        >
                                          <NavLink
                                            to={`/booking/${lichChieu.maLichChieu}`}
                                          >
                                            {moment(
                                              lichChieu.ngayChieuGioChieu
                                            ).format("DD.MM.YYYY h: mm: ss a")}
                                          </NavLink>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </TabPane>
                    );
                  })}
                </Tabs>
              </TabPane>
              <TabPane
                tab={
                  <div
                    className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-coolGray-900 ${activeTab}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    <span>Thông tin</span>
                  </div>
                }
                key="2"
              ></TabPane>
              <TabPane
                tab={
                  <div
                    className={`flex items-center flex-shrink-0 px-5 py-3 space-x-2 text-coolGray-900 ${activeTab}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>Đánh giá</span>
                  </div>
                }
                key="3"
              ></TabPane>
            </Tabs>
          </div>
        </div>
        {/* ----------------------- */}
        {/* Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane> */}
      </CustomCard>
    </div>
  );
  //   });
}

export default Detail;
