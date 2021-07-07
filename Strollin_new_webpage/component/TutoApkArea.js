import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./TutoApkArea.module.css";

function TutoApkArea() {
  
  return (
    <>
      <section>
        <div className={styles.sectionPartner}>
          <h2>Step1  </h2>
          <div className={styles.imageTuto1}/>
          <h2>Step2  </h2>
          <div className={styles.imageTuto2}/>
          <h2>Step3  </h2>
          <div className={styles.imageTuto3}/>
        </div>
      </section>
    </>
  );
}

export default TutoApkArea;
