import React from "react";

import IndexNavbarFR from "components/Navbars/IndexNavbarFR.js";
import IndexHeaderFR from "components/Headers/IndexHeaderFR.js";

import ContactFR from "views/index-sections/ContactFR.js";
import TemoignageFR from "views/index-sections/TemoignageFR.js";
import SectionExamplesFR from "views/index-sections/SectionExamplesFR.js";
import FaqFR from "views/index-sections/FaqFR.js";
import SectionQuestionFR from "views/index-sections/SectionQuestionFR.js";

import DescriptionFR from "views/index-sections/DescriptionFR.js";

function IndexFR() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("indexFR");
    return function cleanup() {
      document.body.classList.remove("indexFR");
    };
  });
  return (
    <>
      <IndexNavbarFR />
      <IndexHeaderFR />
      <div className="main">
        <DescriptionFR />
        <SectionExamplesFR />
        <TemoignageFR />
        <ContactFR />
        <FaqFR />
        <SectionQuestionFR />
      </div>
    </>
  );
}

export default IndexFR;
