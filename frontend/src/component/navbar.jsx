import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, NavbarBrand } from "reactstrap";

class Navbar1 extends Component {
  render() {
    return (
      <div>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5">
                <Link to='/'>
                <img
                  alt="..."
                  className="img-fluid"
                  src={require("./../assets/logo.svg")}
                  style={{ height: "3em" }}
                  /></Link>
              </NavbarBrand>
            </Container>
          </Navbar>
        </header>
      </div>
    );
  }
}

export default Navbar1;
