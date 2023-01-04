import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../../styles/Home.module.css'
import { NextPage } from 'next'
import { useRouter } from "next/router"
import React, { useState, useEffect, useContext } from 'react'

import { Table, Train, setHourMinuteInTrain } from 'lib/ResultType'
import { StatusContext }from "lib/Contexts"

const Table:NextPage = () => {
  const [name, setName] = useState("");
  const [trains, setTrains] = useState([] as Train[]);
  const [dayMap, setDayMap] = useState({} as {[key: string]: string})
  
  const router = useRouter();
  const stationId = router.query.stationId;
  const tableId = router.query.tableId as string;

  const kind = router.query.kind as string || "-1"
  const [selectedKind, setSelectedKind] = useState(kind);
  console.log(`station ID: ${stationId}`)
  console.log(`table ID: ${tableId}`)
  console.log(`initial kind: ${kind}`)
  console.log(`initial selected kind: ${selectedKind}`)
  const statusContext = useContext(StatusContext);

  useEffect(() => {
    const contextKey = `${tableId}_${selectedKind}`;
    let table = statusContext.table[contextKey];
    if (table == null) {
      const query = (selectedKind == "-1") ? "" : `?kind=${selectedKind}`;
      console.log(`fetched station ID: ${stationId}`)
      console.log(`fetched table ID: ${tableId}`)
      console.log(`fetched selected kind: ${selectedKind}`)
      router.push(`/station/${stationId}/${tableId}${query}`, undefined, { shallow: true})
      fetch(`/api/station/${stationId}/${tableId}${query}`).then(async (response) => {
        table = await response.json() as Table;
        setName(table.lineName);
        if (table.table) {
          table.table.forEach((train) => {
            setHourMinuteInTrain(train);
          });
        }
        setTrains(table.table);
        setDayMap(table.dayOfWeekMap);
        statusContext.table[`${tableId}_${kind}`] = table;
      });
    }
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
          <input type="radio" className="btn-check" name="btnradio" id={`btnradio_${key}`} value={key} checked={key == selectedKind} onChange={e => setSelectedKind(e.target.value)} />
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

export default Table