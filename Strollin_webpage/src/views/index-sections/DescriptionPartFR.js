import React from "react";

function DescriptionPartFR() {

  return (
    <>
      <div class="container">
          <div class="row d-flex justify-content-center">
                <div class="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Qu'est-ce que Strollin'?<br/><br/></span>
                </div>
          </div>
          <br/>
          <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption text-center mb-30">
                      <div class={ 'fas fa-hand-holding-usd' }>
                        <img size="30" src={require("./../../assets/img/gpsIcon.png")} style={{ width: 75, height: 75}}/>,
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>App de Navigation<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Le but de Strollin' est de vous guider grâce une navigation personnalisée. Strollin' vous proposera diverses ensembles de destinations choisi selon votre temps libre, votre budget et vos goûts !</p>
                      </div>
                  </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption active text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-pay"></span>
                      </div> 
                      <div class="service-cap">
                        <img size="30" src={require("./../../assets/img/profileIcon.jpg")} style={{ width: 75, height: 75}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Basé sur votre Profil<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>L'algorithme de Strollin' se base sur les informations que vous lui donnez ! Les tags que vous choisirez permettront à Strollin' d'être de plus en plus précis et de composer les meilleures ensembles de destination pour vous !</p>
                      </div>
                  </div>
              </div> 
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-plane"></span>
                      </div> 
                      <div class="service-cap">
                        <img size="30" src={require("./../../assets/img/freeIcon.png")} style={{ width: 75, height: 75}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Totallement gratuit !</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Strollin' comportent quelques achats intégrés, mais est surtout totallement gratuit et ne compte pas sur la publicité !</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><br/>
      </div>
    </>
  );
}

export default DescriptionPartFR;
