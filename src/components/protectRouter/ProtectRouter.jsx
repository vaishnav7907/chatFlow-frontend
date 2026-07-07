import { Navigate, Outlet } from "react-router-dom";

const ProtectRouter = ({isauth }) => {
  return isauth ? <Outlet /> : <Navigate to="/authentication" replace />;
};

export default ProtectRouter;
