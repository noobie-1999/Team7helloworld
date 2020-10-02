import React, { Component } from "react";
import Navbar1 from "../navbar";
import { Container } from "reactstrap";
import Learn from "../Dashboard/learn.component";
import Footer from "../footer";
import { HashRouter, NavLink, Route, Switch } from 'react-router-dom'
import Notes from "./notes.component";
import Manage from "./manage.component";

class Dashboard extends Component {
  render() {
    return (
      <>
        <Navbar1 />
        <HashRouter>
          <div className="main-content">
            <section className="section section-lg section-hero section-shaped">
              <div className="shape shape-style-1 shape-default"></div>
              <Container>
                <section className="section section-shaped">
                  <div
                    className="shape shape-style-1 shape-default greeting-box"
                    style={{ backgroundColor: "#FDB813", borderRadius: "1em" }}
                  ></div>
                  <div style={{ position: "absolute", right: "2em" }}>
                    <img
                      alt="..."
                      className="img-fluid flame-success"
                      src={require("./../../assets/img/flame-success 1.svg")}
                      style={{ marginTop: "-10em" }}
                    />
                  </div>
                  <div className="dash-head-text">
                    <h3 className="text-white">
                      <b>Hello</b>
                    </h3>
                  </div>
                </section>

                <div
                  style={{
                    margin: "5em 2em",
                  }}
                >
                  <div className="scrollmenu">
                    <NavLink exact to='/'> <span>Home</span></NavLink>
                    <NavLink exact to='/exam'><span>Notes</span></NavLink>
                    <NavLink exact to='/manage'><span>Manage</span></NavLink>


                  </div>
                  <div className="content-holder">
                    <Switch>
                      <Route exact path='/' component={Learn} />
                      <Route exact path='/exam' component={Notes} />
                      <Route exact path='/manage' component={Manage} />


                    </Switch>
                  </div>
                </div>
              </Container>
            </section>
          </div>
        </HashRouter>

        <Footer />
      </>
    );
  }
}
export default Dashboard;
