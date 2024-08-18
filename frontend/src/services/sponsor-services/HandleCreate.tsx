import React, { useEffect, useState } from "react"; 
import { SponsorType } from "../../../types/sponsors";
import { createSponsor } from "../../api/sponsor-api/sponsors";

interface InputProps {
  PassedSponsor: Omit<SponsorType, "id"> | undefined;
}

const CreateSponsorComponent: React.FC<InputProps> = ({ PassedSponsor }) => {
  const [message, setMessage] = useState<string>("");
  const [triggerCreate, setTriggerCreate] = useState<boolean>(false);
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

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumberValue(event.target.value);
  };

  const handleButtonClick = () => {
    setTriggerCreate(true);
  };

  useEffect(() => {
    if (triggerCreate && PassedSponsor) {
      const SUC: Omit<SponsorType, "id"> = {
        sponsor_name: nameValue || PassedSponsor.sponsor_name,
        sponsor_address: addressValue || PassedSponsor.sponsor_address,
        sponsor_phonenumber: phoneNumberValue || PassedSponsor.sponsor_phonenumber
      };

      const fetchSponsors = async () => {
        setLoading(true);
        try {
          await createSponsor(SUC);
          setMessage("Success!");
        } catch (error) {
          setMessage(`Failed to update ${error}`);
        } finally {
          setLoading(false);
          setTriggerCreate(false);
        }
      };

      fetchSponsors();
    }
  }, [
    triggerCreate,
    PassedSponsor,
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
        placeholder={"Name"}
      />
      <input
        type="string"
        value={addressValue === undefined ? "" : addressValue}
        onChange={handleAddressChange}
        placeholder={"Address"}
      />
      <input
        type="string"
        value={phoneNumberValue === undefined ? "" : phoneNumberValue}
        onChange={handlePhoneNumberChange}
        placeholder={"Phone Number"}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default CreateSponsorComponent;
