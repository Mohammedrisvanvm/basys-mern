import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRouters from "./route/admin.route";
import HomeRouters from "./route/home.route";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {

  return (
    <>
     <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<HomeRouters />} />
          <Route path="/admin/*" element={<AdminRouters />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
