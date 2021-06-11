import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./PartnerArea.module.css";

function PartnerArea() {
  
  return (
    <>
     <div className={styles.row}>
       <div >
          <p>How can we help you in you business?</p>
          <p>Lorem ipsum</p>
          <button onClick>Learn More</button>
       </div>
       <video controls width="300" height="500">
          <source src={"./Strollin_demo.mp4"} type="video/mp4"/>
        </video>
     </div>
    </>
  );
}

export default PartnerArea;
