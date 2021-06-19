import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./PartnerArea.module.css";

function PartnerArea() {
  
  return (
    <>
     <section className={styles.sectionPartner}>
        <div className={styles.downloadLeft}>
          <h2>How can we help you in you business?</h2>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum purus dignissim mi pulvinar tincidunt. Pellentesque mattis ut arcu ac fermentum
            <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum.
          </h3>
          <div className={styles.buttonDiv}>
            <a href="#" className={styles.downloadCard}>Download now</a>
            <button>How to install the apk</button>
          </div>
        </div>
        <div>
          <video controls width="300" height="500">
            <source src={"./Strollin_demo.mp4"} type="video/mp4"/>
          </video>
        </div>
     </section>
    </>
  );
}

export default PartnerArea;
