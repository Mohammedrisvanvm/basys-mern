import { useEffect } from "react";
import { axiosBase } from "../api/axios";

const Admin = () => {
  useEffect(() => {
    axiosBase.get("/admin").then((res) => {
      console.log(res);
    });
  });
  return (
    <div>
      <h1 className="text-3xl">admin</h1>
    </div>
  );
};

export default Admin;
