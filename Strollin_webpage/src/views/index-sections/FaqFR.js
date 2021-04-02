import { IP_SERVER, PORT_SERVER } from '../../env/Environement';
import React, { useEffect, useState} from 'react';


async function getFaq() {
    let result = await fetch(`http://${IP_SERVER}:${PORT_SERVER}/faq/get_question_fr`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      
      result = await  result.json();
      console.log("faqData = ",result["faqs_list"]);
      return (result["faqs_list"]);      
}

function faqPrinter(faqDataList) {
  let grid = [];
  let tmp = [];
  let i = 0;
  console.log("faqDataList = ",faqDataList);

  for (var key in faqDataList) {
      let question = faqDataList[key]["question"];
      let answer = faqDataList[key]["answer"];
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

function FaqFR() {
    const [faqDataList, setFaqDataList] = useState(null);

    useEffect(() => {
      async function getFaqData() {
        const result = await getFaq();
        setFaqDataList(result);
        console.log("result = ", result);
      }
      if (!faqDataList) {
        getFaqData();
      }
    }, [faqDataList]);
    

  return (
    <>
      <div className="container">
          <div className="row d-flex justify-content-center">
                <div className="section-tittle text-center">
                    <span style={{fontSize:"50px", fontWeight:"bold"}}><br/>FAQ<br/><br/></span>
                </div>
          </div>
          {faqPrinter(faqDataList)}
          <br/><br/><hr/><br/>
      </div>
    </>
  );
}

export default FaqFR;
