import Head from 'next/head'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../../../styles/Home.module.css'
import { NextPage } from 'next'
import { useRouter } from "next/router"
import { useState, useEffect, useContext } from 'react'

import { Station, Line } from 'lib/ResultType'
import { StatusContext }from "lib/Contexts"

const inter = Inter({ subsets: ['latin'] })

const StationPage:NextPage = () => {
  const [name, setName] = useState("");
  const [lines, setLines] = useState([] as Line[]);

  const router = useRouter();
  const stationId = router.query.stationId as string;

  const statusContext = useContext(StatusContext);
  let station = statusContext.station[stationId];

  let notCalled = true;
  useEffect(() => {
    if (notCalled) {
      notCalled = false;
      if (station === undefined) {
        fetch(`/api/station/${stationId}`).then(async (response) => {
          station = await response.json() as Station;
          setName(station.name);
          setLines(station.lines);
          statusContext.station[stationId] = station;
        });
      } else {
        setName(station.name);
        setLines(station.lines);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Station</title>
        <meta name="description" content="Station" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{name}&nbsp;駅</h1>
        <div>
          <ul className="List-group">
            {lines && lines.map((line) =>
            <li key={line.RailId} className="list-group-item"><Link href={`${stationId}/${line.RailId}`}>{line.RailName} : {line.Source}&nbsp;-&nbsp;{line.Direction}</Link></li> 
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default StationPage