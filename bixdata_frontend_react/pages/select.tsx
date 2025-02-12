// MultiSelect.tsx
import Select, { MultiValue, ActionMeta, GroupBase, Options } from 'react-select';
import { KeyboardEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  onChange: (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void;
  placeholder?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const customStyles = {
  control: () => "min-h-[42px] rounded-lg border border-gray-300 bg-white hover:border-indigo-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50",
  menu: () => "mt-1 bg-white rounded-lg shadow-lg",
  option: () => "px-3 py-2 hover:bg-gray-100 cursor-pointer",
  multiValue: () => "bg-indigo-100 rounded-md m-1",
  multiValueLabel: () => "px-2 py-1 text-sm text-indigo-700",
  multiValueRemove: () => "px-2 py-1 hover:bg-indigo-200 hover:text-indigo-900 rounded-r-md",
  placeholder: () => "text-gray-400",
  input: () => "text-sm"
}

const options: Option[] = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const MultiSelect = ({
  options,
  onChange,
  placeholder = 'Seleziona...',
  isDisabled = false,
  isLoading = false,
}: MultiSelectProps) => {
  // Funzione per gestire il tasto Invio
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      // Ottieni le opzioni filtrate correnti dal menu
      const select = event.target as HTMLElement;
      const menu = select.querySelector('[class$="-menu"]');
      
      if (menu) {
        // Trova la prima opzione nel menu
        const firstOption = menu.querySelector('[class$="-option"]');
        if (firstOption) {
          // Simula il click sulla prima opzione
          (firstOption as HTMLElement).click();
        }
      }
    }
  };

  return (
    <div className="relative w-full">
      <Select
        isMulti
        options={options}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onKeyDown={handleKeyDown}
        classNames={{
          container: () => "relative",
          control: () => customStyles.control(),
          menu: () => customStyles.menu(),
          option: () => customStyles.option(),
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

// Esempio di utilizzo
const ExamplePage = () => {
  const handleChange = (
    newValue: MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => {
    console.log('Valori selezionati:', newValue);
    console.log('Action:', actionMeta);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <MultiSelect
        options={options}
        onChange={handleChange}
        placeholder="Seleziona i gusti..."
      />
    </div>
  );
};

export default ExamplePage;