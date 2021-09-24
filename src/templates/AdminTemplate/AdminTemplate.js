import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
  // Nhận vào 3 thuộc tính: Component, exact, path

  const { Component, ...restProps } = props; //restProps: path và exact

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute: props.match.params, props.history, props.location
          return <Fragment>
              AdminTemplate
          </Fragment>;
      }}
    ></Route>
  );
};
