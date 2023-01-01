import Head from 'next/head'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../../../../styles/Home.module.css'
import { NextPage } from 'next'
import { useRouter } from "next/router"
import { useState, useEffect } from 'react'

import { Table, Train, setHourMinuteInTrain } from 'lib/ResultType'

const inter = Inter({ subsets: ['latin'] })

const Table:NextPage = () => {
  const [name, setName] = useState("");
  const [trains, setTrains] = useState([] as Train[]);
  
  const router = useRouter();
  const stationId = router.query.stationId;
  const tableId = router.query.tableId;

  let notCalled = true;
  useEffect(() => {
    if (notCalled) {
      notCalled = false;
      fetch(`/api/station/${stationId}/${tableId}`).then(async (response) => {
        const table = await response.json() as Table;
        setName(table.lineName);
        if (table.table) {
          table.table.forEach((train) => {
            setHourMinuteInTrain(train);
          });
        }
        setTrains(table.table);
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
        <h1>{name}</h1>
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