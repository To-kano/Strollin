import React from "react";

function DescriptionFR() {

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Qu'est-ce que Strollin'?<br/><br/></span>
                </div>
          </div>
          <br/>
          <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="services-caption text-center mb-30">
                      <div className={ 'fas fa-hand-holding-usd' }>
                        <img size="30" src={require("./../../assets/img/gpsIcon.png")} style={{ width: 75, height: 75}}/>,
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>App de Navigation<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Le but de Strollin' est de vous guider grâce une navigation personnalisée. Strollin' vous proposera diverses ensembles de destinations choisi selon votre temps libre, votre budget et vos goûts !</p>
                      </div>
                  </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="services-caption active text-center mb-30">
                      <div className="service-icon">
                          <span className="flaticon-pay"></span>
                      </div> 
                      <div className="service-cap">
                        <img size="30" src={require("./../../assets/img/profileIcon.jpg")} style={{ width: 75, height: 75}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Basé sur votre Profil<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>L'algorithme de Strollin' se base sur les informations que vous lui donnez ! Les tags que vous choisirez permettront à Strollin' d'être de plus en plus précis et de composer les meilleures ensembles de destination pour vous !</p>
                      </div>
                  </div>
              </div> 
              <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="services-caption text-center mb-30">
                      <div className="service-icon">
                          <span className="flaticon-plane"></span>
                      </div> 
                      <div className="service-cap">
                        <img size="30" src={require("./../../assets/img/freeIcon.png")} style={{ width: 75, height: 75}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Totallement gratuit !</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Strollin' comportent quelques achats intégrés, mais est surtout totallement gratuit et ne compte pas sur la publicité !</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default DescriptionFR;
