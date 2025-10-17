import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeConst } from "../../baseNavigator/navigationConst";

const ResetPassword = () => {
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

      <div class="auth-page-content">
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
                    <h5 class="text-primary">Reset password</h5>
                    <p class="text-muted">
                      Your new password must be different from previous used
                      password.
                    </p>
                  </div>

                  <div class="p-2">
                    <form action="https://themesbrand.com/velzon/html/saas/auth-signin-basic.html">
                      <div class="mb-3">
                        <label class="form-label" for="password-input">
                          Password
                        </label>
                        <div class="position-relative auth-pass-inputgroup">
                          <input
                            // type={passwordType}
                            // onChange={handleChange}
                            name="password"
                            class="form-control pe-5 password-input"
                            onpaste="return false"
                            placeholder="Enter password"
                            id="password-input"
                            aria-describedby="passwordInput"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          />
                          <button
                            onClick={() => {
                              //   if (passwordType === "password") {
                              //     setPasswordType("text");
                              //   } else {
                              //     setPasswordType("password");
                              //   }
                            }}
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

                      <div class="mb-3">
                        <label class="form-label" for="confirm-password-input">
                          Confirm Password
                        </label>
                        <div class="position-relative auth-pass-inputgroup mb-3">
                          <input
                            // type={confirmPasswordType}
                            // onChange={handleChange}
                            name="confirmPassword"
                            class="form-control pe-5 password-input"
                            onpaste="return false"
                            placeholder="Confirm password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            id="confirm-password-input"
                          />
                          <button
                            onClick={() => {
                              //   if (confirmPasswordType === "password") {
                              //     setConfirmPasswordType("text");
                              //   } else {
                              //     setConfirmPasswordType("password");
                              //   }
                            }}
                            class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            type="button"
                            id="confirm-password-input"
                          >
                            <i class="ri-eye-fill align-middle"></i>
                          </button>
                          <div
                            id="passwordInput"
                            class="form-text"
                            style={{ color: "red" }}
                          >
                            {/* {errors?.confirmPassword} */}
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
                          Reset Password
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="mt-4 text-center">
                <p class="mb-0">
                  Wait, I remember my password...{" "}
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(routeConst.login);
                    }}
                    class="fw-semibold text-primary text-decoration-underline"
                  >
                    {" "}
                    Click here{" "}
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
