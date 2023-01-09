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

  const submit = async () => {
    setResult(await onQueryStart(query));
    setQuery("");
    const keys = Object.keys(result);
    setSelection((keys.length > 0) ? keys[0] : "");
  };

  function selected(key: string) {
    console.log(`selected key: ${key}`)
    setSelection(key);
    onSelect(result[key].id);
  }

  return (
    <>
      <div className="input-group mb-3">
        <input type="text" name="query" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={e => setQuery(e.target.value)} value={query} />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={submit}>検索</button>
      </div>
      <div className="list-group">
        {Object.keys(result).map((key:string) =>
        <button type="button" className={`list-group-item list-group-item-action ${(key == selection) ? "active" : ""}`} onClick={() => selected(key)}>
        {result[key].id} : {result[key].name}&nbsp;({result[key].railways.join(", ")})
        </button>
        )}
      </div>
    </>
  );
}
