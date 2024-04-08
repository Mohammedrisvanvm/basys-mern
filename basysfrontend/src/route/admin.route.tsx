import { Route, Routes } from "react-router-dom";
import Admin from "../component/Admin";
import AdminLogin from "../component/admin/Auth";

const AdminRouters = () => {
    return (
      <>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      </>
    );
  };
  
  export default AdminRouters;