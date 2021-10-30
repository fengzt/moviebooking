import React from "react";
import "../../../src/assets/Styles/Phim/PhimFlip.css";
import { PlayCircleOutlined } from "@ant-design/icons";
import {NavLink} from 'react-router-dom'


// https://www.w3schools.com/howto/howto_css_flip_card.asp

export default function PhimFlip(props) {
  const {phim} = props
  const renderPhimFlip = () => {
    return (
      <div className="flip-card mt-2">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <img
              src={phim.hinhAnh}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = "https://picsum.photos/200/200";
              }}
              alt={phim.hinhAnh}
            />
          </div>
          <div
            className="flip-card-back"
            style={{
              position: "relative",
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0 }}>
              <img
                src={phim.hinhAnh}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = "https://picsum.photos/200/200";
                }}
                alt={phim.hinhAnh}
              />
            </div>
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                position: "absolute",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <div>
                <div className="rounded-full cursor-pointer">
                  <PlayCircleOutlined className="playCircle" />
                </div>
                <div className="mt-2 font-bold text-sm lg:text-2xl">{phim.tenPhim}</div>
              </div>
            </div>
          </div>
        </div>
        <NavLink
          to={`/detail/${phim.maPhim}`}
          className="block bg-orange-400 text-center cursor-pointer bg-indigo-300 text-success-50 font-bold my-2 py-2 text-xs md:text-sm"
        >
          Đặt vé ngay !
        </NavLink>
      </div>
    );
  }
  return renderPhimFlip();
}
