import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);

  return isLoading ? (
    <Fragment>
      <div
        className="w-full h-full fixed top-0 left-0 flex justify-center items-center text-center z-10"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="text-4xl text-white">Loading...</div>
      </div>
    </Fragment>
  ) : (
    ""
  );
}
