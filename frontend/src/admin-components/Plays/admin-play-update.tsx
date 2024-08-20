import React, { useEffect, useState } from "react";
import { getSponsors } from "../../api/sponsor-api/SponsorsGet";
import { SponsorType } from "../../../types/sponsors";
import { PlayType } from "../../../types/plays";
import { getPlays, updatePlayService } from "../../api/play-api/PlaysService";
import { ShowtimeType } from "../../../types/showtimes";
import {
  createShowtimeService,
  deleteShowtimeByPlayIdService,
  getShowtimeByPlayIdService,
} from "../../api/showtime-api/ShowtimeService";

const AdminPlayUpdate = () => {
  const [selectedPlay, setSelectedPlay] = useState("");
  const [selectedPlayObject, setSelectedPlayObject] = useState<PlayType | null>(
    null
  );
  const [isSponsorChecked, setIsSponsorChecked] = useState(false);
  const [plays, setPlays] = useState<PlayType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [selectedSponsor, setSelectedSponsor] = useState("");
  const [sponsors, setSponsors] = useState<SponsorType[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [showtimes, setShowtimes] = useState<Omit<ShowtimeType, "id">[]>([]);
  const [endDate, setEndDate] = useState<Date>();
  const [titleError, setTitleError] = useState<string | null>(null);
  const [directorError, setDirectorError] = useState<string | null>(null);
  const [playError, setPlayError] = useState<string | null>(null);
  const [sponsorError, setSponsorError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [playDateError, setPlayDateError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSponsors();
        const tempPlays = await getPlays();
        setPlays(tempPlays.plays);
        setSponsors(result.sponsors);
      } catch (error) {
        setPlayError(`Failed to load sponsors: ${error}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPlay) {
      const playObject = plays.find((play) => play.id === Number(selectedPlay));
      setSelectedPlayObject(playObject || null);

      const fetchShowtimes = async () => {
        if (playObject) {
          try {
            const showtimes = await getShowtimeByPlayIdService(playObject.id);
            setShowtimes(showtimes);
          } catch (error) {
            setError(`Failed to fetch showtimes: ${error}`);
          }
        }
      };

      const fetchSponsor = () => {
        if (playObject?.sponsor_id) {
          try {
            const id = playObject.sponsor_id.toString();
            setSelectedSponsor(id);
          } catch (error) {
            setError(`Failed to fetch sponor: ${error}`);
          }
          setIsSponsorChecked(true);
        } else {
          setIsSponsorChecked(false);
        }
      };

      const fetchTimes = () => {
        if (selectedPlayObject) {
          try {
            const start = new Date(selectedPlayObject.start_date);
            const end = new Date(selectedPlayObject.end_date);
            setStartDate(start);
            setEndDate(end);
          } catch (error) {
            setDateError(`Failed to fetch dates: ${error}`);
          }
        }
      };

      fetchShowtimes();
      fetchSponsor();
      fetchTimes();
    }
  }, [selectedPlay, plays, selectedPlayObject]);

  const handlePlayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlay(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (title != null) {
      setTitleError(null);
    }
  };

  const handleDirectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirector(e.target.value);
    if (director != "") {
      setDirectorError(null);
    }
  };

  const handleSponsorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSponsor(e.target.value);
    if (selectedSponsor != "") {
      setSponsorError(null);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setStartDate(date);
    if (endDate && date > endDate) {
      setDateError("Start date cannot be after the end date.");
    } else {
      setDateError(null);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    setEndDate(date);
    if (startDate && date < startDate) {
      setDateError("End date cannot be before the start date.");
    } else {
      setDateError(null);
    }
  };

  const updateShowtime = (
    index: number,
    updatedShowtime: Omit<ShowtimeType, "id">
  ) => {
    setShowtimes(
      showtimes.map((showtime, i) => (i === index ? updatedShowtime : showtime))
    );
  };

  const addShowtime = () => {
    if (selectedPlayObject) {
      setShowtimes([
        ...showtimes,
        {
          start_time: "",
          play_date: new Date(),
          play_id: selectedPlayObject.id,
        },
      ]);
    }
  };

  const removeShowtime = () => {
    const newShowtimes = [...showtimes];
    if (newShowtimes.length > 0) {
      newShowtimes.pop();
      setShowtimes(newShowtimes);
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (title.trim() && selectedPlayObject?.title === "") {
      setTitleError("Title cannot be empty");
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (director.trim() && selectedPlayObject?.director === "") {
      setDirectorError("Director cannot be empty");
      isValid = false;
    } else {
      setDirectorError(null);
    }

    if (
      (isSponsorChecked && selectedSponsor === "") ||
      selectedPlayObject?.director === ""
    ) {
      setSponsorError("Sponsor cannot be empty");
      isValid = false;
    } else {
      setSponsorError(null);
    }

    if (
      !startDate ||
      !endDate ||
      startDate == undefined ||
      endDate == undefined
    ) {
      setDateError("Both start date and end date are required");
      isValid = false;
    } else if (startDate > endDate) {
      setDateError("Start date cannot be after the end date.");
      isValid = false;
    } else {
      setDateError(null);
    }

    if (showtimes.length > 0) {
      showtimes.forEach((showtime) => {
        if (startDate && endDate) {
          if (showtime.play_date < startDate || showtime.play_date > endDate) {
            setPlayDateError("Showtime out of bounds");
            isValid = false;
          }
        }
        if (showtime.play_date == null || showtime.start_time == "") {
          setPlayDateError("Showtime is not entered correctly");
          isValid = false;
        }
      });
    }

    if (dateError) {
      isValid = false;
    }

    return isValid;
  };
  console.log(showtimes);
  const submitNewPlay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && selectedPlayObject) {
      setPlayDateError(null);
      try {
        await deleteShowtimeByPlayIdService(selectedPlayObject.id);
        showtimes.forEach((showtime) => {
          createShowtimeService(showtime);
        });
      } catch (err) {
        setError(`Unable to add showtimes, ${err} `);
      }

      const play: PlayType = {
        id: selectedPlayObject.id,
        sponsor_id: isSponsorChecked
          ? Number(selectedSponsor)
          : selectedPlayObject.sponsor_id,
        title: title || selectedPlayObject.title,
        start_date: startDate || selectedPlayObject.start_date,
        end_date: endDate || selectedPlayObject.end_date,
        poster: selectedPlayObject.poster,
        director: director || selectedPlayObject.director,
      };

      const result = await updatePlayService(play);
      if (result) {
        setSuccessMessage("Successfully update play!");
      } else {
        setError("Unable to update play");
      }
    }
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
              {selectedPlay && (
                <form
                  className="flex flex-col space-y-4 md:space-y-6"
                  onSubmit={submitNewPlay}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      Title
                    </label>
                    <input
                      placeholder={selectedPlayObject?.title}
                      onChange={handleTitleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      Director
                    </label>
                    <input
                      placeholder={selectedPlayObject?.director}
                      onChange={handleDirectorChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      Sponsor?
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 bg-creame text-creame"
                        checked={isSponsorChecked}
                        onChange={() => setIsSponsorChecked(!isSponsorChecked)}
                      />
                    </div>
                    {isSponsorChecked && sponsors && (
                      <div className="mt-2">
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
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={
                        startDate
                          ? new Date(startDate).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={handleStartDateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={
                        endDate
                          ? new Date(endDate).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={handleEndDateChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-creame">
                      Showtimes
                    </label>
                    {showtimes.map((showtime, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="date"
                          value={
                            new Date(showtime.play_date)
                              ?.toISOString()
                              .substring(0, 10) || ""
                          }
                          onChange={(e) =>
                            updateShowtime(index, {
                              ...showtime,
                              play_date: new Date(e.target.value),
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="Time E.g. 7:00PM.."
                          value={showtime.start_time}
                          onChange={(e) =>
                            updateShowtime(index, {
                              ...showtime,
                              start_time: e.target.value,
                            })
                          }
                          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addShowtime}
                      className="text-blue-600 hover:underline"
                    >
                      Add Showtime
                    </button>
                    <button
                      type="button"
                      onClick={removeShowtime}
                      className="text-red-600 hover:underline ml-2"
                    >
                      Remove Showtime
                    </button>
                  </div>
                  <div className="text-yellow-500 text-sm mt-2">
                    Message Enoch the Poster, Until then it will have default
                    image
                  </div>
                  {playError && (
                    <div className="text-red-500 text-sm mt-2">{playError}</div>
                  )}
                  {titleError && (
                    <div className="text-red-500 text-sm mt-2">
                      {titleError}
                    </div>
                  )}
                  {directorError && (
                    <div className="text-red-500 text-sm mt-2">
                      {directorError}
                    </div>
                  )}
                  {sponsorError && (
                    <div className="text-red-500 text-sm mt-2">
                      {sponsorError}
                    </div>
                  )}
                  {dateError && (
                    <div className="text-red-500 text-sm mt-2">{dateError}</div>
                  )}
                  {playDateError && (
                    <div className="text-red-500 text-sm mt-2">
                      {playDateError}
                    </div>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPlayUpdate;
