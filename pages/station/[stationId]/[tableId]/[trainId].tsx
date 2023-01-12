import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../../styles/Home.module.css'
import { NextPage } from 'next'
import { useRouter } from "next/router"
import React, { useState, useEffect, useContext } from 'react'

import { TrainReturn, StopStation, HourMinute } from 'lib/ResultType'
import { StatusContext }from "lib/Contexts"

function time2str(time: HourMinute): string {
  if (!time) {
    return "-";
  }
  return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
}

const TablePage:NextPage = () => {
  const [name, setName] = useState("");
  const [lineName, setLineName] = useState("");
  const [stations, setStations] = useState([] as StopStation[]);
  
  const router = useRouter();
  const stationId = router.query.stationId as string;
  const tableId = router.query.tableId as string;
  const trainId = router.query.trainId as string;

  const statusContext = useContext(StatusContext);
  let trains = statusContext.trains[trainId];
  
  useEffect(() => {
    if (trains === undefined) {
      fetch(`/api/station/${stationId}/${tableId}/${trainId}`).then(async (response) => {
        trains = await response.json() as TrainReturn;
        setName(trains.name);
        setLineName(trains.lineName);
        setStations(trains.stations);
        statusContext.trains[trainId] = trains;
      });
    } else {
      setName(trains.name);
      setLineName(trains.lineName);
      setStations(trains.stations);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Train</title>
        <meta name="description" content="Train" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{name}</h1>
        <div>{lineName}</div>
        <div>
          <ul className="List-group">
            {stations && stations.map((station) =>
            <li key={station.stationCode} className="list-group-item"><Link href={{pathname: "/station/[stationId]", query: {stationId: station.stationCode}}}>{station.stationName} | {time2str(station.arrivalTime)}着&nbsp;{time2str(station.departureTime)}発</Link></li> 
            )}
          </ul>
        </div>
      </main>table
    </>
  );
}

export default TablePage