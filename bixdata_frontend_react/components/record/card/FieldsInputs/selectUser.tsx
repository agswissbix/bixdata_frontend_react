import React, { useState, useEffect } from 'react';


interface SelectUserProps {
  lookupItems: Array<{ id: string; firstname: string; lastname: string }>;
  initialValue?: string; // ID dell'utente selezionato inizialmente
  onChange?: (value: string) => void; // Funzione chiamata quando il valore cambia
}

const SelectUser: React.FC<SelectUserProps> = ({ lookupItems, initialValue = '', onChange }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (onChange && value !== initialValue) {
      onChange(value);
    }
  }, [value, onChange, initialValue]);

  return (
    <div>
      <div className="mt-2">
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">Seleziona un utente</option>
          {lookupItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.firstname} {item.lastname}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectUser;
