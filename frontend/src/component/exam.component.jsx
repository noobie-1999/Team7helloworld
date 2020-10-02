import React, { Component } from "react";
import Navbar1 from "./navbar";
import { Card, CardBody, Container, Button } from "reactstrap";
import Footer from "./footer";
import { Link } from "react-router-dom";
class Exam extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return (
      <>
        <Navbar1 />

        <div className="main-content" style={{ backgroundColor: '#5545bf' }}>
          <section className="section section-lg section-hero section-exam">
            <div className="shape shape-style-1 shape-default"></div>
            <Container>
              <section className="section section-shaped">
                <div className="center-item">
                  <h1 className="display-3 text-white">Exam Topic</h1>
                </div>
              </section>
              <div className="exam-area">
                <div className="exam-question center-item">
                  <span className="question text-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam quisquam suscipit earum dolores in veniam! Sunt
                    asperiores aut, quidem velit libero amet dicta nobis illum
                    accusamus, magnam facere beatae. Deserunt?
                  </span>
                </div>
                <center>
                  <div
                    className="grid"
                    style={{ marginTop: "2em", width: "70%" }}
                  >
                    <Card className="options">
                      <CardBody>
                        <span>Lorem</span>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className='options'>
                        <span>Lorem</span>
                      </CardBody>
                    </Card>
                    <Card className="options">
                      <CardBody>
                        <span>Lorem</span>
                      </CardBody>
                    </Card>
                    <Card className="options">
                      <CardBody>
                        <span>Lorem</span>
                      </CardBody>
                    </Card>
                  </div>
                </center>
              </div>
              <div
                className="submit-area"
                style={{ textAlign: "right", marginTop: "5em" }}
              >
                <Link to='/result'>


                <Button className="py-2" color="warning">
                    Continue
                </Button>
                </Link>
              </div>
            </Container>
          </section>
        </div>
        <Footer /> 
      </>
    );
  }
}

export default Exam;
