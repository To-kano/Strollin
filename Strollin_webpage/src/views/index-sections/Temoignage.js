import React from "react";

function Temoignage() {

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>Testimony<br/><br/></span>
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
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Jack (27 years old)<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>I highly recommand Strollin'. As a musician I've always wanted to discover every place/shop related to music, very convenient app, built for everyone!</p>
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
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Yo (17 years old)</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>I like hanging out but I hate wasting time searching for entertaining activity. Strollin' is a huge gain of time when I don't feel inspired about where I should go!</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default Temoignage;
