import { Route, Routes } from "react-router-dom";
import Admin from "../component/Admin";
import AdminLogin from "../component/admin/Auth";
import AddUser from "../component/admin/AddUser";
import UserTable from "../component/admin/UserTable";
import EntityTable from "../component/admin/EntityTable";

const AdminRouters = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/entities" element={<EntityTable />} />
        <Route path="/createuser" element={<AddUser />} />
      </Routes>
    </>
  );
};

export default AdminRouters;
