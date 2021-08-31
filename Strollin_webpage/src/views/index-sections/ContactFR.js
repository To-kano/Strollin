import React from "react";

function ContactFR() {

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Contact<br/><br/></span>
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
                        <img size="30" src={require("./../../assets/img/Tony_souriant.jpg")} style={{ width: 90, height: 90}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Smile (chef de projet)<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Disponible : De 10h à 20h</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Téléphone : 0614542133</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>E-mail : tony.ye@epitech.eu</p>
                      </div>
                  </div>
              </div> 
              <div className="col-xl-6 col-lg-6 col-md-9">
                  <div className="services-caption text-center mb-30">
                      <div className="service-icon">
                          <span className="flaticon-plane"></span>
                      </div> 
                      <div className="service-cap">
                        <img size="30" src={require("./../../assets/img/strollin_logo.png")} style={{ width: 90, height: 90}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Strollin' App</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Disponible : Sur rendez-vous</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Téléphone : Pas de données</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>E-mail : StrollinApp@gmail.com</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default ContactFR;