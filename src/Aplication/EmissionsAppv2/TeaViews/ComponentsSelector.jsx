import React, { useState } from "react";

export const ComponentSelector = ({
  optionValues,
  onSelect,
  initiallySelected,
  setOptionValues,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    Object.keys(initiallySelected) || []
  );
  const toggleOption = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsed_value = parseFloat(value);
    const newValue = isNaN(parsed_value) ? value : parsed_value;

    setOptionValues((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
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
      {Object.keys(initiallySelected).map((option) => (
        <div
          key={option}
          style={{
            width: "auto",
            alignContent: "start",
            alignItems: "center",
            marginBottom: "0.1rem",
            justifyContent: 'space-around',
            display: 'flex',
            flexWrap: 'nowrap'
          }}
        >
          <span style={{ width: '4rem', textAlign: 'end' }}>
            {option}
          </span>
          <div>
            <input
              type="text"
              name={option}
              style={{
                width: "5em",
                paddingLeft: "0.4rem",
                border: "none",
                backgroundColor: "transparent",
                borderBottom: "1px dotted rgb(0, 0, 0, 0.5)",
                textAlign: 'end'
              }}
              value={optionValues[option]}
              placeholder={initiallySelected[option]}
              onChange={handleChange}
            />
            %
          </div>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => toggleOption(option)}
            style={{ width: '2rem' }}
          />
        </div>
      ))}
    </div>
  );
};
