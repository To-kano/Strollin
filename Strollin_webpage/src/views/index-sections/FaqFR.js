import React from "react";

function FaqFR() {

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
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Comment signaler un bug ?<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Par mail dans les contacts, vous pourrez recevoir des récompenses !</p>
                      </div>
                  </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption active text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-pay"></span>
                      </div> 
                      <div class="service-cap">
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Aurons-nous des achats intégrés ?<br/></h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Oui, il y aura par exemple des "Navis" (petit personnage original ou issue de collaboration pour vous guidez, avec par exemple des voix japonaises) bientôt disponible</p>
                      </div>
                  </div>
              </div> 
              <div class="col-xl-4 col-lg-4 col-md-6">
                  <div class="services-caption text-center mb-30">
                      <div class="service-icon">
                          <span class="flaticon-plane"></span>
                      </div> 
                      <div class="service-cap">
                          <h4 style={{fontSize:"25px", fontWeight:"bold"}}>Est-ce que mes données sont privées ?</h4>
                          <p style={{fontSize:"18px", fontWeight:"500"}}><br/>Elles ne seront utilisées que si vous le permettez lorsque vous visionnez des publicités dans le but d'obtenir des Stroll coins. Autrement elles sont privées.</p>
                      </div>
                  </div>
              </div>
          </div>
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default FaqFR;
