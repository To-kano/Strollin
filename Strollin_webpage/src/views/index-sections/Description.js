import React from "react";

function Description() {

  return (
    <>
      <div class="container">
          <div class="row d-flex justify-content-center">
                <div class="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>What is Strollin'?<br/><br/></span>
                </div>
          </div>
          <br/>
          <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption text-center mb-30">
                      <div class={ 'fas fa-hand-holding-usd' }>
                        <img size="30" src={require("./../../assets/img/gpsIcon.png")} style={{ width: 75, height: 75}}/>,
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Navigation App<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Strollin's purpose is to guide you with a personalized navigation! The app will propose various set of destination according to user's free time, budget and preferences!</p>
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
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Based on Profile<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Strollin's algorithm is based on the information you give! The tags you will select allow Strollin' to make the most accurate set of destination for you!</p>
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
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Totally Free!</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Strollin' include some optional in-app purchases, but is totally free and don't rely on advertising!</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default Description;
