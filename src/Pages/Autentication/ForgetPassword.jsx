import React, { useState } from "react";

import { routeConst } from "../../baseNavigator/navigationConst";
import { useNavigate } from "react-router-dom";
import { displayErrorToast, displaySuccessToast } from "../../Utills/displayToasts";
import { sendOtp } from "../../Services/authentication";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  const validation = (data) => {
    let isValid = true;
    let newErrors = {};

    if (!data.email) {
      newErrors.email = "Email address is required";
      isValid = false;
    }

    if (data.email) {
      let lastAtPos = data.email.lastIndexOf("@");
      let lastDotPos = data.email.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          data.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          data.email.length - lastDotPos > 2
        )
      ) {
        newErrors.email = "Email address is not valid";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      setSubmitForm(true);
      setDisable(true);
      if (validation({ email: email })) {
        const response = await sendOtp({ email: email });
        if (response?.success) {
          displaySuccessToast(
            response?.message || "Verification Code sent Successfully"
          );
          navigate(routeConst.verifyOtp, { state: { email: email } });
        } else {
          displayErrorToast(
            response?.message ||
            "Something went wrong While sending Verification Code"
          );
        }
      }
    } catch (error) {
      console.error(error.message);
      displayErrorToast(
        error.message || "Something went wrong While sending Verification Code"
      );
    } finally {
      setDisable(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (submitForm) {
      validation({ email: value });
    }
    setEmail(value.trim());
  };
  return (
    <div class="auth-page-wrapper pt-5">
      <div class="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div class="bg-overlay"></div>

        {/* <div class="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 120"
          >
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z"></path>
          </svg>
        </div> */}
      </div>

      <div class="auth-page-content mt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center sm-5 mb-4 text-white-50">
                <div>
                  <a class="d-inline-block auth-logo">
                    {/* <h1 class="text-primary">Clickle</h1> */}
                    <img
                      src="/images/clickle/logo.png"
                      alt=""
                      height="100"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6 col-xl-5">
              <div class="card mt-4">
                <div class="card-body p-4">
                  <div class="text-center mt-2">
                    <h5 class="text-primary">Forgot Password?</h5>
                    <lord-icon
                      src="https://cdn.lordicon.com/rhvddzym.json"
                      trigger="loop"
                      colors="primary:#                                        "
                      class="avatar-xl"
                    ></lord-icon>
                  </div>

                  <div
                    class="alert border-0 alert-warning text-center mb-2 mx-2"
                    role="alert"
                    style={{ color: "#122348" }}
                  >
                    Enter your email and instructions will be sent to you!
                  </div>
                  <div class="p-2">
                    <form>
                      <div class="mb-4">
                        <label class="form-label">Email</label>
                        <input
                          class="form-control"
                          id="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={handleChange}
                        />
                        <div
                          id="passwordInput"
                          class="form-text"
                          style={{ color: "red" }}
                        >
                          {errors?.email}
                        </div>
                      </div>

                      <div class="text-center mt-4">
                        <button
                          disabled={disable}
                          onClick={handleSend}
                          class="btn btn-primary w-100"
                          type="submit"
                        >
                          Send OTP
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

export default ForgetPassword;
