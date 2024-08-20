import React, { useEffect, useState } from "react";
import {
  getSponsors,
  updateSponsorService,
} from "../../api/sponsor-api/SponsorsService";
import { SponsorType } from "../../../types/sponsors";

const AdminSponsorUpdate = () => {
  const [sponsors, setSponsors] = useState<SponsorType[]>([]);
  const [selectedSponsor, setSelectedSponsor] = useState("");
  const [selectedSponsorObject, setSelectedSponsorObject] =
    useState<SponsorType | null>(null);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [sponsorError, setSponsorError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSponsors();
        setSponsors(result.sponsors);
      } catch (error) {
        setSponsorError(`Failed to load sponsors: ${error}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSponsor) {
      const sponsorObject = sponsors.find(
        (sponor) => sponor.id === Number(selectedSponsor)
      );
      setSelectedSponsorObject(sponsorObject || null);
    }
  }, [selectedSponsor]);

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

  const handleSponsorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSponsor(e.target.value);
    if (selectedSponsor != "") {
      setSponsorError(null);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (name.trim() && selectedSponsorObject?.sponsor_name === "") {
      setNameError("Title cannot be empty");
      isValid = false;
    } else {
      setNameError(null);
    }

    return isValid;
  };
  const updateSponsor = async (e: React.FormEvent) => {
    setSuccessMessage(null)
    setWarningMessage(null)
    e.preventDefault();
    if (validateForm() && selectedSponsorObject) {
      if(name == "" && address == "" &&phoneNumber == "")
      {
        setWarningMessage("Nothing was changed!")
      }
      const sponsor: SponsorType = {
        id: selectedSponsorObject.id,
        sponsor_name: name || selectedSponsorObject.sponsor_name,
        sponsor_address:
          address || selectedSponsorObject.sponsor_address || null,
        sponsor_phonenumber:
          phoneNumber || selectedSponsorObject.sponsor_phonenumber || null,
      };

      const result = await updateSponsorService(sponsor);
      if (result) {
        setSuccessMessage("Successfully updated sponsor!");
      } else {
        setError("Unable to update sponsor");
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mb-20">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive pt-10 xl:pb-2 underline md:pt-12 md:pb-1 sm:pt-8">
        Update Sponsor
      </h1>
      <div className="h-full mt-5 w-full">
        <div className="flex flex-col items-center h-full justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-creame">
                Update Sponsor
              </h1>
              <select
                value={selectedSponsor}
                onChange={handleSponsorChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Sponsor</option>
                {sponsors.map((sponsor) => (
                  <option key={sponsor.id} value={sponsor.id}>
                    {sponsor.sponsor_name}
                  </option>
                ))}
              </select>
              {selectedSponsor && (
                <form
                  className="flex flex-col space-y-4 md:space-y-6"
                  onSubmit={updateSponsor}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      Name
                    </label>
                    <input
                      placeholder={selectedSponsorObject?.sponsor_name}
                      onChange={handleNameChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      Address
                    </label>
                    <input
                      placeholder={
                        selectedSponsorObject?.sponsor_address ||
                        "Enter Address (can be empty)"
                      }
                      onChange={handleAddressChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      Phone Number
                    </label>
                    <input
                      placeholder={
                        selectedSponsorObject?.sponsor_address ||
                        "Enter Phone Number (can be empty)"
                      }
                      onChange={handlePhoneNumberChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>

                  {sponsorError && (
                    <div className="text-red-500 text-sm mt-2">
                      {sponsorError}
                    </div>
                  )}
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
                  {warningMessage && (
                    <div className="text-yellow-500">{warningMessage}</div>
                  )}
                  {successMessage && (
                    <div className="text-green-600">{successMessage}</div>
                  )}
                  {error && <div className="text-red-600">{error}</div>}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSponsorUpdate;
