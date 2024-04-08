import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosBase } from "../../api/axios";

const ProviderData = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [entity, setSelectedValue] = useState<string>("provider");

  // Function to handle radio button change
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  console.log(entity);

  const Navigate = useNavigate();
  const handleSubmit = async () => {
    if (!email || !password) {
      return;
    }
    console.log(email, password);
    axiosBase.post("/admin/signin", { email, password }).then((res: any) => {
      console.log(res);
      if (res.status == 200) {
        localStorage.setItem("token", res.data.token);
        console.log(res.data.user);
        Navigate("/admin");
      } else {
        console.log(res.response.data.message);
      }
    });

    // axios
  };
  return (
    <>
      <div className="text-3xl">Create Provider/Payer Form</div>

      <div className="container flex justify-around p-6">
        <div className="w-96">
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                value="provider"
                checked={entity === "provider"}
                onChange={() => handleRadioChange("provider")}
              />
              <span className="ml-2">provider</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                value="payer"
                checked={entity === "payer"}
                onChange={() => handleRadioChange("payer")}
              />
              <span className="ml-2">payer</span>
            </label>
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Email</label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8"></div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=" "
                name="vehicleName"
                required
              />

              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                vehicle Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                // value={values.year}
                // onChange={handleChange}
                // onBlur={handleBlur}
                name="year"
                id="floating_company"
                className={`
                     block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                placeholder=""
                required
              />

              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                year
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Email</label>
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
            <label className="mb-2 block text-xs font-semibold">Email</label>
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
            <label className="mb-2 block text-xs font-semibold">Email</label>
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
            <label className="mb-2 block text-xs font-semibold">Email</label>
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
            <label className="mb-2 block text-xs font-semibold">Password</label>
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
    </>
  );
};

export default ProviderData;
