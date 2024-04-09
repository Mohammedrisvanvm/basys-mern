import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import React from "react";
import { axiosBase } from "../../api/axios";

const UserTable = () => {
  const [modalData, setModalData] = React.useState<any>();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [npi, setNpi] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const Navigate = useNavigate();

  const [users, setUsers] = useState<[] | null>(null);
  useEffect(() => {
    axiosBase.get("/admin/users").then((res: any) => {
      setUsers(res.data.users);
    });
  }, []);

  const handleVerify = async () => {
    try {
      console.log(
        firstName,
        lastName,
        email,
        nickName,
        npi,
        password,
        confirmPassword
      );
      if (password || (confirmPassword && password != confirmPassword)) {
        console.log(" not match");
      }
      await axiosBase
        .patch("user/edit", {
          firstName,
          lastName,
          email,
          nickName,
          npi,
          password,
        })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.message);
            setShowModal(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10 border">
      <h1 className="text-3xl">Admin-User Table</h1>
      <div className="mb-3 flex justify-end mt-10">
        <button
          onClick={() => Navigate("/admin/createuser")}
          type="submit"
          className="mb-1.5 block w-22 text-center text-white bg-black hover:bg-white hover:text-black hover:rounded-md hover:border-2 px-2 py-1.5 rounded-md"
        >
          Create User
        </button>
      </div>
      <div>
        {" "}
        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400 over">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                index
              </th>

              <th scope="col" className="px-6 py-3">
                firstName
              </th>

              <th scope="col" className="px-6 py-3">
                email
              </th>

              <th scope="col" className="px-6 py-3">
                NPI
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            {users
              ? users.map((item: any, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">{index + 1}</td>

                    <td className="px-6 py-4"> {item.firstName}</td>

                    <td className="px-6 py-4"> {item.email}</td>
                    <td className="px-6 py-4"> {item.npi}</td>

                    <td className="px-6 py-4">
                      {" "}
                      {item.active ? "Active" : "Not Active"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
                        onClick={() => {
                          setModalData(item);
                          setShowModal(true);
                        }}
                      >
                        {" "}
                        action
                      </button>
                      <div>
                        {showModal ? (
                          <div className="fixed inset-0 bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
                            <div className="w-3/6 h-full flex flex-col">
                              <button
                                className="text-white text-xl place-self-end"
                                onClick={() => setShowModal(false)}
                              >
                                x
                              </button>
                              <div className="bg-white p-2 rounded border">
                                <div className="p-6">
                                  <h3 className="text-xl flex justify-center font-semibold mb-5 text-gray-900">
                                    edit
                                  </h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mx-auto sm:mx-28">
                                    <div className="mb-3">
                                      <label className="mb-2 block text-xs font-semibold">
                                        First Name
                                      </label>
                                      <input
                                        id="firstName"
                                        type="string"
                                        onChange={(e) =>
                                          setfirstName(e.target.value)
                                        }
                                        placeholder={`${modalData.firstName}`}
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
                                        onChange={(e) =>
                                          setlastName(e.target.value)
                                        }
                                        value={lastName}
                                        placeholder={`${modalData.lastName}`}
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
                                        onChange={(e) =>
                                          setNickName(e.target.value)
                                        }
                                        value={nickName}
                                        placeholder={`${modalData.nickName}`}
                                        className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label className="mb-2 block text-xs font-semibold">
                                        Email
                                      </label>
                                      <input
                                        id="email"
                                        type="email"
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                        value={email}
                                        placeholder={`${modalData.email}`}
                                        className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                                      />
                                    </div>

                                    <div className="mb-3">
                                      <label className="mb-2 block text-xs font-semibold">
                                        Npi
                                      </label>
                                      <input
                                        id="npi"
                                        type="string"
                                        onChange={(e) => setNpi(e.target.value)}
                                        value={npi}
                                        placeholder={`${modalData.npi}`}
                                        className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                                      />
                                    </div>
                                    <div></div>
                                    <div className="mb-3">
                                      <label className="mb-2 block text-xs font-semibold">
                                        newPassowrd
                                      </label>
                                      <input
                                        id="password"
                                        type="password"
                                        onChange={(e) =>
                                          setPassword(e.target.value)
                                        }
                                        value={password}
                                        placeholder="*****"
                                        className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                                      />
                                    </div>
                                    <div className="mb-3">
                                      <label className="mb-2 block text-xs font-semibold">
                                        Confirm Password
                                      </label>
                                      <input
                                        id="confirmPassword"
                                        type="password"
                                        onChange={(e) =>
                                          setConfirmPassword(e.target.value)
                                        }
                                        value={confirmPassword}
                                        placeholder="*****"
                                        className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                                      />
                                    </div>
                                  </div>

                                  <div className="flex flex-row justify-evenly">
                                    <button
                                      onClick={() => {
                                        setModalData(undefined);
                                        setShowModal(false);
                                      }}
                                      className="text-white mt-10 bg-red-700 hover:bg-red-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
                                    >
                                      cancel
                                    </button>
                                    <button
                                      onClick={() => handleVerify()}
                                      className="text-white  mt-10 bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
                                    >
                                      upload
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              : "not one"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
