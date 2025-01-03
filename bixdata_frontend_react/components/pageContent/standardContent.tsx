import React from 'react';
import '../../app/globals.css';
import RecordTabs from '../records/records_tabs';
import RecordFilters from '../records/records_filters';

interface ContentProps {
  selectedMenu: string;
}

const StandardContent: React.FC<ContentProps> = ({ selectedMenu }) => {
  return (
    <div>
      <h2>Contenuto</h2>
      <p>Hai selezionato: <strong>{selectedMenu}</strong></p>
      <div><RecordFilters></RecordFilters></div>
      <div><RecordTabs></RecordTabs></div>
    </div>
  );
};

export default StandardContent;


