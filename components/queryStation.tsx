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
        <input type="text" name="query" className="form-control" aria-label="Recipient's username" aria-describedby="query-button-addon2" onChange={e => setQuery(e.target.value)} value={query} />
        <button className="btn btn-outline-secondary" type="button" id="query-button-addon2" onClick={submit}>検索</button>
      </div>
      <div className="accordion" id="queryAccordion">
        <div className="accordion-item">
          <div className="accordion-header" id="queryHeadingOne">
            <div className={`accordion-button${queryOpen ? "" : " collapsed"}`} data-bs-toggle="collapse" data-bs-target="#queryCollapseOne" onClick={() => setQueryOpen(!queryOpen)} aria-expanded={queryOpen} aria-controls="queryCollapseOne">
              検索結果 {Object.keys(result).length}件
            </div>
          </div>
          <div id="queryCollapseOne" className={`accordion-collapse collapse${queryOpen ? " show" : ""}`} aria-labelledby="queryHeadingOne" data-bs-parent="#queryAccordion">
            <div className="list-group">
              {Object.keys(result).map((key:string) =>
              <div key={key} className={`list-group-item list-group-item-action ${(key == selection) ? "active" : ""}`} onClick={() => selected(key)}>
              {result[key].id} : {result[key].name}&nbsp;({result[key].railways.join(", ")})
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
