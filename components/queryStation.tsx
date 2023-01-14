import { SearchResult } from 'lib/ResultType'
import { useState } from 'react';

type Props = {
  onQueryStart: {(keyword: string): SearchResult | Promise<SearchResult>};
  onSelect: {(selectedId: string): void};
};

export const QueryStation = ({onQueryStart, onSelect}: Props) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({} as SearchResult);
  const [selection, setSelection] = useState("");
  const [queryOpen, setQueryOpen] = useState(false);

  const submit = async () => {
    setResult(await onQueryStart(query));
    setQueryOpen(true);
    setQuery("");
    const keys = Object.keys(result);
    setSelection((keys.length > 0) ? keys[0] : "");
  };

  function selected(key: string) {
    setSelection(key);
    onSelect(result[key].id);
  }

  return (
    <>
      <div className="input-group mb-3">
        <input type="text" name="query" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={e => setQuery(e.target.value)} value={query} />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={submit}>検索</button>
      </div>
      <div className="accordion" id="accordion">
        <div className="accordion-item">
          <div className="accordion-header" id="headingOne">
            <button className={`accordion-button${queryOpen ? "" : " collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" onClick={() => setQueryOpen(!queryOpen)} aria-expanded={queryOpen} aria-controls="collapseOne">
              検索結果 {Object.keys(result).length}件
            </button>
          </div>
          <div id="collapseOne" className={`accordion-collapse collapse${queryOpen ? " show" : ""}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="list-group">
              {Object.keys(result).map((key:string) =>
              <button key={key} type="button" className={`list-group-item list-group-item-action ${(key == selection) ? "active" : ""}`} onClick={() => selected(key)}>
              {result[key].id} : {result[key].name}&nbsp;({result[key].railways.join(", ")})
              </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
