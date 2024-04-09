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
  const [entity, setEntity] = useState<Entity[] | null>(null);
  useEffect(() => {
    axiosBase.get("/admin/entities").then((res: any) => {
      setEntity(res.data.entities);
    });
  }, []);
  console.log(entity);

  return (
    <div className="p-10 border">
      <h1 className="text-3xl">Admin</h1>
      <div className="flex justify-around">
        <div className="mb-3 flex justify-start mt-10">
          <button
            onClick={() => Navigate("/admin/users")}
            type="submit"
            className="mb-1.5 block w-22 text-center text-white bg-black hover:bg-white hover:text-black hover:rounded-md hover:border-2 px-2 py-1.5 rounded-md"
          >
            users
          </button>
        </div>
        <div className="mb-3 flex justify-end mt-10">
          <button
            onClick={() => Navigate("/admin/createuser")}
            type="submit"
            className="mb-1.5 block w-22 text-center text-white bg-black hover:bg-white hover:text-black hover:rounded-md hover:border-2 px-2 py-1.5 rounded-md"
          >
            Create User
          </button>
        </div>
        <div className="mb-3 flex justify-end mt-10">
          <button
            onClick={() => Navigate("/admin/entities")}
            type="submit"
            className="mb-1.5 block w-22 text-center text-white bg-black hover:bg-white hover:text-black hover:rounded-md hover:border-2 px-2 py-1.5 rounded-md"
          >
            entities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
