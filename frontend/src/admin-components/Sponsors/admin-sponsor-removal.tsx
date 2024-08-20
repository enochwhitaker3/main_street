import React, { useEffect, useState } from "react";
import { SponsorType } from "../../../types/sponsors";
import {
  deleteSponsorService,
  getSponsors,
} from "../../api/sponsor-api/SponsorsService";

const AdminSponsorRemoval = () => {
  const [selectedSponsor, setSelectedSponsor] = useState("");
  const [selectedSponsorObject, setSelectedSponsorObject] =
    useState<SponsorType | null>(null);
  const [sponsors, setSponsors] = useState<SponsorType[]>([]);
  const [sponsorError, setSponsorError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSponsors();
        setSponsors(result.sponsors);
      } catch (error) {
        setSponsorError(`Failed to load sponsor: ${error}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedSponsor) {
      const sponsorObject = sponsors.find(
        (sponsor) => sponsor.id === Number(selectedSponsor)
      );
      setSelectedSponsorObject(sponsorObject || null);
    }
  }, [selectedSponsor, sponsors]);

  const handleSponsorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSponsor(e.target.value);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const submitRemoval = async () => {
    if (selectedSponsorObject) {
      try {
        await deleteSponsorService(selectedSponsorObject.id);
        setSuccessMessage("Successfully Deleted");
      } catch (err) {
        setError(`Unable to delete sponsor: ${err}`);
      } finally {
        setShowConfirmation(false);
      }
    }
  };

  const cancelDeletion = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mb-20">
      <h1 className="sm:text-3xl md:text-4xl lg:text-5xl text-3xl text-blackolive pt-10 xl:pb-2 underline md:pt-12 md:pb-1 sm:pt-8">
        Delete Sponsor
      </h1>
      <div className="h-full mt-5 w-full">
        <div className="flex flex-col items-center h-full justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-creame">
                Delete Sponsor
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

              <div>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="w-full text-red-600 outline font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Delete
                </button>
              </div>
              {successMessage && (
                <div className="text-green-600">{successMessage}</div>
              )}
              {error && <div className="text-red-600">{error}</div>}
              {sponsorError && (
                <div className="text-red-600">{sponsorError}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4">
              {`Are you sure you want to delete ${selectedSponsorObject?.sponsor_name}?`}
            </h2>
            <div className="flex justify-between">
              <button
                onClick={submitRemoval}
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={cancelDeletion}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSponsorRemoval;
