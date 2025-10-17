import React, { useEffect, useState } from "react";
import Header from "../../layouts/Header";
import Sidebar from "../../layouts/Sidebar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { updateProfile } from '../../Services/profile'
// import { changePassword } from '../../Services/authentication';
import {
  displayErrorToast,
  displaySuccessToast,
} from "../../Utills/displayToasts";
import { getUserDataAction } from "../../ReduxStore/Actions/user";
import { concatImageURL } from "../../constants/globalConst";

const Profile = () => {
  const userData = useSelector((state) => state?.userReducer);
  console.log(userData);
  const adminType = userData?.userDetails?.type;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: userData?.userDetails?.name,
    email: userData?.userDetails?.email || "clickle@yopmail.com",
    image: userData?.userDetails?.profilePic,
  });
  const [initialData, setInitialData] = useState({
    name: userData?.userDetails?.name,
    email: userData?.userDetails?.email,
    image: userData?.userDetails?.profilePic,
  });
  const [PasswordForm, setPasswordForm] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });

  const [passwordType, setPasswordType] = useState({
    oldPass: "password",
    newPass: "password",
    confirmNewPass: "password",
  });
  const [submitPasswordForm, setPasswordSubmitForm] = useState(false);
  const [serviceFee, setServiceFee] = useState(
    userData?.userDetails?.serviceFee
  );
  const [submitForm, setSubmitForm] = useState(false);
  const [loaderEdit, setLoaderEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(
    userData?.userDetails?.profilePic || "/images/placeholder-avatar-1.jpg"
  );

  //funstions for change password

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (submitPasswordForm) {
      validatePasswordForm({ ...PasswordForm, [name]: value.trim() });
    }
    setPasswordForm({ ...PasswordForm, [name]: value.trim() });
  };

  const validatePasswordForm = (data) => {
    let isValid = true;
    const newErrors = {};

    if (!data.oldPass) {
      newErrors.oldPass = "Old password is required";
      isValid = false;
    }
    if (!data.newPass) {
      newErrors.newPass = "New password is required";
      isValid = false;
    }
    if (!data.confirmNewPass) {
      newErrors.confirmNewPass = "Confirm New password is required";
      isValid = false;
    }

    if (data?.newPass) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(data?.newPass)) {
        newErrors.newPass =
          "Password must be at least 8 characters long, and include uppercase, lowercase, numbers, and special characters.";
        isValid = false;
      }
    }

    if (data?.newPass !== data?.confirmNewPass) {
      newErrors.confirmNewPass =
        "new password and confirm password should same";
      isValid = false;
    }

    if (data?.oldPass === data?.newPass) {
      newErrors.newPass = "Old password and new password should not be same";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordSubmitForm(true);
    try {
      setLoaderEdit(true);
      const isValid = validatePasswordForm(PasswordForm);
      if (isValid) {
        const data = {
          oldPassword: PasswordForm?.oldPass,
          newPassword: PasswordForm?.newPass,
        };
        // const changePass = await changePassword(data);
        const changePass = "";

        if (changePass?.success) {
          setPasswordSubmitForm(false);
          setPasswordForm({
            oldPass: "",
            newPass: "",
            confirmNewPass: "",
          });
          displaySuccessToast(
            changePass?.message || "password updated successfully"
          );
        } else {
          displayErrorToast(
            changePass?.message ||
            "something went wrong while updating password"
          );
        }
      }
    } catch (error) {
      console.error(error.message);
      displayErrorToast(
        error.message || "Something went wrong while updating password"
      );
    } finally {
      setLoaderEdit(false);
    }
  };

  const cancleButtonClick = () => {
    setPasswordForm({
      oldPass: "",
      newPass: "",
      confirmNewPass: "",
    });
  };

  //functions for personal details

  const onChangeTextValue = (e) => {
    const { name, value } = e.target;
    const finalData = { ...formData, [name]: value.trimStart() };
    if (JSON.stringify(initialData) !== JSON.stringify(finalData)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    if (submitForm) {
      validateForm(finalData);
    }
    setFormData(finalData);
  };

  const onClickPhoto = async (e) => {
    const newSelectedFile = e.target.files[0];
    setPreviewImage(newSelectedFile);
    const data = { ...formData, image: newSelectedFile };
    if (JSON.stringify(initialData) !== JSON.stringify(data)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    if (submitForm) {
      validateForm(data);
    }
    setFormData(data);
  };

  const onClickCencleButtonClick = () => {
    setFormData(initialData);
    setPreviewImage(initialData?.image);
    setErrors({});
    setDisabled(true);
  };

  const validateForm = (data) => {
    let isValid = true;
    const newErrors = {};

    console.log(data);

    if (!data.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!data.image) {
      newErrors.image = "Image is required";
      isValid = false;
    }

    if (data.image && typeof data.image === "object") {
      if (!data.image.type.includes("image")) {
        newErrors.image = "Only image is allowed";
        isValid = false;
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitForm(true);
    const valid = validateForm(formData);
    try {
      if (valid) {
        setSubmitForm(false);
        setLoaderEdit(true);
        if (initialData?.image !== previewImage) {
          const imageUpload = new FormData();
          imageUpload.append("profilePic", formData?.image);
          imageUpload.append("name", formData?.name);
          // const response = await updateProfile(imageUpload);
          const response = "";
          if (response?.success) {
            setDisabled(true);
            setInitialData({
              ...initialData,
              image: response?.data?.profilePic,
              name: response?.data?.name,
            });
            dispatch(getUserDataAction(response?.data));
            displaySuccessToast(
              response?.response?.message || "Profile updated successfully"
            );
          } else {
            displayErrorToast(
              response?.response?.message ||
              "Something went wrong while updating profile"
            );
          }
        } else {
          const imageUpload = new FormData();
          imageUpload.append("name", formData?.name);
          //   const response = await updateProfile(imageUpload);
          const response = "";

          if (response?.success) {
            setInitialData({ ...initialData, name: response?.data?.name });
            dispatch(getUserDataAction(response?.data));
            displaySuccessToast(
              response?.response?.message || "Profile updated successfully"
            );
          } else {
            displayErrorToast(
              response?.response?.message ||
              "Something went wrong while updating profile"
            );
          }
        }
      }
    } catch (error) {
      console.error(error.message);
      displayErrorToast(
        error.message || "Something went wrong while updating profile"
      );
    } finally {
      setLoaderEdit(false);
    }
  };

  const handleServiceFee = async (e) => {
    e.preventDefault();
    setSubmitForm(true);
    try {
      setSubmitForm(false);
      setLoaderEdit(true);
      const obj = {
        serviceFee: serviceFee,
      };
      //   const response = await updateProfile(obj);
      const response = "";

      if (response?.success) {
        setServiceFee(response?.data?.serviceFee);
        dispatch(getUserDataAction(response?.data));
        displaySuccessToast("Service Fee updated successfully");
      } else {
        displayErrorToast(
          response?.response?.message ||
          "Something went wrong while updating profile"
        );
      }
    } catch (error) {
      console.error(error.message);
      displayErrorToast(
        error.message || "Something went wrong while updating profile"
      );
    } finally {
      setLoaderEdit(false);
    }
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="position-relative mx-n4 mt-n4">
              <div class="profile-wid-bg profile-setting-img">
                <img
                  src="/images/profile-bg.jpg"
                  class="profile-wid-img"
                  alt=""
                />
              </div>
            </div>

            <div class="row">
              <div class="col-xxl-3">
                <div class="card mt-n5">
                  <div class="card-body p-4">
                    <div class="text-center">
                      <div class="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <img
                          src={
                            typeof previewImage == "object"
                              ? URL.createObjectURL(previewImage)
                              : concatImageURL(previewImage)
                          }
                          class="rounded-circle avatar-xl img-thumbnail user-profile-image"
                          alt="user-profile-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/placeholder-avatar-1.jpg";
                          }}
                        />
                        <div class="avatar-xs p-0 rounded-circle profile-photo-edit">
                          <input
                            id="profile-img-file-input"
                            type="file"
                            class="profile-img-file-input"
                            accept="image/*"
                            onChange={(event) => onClickPhoto(event)}
                          />
                          <label
                            for="profile-img-file-input"
                            class="profile-photo-edit avatar-xs"
                          >
                            <span class="avatar-title rounded-circle bg-light text-body">
                              <i class="ri-camera-fill"></i>
                            </span>
                          </label>
                        </div>
                      </div>
                      <div
                        id="passwordInput"
                        class="form-text"
                        style={{ color: "red" }}
                      >
                        {errors?.image}
                      </div>
                      <h5 class="fs-16 mb-1">Clickle Admin</h5>
                      <p class="text-muted mb-0">Founder</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xxl-9">
                <div class="card mt-xxl-n5">
                  <div class="card-header" style={{ backgroundColor: '#64d851' }}>
                    <ul
                      class="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link text-body active"
                          data-bs-toggle="tab"
                          href="#personalDetails"
                          role="tab"
                        >
                          <i class="fas fa-home"></i>
                          Personal Details
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link text-body"
                          data-bs-toggle="tab"
                          href="#changePassword"
                          role="tab"
                        >
                          <i class="far fa-user"></i>
                          Change Password
                        </a>
                      </li>
                      {adminType == 1 && (
                        <li class="nav-item">
                          <a
                            class="nav-link text-body"
                            data-bs-toggle="tab"
                            href="#serviceFee"
                            role="tab"
                          >
                            <i class="far fa-user"></i>
                            Service Fee
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div class="card-body p-4">
                    <div class="tab-content">
                      <div
                        class="tab-pane active"
                        id="personalDetails"
                        role="tabpanel"
                      >
                        <form action="javascript:void(0);">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="mb-3">
                                <label for="firstnameInput" class="form-label">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="firstnameInput"
                                  placeholder="Enter your name"
                                  value={formData?.name}
                                  name="name"
                                  onChange={onChangeTextValue}
                                />
                                <div
                                  id="passwordInput"
                                  class="form-text"
                                  style={{ color: "red" }}
                                >
                                  {errors?.name}
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-6">
                              <div class="mb-3">
                                <label for="emailInput" class="form-label">
                                  Email Address
                                </label>
                                <input
                                  readOnly
                                  type="email"
                                  class="form-control"
                                  id="emailInput"
                                  placeholder="Enter your email"
                                  value={formData?.email}
                                  disabled={true}
                                  onChange={onChangeTextValue}
                                />
                              </div>
                            </div>
                            <div class="col-lg-12">
                              <div class="hstack gap-2 justify-content-end">
                                <button
                                  type="submit"
                                  disabled={disabled}
                                  onClick={handleSubmit}
                                  class="btn btn-primary"
                                >
                                  {loaderEdit ? "Updating.." : "Update"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onClickCencleButtonClick()}
                                  class="btn btn-soft-success"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div class="tab-pane" id="changePassword" role="tabpanel">
                        <form action="javascript:void(0);">
                          <div class="row g-2">
                            <div class="col-lg-4">
                              <div class="position-relative auth-pass-inputgroup mb-3">
                                <label
                                  for="oldpasswordInput"
                                  class="form-label"
                                >
                                  Current Password*
                                </label>
                                <input
                                  type={passwordType.oldPass}
                                  class="form-control pe-5 password-input"
                                  placeholder="Enter current password"
                                  name="oldPass"
                                  value={PasswordForm?.oldPass}
                                  onChange={handleChange}
                                  id="password-input"
                                />
                                <button
                                  style={{ marginTop: "27px" }}
                                  onClick={() => {
                                    setPasswordType({
                                      ...passwordType,
                                      oldPass:
                                        passwordType.oldPass === "password"
                                          ? "text"
                                          : "password",
                                    });
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
                                  {errors?.oldPass}
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-4">
                              <div class="position-relative auth-pass-inputgroup mb-3">
                                <label
                                  for="newpasswordInput"
                                  class="form-label"
                                >
                                  New Password*
                                </label>
                                <input
                                  type={passwordType.newPass}
                                  class="form-control pe-5 password-input"
                                  placeholder="Enter new password"
                                  name="newPass"
                                  value={PasswordForm?.newPass}
                                  onChange={handleChange}
                                  id="password-input"
                                />
                                <button
                                  style={{ marginTop: "27px" }}
                                  onClick={() => {
                                    setPasswordType({
                                      ...passwordType,
                                      newPass:
                                        passwordType.newPass === "password"
                                          ? "text"
                                          : "password",
                                    });
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
                                  {errors?.newPass}
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-4">
                              <div class="position-relative auth-pass-inputgroup mb-3">
                                <label
                                  for="confirmpasswordInput"
                                  class="form-label"
                                >
                                  Confirm Password*
                                </label>
                                <input
                                  type={passwordType.confirmNewPass}
                                  class="form-control pe-5 password-input"
                                  placeholder="Enter confirm password"
                                  name="confirmNewPass"
                                  value={PasswordForm?.confirmNewPass}
                                  onChange={handleChange}
                                  id="password-input"
                                />
                                <button
                                  style={{ marginTop: "27px" }}
                                  onClick={() => {
                                    setPasswordType({
                                      ...passwordType,
                                      confirmNewPass:
                                        passwordType.confirmNewPass ===
                                          "password"
                                          ? "text"
                                          : "password",
                                    });
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
                                  {errors?.confirmNewPass}
                                </div>
                              </div>
                            </div>

                            <div class="col-lg-12">
                              <div class="mb-3">
                                {/* <a href="javascript:void(0);"
                                                                    class="link-primary text-decoration-underline">Forgot
                                                                    Password ?</a> */}
                              </div>
                            </div>

                            <div class="col-lg-12">
                              <div class="hstack gap-2 justify-content-end">
                                <button
                                  type="submit"
                                  disabled={loaderEdit}
                                  onClick={handlePasswordSubmit}
                                  class="btn btn-primary"
                                >
                                  {loaderEdit
                                    ? "Updating.."
                                    : "Update Password"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => cancleButtonClick()}
                                  class="btn btn-soft-success"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>

                      {adminType == 1 && (
                        <div class="tab-pane" id="serviceFee" role="tabpanel">
                          <form action="javascript:void(0);">
                            <div class="row g-2">
                              <div class="col-lg-4">
                                <div class="position-relative auth-pass-inputgroup mb-3">
                                  <label class="form-label">
                                    Service Fee (%)
                                  </label>
                                  <input
                                    type="number"
                                    class="form-control pe-5"
                                    placeholder="Enter Service Fee"
                                    value={serviceFee}
                                    onChange={(e) => {
                                      setServiceFee(e.target.value);
                                    }}
                                    onWheel={(e) => e.target.blur()}
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12">
                                <div class="hstack gap-2 justify-content-end">
                                  <button
                                    type="submit"
                                    disabled={loaderEdit}
                                    onClick={(e) => {
                                      handleServiceFee(e);
                                    }}
                                    class="btn btn-primary"
                                  >
                                    {loaderEdit ? "Updating.." : "Update"}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setServiceFee(
                                        userData?.userDetails?.serviceFee
                                      );
                                    }}
                                    class="btn btn-soft-success"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      )}
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

export default Profile;
