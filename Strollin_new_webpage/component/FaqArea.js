import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./FaqArea.module.css";

function developerPrinter(faqDataList) {
  let grid = [];
  let tmp = [];
  let i = 0;
  console.log("faqDataList = ",faqDataList);

  for (var key in faqDataList) {
    let question = faqDataList[key]["question"];
    let answer = faqDataList[key]["answer"];
    tmp.push(
      <div
        className={styles.box}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
          <h2>{question}</h2>
          <h3>{answer}</h3>
      </div>
    );
  }
  if (typeof tmp !== 'undefined' && tmp.length > 0) {
      grid.push(<>{tmp}</>);
  }
  return (grid);
}

function AboutUsArea() {
  const [faqDataList, setfaqDataList] = useState(null);
  
  if (!faqDataList) {
    setfaqDataList(require('./FaqDataList.json'));
  }

  return (
    <>
      <section className={styles.center}>
        <h2>FAQ</h2>
        <div className={styles.table}>
          {faqDataList && developerPrinter(faqDataList)}
        </div>
      </section>
    </>
  );
}

export default AboutUsArea;
