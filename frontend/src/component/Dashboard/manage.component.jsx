import React, { Component } from "react";
import QuestionHolder from '../questions/containers/main';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { backendURL } from '../../utils/backURL'
import axios from 'axios'
import { Button } from 'reactstrap'
class Manage extends Component {
    onSubmit(bodyData) {
        bodyData.preventDefault();
        axios({
            method: 'post',
            url: `${backendURL}/orgs/addTest`,
            data: bodyData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (res) {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }
    render() {
        var bodyData = new FormData();
        bodyData.append('testName', '')
        bodyData.append('maxMarks', 5)
        bodyData.append('perQuestionmarks', 1)
        bodyData.append('negativeMarks', 0)
        bodyData.append('token', localStorage.getItem('jwtToken'))
        bodyData.append('teacherId', this.props.teacherId)
        return (
            <>
                <span className="center-item" style={{ fontSize: "1.5em" }}>
                    Upload the content to prepare the questions
          </span>
                <form noValidate style={{ margin: '1em' }} onSubmit={(file) => {
                    bodyData.append('file', file);
                    console.log(bodyData)
                    this.onSubmit(bodyData)

                }}>
                    <div class="form-group files color">

                        <input type="file" name='filename' class="form-control" multiple="" enctype="multipart/form-data" />
                    </div>
                    <div className="center-item">


                        <Button
                            className="btn-icon mb-3 mb-sm-0 login-button"
                            color="primary"
                            type='submit'
                        >
                            <span className="btn-inner--text">Upload</span>
                        </Button> </div>
                </form>
                <div className="manual-questions" style={{ marginTop: '2em', marginBottom: '2em' }}><QuestionHolder /></div>

            </>
        )
    }
}
Manage.propType = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(
    mapStateToProps
)(Manage);
