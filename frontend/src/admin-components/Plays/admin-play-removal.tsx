import React, { useEffect, useState } from "react";
import { PlayType } from "../../../types/plays";
import { deletePlayService, getPlays } from "../../api/play-api/PlaysService";
import { deleteShowtimeByPlayIdService } from "../../api/showtime-api/ShowtimeService";

const AdminPlayCreate = () => {
  const [selectedPlay, setSelectedPlay] = useState("");
  const [selectedPlayObject, setSelectedPlayObject] = useState<PlayType | null>(
    null
  );
  const [plays, setPlays] = useState<PlayType[]>([]);
  const [playError, setPlayError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempPlays = await getPlays();
        setPlays(tempPlays.plays);
      } catch (error) {
        setPlayError(`Failed to load shows: ${error}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPlay) {
      const playObject = plays.find((play) => play.id === Number(selectedPlay));
      setSelectedPlayObject(playObject || null);
    }
  }, [selectedPlay, plays]);

  const handlePlayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlay(e.target.value);
  };

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const submitRemoval = async () => {
    if (selectedPlayObject) {
      try {
        await deleteShowtimeByPlayIdService(selectedPlayObject.id);
        await deletePlayService(selectedPlayObject.id);
        setSuccessMessage("Successfully Deleted");
      } catch (err) {
        setError(`Unable to delete play: ${err}`);
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
        Update Play
      </h1>
      <div className="h-full mt-5 w-full">
        <div className="flex flex-col items-center h-full justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-creame">
                Update Play
              </h1>
              <select
                value={selectedPlay}
                onChange={handlePlayChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select Play</option>
                {plays.map((play) => (
                  <option key={play.id} value={play.id}>
                    {play.title}
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
              {playError && <div className="text-red-600">{playError}</div>}
            </div>
          </div>
        </div>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold mb-4">
              {`Are you sure you want to delete ${selectedPlayObject?.title}?`}
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

export default AdminPlayCreate;
