import { Station, Line } from 'lib/ResultType'
import { useState } from 'react';

type Props = {
  station: Station;
  onSelect: {(selectedId: string): void};
};

export const StationLines = ({station, onSelect}: Props) => {
  const [selection, setSelection] = useState("");

  console.log(station);

  function selected(key: string) {
    setSelection(key);
    onSelect(key);
  }

  return (
    <>
      <h1>{station.name}&nbsp;駅</h1>
      <div className="list-group">
        {station.lines && station.lines.map((line) =>
          <button key={line.groupId} type="button" className={`list-group-item list-group-item-action ${(line.groupId == selection) ? "active" : ""}`} onClick={() => selected(line.groupId)}>
          {line.railName} : {line.source}&nbsp;-&nbsp;{line.direction}
          </button>
        )}
      </div>
    </>
  );
}
