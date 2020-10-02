import React, { Component } from "react";
import { Card, CardBody, Modal, Button } from "reactstrap";

class LearnCards extends Component {
  state = {
    key: ''
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value

    })
  }
  toggle = state => {
    this.setState({
      [state]: !this.state[state]
    })
  }
  render() {
    return (
      <div>
        <Card
          style={{
            backgroundColor: "#FDB813",
            borderRadius: "1em",
          }}
        >
          <CardBody>
            <span className="text-white card-text">Sample Topic</span>
            <div className="start-exam"><i className='fa fa-play text-white' onClick={() => this.toggle('accessKey')}></i></div>
          </CardBody>
        </Card>
        <Modal
          className='modal-dialog-centered'
          isOpen={this.state.accessKey}
          toggle={() => this.toggle('accessKey')}

        >
          <div className="modal-header access-modal">
            <h6 className="modal-title" id="modal-title-default">
              Access Key Verification
                </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("accessKey")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body access-modal">
            <p>
              Please enter the Access Key for the exam.
                </p>
            <input type='text' name='key' value={this.state.key} onChange={this.onChange}></input>
          </div>
          <div className="modal-footer access-modal">
            <a href='/main-exam'>
              <Button color="primary" type="button">
                Verify
                </Button>
            </a>
            <Button
              className="ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggle("accessKey")}
            >
              Close
                </Button>
          </div>
        </Modal>
      </div>
    );
  }
}
export default LearnCards;
