import React, { useState, useEffect, useMemo } from 'react';
import { useApi } from '../../../../utils/useApi';
import GenericComponent from '../../../genericComponent';

interface InputLinkedProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  linkedmaster_tableid?: string;
  linkedmaster_recordid?: string;
}

interface LinkedItem {
  recordid: string;
  name: string;
}

interface LinkedMaster {
  linkeditems: LinkedItem[];
}

const componentDataDEFAULT: LinkedMaster = {
  linkeditems: [],
};

const InputLinked: React.FC<InputLinkedProps> = ({ 
  initialValue = '', 
  onChange, 
  linkedmaster_tableid 
}) => {
  const [value, setValue] = useState(initialValue);
  const [results, setResults] = useState<LinkedMaster>(componentDataDEFAULT);

  const payload = useMemo(() => ({
    apiRoute: 'test_linkedmaster',
    searchTerm: value,
    tableid: linkedmaster_tableid,
    additionalInfo: {
      example2: 'example',
      example3: 'example',
    },
  }), [value, linkedmaster_tableid]);

  const { response, loading, error } = useApi<any>(payload);

  useEffect(() => {
    if (response) {
      setResults({
        linkeditems: response.map((item: any) => ({
          recordid: item.recordid_,
          name: item.name
        }))
      });
    }
  }, [response]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <GenericComponent response={results} error={error}>
      {(data: LinkedMaster) => (
        <div>
          <div className="mt-2">
            <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
              <input
                name="word"
                type="text"
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                placeholder="Inserisci un valore"
                className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="mt-2 max-h-60 overflow-y-auto">
            {data.linkeditems.map((item) => (
              <div 
                key={item.recordid}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <p className="text-sm text-gray-900">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </GenericComponent>
  );
};

export default InputLinked;