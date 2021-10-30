import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {SetCarouselAction} from '../../../redux/actions/CarouselAction'
import styleCarousel from "./HomeCarousel.module.css"

export default function HomeCarousel(props) {
  const { arrImgCarousel } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = SetCarouselAction("GP10");
    dispatch(action);
  }, [dispatch]);

  // console.log("arrImgCarousel", arrImgCarousel);

  const contentStyle = {
    // height: "600px",
    // color: "#fff",
    // lineHeight: "160px",
    // textAlign: "center",
    backgroundPosition: "center",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
  };

  const renderImg = () => {
    return arrImgCarousel.map((img, index) => {
      return (
        <div key={index}>
          <div
            className={`${styleCarousel["contentStyle"]}`}
            style={{ ...contentStyle, backgroundImage: `url(${img.hinhAnh})` }}
          >
            <img
              src={img.hinhAnh}
              className="w-full opacity-0"
              alt={img.hinhAnh}
            />
          </div>
        </div>
      );
    });
  };

  // autoplay autoplaySpeed="30" effect="fade-in"
  return (
    <Carousel className={`${styleCarousel["slick-dots-bottom"]}`}>
      {renderImg()}
    </Carousel>
  );
}
