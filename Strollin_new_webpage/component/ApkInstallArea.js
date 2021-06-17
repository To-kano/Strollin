import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./AboutUsArea.module.css";

function ApkInstallPrinter(ApkInstallDataList) {
  let grid = [];
  let tmp = [];
  let i = 0;
  console.log("ApkInstallDataList = ", ApkInstallDataList);

  for (var key in ApkInstallDataList) {
      let name = ApkInstallDataList[key]["name"];
      let description = ApkInstallDataList[key]["description"];
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

function ApkInstallArea() {
  const [ApkInstallDataList, setApkInstallDataList] = useState(null);
  
  if (!ApkInstallDataList) {
    setApkInstallDataList(require('./ApkInstallDataList.json'));
  }

  return (
    <>
      <div>
        <p>How to install the Strollin app on your Android smartphone</p>
        {ApkInstallDataList && ApkInstallPrinter(ApkInstallDataList)}
      </div>
    </>
  );
}

export default ApkInstallArea;
