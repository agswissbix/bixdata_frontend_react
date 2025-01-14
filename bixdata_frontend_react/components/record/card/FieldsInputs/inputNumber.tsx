import React, { useState, useEffect } from 'react';

interface InputNumberProps {
  initialValue?: string; // Prop ora è opzionale
  onChange?: (value: string) => void;
}

const InputNumber: React.FC<InputNumberProps> = ({ initialValue = '', onChange }) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    if (onChange) {
        onChange(value);
    }
  }, [value, onChange]);

  return (
    <div>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            id="price"
            name="price"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)} // Aggiorna lo stato locale
            placeholder="0.00"
            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
        </div>
      </div>
    </div>
  );
};

export default InputNumber;
