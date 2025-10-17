import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../ReduxStore/Actions/user";
import { useDispatch } from "react-redux";
import { routeConst } from "../baseNavigator/navigationConst";
import Swal from "sweetalert2";

const Header = () => {
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleHamburgerClick = () => {
    setHamburgerOpen(!isHamburgerOpen);
    $(".twocolumn-panel").toggleClass("menu");
  };

  const handleLogout = async () => {
    Swal.fire({
      html: `
                <div style="text-align: center;">
                    <lord-icon 
                        src="https://cdn.lordicon.com/hwuyodym.json" 
                        trigger="loop" 
                        colors="primary:#3085d6,secondary:#f06548" 
                        style="width:100px;height:100px">
                    </lord-icon>
                    <h3>Are you sure?</h3>
                    <p style="font-size: 16px; color: #333;">You will be logged out of the system!</p>
                </div>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          dispatch(logoutAction());
          localStorage.clear();
          navigate(routeConst.login);
          Swal.fire(
            "Logged Out!",
            "You have been logged out successfully.",
            "success"
          );
        } catch (error) {
          console.error(error.message);
          Swal.fire(
            "Error!",
            error.message || "Something went wrong while logging out.",
            "error"
          );
        }
      }
    });
  };

  return (
    <header id="page-topbar">
      <div class="layout-width">
        <div class="navbar-header">
          <div class="d-flex">
            <div class="navbar-brand-box horizontal-logo">
              <a class="logo logo-dark">
                <span class="logo-sm">
                  <img src="/images/logo-sm.png" alt="" height="22" />
                </span>
                <h5 style={{ color: "red" }}>Skin Analysis</h5>
                {/* <span class="logo-lg">
                  <img src="/images/polar_logo.png" alt="" height="80" />
                </span> */}
              </a>

              <a class="logo logo-light">
                <span class="logo-sm">
                  <img src="/images/logo-sm.png" alt="" height="22" />
                </span>
                <span class="logo-lg">
                  <img src="/images/logo-light.png" alt="" height="17" />
                </span>
              </a>
            </div>

            <button
              type="button"
              class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
              onClick={handleHamburgerClick}
              id="topnav-hamburger-icon"
            >
              <span class={`hamburger-icon ${!isHamburgerOpen ? "" : "open"} `}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>

          <div class="d-flex align-items-center">
            <div class="dropdown ms-sm-3 header-item topbar-user">
              <button
                type="button"
                class="btn"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span class="d-flex align-items-center">
                  <img
                    class="rounded-circle header-profile-user"
                    src="/images/placeholder-avatar-1.jpg"
                    alt="Header Avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder-avatar-1.jpg";
                    }}
                  />
                  <span class="text-start ms-xl-2">
                    <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                      Skin Analysis Admin
                    </span>
                    <span class="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                      Founder
                    </span>
                  </span>
                </span>
              </button>
              <div class="dropdown-menu dropdown-menu-end">
                <h6 class="dropdown-header">Welcome Skin Analysis Admin</h6>
                <a
                  class="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(routeConst.profile);
                  }}
                >
                  <i class="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>{" "}
                  <span class="align-middle">Profile</span>
                </a>
                <a
                  class="dropdown-item"
                  onClick={() => {
                    handleLogout();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
                  <span class="align-middle" data-key="t-logout">
                    Logout
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
