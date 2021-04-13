import React from "react";

function TutorialApkFR() {

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Comment installer l'application Apk ?<br/><br/></span>
                </div>
          </div>
          <br/>
          <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="services-caption text-center mb-30">
                      <div className={ 'fas fa-hand-holding-usd' }>
                        <img size="30" src={require("./../../assets/apk/tuto_apk1.jpg")} style={{ width: 400, height: 80}}/>,
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Étape 1<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Placez Strollin.apk dans le fichier "Téléchargement" de votre portable Android</p>
                      </div>
                  </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="services-caption active text-center mb-30">
                      <div className="service-icon">
                          <span className="flaticon-pay"></span>
                      </div> 
                      <div className="service-cap">
                        <img size="30" src={require("./../../assets/apk/tuto_apk2.jpg")} style={{ width: 200, height: 400}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Étape 2<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Allez sur "Gestion de fichier" sur votre portable et cliquez sur le logo "Apk"</p>
                      </div>
                  </div>
              </div> 
              <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="services-caption text-center mb-30">
                      <div className="service-icon">
                          <span className="flaticon-plane"></span>
                      </div> 
                      <div className="service-cap">
                        <img size="30" src={require("./../../assets/apk/tuto_apk3.jpg")} style={{ width: 200, height: 400}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Étape 3</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Cliquez sur l'icône de téléchargement, une fenêtre apparaîtra pour autoriser l'installation d'Apk dans les options. Activez l'autorisation et vous pourrez lancer le téléchargement</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default TutorialApkFR;
