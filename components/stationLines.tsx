import { Station, Line } from 'lib/ResultType'
import { useState } from 'react';

type Props = {
  station: Station;
  onSelect: {(selectedId: string): void};
};

export const StationLines = ({station, onSelect}: Props) => {
  const [selection, setSelection] = useState("");

  function selected(key: string) {
    setSelection(key);
    onSelect(key);
  }

  return (
    <>
      <h1>{station.name}&nbsp;駅</h1>
      <div className="list-group">
        {station.lines && station.lines.map((line) =>
          <button key={line.RailId} type="button" className={`list-group-item list-group-item-action ${(line.RailId == selection) ? "active" : ""}`} onClick={() => selected(line.RailId)}>
          {line.RailName} : {line.Source}&nbsp;-&nbsp;{line.Direction}
          </button>
        )}
      </div>
    </>
  );
}
