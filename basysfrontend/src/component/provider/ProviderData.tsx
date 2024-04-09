import React, {
  ChangeEvent,
  Dispatch,
  HtmlHTMLAttributes,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { axiosBase } from "../../api/axios";

const ProviderData = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [personName, setPersonName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [licenceNumber, setLicenceNumber] = useState<string>("");
  const [taxId, setTaxId] = useState<string>("");
  const [npi, setNpi] = useState<string>("");
  const [entity, setSelectedValue] = useState<string>("provider");
  const [gender, setGender] = useState<string>("nil");
  const [specialty, setSpecialty] = useState<string>("");
  const [payerPlan, setPayerPlan] = useState("");
  const [network, setNetwork] = useState("");
  const specialtydata = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Hematology",
    // Add more specialties as needed
  ];
  // State to manage the visibility of the dropdown menu
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle radio button change
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  const handleRadioGenderChange = (value: string) => {
    setGender(value);
  };
  console.log(entity);

  const Navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      if (
        !email ||
        !password ||
        !personName ||
        !age ||
        !gender ||
        !entity ||
        !number
      ) {
        console.log(email, password, age, personName);
        console.log(gender, entity, number);
      }
      if (entity === "provider") {
        setTaxId("");
        setNetwork("");
        if (!licenceNumber || !npi || !specialty || !payerPlan) {
          console.log(licenceNumber, npi, specialty);
          return;
        }
      } else if (entity === "payer") {
        setLicenceNumber("");
        setNpi("");
        setSpecialty("");
        setPayerPlan("");
        if (!taxId || !network) {
          console.log(taxId, network);
          return;
        }
      }

      axiosBase
        .post("/entity/create", {
          email,
          password,
          age,
          personName,
          gender,
          entity,
          number,
          licenceNumber,
          npi,
          taxId,
          specialty,
          payerPlan,
          network,
        })
        .then((res: any) => {
          console.log(res);
          if (res.status == 200) {
            localStorage.setItem("entityToken", res.data.entityToken);
            Navigate("/address");
          }
        });

      // axios
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="text-3xl">Create Provider/Payer Form</div>

      <div className="container flex justify-around p-6">
        <div className="w-96">
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Entity</label>
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
              id="name"
              type="string"
              onChange={(e) => setPersonName(e.target.value)}
              value={personName}
              placeholder="Enter your name"
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
            <label className="mb-2 block text-xs font-semibold">
              Phone Number
            </label>
            <input
              id="number"
              type="string"
              onChange={(e) => setNumber(e.target.value)}
              value={number}
              placeholder="Enter phone Number"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>
          {entity == "payer" ? (
            <>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Tax ID
                </label>
                <input
                  id="number"
                  type="string"
                  onChange={(e) => setTaxId(e.target.value)}
                  value={taxId}
                  placeholder="Enter Tax ID"
                  className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                />
              </div>
              <div>
                <label htmlFor="network">Provider Networks Covered:</label>
                <select
                  id="network"
                  name="network"
                  value={network}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setNetwork(e.target.value)
                  }
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Provider Network</option>
                  <option value="Network A">Network A</option>
                  <option value="Network B">Network B</option>
                  <option value="Network C">Network C</option>
                  {/* Add more provider networks as needed */}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">
                  Licence Number
                </label>
                <input
                  id="number"
                  type="string"
                  onChange={(e) => setLicenceNumber(e.target.value)}
                  value={licenceNumber}
                  placeholder="Enter Tax ID"
                  className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                />
              </div>
              <div className="mb-3">
                <label className="mb-2 block text-xs font-semibold">NPI</label>
                <input
                  id="number"
                  type="string"
                  onChange={(e) => setNpi(e.target.value)}
                  value={npi}
                  placeholder="Enter NPI"
                  className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
                />
              </div>
              <div>
                <label
                  htmlFor="specialty"
                  className="mb-2 block text-xs font-semibold"
                >
                  Specialty:
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={specialty}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setSpecialty(e.target.value)
                  }
                  className="block w-full py-2 px-3 mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Specialty</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  {/* Add more specialties as needed */}
                </select>

                <label
                  htmlFor="payerPlan"
                  className="mb-2 block text-xs font-semibold"
                >
                  Payer Plan Supported:
                </label>
                <select
                  id="payerPlan"
                  name="payerPlan"
                  value={payerPlan}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setPayerPlan(e.target.value)
                  }
                  className="block w-full py-2 px-3 mb-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Select Payer Plan</option>
                  <option value="Plan A">Plan A</option>
                  <option value="Plan B">Plan B</option>
                  <option value="Plan C">Plan C</option>
                  {/* Add more payer plans as needed */}
                </select>
              </div>
            </>
          )}
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Age</label>
            <input
              id="age"
              type="string"
              onChange={(e) => setAge(e.target.value)}
              value={age}
              placeholder="Enter your age"
              className={` flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline `}
            />
          </div>
          <div className="mb-3">
            <label className="mb-2 block text-xs font-semibold">Gender</label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                value=""
                checked={gender === "male"}
                onChange={() => handleRadioGenderChange("male")}
              />
              <span className="ml-2">male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                value="fe"
                checked={gender === "female"}
                onChange={() => handleRadioGenderChange("female")}
              />
              <span className="ml-2">female</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio text-indigo-600 h-5 w-5"
                value=""
                checked={gender === "nil"}
                onChange={() => handleRadioGenderChange("nil")}
              />
              <span className="ml-2">nil</span>
            </label>
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
