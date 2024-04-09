// import { useFormik } from "formik";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { axiosBase } from "../../api/axios";
// import { AdminAuthSchema } from "../../../validationSchemas/validationSchema";

// import { adminAuth } from "../../../services/apis/adminApi/adminApi";

// import { useDispatch } from "react-redux";
// import { setAdmin } from "../../../redux/slice/adminSlice";
// import { useAppSelector } from "../../../redux/store/storeHook";
// import { toastHelper } from "../../../utils/toastConfig";

const UserLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const Navigate = useNavigate();
  const handleSubmit = async () => {
    if (!email || !password) {
      return;
    }
    console.log(email, password);
    axiosBase.post("/user/signin", { email, password }).then((res: any) => {
      console.log(res);
      if (res.status == 200&&res.data.message=="please change password") {
        localStorage.setItem("usertoken", res.data.token);
        Navigate("/changepassword");
      } else {
        console.log(res.response.data.message);
      }
    });

    // axios
  };
 

  return (
    <>
      <div className="relative h-screen ">
        <img
          src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-gray-900 h-screen bg-opacity-75">
          <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex items-center justify-end xl:flex-row">
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                     Login
                  </h3>
                  <div className="mb-3">
                    <label className="mb-2 block text-xs font-semibold">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      placeholder="Enter your email"
                      className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="mb-2 block text-xs font-semibold">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="*****"
                      className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                    />
                  </div>

                  <div className="mb-3">
                    <button
                      onClick={() => handleSubmit()}
                      type="submit"
                      className="mb-1.5 block w-full text-center text-white bg-black hover:bg-white hover:text-black hover:rounded-md hover:border-2 px-2 py-1.5 rounded-md"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
