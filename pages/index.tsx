import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter,  useSearchParams } from 'next/navigation'

import { SearchResult, Station } from 'lib/ResultType'
import { QueryStation } from 'components/queryStation'
import { StationLines } from 'components/stationLines'

const Home:NextPage = () => {
  const [station, setStation] = useState({} as Station);

  const queryParamMap = {} as {[key: string]: string};
  const router = useRouter();
  const searchParams = useSearchParams()
  for (const [key, value] of searchParams.entries()) {
    queryParamMap[key] = value;
  }
  console.log(queryParamMap)
  const stationId = searchParams.get("station");

  useEffect(() => {
    console.log("effect")
    if (stationId) {
      fetch(`/api/station/${stationId}`).then(async (response) => {
        const station = await response.json() as Station;
        setStation(station);
      });
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
  }

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
          <div className="flex_vertical_parent">
            <div>
              <QueryStation onQueryStart={submit} onSelect={selected} />
            </div>
            <div className="flex_rest">
              <StationLines station={station} onSelect={lineSelected}></StationLines>
            </div>
          </div>
          <div className="flex_rest"></div>
        </main>
      </div>
    </>
  );
}

export default Home;