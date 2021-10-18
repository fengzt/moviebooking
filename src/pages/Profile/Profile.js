import { CustomCard } from "@tsamantanis/react-glassmorphism";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { history } from "../../App";
import { USER_LOGIN } from "../../ulti/setting";

export default function Profile(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login"/>;
  }
  return (
    <div
      style={{
        minHeight: "60vh",
        backgroundColor: "gray",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CustomCard
        style={{ paddingTop: "150px", minHeight: "60vh" }}
        effectColor="#C780FF" // required
        color="#f0f0f0" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="container">
          <div className="grid grid-cols-3 gap-4">
            <div className="justify-self-end">
              <img
                src="https://picsum.photos/200/200"
                alt="..."
                style={{ height: "290px", width: "200px" }}
              />
            </div>
            <div className="grid grid-cols-5 items-center">
              <div className="col-span-4">
                <h3 className="text-2xl text-gray-200 font-bold">
                  Xin chào {userLogin.taiKhoan} !
                </h3>
                <p className=" text-gray-200 font-medium text-justify">
                  Họ tên: {userLogin.hoTen}
                </p>
                <p className=" text-gray-200 font-medium text-justify">
                  Email: {userLogin.email}
                </p>
                <p className=" text-gray-200 font-medium text-justify">
                  Số điện thoại: {userLogin.soDT}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
}
