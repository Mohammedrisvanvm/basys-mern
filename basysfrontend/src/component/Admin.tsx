import { useEffect, useState } from "react";
import { axiosBase } from "../api/axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const Navigate = useNavigate();
  interface Entity {
    id: number;
    nameOfEntity: string;
    personName: string;
    email: string;
    phoneNumber: string;
    age: string;
    gender: string;
    password: string;
    taxID: string | null;
    providerLicenseNumber: string;
    NPI: string;
    specialty: string;
    payerPlansSupported: string;
    providerNetworksCovered: string | null;
    nextStep: string;
    addresses: any[];
    Documentes: any[]; // You can specify the structure of Documentes if needed
}
  const [entity,setEntity]=useState<Entity[]|null>(null)
  useEffect(() => {
    axiosBase.get("/admin/entities").then((res:any) => {
      setEntity(res.data.entities)
    });
  },[]);
  console.log(entity);
  
  return (
    <div className="p-10 border">
      <h1 className="text-3xl">Admin-Entity Table</h1>
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
                Name
              </th>
              <th scope="col" className="px-6 py-3">
              Entity Name
              </th>

              <th scope="col" className="px-6 py-3">
                age
              </th>

              <th scope="col" className="px-6 py-3">
                email
              </th>


              <th scope="col" className="px-6 py-3">
              providerLicenseNumber
              </th>
              <th scope="col" className="px-6 py-3">
              NPI
              </th>
              <th scope="col" className="px-6 py-3">
              phoneNumber
              </th>
              {/* <th scope="col" className="px-6 py-3">
                Status
              </th> */}
              {/* <th scope="col" className="px-6 py-3">
                Action
              </th> */}
            </tr>
          </thead>
          <tbody className=" ">
            {entity
              ? entity.map((item, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">{index + 1}</td>

                    <td className="px-6 py-4"> {item.personName}</td>
                    <td className="px-6 py-4"> {item.nameOfEntity}</td>
                  
                    <td className="px-6 py-4"> {item.age}</td>
                    <td className="px-6 py-4"> {item.email}</td>
                    <td className="px-6 py-4"> {item.providerLicenseNumber}</td>
                  
                    <td className="px-6 py-4"> {item.NPI}</td>
                    <td className="px-6 py-4"> {item.phoneNumber}</td>
                  
                 
                  </tr>
                ))
              : "not one"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
