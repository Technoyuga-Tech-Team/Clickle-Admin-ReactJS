import React, { useEffect, useState } from "react";
import PinInput from "react-pin-input";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [disable, setDisable] = useState(false);
  const [resend, setResend] = useState(false);
  const [key, setKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const handleOTPChange = (value) => {
    setOtp(value);
  };

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
                  <a href="index.html" class="d-inline-block auth-logo">
                    <h1>Heat Sens</h1>
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
                  <div class="mb-4">
                    <div class="avatar-lg mx-auto">
                      <div class="avatar-title bg-light text-primary display-5 rounded-circle">
                        <i class="ri-mail-line"></i>
                      </div>
                    </div>
                  </div>

                  <div class="p-2 mt-4">
                    <div class="text-muted text-center mb-4 mx-lg-3">
                      <h4 class="">Verify Your Email</h4>
                      <p>
                        Please enter the 6 digit code sent to{" "}
                        <span class="fw-semibold">
                          {location?.state?.email || "heatsens@yopmail.com"}
                        </span>
                      </p>
                    </div>

                    <form autocomplete="off">
                      <div class="row">
                        <div className="text-center">
                          <PinInput
                            key={key}
                            length={6}
                            focus
                            type="numeric"
                            inputMode="number"
                            style={{ paddingBottom: "10PX" }}
                            inputStyle={{
                              backgroundColor: "rgba(243, 246, 249)",
                              borderColor: "rgba(243, 246, 249)",
                              padding: ".7rem 1.2rem",
                              fontSize: "1.03125rem",
                              borderRadius: "0.3rem",
                            }}
                            onChange={handleOTPChange}
                            value={otp}
                          />
                        </div>
                      </div>
                    </form>

                    <div class="mt-3">
                      <button
                        type="button"
                        class="btn btn-primary w-100"
                        // onClick={handleSubmit}
                        disabled={otp?.length !== 6 || disable}
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 text-center">
                <p class="mb-0">
                  Didn't receive a code ?{" "}
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (!resend) {
                        // handleResend();
                      }
                    }}
                    class="fw-semibold text-primary text-decoration-underline"
                  >
                    {!resend ? "Resend" : "Resending.."}
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center">
                {/* <p class="mb-0 text-muted">&copy;
                                    <script>document.write(new Date().getFullYear())</script> Velzon. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                                </p> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VerifyOTP;
