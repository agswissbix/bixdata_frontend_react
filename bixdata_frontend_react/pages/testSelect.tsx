import React, { useState } from "react";
import Select from "react-select";
import { SingleValue } from "react-select";

export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
];

const Checkbox = ({ children, ...props }: JSX.IntrinsicElements["input"]) => (
  <label style={{ marginRight: "1em" }}>
    <input type="checkbox" {...props} />
    {children}
  </label>
);

const App = () => {  // Changed 'app' to 'App'
  const [selectedOption, setSelectedOption] = useState<ColourOption | null>(
    colourOptions[0]
  );

  const handleChange = (selected: SingleValue<ColourOption>) => {
    setSelectedOption(selected);
  };

  return (
    <div>
      <Select
        className="basic-single"
        classNamePrefix="select"
        value={selectedOption}
        onChange={handleChange}
        isSearchable={true}
        options={colourOptions}
      ></Select>
    </div>
  );
};

export default App;  // Changed 'app' to 'App'
