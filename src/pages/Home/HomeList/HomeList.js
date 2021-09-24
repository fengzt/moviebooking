import React, { useEffect } from "react";
import { HomeListAction } from "../../../redux/actions/HomeListAction";
import { useSelector, useDispatch } from "react-redux";
import Phim from "../../../components/Phim/Phim";

export default function HomeList(props) {
  const { arrPhim } = useSelector((state) => state.HomeListReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = HomeListAction();
    dispatch(action);
  }, [dispatch]);

  // console.log(arrPhim)

  const renderHomeList = () => {
    return <Phim arrPhim={arrPhim} />;
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {renderHomeList()}
      </div>
    </section>
  );
}
