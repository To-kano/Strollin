import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import React, { useState } from "react";
import styles from "./FeaturesArea.module.css";

function FeaturesArea() {
  
  return (
    <>
      <section className={styles.center}>
        <h2>Our features</h2>
        <div className={styles.table}>

          <div className={styles.box}>
            <img src={"./icons/map.png"}/>
            <h2>App de Navigation</h2>
            <p>Le but de Strollin' est de vous guider grâce une navigation personnalisée. Strollin' vous proposera diverses ensembles de destinations choisi selon votre temps libre, votre budget et vos goûts !</p>
          </div>

          <div className={styles.box}>
            <img src={"./icons/chats.png"}/>
            <h2>Basé sur votre Profil</h2>
            <p>L'algorithme de Strollin' se base sur les informations que vous lui donnez ! Les tags que vous choisirez permettront à Strollin' d'être de plus en plus précis et de composer les meilleures ensembles de destination pour vous !</p>
          </div>

          <div className={styles.box}>
            <img src={"./icons/profile.png"}/>
            <h2>Totallement gratuit !</h2>
            <p>Strollin' comportent quelques achats intégrés, mais est surtout totallement gratuit et ne compte pas sur la publicité !</p>
          </div>
          
          <div className={styles.box}>
            <img src={"./icons/map.png"}/>
            <h2>App de Navigation</h2>
            <p>Le but de Strollin' est de vous guider grâce une navigation personnalisée. Strollin' vous proposera diverses ensembles de destinations choisi selon votre temps libre, votre budget et vos goûts !</p>
          </div>

          <div className={styles.box}>
            <img src={"./icons/map.png"}/>
            <h2>Basé sur votre Profil</h2>
            <p>L'algorithme de Strollin' se base sur les informations que vous lui donnez ! Les tags que vous choisirez permettront à Strollin' d'être de plus en plus précis et de composer les meilleures ensembles de destination pour vous !</p>
          </div>

          <div className={styles.box}>
            <img src={"./icons/money-box.png"}/>
            <h2>Totallement gratuit !</h2>
            <p>Strollin' comportent quelques achats intégrés, mais est surtout totallement gratuit et ne compte pas sur la publicité !</p>
          </div>

        </div>
        <div>
          <button>Learn More</button>
        </div>
      </section>
    </>
  );
}

export default FeaturesArea;
