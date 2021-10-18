import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import { Header } from "./Layout/Header/Header";
import { HeaderMobile } from "./Layout/Header/HeaderMobile";

export const HomeTemplate = (props) => {
  // Nhận vào 3 thuộc tính: Component, exact, path
  const [state, setState] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onload = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.onresize = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  },[]);

  // Đảm bảo khi vào trang, luôn scroll ở đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  })

  const { Component, ...restProps } = props; //restProps: path và exact

  const renderComponent = (propsRoute) => {
    if (state.width <= 782) {
      return <HeaderMobile />;
    }
    return <Header />;
  };
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute: props.match.params, props.history, props.location
        return (
          <Fragment>
            {renderComponent(propsRoute)}
            <Component {...propsRoute} />

            <Footer />
          </Fragment>
        );
      }}
    ></Route>
  );
};
