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
    return <Phim arrPhim={arrPhim} state={props.state} />;
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 mx-auto pt-6 pb-20 lg:pt-12 lg:pb-24">
        {renderHomeList()}
      </div>
    </section>
  );
}
