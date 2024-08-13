import React, { useEffect, useState } from "react";
import { SponsorType } from "../../../types/sponsors";
import { updateSponsorByID } from "../../api/sponsor-api/sponsors";

interface InputProps {
  PassedSponsors: SponsorType | undefined;
}

const UpdateSponsorComponent: React.FC<InputProps> = ({ PassedSponsors }) => {
  const [message, setMessage] = useState<string>("");
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [nameValue, setNameValue] = useState<string>("");
  const [addressValue, setAddressValue] = useState<string>("");
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumberValue(event.target.value);
  };

  const handleButtonClick = () => {
    setTriggerUpdate(true);
  };

  useEffect(() => {
    if (triggerUpdate && PassedSponsors) {
      const SUC: SponsorType = {
        id: PassedSponsors.id,
        sponsor_name: PassedSponsors.sponsor_name,
        sponsor_address: PassedSponsors.sponsor_address,
        sponsor_phonenumber: PassedSponsors.sponsor_phonenumber,
      };

      const fetchSponsors = async () => {
        setLoading(true);
        try {
          await updateSponsorByID(SUC);
          setMessage("Success!");
        } catch (error) {
          setMessage("Failed to update");
          console.log(error);
        } finally {
          setLoading(false);
          setTriggerUpdate(false); // Reset the trigger
        }
      };

      fetchSponsors();
    }
  }, [
    triggerUpdate,
    PassedSponsors,
    nameValue,
    addressValue,
    phoneNumberValue,
  ]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <input
        type="string"
        value={nameValue === undefined ? "" : nameValue}
        onChange={handleNameChange}
        placeholder={PassedSponsors?.sponsor_name}
      />
      <input
        type="string"
        value={addressValue === undefined ? "" : addressValue}
        onChange={handleAddressChange}
        placeholder={PassedSponsors?.sponsor_address}
      />
      <input
        type="string"
        value={phoneNumberValue === undefined ? "" : phoneNumberValue}
        onChange={handlePhoneNumberChange}
        placeholder={PassedSponsors?.sponsor_phonenumber}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default UpdateSponsorComponent;
