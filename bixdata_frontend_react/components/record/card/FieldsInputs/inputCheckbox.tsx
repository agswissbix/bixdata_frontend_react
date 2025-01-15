import React, { useState, useEffect } from 'react';

interface InputWordProps {
  initialValue?: string; // Valore iniziale
  onChange?: (value: string) => void; // Funzione chiamata quando il valore cambia
}

const InputWord: React.FC<InputWordProps> = ({ initialValue = '', onChange }) => {
  const [value, setValue] = useState(initialValue);

  // Aggiorna il genitore solo se il valore è effettivamente diverso
  useEffect(() => {
    if (onChange && value !== initialValue) {
      onChange(value);
    }
  }, [value, onChange, initialValue]);

  return (
    <div>
      <div className="mt-2">
        <div className="flex items-center mb-4">
        <input
            name="word"
            type="checkbox"
            value={value}
            onChange={(e) => setValue(e.target.value)} // Aggiorna lo stato locale
            placeholder="Inserisci un valore"
            id="default-checkbox"   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default InputWord;
