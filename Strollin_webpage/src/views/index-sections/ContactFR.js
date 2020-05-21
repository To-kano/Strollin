import React from "react";

function ContactFR() {

  return (
    <>
      <div class="container">
          <div class="row d-flex justify-content-center">
                <div class="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Contact<br/><br/></span>
                </div>
          </div>
          <br/>
          <div class="row">
              <div class="col-xl-6 col-lg-6 col-md-9">
                  <div class="services-caption active text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-pay"></span>
                      </div> 
                      <div class="service-cap">
                        <img size="30" src={require("./../../assets/img/Tony_souriant.jpg")} style={{ width: 90, height: 90}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Smile (secrétaire)<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Disponible : De 10h à 20h</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Téléphone : 06XXXXXXXX</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>E-mail : tony.xx@xxxxx.xx</p>
                      </div>
                  </div>
              </div> 
              <div class="col-xl-6 col-lg-6 col-md-9">
                  <div class="services-caption text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-plane"></span>
                      </div> 
                      <div class="service-cap">
                        <img size="30" src={require("./../../assets/img/Tony_emo.jpg")} style={{ width: 90, height: 90}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Mo (Manager)</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Disponible : Sur rendez-vous</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Téléphone : 06XXXXXXXX</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>E-mail : tony.xx@xxxxx.xx</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><br/>
      </div>
    </>
  );
}

export default ContactFR;
