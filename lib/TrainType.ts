import { Train } from "components/train";

export const TrainType = {
    ShinkansenSuperExpress: "新幹線最速達",
    ShinkansenExpress: "新幹線速達",
    ShinkansenLocal: "新幹線各停",
    LimitedExpress: "特急",
    SemiLimitedExpress: "準特急",
    Express: "急行",
    SemiExpress: "準急行",
    Liner: "ライナー",
    SuperRapid: "新快速",
    Rapid: "快速",
    SemiRapid: "準快速",
    Local: "普通",
    None: "不定"
} as const;

export type TrainType = typeof TrainType[keyof typeof TrainType];

export function name2TrainType(name: string): TrainType {
    switch (name) {
        case "のぞみ":
        case "はやぶさ":
        case "とき":
        case "かがやき":
        case "みずほ":
            return TrainType.ShinkansenSuperExpress;
        case "ひかり":
        case "やまびこ":
        case "はくたか":
        case "さくら":
            return TrainType.ShinkansenExpress;
        case "こだま":
        case "なすの":
        case "つばさ":
        case "こまち":
        case "たにがわ":
        case "あさま":
        case "つるぎ":
        case "つばめ":
            return TrainType.ShinkansenLocal;
    }

    switch (true) {
        case /^(?!.*準特急).*特急.*$/.test(name):
            return TrainType.LimitedExpress;
        case (name == "準特急"):
        case (name == "快速急行"):
            return TrainType.SemiLimitedExpress;
        case /^(?!.*(快速急行|区間急行)).*急行.*$/.test(name):
            return TrainType.Express;
        case /^.*準急.*$/.test(name):
        case (name == "区間急行"):
            return TrainType.SemiExpress;
        case /^(?!.*(特急|急行)).*ライナー.*$/.test(name):
            return TrainType.Liner;
        case (name == "新快速"):
        case (name == "特別快速"):
        case /^.*特快.*$/.test(name):
            return TrainType.SuperRapid;
        case /(?!(新快速|特別快速|準快速|区間快速)).*快速.*$/.test(name):
            return TrainType.Rapid;
        case (name == "準快速"):
        case (name == "区間快速"):
            return TrainType.SemiRapid;
        case (name == "普通"):
        case (name == "各駅停車"):
            return TrainType.Local;
        default:
            return TrainType.None;
    }
}
