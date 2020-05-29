import React from "react";

function Faq() {
  return (
    <>
      <div class="container">
          <div class="row d-flex justify-content-center">
                <div class="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>FAQ<br/><br/></span>
                </div>
          </div>
          <div class="row">
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption text-center mb-30">
                      <div class={ 'fas fa-hand-holding-usd' }>
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>How do I report a bug?<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>By mail to the contact, you may also receive a reward!</p>
                      </div>
                  </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption active text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-pay"></span>
                      </div> 
                      <div class="service-cap">
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Is there in-app purchase?<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Yes there will be exclusive free and purchasable "Navi" (small original or collab' character that guide you, even with japanese voice actor) available soon</p>
                      </div>
                  </div>
              </div> 
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-plane"></span>
                      </div> 
                      <div class="service-cap">
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Is my data private?</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>If you chose to watch publicity to get Stroll coins, you can enable the use of your personal data for more accurate publicity. Otherwise your data is strictly private</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default Faq;
