import { CustomCard } from "@tsamantanis/react-glassmorphism";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { USER_LOGIN } from "../../ulti/setting";
import styleProfile from "./Profile.module.css"

export default function Profile(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login"/>;
  }
  return (
    <div className={`${styleProfile["common"]}`}>
      <CustomCard
        style={{ paddingTop: "150px", minHeight: "60vh" }}
        effectColor="#C780FF" // required
        color="#f0f0f0" // default color is white
        blur={20} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="container">
          <div className="sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <div className="justify-self-end">
              <img
                src="https://picsum.photos/200/200"
                alt="..."
                className={`${styleProfile["ava"]}`}
              />
            </div>
            <div className="text-center sm:grid sm:grid-cols-5 sm:items-center">
              <div className="col-span-4">
                <h3 className="text-gray-200 font-bold text-lg sm:text-2xl sm:text-justify">
                  Xin chào {userLogin.taiKhoan} !
                </h3>
                <p className=" text-gray-200 font-medium sm:text-justify">
                  Họ tên: {userLogin.hoTen}
                </p>
                <p className=" text-gray-200 font-medium sm:text-justify">
                  Email: {userLogin.email}
                </p>
                <p className=" text-gray-200 font-medium sm:text-justify">
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
