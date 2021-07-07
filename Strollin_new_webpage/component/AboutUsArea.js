import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./AboutUsArea.module.css";

function developerPrinter(devDataList) {
  let grid = [];
  let tmp = [];
  let i = 0;
  console.log("devDataList = ",devDataList);

  for (var key in devDataList) {
    let name = devDataList[key]["name"];
    let description = devDataList[key]["description"];
    let image = devDataList[key]["image"];
    tmp.push(
      <div
        className={styles.box}
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
          <h2>{name}</h2>
          <h3>{description}</h3>
      </div>
    );
  }
  if (typeof tmp !== 'undefined' && tmp.length > 0) {
      grid.push(<>{tmp}</>);
  }
  return (grid);
}

function AboutUsArea() {
  const [devDataList, setDevDataList] = useState(null);
  
  if (!devDataList) {
    setDevDataList(require('./DevDataList.json'));
  }

  return (
    <>
      <section className={styles.center}>
        <h2>About us</h2>
        <div className={styles.table}>
          {devDataList && developerPrinter(devDataList)}
        </div>
      </section>
    </>
  );
}

export default AboutUsArea;
