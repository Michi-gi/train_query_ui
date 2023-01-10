import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState, useContext, DragEvent, useRef } from 'react'
import { useRouter,  useSearchParams } from 'next/navigation'

import { SearchResult, Station, Table } from 'lib/ResultType'
import { QueryStation } from 'components/queryStation'
import { StationLines } from 'components/stationLines'
import { TimeTable } from 'components/timeTable'
import { StatusContext } from 'lib/Contexts'

import styles from '../styles/Home.module.css'

const Home:NextPage = () => {
  const context =useContext(StatusContext);
  const [station, setStation] = useState({} as Station);
  const [table, setTable] = useState({} as Table);

  const queryParamMap = {} as {[key: string]: string};
  const router = useRouter();
  const searchParams = useSearchParams()
  for (const [key, value] of searchParams.entries()) {
    queryParamMap[key] = value;
  }
  const stationId = searchParams.get("station");
  const lineId = searchParams.get("line");
  const kindParam = searchParams.get("kind") || "-1";
  const [kind, setKind] = useState(kindParam);

  useEffect(() => {
    if (stationId) {
      let station = context.station[stationId];
      if (station === undefined) {
        fetch(`/api/station/${stationId}`).then(async (response) => {
          station = await response.json() as Station;
          setStation(station);
          context.station[stationId] = station;
        });
      } else {
        setStation(station);
      }
    }
    if ((stationId) && (lineId)) {
      const tableId = `${lineId}_${kind}`
      let table = context.table[tableId];
      if (table === undefined) {
        const url = `/api/station/${stationId}/${lineId}` + ((kind != "-1") ? `?kind=${kind}` : "");
        fetch(url).then(async (response) => {
          table = await response.json() as Table;
          setTable(table);
          context.table[tableId] = table;
        });
      } else {
        setTable(table);
      }
    }
  }, [searchParams]);

  const submit = async (query: string) => {
    return fetch(`/api/search?q=${query}`).then(async (response) => {
      return await response.json() as SearchResult;
    });
  };

  const selected = (selectedId: string) => {
    const url = `?station=${selectedId}`;
    router.push(url);
  };

  const lineSelected = (lineId: string) => {
    const url = `?station=${stationId}&line=${lineId}`;
    router.push(url);
  };

  const kindSelected = (kind: string) => {
    const url = `?station=${stationId}&line=${lineId}&kind=${kind}`;
    setKind(kind);
    router.push(url);
  };

  const trainSelected = (trainId: string) => {
    const url = `?station=${stationId}&line=${lineId}&kind=${kind}&trainId=${trainId}`;
    router.push(url);
  };

  const dragRef = useRef<HTMLDivElement>(null);

  const dragging = (event: DragEvent<HTMLDivElement>) => {
    const x = event.clientX;
    if ((dragRef.current) && (x > 0)) {
      dragRef.current.style.width = `${x}px`;
    }
  };

  return (
    <>
      <Head>
        <title>Train Query App</title>
        <meta name="description" content="Train query app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex_vertical_parent full_screen">
        <header>
          <h1>Train Query App</h1>
        </header>
        <main className="flex_rest flex_horizontal_parent">
          <div className="flex_vertical_parent" ref={dragRef}>
            <div className="vertical_contents_box">
              <QueryStation onQueryStart={submit} onSelect={selected} />
            </div>
            <div className="flex_rest vertical_contents_box">
              <StationLines station={station} onSelect={lineSelected}></StationLines>
            </div>
          </div>
          <div className={styles.horizontal_slider_left}><div></div></div>
          <div className={styles.horizontal_slider} draggable="true" onDrag={dragging}></div>
          <div className={styles.horizontal_slider_right}></div>
          <div className="flex_rest">
            <TimeTable table={table} kind={kind} onKindSelect={kindSelected} onSelect={trainSelected}></TimeTable>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;