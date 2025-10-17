import React, { useEffect, useState } from 'react';
import Header from '../../layouts/Header';
import Sidebar from '../../layouts/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import './User.css';
import ColDetail from '../../layouts/ColDetail';
import { IoMdArrowRoundBack } from 'react-icons/io';
import moment from 'moment';
import { routeConst } from '../../baseNavigator/navigationConst';

const UserDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location?.state?.data);

    useEffect(() => {
        if (!location?.state?.data) {
            navigate(routeConst.user);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('popstate', () => {
            navigate(routeConst.user, { state: { page: location?.state?.page } });
            window.removeEventListener('popstate', () => { });
        });
    }, [navigate, location]);

    const isFullWidth = (text) => text?.length > 200;

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
                                    <h4 class="mb-sm-0">User Details</h4>

                                    <div class="page-title-right">
                                        <ol class="breadcrumb m-0">
                                            <li class="breadcrumb-item"><a style={{ cursor: 'pointer' }} onClick={() => { navigate(routeConst.user, { state: { page: location?.state?.page } }) }}>User</a></li>
                                            <li class="breadcrumb-item active">User Details</li>
                                        </ol>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row mb-4">
                                        <div class="mx-auto">
                                            <span style={{ fontSize: '18px', fontWeight: '700' }}>
                                                <IoMdArrowRoundBack style={{ cursor: 'pointer' }} onClick={() => { navigate(routeConst.user, { state: { page: location?.state?.page } }) }} /> Details of {user?.userName}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row mt-5">
                                        <ColDetail title="Name" data={user?.firstName ? (user?.firstName + " " + user?.lastName) : "N/A"} />
                                        <ColDetail title="Username" data={user?.userName || "N/A"} />
                                        <ColDetail title="Email" data={user?.email || "N/A"} />
                                        <ColDetail title="Phone No." data={user?.phoneNumber ? ("+" + user?.countryCode + " " + user?.phoneNumber) : "N/A"} />
                                        <ColDetail title="Total Request" data={user?.totalRequests} />
                                        <ColDetail title="Active Request" data={user?.activeRequests} />
                                        <ColDetail title="Disable Request" data={user?.disabledRequests} />
                                        <ColDetail title="Submitted Request" data={user?.interestedRequests} />
                                        <ColDetail title="Current Subscription" data={
                                            user?.subscription?.totalRequest > 0 ?
                                                user?.subscription?.totalRequest === 20 ? "Monthly" :
                                                    user?.subscription?.totalRequest === 600 ? "Quarterly" :
                                                        user?.subscription?.totalRequest === 2000 && "Yearly"
                                                : "N/A"
                                        } />
                                        <ColDetail title="Points" data={
                                            user?.subscription?.totalRequest > 0
                                                ? user?.subscription?.numberOfRequests + " / " + user?.subscription?.totalRequest : "N/A"
                                        } />
                                        <ColDetail title="Subscription Expiry" data={
                                            user?.subscription?.totalRequest > 0
                                                ? moment(user?.subscription?.expiryDate).format('DD-MM-YY') : "N/A"
                                        } />
                                        <ColDetail title="Rating" data={user?.averageRating.toFixed(2) || "N/A"} />
                                        <ColDetail title="Registration Date" data={moment(user?.createdAt).format('DD-MM-YY')} />
                                        <ColDetail title="Account Creation Time" data={moment(user?.createdAt).format('LTS')} />
                                        <ColDetail title="User Type" data={user?.institutions ?
                                            <div className='d-flex'>
                                                <p style={{ marginRight: '5px' }}>Institution</p>
                                                <i className="ri-building-line"></i>
                                            </div>
                                            :
                                            <div className='d-flex'>
                                                <p style={{ marginRight: '5px' }}>Individual</p>
                                                <i className="ri-user-fill"></i>
                                            </div>
                                        } />
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <h5>List Of Institutions</h5>
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>CRN Of Institute</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {user?.institutions?.length > 0 ? (
                                                                user?.institutions?.map((funder, index) => (
                                                                    <tr key={index}>
                                                                        <td>{funder?.CRN}</td>
                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td style={{ textAlign: 'center' }} colSpan="3">No Institutions available</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-lg-6">
                                                    <h5>List Of License</h5>
                                                    <table className="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>License</th>
                                                                <th>Status</th>
                                                                <th>Rejected Reason</th>
                                                                <th>Expiry Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {user?.licenses?.license ? (
                                                                user?.licenses?.license.map((license, index) => (
                                                                    <>
                                                                        <tr>
                                                                            <td>
                                                                                {license?.licenseType == "personal" ? "MAWTHOOQ (Personal Advertising License)" :
                                                                                    license?.licenseType == "realEstate" ? "FAL (Real Estate Marketing License)" :
                                                                                        license?.licenseType == "legal" && "LAWYER (Legal Practice License)"}
                                                                            </td>
                                                                            <td>
                                                                                <a style={{ textDecoration: 'underline' }} href={license?.licenseFile} class="link-primary" target="_blank">
                                                                                    Link
                                                                                </a>
                                                                            </td>
                                                                            <td>
                                                                                {license?.licenseStatus == 1 ? <span className="badge bg-warning-subtle text-warning">Pending</span> :
                                                                                    license?.licenseStatus == 2 ? <span className="badge bg-success-subtle text-success">Approved</span> :
                                                                                        license?.licenseStatus == 3 ? <span className="badge bg-danger-subtle text-danger">Rejected</span> :
                                                                                            <span className="badge bg-danger-subtle text-danger">Expired</span>}
                                                                            </td>
                                                                            <td>
                                                                                {license?.licenseStatus == 3 ? license?.rejectedReason : "N/A"}
                                                                            </td>
                                                                            <td>
                                                                                {license?.licenseStatus == 2 ? moment(license?.expiryDate).format('DD-MM-YY') : "N/A"}
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td style={{ textAlign: 'center' }} colSpan="3">No License Available</td>
                                                                </tr>
                                                            )}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-4">
                                        <h5>Reports</h5>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Full Name</th>
                                                    <th>Username</th>
                                                    <th>email</th>
                                                    <th>report</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user?.report?.length > 0 ? (
                                                    user?.report?.map((report, index) => (
                                                        <tr key={index}>
                                                            <td>{report?.reporterDetails?.firstName + " " + report?.reporterDetails?.lastName}</td>
                                                            <td>{report?.reporterDetails?.userName}</td>
                                                            <td>{report?.reporterDetails?.email}</td>
                                                            <td>{report?.description}</td>
                                                            <td>{moment(report?.createdAt).format('lll')}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }} colSpan="5">No Reports available</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
