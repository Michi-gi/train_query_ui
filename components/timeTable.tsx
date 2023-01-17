import React, { useEffect, useState, useRef } from 'react'

import { Popover} from 'bootstrap'

import { Table, TrainInTable } from 'lib/ResultType'
import styles from './timeTables.module.css'

type Props = {
  table: Table;
  kind: string;
  onKindSelect: {(kind: string): void}; 
  onSelect: {(selectedId: string): void};
};

class HourTable {
  constructor(
    public hour: number,
    public trains: TrainInTable[]
  ) {}
}

function makeTableByHour(table: Table): HourTable[] {
  const hourTableMap = {} as {[hour: number]: TrainInTable[]};
  if (table.table === undefined) {
    return [];
  }

  for (let train of table.table) {
    const hour = train.time.hour;
    if (!(hour in hourTableMap)) {
      hourTableMap[hour] = [];
    }
    hourTableMap[hour].push(train);
  }
  const hours = Object.keys(hourTableMap).map(Number).sort((a, b) => a - b);
  
  return hours.map(hour => new HourTable(hour, hourTableMap[hour].sort((train1, train2) => train1.time.minute - train2.time.minute)));
}

export const TimeTable = ({table, kind, onKindSelect, onSelect}: Props) => {
  const [viewKind, setViewKind] = useState(kind);
  const [tableByHour, setTableByHour] = useState([] as HourTable[]);

  const setKind = (kind: string) => {
    setViewKind(kind);
    onKindSelect(kind);
  };

  const selectTrain = (stationId: string, tableId: string, trainId: string) => {
    onSelect(trainId);
  };

  function log(ht: HourTable): string {
    return `aaaa_${ht.hour}`
  }

  useEffect(() => {
    setTableByHour(makeTableByHour(table));
  }, [table]);

  const containerRef = useRef<HTMLDivElement>(null);
  if (containerRef.current) {
    containerRef.current.style.height = `calc(100vh - ${containerRef.current?.getBoundingClientRect().y}px)`;
  }

  useEffect(() => {
    document?.querySelectorAll('[data-bs-toggle="popover"]').forEach((element) => {
      const a = new Popover(element);
    });  
  })

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
      <div className={`container ${styles.table_container}`} ref={containerRef}>
      {tableByHour.map((hourTable) =>
        <div key={`hour_${hourTable.hour}`} className="row">
          <div className="col-1 border text-center py-3">{hourTable.hour}</div>
          <div className="col border text-break py-3">
          {hourTable.trains.map((train) =>
            <span className="px-2 inline-brock" data-bs-toggle="popover" data-bs-trigger="hover focus" title={`${train.kind}|${train.name}`} data-bs-content={train.destination}>{train.time.minute}</span>
          )}
          </div>
        </div>
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
function useRefe<T>(arg0: null) {
  throw new Error('Function not implemented.');
}

