import { Route, Routes } from "react-router-dom";
import HomePage from "../component/HomePage";

const HomeRouters = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default HomeRouters;

