import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../../styles/Home.module.css'
import { NextPage } from 'next'
import { useRouter } from "next/router"
import React, { useState, useEffect, useContext } from 'react'

import { TrainReturn, StopStation, setHourMinuteInTrain } from 'lib/ResultType'
import { StatusContext }from "lib/Contexts"

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
            <li key={station.stationCode} className="list-group-item"><Link href={{pathname: "/station/[stationId]", query: {stationId: station.stationCode}}}>{station.stationName} | {station.arrivalTime || "-"}着&nbsp;{station.departureTime || "-"}発</Link></li> 
            )}
          </ul>
        </div>
      </main>table
    </>
  );
}

export default TablePage