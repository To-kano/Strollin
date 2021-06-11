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
      tmp.push(
        <div className={styles.backgroundImage}>
          <div>
            <h4 style={{fontSize:"25px", fontWeight:"bold"}}>{name}<br/></h4>
            <p style={{fontSize:"18px", fontWeight:"500"}}><br/>{description}</p>
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

function AboutUsArea() {
  const [devDataList, setDevDataList] = useState(null);
  
  if (!devDataList) {
    setDevDataList(require('./DevDataList.json'));
  }

  return (
    <>
      <div>
        <p>About us</p>
        {devDataList && developerPrinter(devDataList)}
      </div>
    </>
  );
}

export default AboutUsArea;
