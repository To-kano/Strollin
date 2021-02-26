import React from "react";

function Faq() {
    var faqData = require('./FaqContent.json');

    function faqPrinter(obj) {
        let grid = [];
        let tmp = [];
        let i = 0;
        for (var key in obj) {
            let question = obj[key]["question"];
            let answer = obj[key]["answer"];
            tmp.push(
            <div className="col-xl-4 col-lg-4 col-md-6">
                <div className="services-caption text-center mb-30">
                    <div className={ 'fas fa-hand-holding-usd' }>
                        <h4 style={{fontSize:"25px", fontWeight:"bold"}}>{question}<br/></h4>
                        <p style={{fontSize:"18px", fontWeight:"500"}}><br/>{answer}</p>
                    </div>
                </div>
            </div>);
            i++;
            if (i % 3 == 0) {
                grid.push(<div className="row">{tmp}</div>);
                tmp = [];
            }
        }
        if (typeof tmp !== 'undefined' && tmp.length > 0) {
            grid.push(<div className="row">{tmp}</div>);
        }
        return (grid);
    }

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>FAQ<br/><br/></span>
                </div>
          </div>
          {faqPrinter(faqData)}
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default Faq;
