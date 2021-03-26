import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";

import Description from "views/index-sections/Description.js";
import Contact from "views/index-sections/Contact.js";
import Temoignage from "views/index-sections/Temoignage.js";
import SectionQuestion from "views/index-sections/SectionQuestion.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import Faq from "views/index-sections/Faq.js";
import DemoVideo from "views/index-sections/DemoVideo.js";
import TutorialApk from "views/index-sections/TutorialApk.js";

function Index() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <IndexNavbar />
      <IndexHeader />
      <div className="main">
        <Description />
        <DemoVideo />
        <SectionExamples />
        <Temoignage />
        <TutorialApk />
        <Contact />
        <Faq />
        <SectionQuestion />
      </div>
    </>
  );
}

export default Index;
