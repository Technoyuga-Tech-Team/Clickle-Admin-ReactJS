import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeConst } from "../../baseNavigator/navigationConst";
import { useDispatch } from "react-redux";
import { login } from "../../Services/authentication";
import { displayErrorToast, displaySuccessToast } from "../../Utills/displayToasts";
import { tokenAction } from "../../ReduxStore/Actions/user";

const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  const dispatch = useDispatch();

  const validation = (data) => {
    let isValid = true;
    let newErrors = {};

    if (!data.email) {
      newErrors.email = "Email address is required";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitForm(true);
    try {
      if (validation(details)) {
        setDisable(true);
        var bodyParameter = new URLSearchParams();
        bodyParameter.append("email", details?.email);
        bodyParameter.append("password", details?.password);
        const response = await login(bodyParameter);
        if (response?.success) {
          displaySuccessToast(response?.message || "Login Successful");
          localStorage.setItem("PIE_ADMIN_TOKEN", response?.data);
          dispatch(tokenAction(response?.data));
          navigate(routeConst.dashboard);
        } else {
          displayErrorToast(
            response?.message || "Something Went Wrong While Login"
          );
        }
      }
    } catch (error) {
      console.error(error.message);
      displayErrorToast(error.message || "Something Went Wrong While Login");
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

  const handlePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
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
                    <p class="text-muted">Sign in to Clickle.</p>
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
                          value={details?.email}
                          placeholder="Enter email"
                          name="email"
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
                            type={passwordType}
                            class="form-control pe-5 password-input"
                            placeholder="Enter password"
                            name="password"
                            value={details?.password}
                            onChange={handleChange}
                            id="password-input"
                          />
                          <button
                            onClick={handlePassword}
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

                      <div class="mt-4">
                        <button
                          onClick={handleSubmit}
                          class="btn btn-primary w-100"
                          type="submit"
                          disabled={disable}
                        >

                          {disable ? "Signing.." : "Sign In"}
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
