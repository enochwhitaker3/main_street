import React, { useState } from "react";
import { createSponsorService } from "../../api/sponsor-api/SponsorsService";
import { SponsorType } from "../../../types/sponsors";

const AdminSponsorCreate = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (name != null) {
      setNameError(null);
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    if (name.trim() === "") {
      setNameError("Sponsor Name cannot be empty");
      isValid = false;
    } else {
      setNameError(null);
    }

    return isValid;
  };

  const submitNewSponsor = async (e: React.FormEvent) => {
    setSuccessMessage(null)
    e.preventDefault();
    if (validateForm()) {
      const sponsor: Omit<SponsorType, "id"> = {
        sponsor_name: name,
        sponsor_address: address || null,
        sponsor_phonenumber: phoneNumber || null,
      };

      console.log(sponsor);
      const result = await createSponsorService(sponsor);
      if (result == true) {
        setSuccessMessage("Successfully added sponsor!");
      } else {
        setError("Unable to add sponsor");
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mb-20">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive pt-10 xl:pb-2 underline md:pt-12 md:pb-1 sm:pt-8">
        Add Sponsor
      </h1>
      <div className="h-full mt-5 w-full">
        <div className="flex flex-col items-center h-full justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-2xl xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-creame md:text-2xl">
                Add Sponsor
              </h1>
              <form
                className="flex flex-col space-y-4 md:space-y-6"
                onSubmit={submitNewSponsor}
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-creame">
                    Name
                  </label>
                  <input
                    placeholder="Enter Name"
                    onChange={handleNameChange}
                    className=" border text-creame rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-creame">
                    Address
                  </label>
                  <input
                    placeholder="Enter Address (can be empty)"
                    onChange={handleAddressChange}
                    className=" border  text-creame rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-creame">
                    Phone Number
                  </label>
                  <input
                    placeholder="Enter Phone Number (can be empty)"
                    onChange={handlePhoneNumberChange}
                    className=" border  text-creame rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {nameError && (
                  <div className="text-red-500 text-sm mt-2">{nameError}</div>
                )}
                <div>
                  <button
                    type="submit"
                    className="w-full text-creame outline font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                </div>
                {successMessage && (
                  <div className="text-green-600">{successMessage}</div>
                )}
                {error && <div className="text-red-600">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSponsorCreate;
