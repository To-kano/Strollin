import React from "react";

function Temoignage() {

  return (
    <>
      <div class="container">
          <div class="row d-flex justify-content-center">
                <div class="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Witness<br/><br/></span>
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
                        <img size="30" src={require("./../../assets/img/Tony_dark.jpg")} style={{ width: 75, height: 90}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Jack (27 years old)<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>I highly recommand Strollin'. As a musician I've always wanted to discover every place/shop related to music, very convenient app, built for everyone!</p>
                      </div>
                  </div>
              </div> 
              <div class="col-xl-6 col-lg-6 col-md-9">
                  <div class="services-caption text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-plane"></span>
                      </div> 
                      <div class="service-cap">
                        <img size="30" src={require("./../../assets/img/Tony_cool.jpg")} style={{ width: 100, height: 90}}/>,
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Yo (17 years old)</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>I like hanging out but I hate wasting time searching for entertaining activity. Strollin' is a huge gain of time when I don't feel inspired about where I should go!</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><br/>
      </div>
    </>
  );
}

export default Temoignage;
