import { Navigate } from "react-router-dom";
import { routeConst } from "./navigationConst";
// import { useSelector } from "react-redux";

const ProtectedRoutes = ({ element }) => {
  // const userData = useSelector((state) => state?.userReducer)
  const userData = "";
  const token = userData?.loginCredential;
  if (token) {
    return <Navigate to={routeConst?.dashboard} />;
  }

  return element;
};
export default ProtectedRoutes;

export const ProtectedRoutesLogin = ({ element }) => {
  const userData = "";
  // const userData = useSelector((state) => state?.userReducer)
  const token = userData?.loginCredential;
  if (!token) {
    return <Navigate to={routeConst?.login} />;
  }
  return element;
};
