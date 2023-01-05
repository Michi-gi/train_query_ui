import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../../styles/Home.module.css'
import { NextPage } from 'next'
import { useRouter } from "next/router"
import React, { useState, useEffect, useContext } from 'react'

import { Table, Train, setHourMinuteInTrain } from 'lib/ResultType'
import { StatusContext }from "lib/Contexts"

const TablePage:NextPage = () => {
  const [name, setName] = useState("");
  const [trains, setTrains] = useState([] as Train[]);
  const [dayMap, setDayMap] = useState({} as {[key: string]: string})
  
  const router = useRouter();
  console.log(router)
  const stationId = router.query.stationId as string;
  const tableId = router.query.tableId as string;

  const kind = router.query.kind as string || "-1"
  const [selectedKind, setSelectedKind] = useState(kind);
  const [viewKind, setViewKind] = useState(kind);
  console.log(`station ID: ${stationId}`)
  console.log(`table ID: ${tableId}`)
  console.log(`initial kind: ${kind}`)
  console.log(`initial selected kind: ${selectedKind}`)
  const statusContext = useContext(StatusContext);

  async function refresh(stationId: string, tableId: string, kind: string): Promise<Table> {
    const contextKey = `${tableId}_${kind}`;
    console.log(contextKey)
    console.log(statusContext.table)
    let table = statusContext.table[contextKey];
    if (table != null) {
      console.log("cache hit")
      return table
    } else {
      console.log("cache not hit")
      const query = (kind == "-1") ? "" : `?kind=${kind}`;
      return fetch(`/api/station/${stationId}/${tableId}${query}`).then(async (response) => {
        const table = await response.json() as Table;
        console.log(table)
        if (table.table) {
          table.table.forEach((train) => {
            setHourMinuteInTrain(train);
          });
        }
        statusContext.table[contextKey] = table;
        return table;
      });
    }
  }
  
  useEffect(() => {
    console.log("effected")
    setViewKind(selectedKind);

    router.beforePopState(({ url, as, options }) => {
      const urlPattern = /^\/station\/(?<stationId>\w+)\/(?<tableId>\w+)\?kind=(?<kind>\w+)$/;
      const matchResult = urlPattern.exec(as);
      if ((matchResult === null) || (matchResult.groups == null)) {
        router.push(as);
        return false;
      }
      const stationId = matchResult.groups.stationId;
      const tableId = matchResult.groups.tableId;
      const kind = matchResult.groups.kind;
      setViewKind(kind);
      refresh(stationId, tableId, kind).then((table) => {
        setName(table.lineName);
        setTrains(table.table);
        setDayMap(table.dayOfWeekMap);
      });
      return true;
    });

    refresh(stationId, tableId, selectedKind).then((table) => {
      console.log("effect refresh")
      setName(table.lineName);
      setTrains(table.table);
      setDayMap(table.dayOfWeekMap);
      const query = (selectedKind == "-1") ? "" : `?kind=${selectedKind}`;
      router.push(`/station/${stationId}/${tableId}${query}`, undefined, {shallow: true})
    });
  }, [selectedKind]);

  return (
    <>
      <Head>
        <title>Table</title>
        <meta name="description" content="Station" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{name}</h1>
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        {Object.keys(dayMap).map((key) => 
        <React.Fragment key={key}>
          <input type="radio" className="btn-check" name="btnradio" id={`btnradio_${key}`} value={key} checked={key == viewKind} onChange={e => setSelectedKind(e.target.value)} />
          <label className="btn btn-outline-primary" htmlFor={`btnradio_${key}`}>{dayMap[key]}</label>
        </React.Fragment >
        )}
        </div>
        <div>
          <ul className="List-group">
            {trains && trains.map((train) =>
            <li key={train.id} className="list-group-item"><Link href={`${train.id}`}>{train.time} | {train.kind}&nbsp;:&nbsp;{train.name}&nbsp;:&nbsp;{train.destination}</Link></li> 
            )}
          </ul>
        </div>
      </main>table
    </>
  );
}

export default TablePage