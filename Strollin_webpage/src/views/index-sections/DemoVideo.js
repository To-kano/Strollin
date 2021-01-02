import React from "react";

function DemoVideo() {
  return (
    <>
      <div className="section section-dark">
        <br/>
          <div class="row d-flex justify-content-center">
            <video controls width="300" height="500">
              <source src={require("./../../assets/media/Strollin_demo.mp4")} type="video/mp4"/>
            </video>
          </div>
      </div>
      <br/><hr/><br/>
    </>
  );
  return (
    <>
      <div class="container">
       
      </div>
    </>
  );
}

export default DemoVideo;
