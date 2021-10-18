import { Fragment, useEffect, useState } from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { DANG_XUAT } from "../../redux/types/QuanLyNguoiDungTypes";
import { history } from "../../App";
import { USER_LOGIN } from "../../ulti/setting";
import "../../assets/Styles/Admin/Admin.css";
import SubMenu from "antd/lib/menu/SubMenu";

export const AdminTemplate = (props) => {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const dispatch = useDispatch();

  // Đảm bảo khi vào trang, luôn scroll ở đầu trang
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/" />;
  }

  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang này !");
    return <Redirect to="/" />;
  }

  const { Header, Content, Footer, Sider } = Layout;
  // const { SubMenu } = Menu;

  const operations = (
    <Fragment>
      <div className="justify-end pr-24 flex items-center">
        <NavLink to="/profile">
          <img
            src="https://picsum.photos/200/200"
            width={50}
            height={50}
            className="mr-4 rounded-xl inline"
            alt={userLogin.hoTen}
          />
        </NavLink>
        <button
          onClick={() => {
            dispatch({ type: DANG_XUAT });
            history.push("/login");
          }}
          className="bg-green-300 rounded px-2 flex items-center h-8 text-white"
        >
          Đăng xuất
        </button>
      </div>
    </Fragment>
  );

  // Nhận vào 3 thuộc tính: Component, exact, path
  const { Component, ...restProps } = props; //restProps: path và exact

  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute: props.match.params, props.history, props.location
        return (
          <Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo">
                  <NavLink
                    to="/"
                    aria-label="Back to homepage"
                    className="flex items-center p-6 justify-center"
                  >
                    <img
                      className="w-16 h-16"
                      src="https://i.imgur.com/lC22izJ.png"
                      alt="logo"
                    />
                  </NavLink>
                </div>
                <Menu
                  theme="dark"
                  defaultSelectedKeys={["2"]}
                  defaultOpenKeys={["1"]}
                  mode="inline"
                >
                  <SubMenu key="1" icon={<UserOutlined />} title="Users">
                    <Menu.Item key="2" icon={<UserOutlined />}>
                      <NavLink to="/admin/users">Manage User</NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                      <NavLink to="/admin/users/adduser">Add User</NavLink>
                    </Menu.Item>
                  </SubMenu>

                  <SubMenu key="4" icon={<FileOutlined />} title="Films">
                    <Menu.Item key="5" icon={<FileOutlined />}>
                      <NavLink to="/admin/films">Manage Films</NavLink>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<FileOutlined />}>
                      <NavLink to="/admin/films/addfilm">Add Film</NavLink>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div className="text-right pt-1">{operations}</div>
                </Header>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                  </Breadcrumb>
                  <div
                    className="site-layout-background"
                    style={{ padding: 24, minHeight: "85vh" }}
                  >
                    <Component {...propsRoute} />
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                  CyberMovie ©2021 Created by Group 10
                </Footer>
              </Layout>
            </Layout>
          </Fragment>
        );
      }}
    ></Route>
  );
};
