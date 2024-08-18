import React, { useEffect, useState } from "react";
import { updateCastMemberByID } from "../../api/cast-api/cast";
import { CastType } from "../../../types/cast";

interface InputProps {
  PassedCastMember: CastType | undefined;
}

const UpdateCastMemberComponent: React.FC<InputProps> = ({
  PassedCastMember,
}) => {
  const [message, setMessage] = useState<string>("");
  const [triggerUpdate, setTriggerUpdate] = useState<boolean>(false);
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
    setTriggerUpdate(true);
  };

  useEffect(() => {
    if (triggerUpdate && PassedCastMember) {
      const CMUC: CastType = {
        id: PassedCastMember.id,
        play_id: playIDValue || PassedCastMember.play_id,
        full_name: fullNameValue || PassedCastMember.full_name,
      };

      const fetchCastMember = async () => {
        setLoading(true);
        try {
          await updateCastMemberByID(CMUC);
          setMessage("Success!");
        } catch (error) {
          setMessage(`Failed to update ${error}`);
        } finally {
          setLoading(false);
          setTriggerUpdate(false);
        }
      };

      fetchCastMember();
    }
  }, [triggerUpdate, PassedCastMember, playIDValue, fullNameValue]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <input
        type="number"
        value={playIDValue !== undefined ? playIDValue : ""}
        onChange={handlePlayIDChange}
        placeholder={PassedCastMember?.play_id?.toString()}
      />
      <input
        type="string"
        value={fullNameValue === undefined ? "" : fullNameValue}
        onChange={handleFullNameChange}
        placeholder={PassedCastMember?.full_name}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {message}
    </div>
  );
};

export default UpdateCastMemberComponent;
