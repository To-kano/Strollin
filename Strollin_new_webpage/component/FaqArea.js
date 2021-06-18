import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./FaqArea.module.css";

function FaqPrinter(FaqDataList) {
  let grid = [];
  let tmp = [];
  let i = 0;

  for (var key in FaqDataList) {
      let question = FaqDataList[key]["question"];
      let answer = FaqDataList[key]["answer"];

      tmp.push(
        <div className={styles.backgroundImage}>
          <div>
            <h4 style={{fontSize:"25px", fontWeight:"bold"}}>{question}<br/></h4>
            <p style={{fontSize:"18px", fontWeight:"500"}}><br/>{answer}</p>
          </div>
      </div>);
      i++;
      if (i % 3 == 0) {
          grid.push(<div className="row">{tmp}</div>);
          tmp = [];
      }
  }
  if (typeof tmp !== 'undefined' && tmp.length > 0) {
      grid.push(<div className="row">{tmp}</div>);
  }
  return (grid);
}

function FaqArea() {
  const [FaqDataList, setFaqDataList] = useState(null);
  
  if (!FaqDataList) {
    setFaqDataList(require('./FaqDataList.json'));
  }

  return (
    <>
      <div>
        <p>Faq</p>
        {FaqDataList && FaqPrinter(FaqDataList)}
      </div>
    </>
  );
}

export default FaqArea;
