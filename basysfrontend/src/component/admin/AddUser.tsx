import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosBase } from "../../api/axios";

const AddUser = () => {
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [npi, setNpi] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (!email || !firstName || !lastName || !password || !nickName || !npi) {
        console.log(email, firstName, lastName, password, nickName, npi);
      }

      axiosBase
        .post("/admin/user/create", {
          email,
          firstName,
          lastName,
          nickName,
          npi,
          password,
        })
        .then((res: any) => {
          console.log(res.status);
          if (res.status == 200) {
            Navigate("/admin");
          }
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="text-3xl">Create User Form</div>

      <div className="container flex justify-around p-6">
        <div className="w-96">
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">
              First Name
            </label>
            <input
              id="firstName"
              type="string"
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
              placeholder="Enter your firstName"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">
              Last Name
            </label>
            <input
              id="lastName"
              type="string"
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
              placeholder="Enter your lastName"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">
              Nick Name
            </label>
            <input
              id="nickName"
              type="string"
              onChange={(e) => setNickName(e.target.value)}
              value={nickName}
              placeholder="Enter your nickName"
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
              placeholder="Enter email"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Npi</label>
            <input
              id="npi"
              type="string"
              onChange={(e) => setNpi(e.target.value)}
              value={npi}
              placeholder="Enter your npi number"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">password</label>
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
              Create User
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
