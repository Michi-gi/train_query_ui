export interface SearchResult {
    [key: string]: {
        id: string;
        name: string;
        railways: string[];
    };
}

export interface Station {
    id: string;
    name: string;
    lines: Line[];
}

export interface Line {
    groupId: string;
    railName: string;
    direction: string;
    source: string;
    driveDayKind: string;
    RailTarget: string;
}

export interface Table {
	stationId: string;
	tableId: string;
    direction: string;
    lineName: string;
    table: TrainInTable[];
    dayOfWeekMap: {[key: string]: string};
}

export interface TrainInTable {
    id: string;
    name: string;
    time: HourMinute;
    kind: string;
    destination: string;
    isFirstStation: boolean;
    isExtra: boolean;
    vendorNumber: string;
}

export interface TrainReturn {
	id: string;
	name: string;
	lineName: string
	stations: StopStation[];
}

export interface StopStation {
	stationCode: string;
	stationName: string;
	areaCode: string;
	prefCode: string;
	arrivalTime: HourMinute;
	departureTime: HourMinute;
}

export interface HourMinute {
    hour: number;
    minute: number;
}
