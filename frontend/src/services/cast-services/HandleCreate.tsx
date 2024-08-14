import React, { useEffect, useState } from "react";
import { CastType } from "../../../types/cast";
import { createCastMember } from "../../api/cast-api/cast";

interface InputProps {
  PassedCastMember: Omit<CastType, "id"> | undefined;
}

const CreateCastMemberComponent: React.FC<InputProps> = ({ PassedCastMember }) => {
  const [message, setMessage] = useState<string>("");
  const [triggerCreate, setTriggerCreate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [playIDValue, setPlayIDValue] = useState<number>();
  const [fullNameValue, setFullNameValue] = useState<string>("");

  const handlePlayIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = parseInt(event.target.value, 10);
    if (!isNaN(numericValue)) {
      setPlayIDValue(numericValue);
    } else {
      setPlayIDValue(undefined);
    }
  };

  const handleFullNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullNameValue(event.target.value);
  };

  const handleButtonClick = () => {
    setTriggerCreate(true);
  };

  useEffect(() => {
    if (triggerCreate && PassedCastMember) {
      const CMUC: Omit<CastType, "id"> = {
        play_id: playIDValue || PassedCastMember.play_id,
        full_name: fullNameValue || PassedCastMember.full_name
      };

      const fetchCastMembers = async () => {
        setLoading(true);
        try {
          await createCastMember(CMUC);
          setMessage("Success!");
        } catch (error) {
          setMessage("Failed to create");
          console.log(error);
        } finally {
          setLoading(false);
          setTriggerCreate(false);
        }
      };

      fetchCastMembers();
    }
  }, [
    triggerCreate,
    PassedCastMember,
    playIDValue,
    fullNameValue
  ]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <input
        type="number"
        value={playIDValue !== undefined ? playIDValue : ""}
        onChange={handlePlayIDChange}
        placeholder={"Play ID"}
      />
      <input
        type="string"
        value={fullNameValue === undefined ? "" : fullNameValue}
        onChange={handleFullNameChange}
        placeholder={"Full Name"}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default CreateCastMemberComponent;
