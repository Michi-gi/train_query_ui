import { HourMinute, TrainReturn } from 'lib/ResultType'

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
          <div key={train.stations[0].stationCode} className="row">
            <div className="col-2 d-flex align-items-center border">{train.stations[0].stationName}</div>
            <div className="col-2 border"><div></div>&nbsp;<div>{time2str(train.stations[0].departureTime)}発</div></div> 
          </div>
          {train.stations.slice(1, -1).map((station) =>
          <div key={station.stationCode} className="row">
            <div className="col-2 d-flex align-items-center border">{station.stationName}</div>
            <div className="col-2 border"><div>{time2str(station.arrivalTime)}着</div><div>{time2str(station.departureTime)}発</div></div> 
          </div>
          )}
          <div key={train.stations.slice(-1)[0].stationCode} className="row">
            <div className="col-2 d-flex align-items-center border">{train.stations.slice(-1)[0].stationName}</div>
            <div className="col-2 border"><div>{time2str(train.stations.slice(-1)[0].arrivalTime)}着</div><div>&nbsp;</div></div> 
          </div>
        </>
        }
      </div>
    </>
  );
};
