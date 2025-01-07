import React from 'react';
import '../../app/globals.css';
import RecordTabs from '../records/records_tabs';
import RecordFilters from '../records/records_filters';

interface ContentProps {
  tableid: string;
}

const StandardContent: React.FC<ContentProps> = ({ tableid }) => {
  return (
    <div>
      <h2>Contenuto</h2>
      <p>Hai selezionato: <strong>{tableid}</strong></p>
      <div><RecordFilters></RecordFilters></div>
      <div><RecordTabs tableid={tableid}></RecordTabs></div>
    </div>
  );
};

export default StandardContent;


