import React, { useState } from "react";

export const ComponentSelector = ({ options, onSelect, initiallySelected }) => {
  const [selectedOptions, setSelectedOptions] = useState(
    initiallySelected || []
  );

  const toggleOption = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        paddingRight: "1rem",
        width: "Auto",
      }}
    >
      {options.map((option) => (
        <div
          key={option}
          style={{
            width: "auto",
            alignContent: "end",
            marginBottom: "0.2rem",
          }}
        >
          <label>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => toggleOption(option)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
