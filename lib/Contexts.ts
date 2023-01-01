import React, { createContext } from 'react'
import { Station, Table } from 'lib/ResultType';

type StationMap = {
    [key: string]: Station;
}
type TableMap = {
    [key: string]: Table;
}
export const StatusContext = createContext({station: {} as StationMap, table: {} as TableMap});