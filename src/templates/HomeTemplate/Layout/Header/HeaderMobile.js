import React from "react";
import { NavLink } from "react-router-dom";
import { history } from "../../../../App";


// https://kimia-ui.vercel.app/components/hamburger-menu#

export const HeaderMobile = () => {
  const [open, setOpen] = React.useState(false);

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <HamburgerMenu className="fixed w-full z-10 p-4 bg-black bg-opacity-20 text-white">
      <HamburgerMenuBrand>
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="flex items-center"
        >
          <img
            className="ml-4 w-12 h-12"
            src="https://i.imgur.com/lC22izJ.png"
            alt="logo"
          />
        </NavLink>
      </HamburgerMenuBrand>
      <HamburgerMenuToggler toggle={toggle} />
      <HamburgerMenuCollapse open={open}>
        <HamburgerMenuNav>
          <HamburgerMenuItem>
            <HamburgerMenuLink>
              <NavLink
                to="/home"
                activeClassName="border-b-2 border-white"
                className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
              >
                Trang chủ
              </NavLink>
            </HamburgerMenuLink>
          </HamburgerMenuItem>
          <HamburgerMenuItem>
            <HamburgerMenuLink>
              <NavLink
                to="/contact"
                activeClassName="border-b-2 border-white"
                className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
              >
                Liên hệ
              </NavLink>
            </HamburgerMenuLink>
          </HamburgerMenuItem>
          <HamburgerMenuItem>
            <HamburgerMenuLink>
              <NavLink
                to="/news"
                activeClassName="border-b-2 border-white"
                className="flex items-center px-4 -mb-1 border-transparent text-violet-600 border-violet-600 text-white"
              >
                Tin tức
              </NavLink>
            </HamburgerMenuLink>
            <HamburgerMenuLink>
              <NavLink
                to="/application"
                activeClassName="border-b-2 border-white"
                className="flex items-center px-4 -mb-1 border-b-2 border-transparent text-white"
              >
                Ứng dụng
              </NavLink>
            </HamburgerMenuLink>
            <HamburgerMenuLink>
              <button
                onClick={() => {
                  history.push("/register");
                }}
                className="self-center px-4 font-semibold rounded"
              >
                Đăng Ký
              </button>
            </HamburgerMenuLink>
            <HamburgerMenuLink>
              <button
                onClick={() => {
                  history.push("/login");
                }}
                className="self-center px-4 font-semibold rounded"
              >
                Đăng Nhập
              </button>
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
  toggler: `float-right text-3xl focus:outline-none focus:shadow`,
  link: `block cursor-pointer py-1.5 px-4  hover:text-gray-400 font-medium`,
  brand: `inline-block pt-1.5 pb-1.5 mr-4 cursor-pointer text-2xl font-bold whitespace-nowrap hover:text-gray-400`,
};

function HamburgerMenu({ children }) {
  return (
    <nav
      className={`fixed w-full z-10 p-4 bg-black bg-opacity-30 text-white}`}
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
      &#8801;
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
