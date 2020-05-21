import React from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import IndexNavbarFR from "components/Navbars/IndexNavbarFR.js";
import IndexHeaderFR from "components/Headers/IndexHeaderFR.js";
import DemoFooter from "components/Footers/DemoFooter.js";

import ContactFR from "views/index-sections/ContactFR.js";
import TemoignageFR from "views/index-sections/TemoignageFR.js";
import SectionExamplesFR from "views/index-sections/SectionExamplesFR.js";

import Description from "views/index-sections/Description.js";
import DescriptionFR from "views/index-sections/DescriptionFR.js";
import SectionNavbars from "views/index-sections/SectionNavbars.js";
import SectionNavigation from "views/index-sections/SectionNavigation.js";
import SectionProgress from "views/index-sections/SectionProgress.js";
import SectionNotifications from "views/index-sections/SectionNotifications.js";
import SectionTypography from "views/index-sections/SectionTypography.js";
import SectionJavaScript from "views/index-sections/SectionJavaScript.js";
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionDark from "views/index-sections/SectionDark.js";
import SectionLogin from "views/index-sections/SectionLogin.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import SectionDownload from "views/index-sections/SectionDownload.js";

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
      </div>
    </>
  );
}

export default IndexFR;
