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
      <div>
        <ul className="List-group">
          {train.stations && train.stations.map((station) =>
          <li key={station.stationCode} className="list-group-item">{station.stationName} | {time2str(station.arrivalTime)}着&nbsp;{time2str(station.departureTime)}発</li> 
          )}
        </ul>
      </div>
    </>
  );
};
