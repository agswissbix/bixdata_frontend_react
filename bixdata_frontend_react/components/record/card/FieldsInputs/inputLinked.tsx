import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import _ from 'lodash';

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

// Simulate API call - replace with your actual API call
const fetchLinkedItems = async (searchTerm: string, tableid?: string): Promise<LinkedItem[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock data - replace with actual API call
  return [
    { recordid: '1', name: 'Python' },
    { recordid: '2', name: 'JavaScript' },
    { recordid: '3', name: 'TypeScript' },
  ].filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const InputLinked: React.FC<InputLinkedProps> = ({
  initialValue = '',
  onChange,
  linkedmaster_tableid
}) => {
  const [value, setValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<LinkedItem[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useRef(
    _.debounce(async (searchTerm: string) => {
      if (!searchTerm.trim()) {
        setItems([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await fetchLinkedItems(searchTerm, linkedmaster_tableid);
        setItems(results);
      } catch (err) {
        setError('Error fetching data');
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 300)
  ).current;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsOpen(true);
    debouncedSearch(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
    setIsOpen(true);
  };

  const handleSelectOption = (item: LinkedItem) => {
    setValue(item.name);
    setIsOpen(false);
    if (onChange) {
      onChange(item.name);
    }
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            name="word"
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            autoComplete='off'
            placeholder="Inserisci un valore"
            className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute w-full z-10 bg-white mt-1 border border-gray-300 rounded-md shadow-lg">
          {loading ? (
            <div className="flex items-center justify-center p-4 text-gray-500">
              <Loader2 className="animate-spin mr-2" size={20} />
              <span>Caricamento...</span>
            </div>
          ) : error ? (
            <div className="p-4 text-red-500 text-center">
              {error}
            </div>
          ) : (
            <div className="mt-2 max-h-60 overflow-y-auto">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.recordid}
                    onClick={() => handleSelectOption(item)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <p className="text-sm text-gray-900">{item.name}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500 text-center">
                  Nessun risultato trovato
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputLinked;