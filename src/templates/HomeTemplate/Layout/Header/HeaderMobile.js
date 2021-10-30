import React, { useState } from "react";
import { history } from "../../../../App";
import { useDispatch } from "react-redux";
import { USER_LOGIN } from "../../../../ulti/setting";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { DANG_XUAT } from "../../../../redux/types/QuanLyNguoiDungTypes";


// https://kimia-ui.vercel.app/components/hamburger-menu#

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  function handleChange(value) {
    i18n.changeLanguage(value);
  }

  const renderIsLogin = () => {
    if (localStorage.getItem(USER_LOGIN)) {
      let user = JSON.parse(localStorage.getItem(USER_LOGIN));
      return (
        <Fragment>
          <NavLink to="/profile">
            <span className="px-4 text-white font-semibold">
              Xin chào {user.taiKhoan} !
            </span>
          </NavLink>
          <br/>
          <button
            onClick={() => {
              dispatch({ type: DANG_XUAT });
              history.push("/login");
            }}
            className="self-center px-4 pt-2 font-semibold"
          >
            Đăng xuất
          </button>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          onClick={() => {
            history.push("/register");
          }}
          className="self-center px-8 py-3 font-semibold rounded"
        >
          {t("Đăng kí")}
        </button>
        <button
          onClick={() => {
            history.push("/login");
          }}
          className="self-center px-8 py-3 font-semibold rounded"
        >
          {t("Đăng nhập")}
        </button>
      </Fragment>
    );
  };

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const activeClassName = "border-b-2 border-white";

  return (
      <HamburgerMenu>
        <HamburgerMenuBrand href="/">
          <img
            className="ml-4 w-12 h-12"
            src="https://i.imgur.com/lC22izJ.png"
            alt="logo"
          />
        </HamburgerMenuBrand>
        <HamburgerMenuToggler toggle={toggle} />
        <HamburgerMenuCollapse open={open}>
          <HamburgerMenuNav>
            <HamburgerMenuItem>
              <HamburgerMenuLink href="/home">
                <div
                  activeclassname={activeClassName}
                  className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
                >
                  Trang chủ
                </div>
              </HamburgerMenuLink>
            </HamburgerMenuItem>
            <HamburgerMenuItem>
              <HamburgerMenuLink href="/contact">
                <div
                  activeclassname={activeClassName}
                  className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
                >
                  Liên hệ
                </div>
              </HamburgerMenuLink>
            </HamburgerMenuItem>
            <HamburgerMenuItem>
              <HamburgerMenuLink href="/news">
                <div
                  activeclassname={activeClassName}
                  className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
                >
                  Tin tức
                </div>
              </HamburgerMenuLink>
              <HamburgerMenuLink href="/application">
                <div
                  activeclassname={activeClassName}
                  className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white"
                >
                  Ứng dụng
                </div>
              </HamburgerMenuLink>
              <HamburgerMenuLink>
                {renderIsLogin()}
              </HamburgerMenuLink>
            </HamburgerMenuItem>
          </HamburgerMenuNav>
        </HamburgerMenuCollapse>
      </HamburgerMenu>
  );
};

/* Logic */

const style = {
  nav: `block pl-0 mb-0`,
  navbar: `font-light shadow py-2 px-4`,
  collapse: `transition-height ease duration-300`,
  toggler: `float-right text-3xl focus:outline-none focus:shadow text-white border-2 border-white text-center mt-3`,
  link: `block cursor-pointer py-1.5 px-4  hover:text-gray-400 font-medium`,
  brand: `inline-block pt-1.5 pb-1.5 mr-4 cursor-pointer text-2xl font-bold whitespace-nowrap hover:text-gray-400`,
};

function HamburgerMenu({ children }) {
  return (
    <nav
      className={`fixed w-full z-20 px-4 py-1 bg-gray-800 text-white`}
    >
      {children}
    </nav>
  );
}

/* You can wrap the a tag with Link and pass href to Link if you are using either Create-React-App, Next.js or Gatsby */
function HamburgerMenuBrand({ children, href }) {
  return (
    <a href={href} className={style.brand}>
      <strong>{children}</strong>
    </a>
  );
}

function HamburgerMenuToggler({ toggle }) {
  return (
    <button
      type="button"
      aria-expanded="false"
      aria-label="Toggle navigation"
      className={style.toggler}
      onClick={toggle}
    >
      <svg viewBox="-18 0 100 60" width="35" height="35">
        <rect fill="white" width="60" height="12"></rect>
        <rect fill="white" y="25" width="60" height="12"></rect>
        <rect fill="white" y="50" width="60" height="12"></rect>
      </svg>
    </button>
  );
}

function HamburgerMenuCollapse({ children, open }) {
  const ref = React.useRef(null);

  const inlineStyle = open
    ? { height: ref.current?.scrollHeight }
    : { height: 0, visibility: "hidden", opacity: 0 };

  return (
    <div className={style.collapse} style={inlineStyle} ref={ref}>
      {children}
    </div>
  );
}

function HamburgerMenuNav({ children }) {
  return <ul className={style.nav}>{children}</ul>;
}

function HamburgerMenuItem({ children }) {
  return <li>{children}</li>;
}

/* You can wrap the a tag with Link and pass href to Link if you are using either Create-React-App, Next.js or Gatsby */
function HamburgerMenuLink({ children, href }) {
  return (
    <a href={href} className={style.link}>
      {children}
    </a>
  );
}
