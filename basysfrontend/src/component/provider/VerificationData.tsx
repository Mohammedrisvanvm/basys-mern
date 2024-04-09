import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { axiosBase } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const VerificationData = () => {
  const [frontLicense, setFrontLicense] = useState<File | null>(null);
  const [backLicense, setBackLicense] = useState<File | null>(null);
  const [frontInsurance, setFrontInsurance] = useState<File | null>(null);
  const [backInsurance, setBackInsurance] = useState<File | null>(null);
  const [imageData, setImageData] = useState<File[]>([]);
  const [Error, setError] = useState<string | null>(null);
  const Navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (imageData.length > 4) {
      return setImageData([]);
    }
    try {
      if (!frontLicense || !backLicense || !frontInsurance || !backInsurance) {
        setError("Please complete the form data");
        return;
      }

      setImageData((prevImageData) => [
        frontLicense,
        backLicense,
        frontInsurance,
        backInsurance,
        ...prevImageData,
      ]);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (imageData.length !== 4) {
      setError("An unexpected error occurred");
      return;
    }

    const formData = new FormData();
    imageData.forEach((file: File) => {
      formData.append("images", file);
    });
    console.log(formData);

    axiosBase
      .post("/entity/verification", formData)
      .then((res: any) => {
        console.log(res);
        if (res.status == 201) {
          Navigate("/admin/login");
        }
      })
      .catch((Error: any) => {
        console.log(Error);
      });
  }, [imageData]);
  const resetState = () => {
    setFrontLicense(null);
    setBackLicense(null);
    setFrontInsurance(null);
    setBackInsurance(null);
    setImageData([]);
  };

  return (
    <>
      <div className="justify-between sm:mt-5">
        <h5 className="sm:m-16 m-10 text-xl text-center font-bold leading-none sm:text-2xl">
          Profile verification
        </h5>
        <form onSubmit={handleSubmit}>
          <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
            License Details
          </h5>
          <div className="relative grid gap-4 grid-cols-1 sm:grid-cols-2 ">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {frontLicense ? (
                    <span className="text-green-500">completed</span>
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="licensefront"
                  required
                  type="file"
                  className="hidden"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setFrontLicense(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            <h3 className="text-center sm:hidden"> Front</h3>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {backLicense ? (
                    <span className="text-green-500">completed</span>
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="BackLicense"
                  required
                  type="file"
                  className="hidden"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setBackLicense(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
            <h3 className="text-center sm:hidden "> Back</h3>
            <div className="text-center font-semibold hidden sm:block">
              Front
            </div>
            <div className="text-center hidden sm:block font-semibold">
              Back
            </div>
          </div>
          <h5 className="my-8 text-sm text-center font-semibold leading-none sm:text-xl">
            Insurance Details
          </h5>
          <div className="relative grid gap-4 grid-cols-1 sm:grid-cols-2 mt-6 ">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {frontInsurance ? (
                    <span className="text-green-500">completed</span>
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>{" "}
                    </>
                  )}
                </div>
                <input
                  id="frontInsurance"
                  required
                  type="file"
                  className="hidden"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setFrontInsurance(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            <h3 className="text-center sm:hidden"> Front</h3>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full mx-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {backInsurance ? (
                    <span className="text-green-500">completed</span>
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="backInsurance"
                  required
                  type="file"
                  className="hidden"
                  onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setBackInsurance(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
            <h3 className="text-center sm:hidden "> Back</h3>
            <div className="text-center font-semibold hidden sm:block">
              Front
            </div>
            <div className="text-center hidden sm:block font-semibold">
              Back
            </div>
          </div>
          <div className="m-6 flex justify-center">
            <button
              onClick={resetState}
              className=" text-red-600 flex text-center"
            >
              Reset
            </button>
          </div>

          <div className="m-6 flex justify-center">
            <button
              type="submit"
              className="text-white  bg-blue-700 hover:bg-blue-700 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default VerificationData;
