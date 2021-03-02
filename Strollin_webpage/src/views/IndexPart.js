import React from "react";

import IndexNavbarPart from "components/Navbars/IndexNavbarPart.js";
import IndexHeaderPart from "components/Headers/IndexHeaderPart.js";

import DescriptionPart from "views/index-sections/DescriptionPart.js";
import Contact from "views/index-sections/Contact.js";
import TemoignagePart from "views/index-sections/TemoignagePart.js";
import SectionQuestion from "views/index-sections/SectionQuestion.js";
import SectionExamplesPart from "views/index-sections/SectionExamplesPart.js";
import Faq from "views/index-sections/Faq.js";
import DemoVideo from "views/index-sections/DemoVideo.js";
import TutorialApk from "views/index-sections/TutorialApk.js";

function IndexPart() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexNavbarPart />
      <IndexHeaderPart />
      <div className="main">
        <DescriptionPart />
        <DemoVideo />
        <SectionExamplesPart />
        <TemoignagePart />
        <TutorialApk />
        <Contact />
        <Faq />
        <SectionQuestion />
      </div>
    </>
  );
}

export default IndexPart;
