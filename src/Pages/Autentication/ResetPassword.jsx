import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { routeConst } from "../../baseNavigator/navigationConst";
import { resetPassword } from "../../Services/authentication";
import { displayErrorToast, displaySuccessToast } from "../../Utills/displayToasts";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const location = useLocation();
  const [submitForm, setSubmitForm] = useState(false);
  const [details, setDetails] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [errors, setErrors] = useState({});

  const validation = (data) => {
    let isValid = true;
    let newErrors = {};

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    }

    if (data.password) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(data.password)) {
        newErrors.password =
          "Password must be at least 8 characters long, and include uppercase, lowercase, numbers, and special characters.";
        isValid = false;
      }
    }

    if (
      data.password &&
      data.confirmPassword &&
      data.password !== data.confirmPassword
    ) {
      newErrors.confirmPassword = "Confirm Password should be same as Password";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitForm(true);
    try {
      if (validation(details)) {
        setDisable(true);
        let response = await resetPassword({
          email: location?.state?.email,
          newPassword: details.password,
        });
        if (response?.success) {
          displaySuccessToast(
            response?.message || "Password Reset Successfully"
          );
          navigate(routeConst.login);
        } else {
          displayErrorToast(
            response?.message || "Something went wrong While reseting password"
          );
        }
      }
    } catch (error) {
      console.error(error.message);
      displayErrorToast(
        error.message || "Something went wrong While reseting password"
      );
    } finally {
      setDisable(false);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (submitForm) {
      validation({ ...details, [name]: value.trim() });
    }
    setDetails({ ...details, [name]: value.trim() });
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

      <div class="auth-page-content">
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
                            type={passwordType}
                            onChange={handleChange}
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
                              if (passwordType === "password") {
                                setPasswordType("text");
                              } else {
                                setPasswordType("password");
                              }
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
                            {errors?.password}
                          </div>
                        </div>
                      </div>

                      <div class="mb-3">
                        <label class="form-label" for="confirm-password-input">
                          Confirm Password
                        </label>
                        <div class="position-relative auth-pass-inputgroup mb-3">
                          <input
                            type={confirmPasswordType}
                            onChange={handleChange}
                            name="confirmPassword"
                            class="form-control pe-5 password-input"
                            onpaste="return false"
                            placeholder="Confirm password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            id="confirm-password-input"
                          />
                          <button
                            onClick={() => {
                              if (confirmPasswordType === "password") {
                                setConfirmPasswordType("text");
                              } else {
                                setConfirmPasswordType("password");
                              }
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
                            {errors?.confirmPassword}
                          </div>
                        </div>
                      </div>

                      <div class="mt-4">
                        <button
                          onClick={handleSubmit}
                          class="btn btn-primary w-100"
                          type="submit"
                          disabled={disable}
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
