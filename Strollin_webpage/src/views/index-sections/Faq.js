import React from "react";

function getFaq() {
    var faqData = require('./FaqContent.json');
    /*await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/get_locations_by_id`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          access_token: access_token,
          locations_id_list: answer["courses_list"][i]["locations_list"]
        },
        method: 'GET',
      }).then((answer) => answer.json())
      .then(async function (answer) {
        const action = { type: "SET_LOCATION_LIST", value: answer["locations_list"], index: i }
        props.dispatch(action);
      })
      .catch((error) => {
        console.error('error :', error);
      });*/
    
    return (faqData);
}

function Faq() {
    var faqData = getFaq();

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
