import React from "react";

function Contact() {

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
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Tony Ye (Project chief)<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Available: 10AM to 7PM</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Number: 0614542133</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Mail: tony.ye@epitech.eu</p>
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
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Available: On rendez-vous</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Number: No data</p>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Mail: StrollinApp@gmail.com</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default Contact;
