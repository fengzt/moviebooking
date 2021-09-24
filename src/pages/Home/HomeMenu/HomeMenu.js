import React, { useEffect } from "react";
import { Tabs } from "antd";
import { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HomeMenuAction } from "../../../redux/actions/HomeMenuAction";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

export default function HomeMenu(props) {
  const { arrHeThongRap } = useSelector((state) => state.HomeMenuReducer);
  const dispatch = useDispatch();

  const [tabPosition] = useState("left");

  useEffect(() => {
    const action = HomeMenuAction();
    dispatch(action);
  }, [dispatch]);

  const renderHeThongRap = () => {
    return arrHeThongRap.map((cumRap, index) => {
      return (
        // Load hệ thống rạp
        <TabPane
          key={index}
          tab={
            <img
              src={cumRap.logo}
              className="rounded-full w-8 h-8"
              alt={cumRap.logo}
            />
          }
        >
          {/* Load hệ thống cụm rạp */}
          <Tabs tabPosition={tabPosition}>
            {cumRap.lstCumRap?.map((rap, index) => {
              return (
                <TabPane
                  key={index}
                  tab={
                    <div className="flex items-center">
                      <img
                        src={rap.hinhAnh}
                        className="rounded-full w-8 h-8"
                        alt={rap.hinhAnh}
                      />
                      <p className="m-0 pl-1 text-lg">{rap.tenCumRap}</p>
                    </div>
                  }
                >
                  {/* Load danh sách phim */}
                  {rap.danhSachPhim?.map((phim, index) => {
                    return (
                      <div
                        className="flex mb-6 overflow-hidden items-center"
                        key={index}
                      >
                        <div className="mr-4 w-20 h-24">
                          <img
                            src={phim.hinhAnh}
                            alt={phim.hinhAnh}
                            className="w-full h-full"
                            onError={(e) => {
                              e.target.onError = null;
                              e.target.src = "https://picsum.photos/200/200";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl">{phim.tenPhim}</h3>
                          <p>{rap.diaChi}</p>
                          <div className="grid grid-cols-6 gap-6">
                            {phim.lstLichChieuTheoPhim
                              ?.slice(0, 6)
                              .map((lichChieu, index) => {
                                return (
                                  <div
                                    className="rounded-lg border px-1 py-2 text-center hover:bg-green-300"
                                    key={index}
                                  >
                                    <NavLink to="/">
                                      {moment(
                                        lichChieu.ngayChieuGioChieu
                                      ).format("h: mm: ss a")}
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
      );
    });
  };

  return (
    <Fragment>
      <Tabs tabPosition={tabPosition}>{renderHeThongRap()}</Tabs>
    </Fragment>
  );
}
