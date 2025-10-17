import React from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import { routeConst } from "../baseNavigator/navigationConst";
import { useSelector } from "react-redux";
import { PiPackageDuotone } from "react-icons/pi";

const navBarConst = [
  {
    key: 1,
    value: "Dashboard",
    icon: <i className="ri-dashboard-fill"></i>,
    route: routeConst.dashboard,
  },
  {
    key: 2,
    value: "User",
    icon: <i className="ri-user-fill"></i>,
    route: routeConst.users,
  },
  {
    key: 3,
    value: "CMS",
    icon: <i className="ri-file-settings-fill"></i>,
    route: routeConst.cms,
  },
  {
    key: 4,
    value: "Setting",
    icon: <i className="ri-settings-5-fill"></i>,
    route: routeConst.profile,
  },
];

const Sidebar = () => {
  const userData = useSelector((state) => state?.userReducer);
  const adminType = userData?.userDetails?.type;
  let sideBarData = navBarConst.filter((item) => {
    return adminType === 2 ? item.route !== routeConst.subAdmin : item;
  });

  const handleMenuToggle = () => {
    if ($(".twocolumn-panel").hasClass("menu")) {
      $(".twocolumn-panel").toggleClass("menu");
    }
  };

  return (
    <div className="app-menu navbar-menu">
      <div className="navbar-brand-box">
        <a href="index.html" className="logo logo-dark">
          <span className="logo-sm">
            <img src="/images/logo-sm.png" alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src="/images/logo-dark.png" alt="" height="17" />
          </span>
        </a>
        <a href="index.html" className="logo logo-light">
          <span className="logo-sm">
            <img src="/images/logo-sm.png" alt="" height="22" />
          </span>
          <span className="logo-lg">
            <img src="/images/logo-dark.png" alt="" height="17" />
          </span>
        </a>
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line"></i>
        </button>
      </div>

      <div id="scrollbar">
        <div className="container-fluid">
          <div id="two-column-menu"></div>
          <ul className="navbar-nav" id="navbar-nav">
            <li className="menu-title">
              <span data-key="t-menu">Menu</span>
            </li>

            {sideBarData.map((item) => {
              return (
                <li className="nav-item">
                  <NavLink
                    to={item.route}
                    className="nav-link menu-link"
                    onClick={() => handleMenuToggle()}
                  >
                    {item.icon}
                    <span data-key="t-apps">{item.value}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="sidebar-background"></div>
    </div>
  );
};

export default Sidebar;
