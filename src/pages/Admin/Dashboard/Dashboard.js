import React, { Fragment, useEffect } from "react";
import { Button, Table } from "antd";
import { Input } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import { LayDanhSachNguoiDungAction, XoaNguoiDungAction } from "../../../redux/actions/QuanLyNguoiDungAction";

const { Search } = Input;

export default function Films(props) {
  const { arrNguoiDungDefault } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const action = LayDanhSachNguoiDungAction();
    dispatch(action);
  }, [dispatch]);

  console.log("arrNguoiDungDefault", arrNguoiDungDefault);

  // Thêm index để làm rowKey có key riêng biệt mỗi hàng
  let arrND = [];
  for (let i = 0; i < arrNguoiDungDefault.length; i++){
    let user = { ...arrNguoiDungDefault[i], maNguoiDung: i }
    arrND.push(user);
  }

  console.log('arrND', arrND);
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },

    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      // text là dữ liệu đổ ra giao diện (lấy từ reducer)
      // text = "https://movienew.cybersoft.edu.vn/hinhanh/test-cap-nhat_gp10.jpg"
      render: (text, nguoiDung, index) => {
        return (
          <Fragment>
            <img
              src={`https://picsum.photos/id/${index}/50/50`}
              alt={`https://picsum.photos/id/${index}/50/50`}
              style={{ width: "50px", height: "50px" }}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/1/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "10%",
    },
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["ascend", "descend"],
      width: "15%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["ascend", "descend"],

      width: "20%",
    },
    {
      title: "Mã Loại Người Dùng",
      dataIndex: "maLoaiNguoiDung",
      sorter: (a, b) => {
        let mlndA = a.maLoaiNguoiDung.toLowerCase().trim();
        let mlndB = b.maLoaiNguoiDung.toLowerCase().trim();
        if (mlndA > mlndB) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["ascend", "descend"],

      width: "20%",
    },
    {
      title: "Hành Động",
      dataIndex: "hanhDong",
      render: (text, nguoiDung) => {
        return (
          <Fragment>
            <NavLink
              key={2000}
              to={`/admin/users/edituser/${nguoiDung.taiKhoan}`}
            >
              <button>
                <EditOutlined
                  className="text-2xl"
                  style={{ margin: "0 10px 0 5px", color: "green" }}
                />
              </button>
            </NavLink>
            <span key={2001} style={{ cursor: "pointer" }}>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      `Bạn có chắc chắn muốn xóa tài khoản ${nguoiDung.taiKhoan} ?`
                    )
                  ) {
                    dispatch(XoaNguoiDungAction(nguoiDung.taiKhoan));
                  }
                }}
              >
                <DeleteOutlined className="text-2xl" style={{ color: "red" }} />
              </button>
            </span>
          </Fragment>
        );
      },
      width: "15%",
    },
  ];

  const data = arrND;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const onSearch = (value) => {
    dispatch(LayDanhSachNguoiDungAction(value));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold">QUẢN LÝ NGƯỜI DÙNG</h3>
      <Button
        onClick={() => {
          history.push("/admin/users/adduser");
        }}
        type="primary"
        style={{ margin: "20px 0px" }}
      >
        Thêm người dùng
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
        rowKey={"maNguoiDung"}
      />
    </div>
  );
}
