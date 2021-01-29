import React from "react";
import classnames from "classnames";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container
} from "reactstrap";

function IndexNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  /*function downloadApp() {
    fetch('http://localhost:8080/employees/download')
        .then(response => {
            response.blob().then(blob => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'employees.json';
                a.click();
            });
            //window.location.href = response.url;
    });
  }*/

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            title="Home"
          >
            Strollin'
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
          <button>Download Strollin</button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/StrollinApp"
                target="_blank"
                title="Follow us on Twitter!"
              >
                <i className="fa fa-twitter" />
                <p className="d-lg-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/pg/Strollin-109109370759775/posts/?ref=page_internal"
                target="_blank"
                title="Like us on Facebook!"
              >
                <i className="fa fa-facebook-square" />
                <p className="d-lg-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/TokanoFR/"
                target="_blank"
                title="Follow us on Instagram!"
              >
                <i className="fa fa-instagram" />
                <p className="d-lg-none">Instagram</p>
              </NavLink>
            </NavItem>
            <div className="navbar-translate">
            <NavbarBrand
                data-placement="bottom"
                href="/indexFR"
                title="FR"
              >
              <img src={require("./../../assets/img/franceIcon.jpg")} style={{ width: 30, height: 18}}/>
              </NavbarBrand>
              <button
                aria-expanded={navbarCollapse}
                className={classnames("navbar-toggler navbar-toggler", {
                  toggled: navbarCollapse
                })}
                onClick={toggleNavbarCollapse}
              >
              </button>
            </div>
            <div className="navbar-translate">
              <NavbarBrand
                data-placement="bottom"
                href="/index"
                title="EN"
              >
              <img src={require("./../../assets/img/englandIcon.jpg")} style={{ width: 30, height: 18}}/>
              </NavbarBrand>
              <button
                aria-expanded={navbarCollapse}
                className={classnames("navbar-toggler navbar-toggler", {
                  toggled: navbarCollapse
                })}
                onClick={toggleNavbarCollapse}
              >
              </button>
            </div>
            <div className="navbar-translate">
              <NavbarBrand
                data-placement="bottom"
                href="/indexPart"
                title="Partner Page"
              >
                Partner Page
              </NavbarBrand>
              <button
                aria-expanded={navbarCollapse}
                className={classnames("navbar-toggler navbar-toggler", {
                  toggled: navbarCollapse
                })}
                onClick={toggleNavbarCollapse}
              >
              </button>
            </div>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
