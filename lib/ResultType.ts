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
    RailId: string;
    RailName: string;
    Direction: string;
    Source: string;
    ServiceDayCode: string;
    RailTarget: string;
}

export interface Table {
    direction: string;
    lineName: string;
    table: TrainInTable[];
    dayOfWeekMap: {[key: string]: string};
}

export interface TrainInTable {
    id: string;
    name: string;
    time: string;
    hourMinute: HourMinute;
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
	arrivalTime: string;
	departureTime: string;
}

export interface HourMinute {
    hour: number;
    minute: number;
}

export function str2HourMinute(str: string): HourMinute {
    const splitted = str.split(":");
    return {hour: parseInt(splitted[0]), minute: parseInt(splitted[1])} as HourMinute;
}

export function setHourMinuteInTrain(train: TrainInTable) {
    train.hourMinute = str2HourMinute(train.time);
}