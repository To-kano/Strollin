import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./PartnerArea.module.css";

function PartnerArea() {
  
  return (
    <>
      <section>
        <div className={styles.sectionPartner}>
          <div className={styles.imagePartner}/>
          <div className={styles.cardPartner}>
            <h2>How can we help you in you business?</h2>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum purus dignissim mi pulvinar tincidunt. Pellentesque mattis ut arcu ac fermentum
              <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum.
            </h3>
            <div>
              <button>Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PartnerArea;
