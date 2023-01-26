import { HourMinute, TrainReturn } from 'lib/ResultType'
import React from 'react';

function time2str(time: HourMinute): string {
  if (!time) {
    return "-";
  }
  return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
}

type Props = {
  train: TrainReturn;
};

export const Train = ({train}: Props) => {
  return (
    <>
      <h1>{train.name}</h1>
      <div>{train.lineName}</div>
      <div className="container">
        {train.stations && 
        <>
          <div className="row">
            <div className="col-2 d-flex align-items-center border">{train.stations[0].stationName}</div>
            <div className="col-2 border"><div></div>&nbsp;<div className="d-flex justify-content-center">{time2str(train.stations[0].departureTime)}発</div></div> 
          </div>
          <div className="row"><div className="col-4  d-flex align-items-center justify-content-center">↓</div></div>
          {train.stations.slice(1, -1).map((station) =>
          <React.Fragment key={station.stationCode}>
            <div key={station.stationCode} className="row">
              <div className="col-2 d-flex align-items-center border">{station.stationName}</div>
              <div className="col-2 border"><div className="d-flex justify-content-center">{time2str(station.arrivalTime)}着</div><div className="d-flex justify-content-center">{time2str(station.departureTime)}発</div></div> 
            </div>
            <div className="row"><div className="col-4  d-flex align-items-center justify-content-center">↓</div></div>
          </React.Fragment>
          )}
          <div className="row">
            <div className="col-2 d-flex align-items-center border">{train.stations.slice(-1)[0].stationName}</div>
            <div className="col-2 border"><div className="d-flex justify-content-center">{time2str(train.stations.slice(-1)[0].arrivalTime)}着</div><div>&nbsp;</div></div> 
          </div>
        </>
        }
      </div>
    </>
  );
};
