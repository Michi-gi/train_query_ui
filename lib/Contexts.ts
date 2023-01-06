import React, { createContext } from 'react'
import { Station, Table, TrainReturn } from 'lib/ResultType';

type StationMap = {
    [key: string]: Station;
}
type TableMap = {
    [key: string]: Table;
}
type TrainMap = {
    [key: string]: TrainReturn;
}
export const StatusContext = createContext({station: {} as StationMap, table: {} as TableMap, trains: {} as TrainMap});