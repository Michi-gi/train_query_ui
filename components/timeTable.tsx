import React, { useState } from 'react'

import { Table } from 'lib/ResultType'

type Props = {
  table: Table;
  kind: string;
  onKindSelect: {(kind: string): void}; 
  onSelect: {(selectedId: string): void};
};

export const TimeTable = ({table, kind, onKindSelect, onSelect}: Props) => {
  const [viewKind, setViewKind] = useState(kind);

  const setKind = (kind: string) => {
    setViewKind(kind);
    onKindSelect(kind);
  };

  const selectTrain = (stationId: string, tableId: string, trainId: string) => {
    onSelect(trainId);
  };

  return (
    <>
      <h1>{table.lineName}</h1>
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
      {table.dayOfWeekMap && Object.keys(table.dayOfWeekMap).map((key) => 
      <React.Fragment key={key}>
        <input type="radio" className="btn-check" name="btnradio" id={`btnradio_${key}`} value={key} checked={key == viewKind} onChange={e => setKind(e.target.value)} />
        <label className="btn btn-outline-primary" htmlFor={`btnradio_${key}`}>{table.dayOfWeekMap[key]}</label>
      </React.Fragment >
      )}
      </div>
      <div>
        <ul className="List-group">
          {table.table && table.table.map((train) =>
          <li key={train.id} className="list-group-item" onClick={() => selectTrain(table.stationId, table.tableId, train.id)}>{String(train.time.hour).padStart(2, "0")}:{String(train.time.minute).padStart(2, "0")} | {train.kind}&nbsp;:&nbsp;{train.name}&nbsp;:&nbsp;{train.destination}</li> 
          )}
        </ul>
      </div>
    </>
  );
}
