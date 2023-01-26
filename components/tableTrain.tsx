import { useEffect, useState, useRef } from 'react'
import { Popover } from 'bootstrap'

import { TrainInTable } from 'lib/ResultType'
import { TrainType, name2TrainType } from 'lib/TrainType'

import styles from './tableTrain.module.css'

type Props = {
  train: TrainInTable;
  onClick: {(selectedId: string): void};
}

export const TableTrain = ({train, onClick}: Props) => {

  const [popover, setPopover] = useState(null as Popover);
  const popoverEle = useRef<HTMLSpanElement>(null);

  const [trainStyle, setTrainStyle] = useState("");
  useEffect(() => {
    setPopover(new Popover(popoverEle.current));
  
    const type = name2TrainType(train.kind);
    let trainStyle = styles.none;
    switch (type) {
      case TrainType.LimitedExpress:
      case TrainType.SemiLimitedExpress:
      case TrainType.ShinkansenSuperExpress:
        setTrainStyle(styles.limited_express);
        break;
      case TrainType.Express:
      case TrainType.ShinkansenExpress:
        setTrainStyle(styles.express);
          break;
      case TrainType.SemiExpress:
        setTrainStyle(styles.semi_express);
        break;
      case TrainType.SuperRapid:
        setTrainStyle(styles.super_rapid);
        break;
      case TrainType.Rapid:
        setTrainStyle(styles.rapid);
        break;
      case TrainType.SemiRapid:
        setTrainStyle(styles.semi_rapid);
        break;
      case TrainType.Local:
      case TrainType.ShinkansenLocal:
        setTrainStyle(styles.normal);
        break;
      default:
        setTrainStyle(styles.none);
    }
  }, [train]);

  function click() {
    popover.hide();
    onClick(train.id);
  }

  return (
    <>
      <span className={`px-2 inline-brock ${trainStyle}`} data-bs-toggle="popover" data-bs-trigger="manual" title={`<strong>${train.name}</strong>`} data-bs-html="true" data-bs-content={`<strong>種別</strong><br />&nbsp;&nbsp;${train.kind}<br /><strong>行先</strong><br />&nbsp;&nbsp;${train.destination}`} role="button" onClick={click} onMouseEnter={() => popover.show()} onMouseLeave={() => popover.hide()} ref={popoverEle}><ruby>{train.time.minute}<rt className={styles.dest}>{train.destination.substring(0, 1)}{train.isFirstStation ? "●" : ""}</rt></ruby></span>
    </>
  );
}
