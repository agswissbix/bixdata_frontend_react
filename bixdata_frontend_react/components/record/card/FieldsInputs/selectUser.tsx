import React, { useState, useEffect } from 'react';
import Select, { SingleValue, MultiValue, ActionMeta } from 'react-select';
import { KeyboardEvent } from 'react';

interface SelectUserProps {
  lookupItems: Array<{ id: string; firstname: string; lastname: string }>;
  initialValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  isMulti?: boolean;
}

interface OptionType {
  value: string;
  label: string;
}

const customStyles = {
  control: () => "min-h-[42px] rounded-lg border border-gray-300 bg-gray-50 hover:border-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 pl-2 pr-2",
  menu: () => "mt-1 bg-white rounded-lg shadow-lg max-h-50 overflow-y-auto z-50",
  option: () => "px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-900",
  singleValue: () => "text-sm text-gray-900",
  multiValue: () => "bg-blue-100 rounded-md m-1",
  multiValueLabel: () => "px-2 py-1 text-sm text-blue-700",
  multiValueRemove: () => "px-2 py-1 hover:bg-blue-200 hover:text-blue-900 rounded-r-md",
  placeholder: () => "text-sm text-gray-500",
  input: () => "text-sm text-gray-900"
}

const SelectUser: React.FC<SelectUserProps> = ({ 
  lookupItems, 
  initialValue = '', 
  onChange,
  isMulti = false 
}) => {
  // Converti lookupItems nel formato richiesto da react-select
  const options: OptionType[] = lookupItems.map(item => ({
    value: item.id,
    label: `${item.firstname} ${item.lastname}`
  }));

  // Gestione stato iniziale per selezione singola e multipla
  const getInitialValue = () => {
    if (isMulti) {
      const initialValues = Array.isArray(initialValue) ? initialValue : [initialValue].filter(Boolean);
      return options.filter(option => initialValues.includes(option.value));
    } else {
      return options.find(option => option.value === initialValue) || null;
    }
  };

  const [selectedOption, setSelectedOption] = useState<OptionType | OptionType[] | null>(getInitialValue());

  // Gestione del cambio valore
  const handleChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedOption(newValue);
    if (onChange) {
      if (isMulti) {
        const values = (newValue as MultiValue<OptionType>).map(option => option.value);
        onChange(values);
      } else {
        const value = newValue ? (newValue as SingleValue<OptionType>)?.value : '';
        onChange(value);
      }
    }
  };

  // Aggiorna il valore selezionato quando cambia initialValue
  useEffect(() => {
    setSelectedOption(getInitialValue());
  }, [initialValue, isMulti]);

  // Gestione del tasto Invio
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const select = event.target as HTMLElement;
      const menu = select.querySelector('[class$="-menu"]');
      
      if (menu) {
        const firstOption = menu.querySelector('[class$="-option"]');
        if (firstOption) {
          (firstOption as HTMLElement).click();
        }
      }
    }
  };

  return (
    <div className="mt-2 relative">
      <Select
        isMulti={isMulti}
        options={options}
        value={selectedOption}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Seleziona un utente"
        isClearable
        classNames={{
          container: () => "relative",
          control: () => customStyles.control(),
          menu: () => customStyles.menu(),
          option: () => customStyles.option(),
          singleValue: () => customStyles.singleValue(),
          multiValue: () => customStyles.multiValue(),
          multiValueLabel: () => customStyles.multiValueLabel(),
          multiValueRemove: () => customStyles.multiValueRemove(),
          placeholder: () => customStyles.placeholder(),
          input: () => customStyles.input()
        }}
        unstyled
      />
    </div>
  );
};

export default SelectUser;