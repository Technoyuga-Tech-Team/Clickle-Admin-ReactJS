import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeConst } from "../../baseNavigator/navigationConst";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div class="auth-page-wrapper pt-5">
      <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div class="bg-overlay"></div>

        <div class="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 120"
          >
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div>
      </div>

      <div class="auth-page-content mt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center sm-5 mb-4 text-white-50">
                <div>
                  <a class="d-inline-block auth-logo">
                    <h1 style={{ color: "white" }}>Skin Analysis</h1>
                    {/* <img
                      src="/images/polar_logo_white_2.svg"
                      alt=""
                      height="100"
                    /> */}
                  </a>
                </div>
                {/* <p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p> */}
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
              <div class="card mt-4">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">Welcome Back</h5>
                    <p class="text-muted">Sign in to Skin Analysis.</p>
                  </div>
                  <div class="p-2 mt-4">
                    <form>
                      <div class="mb-3">
                        <label for="email" class="form-label">
                          Email
                        </label>
                        <input
                          class="form-control"
                          id="email"
                          //   value={details?.email}
                          placeholder="Enter email"
                          name="email"
                          //   onChange={handleChange}
                        />
                        <div
                          id="passwordInput"
                          class="form-text"
                          style={{ color: "red" }}
                        >
                          {/* {errors?.email} */}
                        </div>
                      </div>

                      <div class="mb-3">
                        <div class="float-end">
                          <a
                            class="text-muted"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              navigate(routeConst.forgotPass);
                            }}
                          >
                            Forgot password?
                          </a>
                        </div>
                        <label class="form-label" for="password-input">
                          Password
                        </label>
                        <div class="position-relative auth-pass-inputgroup mb-3">
                          <input
                            // type={passwordType}
                            class="form-control pe-5 password-input"
                            placeholder="Enter password"
                            name="password"
                            // value={details?.password}
                            // onChange={handleChange}
                            id="password-input"
                          />
                          <button
                            // onClick={handlePassword}
                            class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            type="button"
                            id="password-addon"
                          >
                            <i class="ri-eye-fill align-middle"></i>
                          </button>
                          <div
                            id="passwordInput"
                            class="form-text"
                            style={{ color: "red" }}
                          >
                            {/* {errors?.password} */}
                          </div>
                        </div>
                      </div>

                      <div class="mt-4">
                        <button
                          //   onClick={handleSubmit}
                          class="btn btn-primary w-100"
                          type="submit"
                          //   disabled={disable}
                        >
                          Sign In
                          {/* {disable ? "Signing.." : "Sign In"} */}
                        </button>
                      </div>
                    </form>
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

export default Login;
