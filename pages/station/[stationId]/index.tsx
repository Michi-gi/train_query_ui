import Head from 'next/head'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../../../styles/Home.module.css'
import { NextPage } from 'next'
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'

import { Station, Line } from 'lib/ResultType'

const inter = Inter({ subsets: ['latin'] })

const Station:NextPage = () => {
  const [name, setName] = useState("");
  const [lines, setLines] = useState([] as Line[]);
  
  const router = useRouter();
  const stationId = router.query.stationId;

  let notCalled = true;
  useEffect(() => {
    if (notCalled) {
      notCalled = false;
      fetch(`/api/station/${stationId}`).then(async (response) => {
        const station = await response.json() as Station;
        setName(station.name);
        setLines(station.lines);
      });
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

export default Station