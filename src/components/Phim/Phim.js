import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  PHIM_DANG_CHIEU,
  PHIM_SAP_CHIEU,
} from "../../redux/types/HomeListTypes";
import styleSlick from "./Phim.module.css";
import PhimFlip from "./PhimFlip";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-next"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

const Phim = (props) => {
  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector((state) => state.HomeListReducer);

  const { state } = props;

  const numberSlidesToShow = () => {
    if (state.width <= 576) {
      return 2;
    } else if (state.width <= 1024) {
      return 3;
    } else {
      return 4;
    }
  };

  const activeDangChieu =
    dangChieu === true
      ? `${styleSlick["active-home-list"]}`
      : `${styleSlick["none-active-home-list"]}`;
  const activeSapChieu =
    sapChieu === true
      ? `${styleSlick["active-home-list"]}`
      : `${styleSlick["none-active-home-list"]}`;

  const renderPhim = () => {
    // this.props.arrPhim.slice(0,12).map ... : để chỉnh hiển thị 12 phim thôi
    return props.arrPhim.map((phim, index) => {
      return (
        // Sử dụng style module để overwrite lại
        <div className="mr-2 mt-2" key={index}>
          {/* className={`${styleSlick["width-slick"]}`} */}
          {/* <div className="mr-2 h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <div
              style={{
                background: `url(${phim.hinhAnh}), url(https://picsum.photos/200/200)`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <img
                className="opacity-0 w-full"
                style={{ height: "200px" }}
                src={phim.hinhAnh}
                alt={phim.hinhAnh}
              />
            </div>
            <div className="p-4">
              <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                {phim.tenPhim}
              </h1>
              <p className="leading-relaxed mb-3" style={{ height: "44.8px" }}>
                {phim.moTa?.length > 95
                  ? phim.moTa.substr(0, 95) + "..."
                  : phim.moTa}
              </p>
              <div className="flex items-center justify-center flex-wrap ">
                <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                  Đặt vé xem phim
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div> */}
          <PhimFlip phim={phim} />
        </div>
      );
    });
  };

  // https://react-slick.neostack.com/
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: numberSlidesToShow(),
    speed: 500,
    rows: 1,
    slidesPerRow: 2,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div>
      <div className="flex">
        <button
          className={`${activeDangChieu} font-semibold rounded px-4 py-1 lg:px-8 lg:py-3`}
          onClick={() => {
            dispatch({ type: PHIM_DANG_CHIEU });
          }}
        >
          PHIM ĐANG CHIẾU
        </button>
        <button
          onClick={() => {
            dispatch({ type: PHIM_SAP_CHIEU });
          }}
          className={`${activeSapChieu} font-semibold ml-3 rounded px-4 py-1 lg:px-8 lg:py-3`}
        >
          PHIM SẮP CHIẾU
        </button>
      </div>

      <Slider {...settings} className={`${styleSlick["heightSlider"]}`}>
        {renderPhim()}
      </Slider>
    </div>
  );
};

export default Phim;
