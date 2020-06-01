import React from "react";

function FaqFR() {
    var faqData = require('./FaqContentFR.json');

    function faqPrinter(obj) {
        let grid = [];
        let tmp = [];
        let i = 0;
        for (var key in obj) {
            let question = obj[key]["question"];
            let answer = obj[key]["answer"];
            tmp.push(
            <div class="col-xl-4 col-lg-4 col-md-6">
                <div class="services-caption text-center mb-30">
                    <div class={ 'fas fa-hand-holding-usd' }>
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>{question}<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>{answer}</p>
                    </div>
                </div>
            </div>);
            i++;
            if (i % 3 == 0) {
                grid.push(<div class="row">{tmp}</div>);
                tmp = [];
            }
        }
        if (typeof tmp !== 'undefined' && tmp.length > 0) {
            grid.push(<div class="row">{tmp}</div>);
        }
        return (grid);
    }

  return (
    <>
      <div class="container">
          <div class="row d-flex justify-content-center">
                <div class="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>FAQ<br/><br/></span>
                </div>
          </div>
          {faqPrinter(faqData)}
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}
export default FaqFR;
