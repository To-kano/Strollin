import React from "react";

function TutorialApk() {

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>How to install the apk?<br/><br/></span>
                </div>
          </div>
          <br/>
          <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="services-caption text-center mb-30">
                      <div className={ 'fas fa-hand-holding-usd' }>
                        <img size="30" src={require("./../../assets/apk/tuto_apk1.jpg")} style={{ width: 400, height: 80}}/>,
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Step 1<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Place Strollin.apk in the "Download" file of your Android phone</p>
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
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Step 2<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>In your phone, go to "File Manager" and clique on the Apk logo</p>
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
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Step 3</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Clic on the download icon, make sure to give the autorisation to install apk in the settings</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default TutorialApk;
