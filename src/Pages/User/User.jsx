import React, { useEffect, useState } from "react";
import Sidebar from "../../layouts/Sidebar";
import Header from "../../layouts/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { displayErrorToast } from "../../Utills/displayToasts";
import Swal from "sweetalert2";
import moment from "moment";
import { Tooltip as ReactTooltip } from "react-tooltip";
// import { getUser, updateUserStatus } from "../../Services/user";
import ReactPaginate from "react-paginate";
import { GrPrevious, GrNext } from "react-icons/gr";
import { routeConst } from "../../baseNavigator/navigationConst";
import SliderModal from "../../layouts/SliderModal";
import { concatImageURL } from "../../constants/globalConst";

const User = () => {
  const recordsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(false);
  const [User, SetUser] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [data, setData] = useState({});
  const [selectedPage, setSelectedPage] = useState(1);
  const [mainArrayUser, setMainArrayUser] = useState({});
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [url, setUrl] = useState([]);
  const [flag, setFlag] = useState("");

  const getUserList = async (select) => {
    try {
      setLoader(true);
      if (!mainArrayUser[select || selectedPage]) {
        const paginateData = {
          page: select || selectedPage,
          limit: recordsPerPage,
          search: searchText,
          status: status,
        };
        // const response = await getUser(paginateData);
        const response = "";
        if (response?.success) {
          const fetchedData = response?.data?.users;
          setTotalPage(response?.data?.totalPages);
          const mergeData = {
            ...mainArrayUser,
            [select || selectedPage]: fetchedData,
          };
          setMainArrayUser(mergeData);
          SetUser(fetchedData);
        } else {
          displayErrorToast(
            response?.message || "Something went wrong while fetching User"
          );
        }
      } else {
        SetUser(mainArrayUser[select || selectedPage]);
      }
    } catch (error) {
      console.error(error.message);
      displayErrorToast(
        error.message || "Something went wrong while getting data of User"
      );
    } finally {
      setLoader(false);
      navigate(location.pathname, { replace: true, state: null });
    }
  };

  const appendData = async (select, size, search) => {
    try {
      setLoader(true);
      const paginateData = {
        page: select || selectedPage,
        limit: size || recordsPerPage,
        search: search,
        status: status,
      };
      setSelectedPage(select || selectedPage);
      //   const response = await getUser(paginateData);
      const response = "";
      if (response?.success) {
        const fetchedData = response?.data?.users;
        setTotalPage(response?.data?.totalPages);
        const mergeData = { [select || selectedPage]: fetchedData };
        setMainArrayUser(mergeData);
        SetUser(fetchedData);
      } else {
        displayErrorToast(
          response?.message || "Something went wrong while fetching User"
        );
      }
    } catch (error) {
      console.error(error.message);
      displayErrorToast(
        error.message || "Something went wrong while getting data of User"
      );
    } finally {
      setLoader(false);
      navigate(location.pathname, { replace: true, state: null });
    }
  };

  //   useEffect(() => {
  //     appendData(location?.state?.page || 1, recordsPerPage, searchText);
  //   }, [status]);

  const handleDelete = (elem) => {
    Swal.fire({
      // title: 'Are you sure?',
      html: `
                <div style="text-align: center;">
                    <lord-icon 
                        src="https://cdn.lordicon.com/gsqxdxog.json" 
                        trigger="loop" 
                        colors="primary:#f7b84b,secondary:#f06548" 
                        style="width:100px;height:100px">
                    </lord-icon>
                    <h3>Are you sure?</h3>
                    <p style="font-size: 16px; color: #333;">You won't be able to revert this!</p>
                </div>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const object = {
            userId: elem?._id,
            status: "delete",
          };
          // let response = await updateUserStatus(object);
          let response = "";
          if (response?.success) {
            Swal.fire(
              "Deleted!",
              response?.message || "Your User has been deleted.",
              "success"
            );
            SetUser((prevUsers) =>
              prevUsers.map((user) =>
                user._id === elem?._id ? { ...user, isActive: 3 } : user
              )
            );
            let temp = mainArrayUser;
            temp[selectedPage] = temp[selectedPage].map((post) =>
              post._id === elem?._id
                ? {
                    ...post,
                    isActive: 3,
                  }
                : post
            );
            setMainArrayUser(temp);
          } else {
            Swal.fire(
              "Error!",
              response?.message || "Something went wrong while deleting User",
              "error"
            );
          }
        } catch (error) {
          console.error(error.message);
          Swal.fire(
            "Error!",
            error.message || "Something went wrong while deleting User",
            "error"
          );
        }
      }
    });
  };

  const onChangeSearchComponent = async (e) => {
    setSearchText(e?.target?.value?.trimStart());
    setSelectedPage(1);
    await appendData(1, recordsPerPage, e?.target?.value?.trimStart());
  };

  const handlePageClick = async (data) => {
    setLoader(true);
    const pageNo = data.selected + 1;
    await getUserList(pageNo);
    setSelectedPage(pageNo);
  };

  const changeStatus = async (elem) => {
    try {
      Swal.fire({
        // title: 'Are you sure?',
        html: `
                    <div style="text-align: center;">
                        <h3>Are you sure?</h3>
                        <p style="font-size: 16px; color: #333;">You want to ${
                          elem?.isActive == 2 ? "unblock" : "block"
                        } this user</p>
                    </div>`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${
          elem?.isActive == 2 ? "unblock" : "block"
        } it!`,
        icon: "warning",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const object = {
              userId: elem?._id,
              status: elem?.isActive == 2 ? "unblock" : "block",
            };
            // let response = await updateUserStatus(object);
            let response = "";
            if (response?.success) {
              Swal.fire(
                elem?.isActive == 2 ? "Unblocked!" : "Blocked!",
                response?.message ||
                  `Your User has been ${
                    elem?.isActive == 2 ? "unblocked" : "blocked"
                  }.`,
                "success"
              );
              SetUser((prevUsers) =>
                prevUsers.map((user) =>
                  user._id === elem?._id
                    ? { ...user, isActive: elem?.isActive == 2 ? 1 : 2 }
                    : user
                )
              );
              let temp = mainArrayUser;
              temp[selectedPage] = temp[selectedPage].map((post) =>
                post._id === elem?._id
                  ? {
                      ...post,
                      isActive: elem?.isActive == 2 ? 1 : 2,
                    }
                  : post
              );
              setMainArrayUser(temp);
            } else {
              Swal.fire(
                "Error!",
                response?.message ||
                  "Something went wrong while updating status",
                "error"
              );
            }
          } catch (error) {
            console.error(error.message);
            Swal.fire(
              "Error!",
              error.message || "Something went wrong while updating status",
              "error"
            );
          }
        }
      });
    } catch (error) {
      console.error(error.message);
      displayErrorToast(
        error.message || "Something went wrong while updating status"
      );
    }
  };

  const handleImageModal = (img, flag) => {
    setImageModal(true);
    setFlag(flag);
    setUrl(img);
  };

  return (
    <div id="layout-wrapper">
      <Header />
      <Sidebar />
      {imageModal && (
        <SliderModal
          activeModal={imageModal}
          setActiveModal={() => {
            setImageModal(false);
            setUrl([]);
            setFlag("");
          }}
          img={url}
          flag={flag}
        />
      )}
      <div class="main-content">
        <div class="page-content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 class="mb-sm-0">User</h4>
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
                      <li class="breadcrumb-item active">User</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-body">
                    <div
                      id="table-gridjs"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      {/* <div class="gridjs-head">
                        <div class="gridjs-search">
                          <input
                            type="search"
                            value={searchText}
                            onChange={(e) => onChangeSearchComponent(e)}
                            placeholder="Type a keyword..."
                            aria-label="Type a keyword..."
                            class="gridjs-input gridjs-search-input"
                          />
                        </div>
                        <div class="hstack gap-2 justify-content-end">
                          <select
                            className="form-select"
                            style={{ backgroundColor: "white", width: "120px" }}
                            name="platformName"
                            value={status}
                            onChange={(e) => {
                              setStatus(e.target?.value);
                            }}
                          >
                            <option value="">All</option>
                            <option value="1">Active</option>
                            <option value="2">Blocked</option>
                            <option value="3">Deleted</option>
                          </select>
                        </div>
                      </div> */}
                      <div
                        class="gridjs-wrapper mt-4"
                        style={{ overflow: "auto" }}
                      >
                        <table class="gridjs-table">
                          <thead>
                            <tr class="gridjs-header">
                              <th class="gridjs-th">#</th>
                              <th class="gridjs-th">Image</th>
                              <th class="gridjs-th">Full Name</th>
                              <th class="gridjs-th">Email</th>
                              <th class="gridjs-th">Phone Number</th>
                              <th class="gridjs-th">Registration Date</th>
                              <th class="gridjs-th">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {/* {loader ? (
                              <tr class="gridjs-tr">
                                <td
                                  style={{ textAlign: "center" }}
                                  class="gridjs-td"
                                  colSpan={21}
                                >
                                  <div
                                    class="spinner-border text-primary"
                                    role="status"
                                  >
                                    <span class="sr-only">Loading...</span>
                                  </div>
                                </td>
                              </tr>
                            ) : User && User.length > 0 ? (
                              User.map((elem, index) => (
                                <tr key={elem?._id} class="gridjs-tr">
                                  <td class="gridjs-td">
                                    <span class="fw-semibold">
                                      {recordsPerPage * (selectedPage - 1) +
                                        (index + 1)}
                                    </span>
                                  </td>
                                  <td className="gridjs-td">
                                    {elem?.profilePicture ? (
                                      <img
                                        loading="lazy"
                                        src={concatImageURL(
                                          elem?.profilePicture
                                        )}
                                        alt="Profile Picture"
                                        onClick={() => {
                                          handleImageModal(
                                            [elem?.profilePicture],
                                            "Profile Picture"
                                          );
                                        }}
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                          cursor: "pointer",
                                        }}
                                      />
                                    ) : (
                                     
                                    )}
                                  </td>
                                  <td class="gridjs-td">
                                    {elem?.firstName
                                      ? elem?.firstName + " " + elem?.lastName
                                      : "-"}
                                  </td>
                                  <td class="gridjs-td">
                                    {elem?.email ? elem?.email : "-"}
                                  </td>
                                  <td class="gridjs-td">
                                    {elem?.phoneNumber
                                      ? "+" +
                                        elem?.countryCode +
                                        " " +
                                        elem?.phoneNumber
                                      : "-"}
                                  </td>
                                  <td class="gridjs-td">
                                    {elem?.createdAt
                                      ? moment(elem?.createdAt).format(
                                          "DD-MM-YYYY"
                                        )
                                      : "-"}
                                  </td>
                                  <td class="gridjs-td">
                                    <div
                                      className="d-flex"
                                      style={{ alignItems: "center" }}
                                    >
                                      {elem?.isActive == 3 ? (
                                        <i
                                          style={{
                                            color: "red",
                                            marginRight: "10px",
                                          }}
                                        >
                                          Deleted
                                        </i>
                                      ) : (
                                        <>
                                          {elem?.isActive == 2 ? (
                                            <>
                                              <ReactTooltip id="unblock-user" />
                                              <i
                                                data-tooltip-place="bottom"
                                                data-tooltip-id="unblock-user"
                                                data-tooltip-content="Unblock User"
                                                style={{
                                                  cursor: "pointer",
                                                  color: "green",
                                                  fontSize: "20px",
                                                  marginRight: "10px",
                                                }}
                                                class="bx bx-refresh"
                                                onClick={() =>
                                                  changeStatus(elem)
                                                }
                                              ></i>
                                            </>
                                          ) : (
                                            <>
                                              <ReactTooltip id="block-user" />
                                              <i
                                                data-tooltip-place="bottom"
                                                data-tooltip-id="block-user"
                                                data-tooltip-content="Block User"
                                                style={{
                                                  cursor: "pointer",
                                                  color: "red",
                                                  fontSize: "20px",
                                                  marginRight: "10px",
                                                }}
                                                class=" bx bx-block"
                                                onClick={() =>
                                                  changeStatus(elem)
                                                }
                                              ></i>
                                            </>
                                          )}
                                          <>
                                            <ReactTooltip id="delete-user" />
                                            <i
                                              data-tooltip-place="bottom"
                                              data-tooltip-id="delete-user"
                                              data-tooltip-content="Delete User"
                                              style={{
                                                cursor: "pointer",
                                                color: "red",
                                                fontSize: "20px",
                                                marginRight: "10px",
                                              }}
                                              class="ri-delete-bin-2-fill"
                                              onClick={() => handleDelete(elem)}
                                            ></i>
                                          </>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr class="gridjs-tr">
                                <td
                                  style={{ textAlign: "center", color: "red" }}
                                  class="gridjs-td"
                                  colSpan={21}
                                >
                                  No data found
                                </td>
                              </tr>
                            )} */}
                            <tr class="gridjs-tr">
                              <td class="gridjs-td">1</td>
                              <td class="gridjs-td">N/A</td>
                              <td class="gridjs-td">Alex</td>
                              <td class="gridjs-td">Alex123@gmail.com</td>
                              <td class="gridjs-td">9090909090</td>
                              <td class="gridjs-td">24/02/2025</td>
                              <td class="gridjs-td">
                                {" "}
                                <>
                                  <ReactTooltip id="delete-user" />
                                  <i
                                    data-tooltip-place="bottom"
                                    data-tooltip-id="delete-user"
                                    data-tooltip-content="Delete User"
                                    style={{
                                      cursor: "pointer",
                                      color: "red",
                                      fontSize: "20px",
                                      marginRight: "10px",
                                    }}
                                    class="ri-delete-bin-2-fill"
                                    onClick={() => handleDelete(elem)}
                                  ></i>
                                </>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div
                      style={{
                        justifyContent: "center",
                        width: "100%",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <ReactPaginate
                        previousLabel={
                          <GrPrevious style={{ color: "black" }} />
                        }
                        nextLabel={<GrNext style={{ color: "black" }} />}
                        pageCount={totalPage || 1}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active-pagination bg-primary"}
                        forcePage={selectedPage - 1}
                        pageLinkClassName={"list-item-paginate-class-name"}
                        pageClassName={"pagination-page"}
                        breakClassName={"pagination-break"}
                      />
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

export default User;
