import { Station } from 'lib/ResultType'
import { useEffect, useState } from 'react';

type Props = {
  station: Station;
  onSelect: {(selectedId: string): void};
};

export const StationLines = ({station, onSelect}: Props) => {
  const [selection, setSelection] = useState("");
  const [stationOpen, setStationOpen] = useState(true);

  useEffect(() => {
    setStationOpen(true);
  }, [station]);

  function selected(key: string) {
    setSelection(key);
    onSelect(key);
  }

  return (
    <>
      <div className="accordion" id="accordion">
        <div className="accordion-item">
          <div className="accordion-header" id="headingOne">
            <button className={`accordion-button${stationOpen ? "" : " collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" onClick={() => setStationOpen(!stationOpen)} aria-expanded={stationOpen} aria-controls="collapseOne">
              <span className="fw-bold">{station.name}</span>
            </button>
          </div>
          <div id="collapseOne" className={`accordion-collapse collapse${stationOpen ? " show" : ""}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="list-group">
              {station.lines && station.lines.map((line) =>
              <button key={line.RailId} type="button" className={`list-group-item list-group-item-action ${(line.RailId == selection) ? "active" : ""}`} onClick={() => selected(line.RailId)}>
                {line.RailName} : {line.Source}&nbsp;-&nbsp;{line.Direction}
              </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
