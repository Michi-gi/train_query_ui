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
      <div className="accordion" id={`stationAccordion_${station.id}`}>
        <div className="accordion-item">
          <div className="accordion-header" id={`stationHeadingOne_${station.id}`}>
            <div className={`accordion-button${stationOpen ? "" : " collapsed"}`} data-bs-toggle="collapse" data-bs-target={`#stationCollapseOne_${station.id}`} onClick={() => setStationOpen(!stationOpen)} aria-expanded={stationOpen} aria-controls={`stationCollapseOne_${station.id}`}>
              <span className="fw-bold">{station.name}</span>
            </div>
          </div>
          <div id={`stationCollapseOne_${station.id}`} className={`accordion-collapse collapse${stationOpen ? " show" : ""}`} aria-labelledby={`stationHeadingOne_${station.id}`} data-bs-parent={`#stationAccordion_${station.id}`}>
            <div className="list-group">
              {station.lines && station.lines.map((line) =>
              <div key={line.RailId} className={`list-group-item list-group-item-action ${(line.RailId == selection) ? "active" : ""}`} onClick={() => selected(line.RailId)}>
                {line.RailName}&nbsp;:&nbsp;{line.Direction}&nbsp;方面
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
