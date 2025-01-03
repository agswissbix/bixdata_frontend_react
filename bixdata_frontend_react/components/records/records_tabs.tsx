import React, { useMemo } from 'react';
import '../../app/globals.css';

interface RecordTabsProps {
  propExample?: string; // Prop ora è opzionale
}

const RecordTabs: React.FC<RecordTabsProps> = ({ propExample }) => {
  return (
    <div>
        Record tabs
    </div>
  );
};

export default RecordTabs;
