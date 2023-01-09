import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { SearchResult } from 'lib/ResultType'
import { QueryStation } from 'components/queryStation'

const Home:NextPage = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState({} as SearchResult);

  const router = useRouter();

  const submit = async (query: string) => {
    return fetch(`/api/search?q=${query}`).then(async (response) => {
      return await response.json() as SearchResult;
    });
  };

  const selected = (selectedId: string) => {
    console.log(`selected ID: ${selectedId}`)
    const url = `station/${selectedId}`;
    router.push(url);
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
        <QueryStation onQueryStart={submit} onSelect={selected} />
      </main>
    </>
  );
}

export default Home;