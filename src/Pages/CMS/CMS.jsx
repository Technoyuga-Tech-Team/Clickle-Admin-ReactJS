import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { routeConst } from "../../baseNavigator/navigationConst";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
];

const cmsConstData = [
  {
    id: 1,
    value: "Terms and Conditions",
  },
  {
    id: 2,
    value: "Privacy Policy",
  },
  {
    id: 3,
    value: "About us",
  },
];

const CMS = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [termCondition, setTermCondition] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [loader, setLoader] = useState(false);
  const [selectedTab, setSelectedtab] = useState(cmsConstData[0]?.id);
  const [updateLoader, setUpdateLoader] = useState(false);

  const onClickTabData = (data) => {
    setSelectedtab(data?.id);
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">CMS</h4>
                  <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                      <li class="breadcrumb-item">
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigate(routeConst.dashboard);
                          }}
                        >
                          Dashboard
                        </a>
                      </li>
                      <li class="breadcrumb-item active">CMS</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    {loader ? (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div class="spinner-border text-primary" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <div
                        class="cmstemp"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "40px",
                        }}
                      >
                        <ul
                          className="nav nav-tabs nav-justified nav-tabs-custom"
                          role="tablist"
                        >
                          {cmsConstData?.map((data) => {
                            return (
                              <>
                                <li
                                  className="nav-item"
                                  role="presentation"
                                  onClick={() => onClickTabData(data)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <a
                                    className={
                                      selectedTab == data?.id
                                        ? "nav-link active"
                                        : "nav-link"
                                    }
                                    style={{ height: "100%", color: "black" }}
                                    data-bs-toggle="tab"
                                    role="tab"
                                    aria-selected="false"
                                  >
                                    {data?.value}
                                  </a>
                                </li>
                              </>
                            );
                          })}
                        </ul>

                        {selectedTab == 1 && (
                          <div class="mb-4">
                            <b>
                              <p class="text-muted">Terms and conditions</p>
                            </b>
                            <div class="snow-editor">
                              <ReactQuill
                                theme="snow"
                                value={termCondition}
                                onChange={(data) => {
                                  setTermCondition(data);
                                }}
                                modules={modules}
                                formats={formats}
                              />
                            </div>
                          </div>
                        )}

                        {selectedTab == 2 && (
                          <div class="mb-4">
                            <b>
                              <p class="text-muted">Privacy policy</p>
                            </b>
                            <div class="snow-editor">
                              <ReactQuill
                                theme="snow"
                                value={privacyPolicy}
                                onChange={(data) => {
                                  setPrivacyPolicy(data);
                                }}
                                modules={modules}
                                formats={formats}
                              />
                            </div>
                          </div>
                        )}

                        {selectedTab == 3 && (
                          <div class="mb-4">
                            <b>
                              <p class="text-muted">About us</p>
                            </b>
                            <div class="snow-editor">
                              <ReactQuill
                                theme="snow"
                                value={aboutUs}
                                onChange={(data) => {
                                  setAboutUs(data);
                                }}
                                modules={modules}
                                formats={formats}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {!loader && (
                    <div class="text-end mb-4" style={{ marginRight: "20px" }}>
                      <button
                        type="submit"
                        // onClick={handleSubmit}
                        disabled={updateLoader}
                        class="btn btn-success w-sm"
                      >
                        {updateLoader ? "Updating..." : "Update"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CMS;
