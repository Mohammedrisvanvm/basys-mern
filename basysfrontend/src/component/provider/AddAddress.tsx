import React, { ChangeEvent, useEffect, useState } from "react";
import { axiosBase } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const [street, setStreet] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const Navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (!state || !street || !city || !country || !postalCode) {
        console.log(state, street, city, country, postalCode);
      }

      axiosBase
        .post("/entity/updateAddress", {
          state,
          street,
          city,
          country,
          postalCode,
        })
        .then((res: any) => {
          console.log(res);
          Navigate("/verification");
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="text-3xl">Create Address Form</div>

      <div className="container flex justify-around p-6">
        <div className="w-96">
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">street</label>
            <input
              id="street"
              type="string"
              onChange={(e) => setStreet(e.target.value)}
              value={street}
              placeholder="Enter your street"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">City</label>
            <input
              id="city"
              type="string"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              placeholder="Enter your city"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">State</label>
            <input
              id="state"
              type="string"
              onChange={(e) => setState(e.target.value)}
              value={state}
              placeholder="Enter state"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="string"
              onChange={(e) => setPostalCode(e.target.value)}
              value={postalCode}
              placeholder="Enter your postalCode"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Country</label>
            <input
              id="country"
              type="country"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              placeholder="Enter your country"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>

          <div className="mb-3">
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="mb-1.5 block w-full text-center text-white bg-black hover:bg-white hover:text-black hover:rounded-md hover:border-2 px-2 py-1.5 rounded-md"
            >
              update address
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
