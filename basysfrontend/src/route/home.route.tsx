import { Route, Routes } from "react-router-dom";
import HomePage from "../component/HomePage";
import ProviderData from "../component/provider/ProviderData";
import VerificationData from "../component/provider/VerificationData";
import AddAddress from "../component/provider/AddAddress";
import UserLogin from "../component/user/UserLogin";
import PwChange from "../component/user/PwChange";



const HomeRouters = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/provider" element={<ProviderData />} />
        <Route path="/changepassword" element={<PwChange />} />
        <Route path="/verification" element={<VerificationData />} />
        <Route path="/address" element={<AddAddress />} />
      </Routes>
    </>
  );
};

export default HomeRouters;
