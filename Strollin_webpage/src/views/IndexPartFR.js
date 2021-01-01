import React from "react";

import IndexNavbarPartFR from "components/Navbars/IndexNavbarPartFR.js";
import IndexHeaderPartFR from "components/Headers/IndexHeaderPartFR.js";

import ContactFR from "views/index-sections/ContactFR.js";
import TemoignagePartFR from "views/index-sections/TemoignagePartFR.js";
import SectionExamplesPartFR from "views/index-sections/SectionExamplesPartFR.js";
import FaqFR from "views/index-sections/FaqFR.js";
import SectionQuestionFR from "views/index-sections/SectionQuestionFR.js";

import DescriptionPartFR from "views/index-sections/DescriptionPartFR.js";
import DemoVideo from "views/index-sections/DemoVideo.js";

function IndexPartFR() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("indexFR");
    return function cleanup() {
      document.body.classList.remove("indexFR");
    };
  });
  return (
    <>
      <IndexNavbarPartFR />
      <IndexHeaderPartFR />
      <div className="main">
        <DescriptionPartFR />
        <DemoVideo />
        <SectionExamplesPartFR />
        <TemoignagePartFR />
        <ContactFR />
        <FaqFR />
        <SectionQuestionFR />
      </div>
    </>
  );
}

export default IndexPartFR;
