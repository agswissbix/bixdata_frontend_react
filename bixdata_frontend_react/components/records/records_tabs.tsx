import React, { useMemo } from 'react';
import '../../app/globals.css';
import RecordsTable from './records_table';
interface RecordTabsProps {
  tableid?: string; // Prop ora è opzionale
}

const RecordTabs: React.FC<RecordTabsProps> = ({ tableid }) => {
  return (
    <div>
        Record tabs: {tableid}
        <div>
          <RecordsTable tableid={tableid}></RecordsTable>
        </div>
    </div>
  );
};

export default RecordTabs;
