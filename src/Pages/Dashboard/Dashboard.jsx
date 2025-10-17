import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import { useNavigate } from "react-router-dom";
// import { getDashboard } from "../../Services/dashboard";
// import { displayErrorToast } from "../../Utills/displayToasts";
import { routeConst } from "../../baseNavigator/navigationConst";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      <div class="main-content overflow-hidden">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">Dashboard</h4>
                </div>
              </div>
            </div>

            <div class="row project-wrapper">
              <div class="col-xxl-8">
                <div class="row">
                  <div
                    class="col-xl-4"
                    onClick={() => {
                      navigate(routeConst.user);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div class="card card-animate">
                      <div class="card-body">
                        <div class="d-flex align-items-center">
                          <div class="avatar-sm flex-shrink-0">
                            <span class="avatar-title bg-primary-subtle text-primary rounded-2 fs-2">
                              <i className="ri-user-fill"></i>
                            </span>
                          </div>
                          <div class="flex-grow-1 overflow-hidden ms-3">
                            <p class="text-uppercase fw-medium text-muted text-truncate mb-3">
                              Total Users
                            </p>
                            <div class="d-flex align-items-center mb-3">
                              <h4 class="fs-4 flex-grow-1 mb-0">
                                <span class="counter-value" data-target="825">
                                  0
                                </span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
