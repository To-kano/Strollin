import React from "react";

function TemoignagePartFR() {

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Témoignages<br/><br/></span>
                </div>
          </div>
          <br/>
          <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-9">
                  <div className="services-caption active text-center mb-30">
                      <div className="service-icon">
                          <span className="flaticon-pay"></span>
                      </div> 
                      <div className="service-cap">
                        <img size="30" src={require("./../../assets/img/Tony_dark.jpg")} style={{ width: 75, height: 90}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Jack (27 ans)<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Je recommande fortement Strollin'. En tant que musicien j'ai toujours voulu découvrir des lieux plus ou moins insolites à propos de ma passion. Appli très pratique !</p>
                      </div>
                  </div>
              </div> 
              <div className="col-xl-6 col-lg-6 col-md-9">
                  <div className="services-caption text-center mb-30">
                      <div className="service-icon">
                          <span className="flaticon-plane"></span>
                      </div> 
                      <div className="service-cap">
                        <img size="30" src={require("./../../assets/img/Tony_cool.jpg")} style={{ width: 100, height: 90}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Yo (17 ans)</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>J'adore sortir mais je déteste perdre mon temps à chercher des activités cools. Strollin' me fait gagner un temps fou quand je ne suis pas inspiré dans mes recherches !</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default TemoignagePartFR;
