import { Fragment, useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { USER_LOGIN } from "../../ulti/setting";
import { Redirect } from "react-router";

const BookingTemplate = (props) => {
  // Nhận vào 3 thuộc tính: Component, exact, path

  const { Component, ...restProps } = props; //restProps: path và exact

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" /> 
  }

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute: props.match.params, props.history, props.location
          return <Fragment>
            <Component {...propsRoute} />
        </Fragment>;
      }}
    ></Route>
  );
};

export default BookingTemplate;