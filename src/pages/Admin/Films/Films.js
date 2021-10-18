import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { Input } from "antd";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { HomeListAction } from "../../../redux/actions/HomeListAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import { xoaPhimAction } from "../../../redux/actions/QuanLyPhimAction";

const { Search } = Input;

export default function Films(props) {
  const { arrPhimDefault } = useSelector((state) => state.HomeListReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = HomeListAction();
    dispatch(action);
  }, [dispatch]);

  //   console.log("arrPhimDefault", arrPhimDefault);

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["ascend", "descend"],
      width: "10%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      // text là dữ liệu đổ ra giao diện (lấy từ reducer)
      // text = "https://movienew.cybersoft.edu.vn/hinhanh/test-cap-nhat_gp10.jpg"
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.hinhAnh}
              style={{ width: "50px", height: "50px" }}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "15%",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["ascend", "descend"],
      width: "20%",
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "..."
              : film.moTa}
          </Fragment>
        );
      },

      width: "30%",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink key={1} to={`/admin/films/editfilm/${film.maPhim}`}>
              <button>
                <EditOutlined
                  className="text-2xl"
                  style={{ margin: "0 10px 0 5px", color: "green" }}
                />
              </button>
            </NavLink>
            <span style={{ cursor: "pointer" }}>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Bạn có chắc chắn muốn xóa phim ${film.tenPhim} ?`
                    )
                  ) {
                    dispatch(xoaPhimAction(film.maPhim));
                  }
                }}
              >
                <DeleteOutlined className="text-2xl" style={{ color: "red" }} />
              </button>
            </span>
            <NavLink key={2} to={`/admin/showtimes/${film.maPhim}`}>
              <span style={{ cursor: "pointer" }}>
                <button onClick={() => {
                  let thongTinPhim = JSON.stringify(film);
                  localStorage.setItem('thongTinPhim',thongTinPhim)
                }}>
                  <CalendarOutlined
                    className="text-2xl"
                    style={{ color: "blue", marginLeft: "10px" }}
                  />
                </button>
              </span>
            </NavLink>
          </Fragment>
        );
      },
      width: "25%",
    },
  ];

  const data = arrPhimDefault;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (value) => {
    dispatch(HomeListAction(value));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold">QUẢN LÝ PHIM</h3>
      <Button
        onClick={() => {
          history.push("/admin/films/addfilm");
        }}
        type="primary"
        style={{ margin: "20px 0px" }}
      >
        Thêm phim
      </Button>
      <br />
      <Search
        placeholder="input search text"
        size="large"
        enterButton={<SearchOutlined />}
        style={{ margin: "20px 0px" }}
        onSearch={onSearch}
      />
      <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey={"maPhim"}
      />
    </div>
  );
}
