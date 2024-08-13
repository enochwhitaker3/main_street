import React, { useState } from "react";

interface InputProps {
  message: string;
  PassedComponent: React.FC<{id: number}>;
}

const NumberInputComponent: React.FC<InputProps> = ({ message, PassedComponent }) => {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const [ID, setID] = useState<number | null>(null); // New state to trigger deletion

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setInputValue(numericValue);
    } else {
      setInputValue(undefined);
    }
  };

  const handleButtonClick = () => {
    if (inputValue !== undefined) {
      console.log(`You entered the number: ${inputValue}`);
      setID(inputValue);
    } else {
      alert("Please enter a valid number.");
    }
  };

  return (
    <div>
      <h4>{message}</h4>
      <input
        type="number"
        value={inputValue === undefined ? "" : inputValue}
        onChange={handleInputChange}
        placeholder="Enter the Plays ID"
      />
      <button onClick={handleButtonClick}>Submit</button>

      {ID !== null && <PassedComponent id={ID} />}
    </div>
  );
};

export default NumberInputComponent;
