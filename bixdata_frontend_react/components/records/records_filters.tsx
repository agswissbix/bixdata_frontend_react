import React, { useMemo } from 'react';
import '../../app/globals.css';

interface RecordFiltersProps {
  propExample?: string; // Prop ora è opzionale
}

const RecordFilters: React.FC<RecordFiltersProps> = ({ propExample }) => {
  return (
    <div>
        Record filters
    </div>
  );
};

export default RecordFilters;
