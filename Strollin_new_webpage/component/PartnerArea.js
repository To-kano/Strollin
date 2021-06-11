import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./PartnerArea.module.css";

function PartnerArea() {
  
  return (
    <>
      <div className={styles.row}>
        <img className={styles.image} src= "./young_man_stats.png"/>
      </div>
     <div className={styles.row}>
       <div >
          <p>How can we help you in you business?</p>
          <p>Lorem ipsum</p>
          <button>Learn More</button>
       </div>
     </div>
    </>
  );
}

export default PartnerArea;
