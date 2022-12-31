import Head from 'next/head'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { NextPage } from 'next'
import { useState } from 'react'

import { SearchResult } from './ResultType'

const inter = Inter({ subsets: ['latin'] })

const Home:NextPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({} as SearchResult);

  const submit = () => {
    fetch(`/api/search?q=${query}`).then(async (response) => {
      const r = await response.json() as SearchResult;
      console.log(r)
      setResult(r);
      setQuery("");
    });
  };

  return (
    <>
      <Head>
        <title>Train Query App</title>
        <meta name="description" content="Train query app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Train Query App</h1>
        <div className="input-group mb-3">
          <input type="text" name="query" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={e => setQuery(e.target.value)} value={query} />
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={submit}>検索</button>
        </div>
        <div>
          <ul className="List-group">
            {Object.keys(result).map((key:string) =>
            <li key={key} className="list-group-item"><Link href={`#${result[key].id}`}>{result[key].id} : {result[key].name}&nbsp;({result[key].railways.join(", ")})</Link></li> 
            )}
          </ul>
        </div>
      </main>
    </>
  );
}

export default Home;