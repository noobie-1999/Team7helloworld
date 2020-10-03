import React from "react";
import axios from "axios";
import { QuestionList } from "../components/questionList";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { backendURL } from '../../../utils/backURL'

class QuestionHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.questions = [];
    this.state.shownQuestions = this.state.questions;
    this.state.filter = {
      _id: "",
      ques: "",
      options: "",
      ans: ""
    };
    this.state.activeSort = "0";

    this.handleRowDel = this.handleRowDel.bind(this);
    this.handleRowAdd = this.handleRowAdd.bind(this);
    this.handleRowSave = this.handleRowSave.bind(this);
  }

  handleRowDel(question) {
    const { org } = this.props.auth
    let index = this.state.questions.indexOf(question);
    let questions = this.state.questions;

    questions.splice(index, 1);
    let shownQuestions = questions



    // Delete on API

    axios
      .delete(`${backendURL}/api/post/orgs/questions/` + question._id, {
        data: {
          'clubCode': `${org.clubCode}`,
          'testId': `${org.testId}`,
          'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`
        }

      })
      .then(
        this.setState({
          questions: questions,
          shownQuestions: shownQuestions
        })
      )
      .catch(err => {
        JSON.stringify(err.config);
      });
  }

  handleRowAdd(question) {
    const { org } = this.props.auth
    // Create on API
    axios
      .post(`${backendURL}/api/post/orgs/questions/` + question._id, {

        'clubCode': `${org.clubCode}`,
        'testId': `${org.testId}`,
        'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`,
        'question': {
          '_id': question._id,
          'ques': question.ques,
          'options': question.options.split(","),
          'ans': question.ans,
        }




      })
      .then(res => {
        question._ids = res.data._id;
      })
      .catch(err => {
        console.log(err)
      });

    // Update State and the data shown filtered/sorted
    let questions = this.state.questions;
    questions.push(question);

    let shownQuestions = questions



    this.setState({
      questions: questions,
      shownQuestions: shownQuestions
    });
  }

  handleRowSave(question) {
    const { org } = this.props.auth
    // Update on API
    axios
      .put(`${backendURL}/api/post/orgs/questions/` + question._id, {
        'clubCode': `${org.clubCode}`,
        'testId': `${org.testId}`,
        'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`,
        'question': {
          '_id': question._id,
          'ques': question.ques,
          'options': question.options.split(","),
          'ans': question.ans,
        }
      })
      .then()
      .catch(err => {
        console.log(err.response);
      });
  }

  handleFilterChange(evt) {
    let filters = this.state.filter;
    filters[evt.target.name] = evt.target.value;

    let shownQuestions = this.state.questions.filter


    this.setState({ filter: filters, shownQuestions: shownQuestions });
  }



  // Lifecycle Methods
  componentDidMount() {
    //   const { org } = this.props.auth;
    //   // Read All on API
    //   axios
    //     .post(`${backendURL}/api/post/orgs/viewQuestions`, {
    //       'clubCode': `${org.clubCode}`,
    //       'testId': `${org.testId}`,
    //       'token': `${localStorage.getItem('jwtToken').split(" ")[1]}`
    //     })
    //     .then(res => {

    //       let shownQuestions = res.data

    //       this.setState({
    //         questions: res.data,
    //         shownQuestions: shownQuestions
    //       });
    //     })
    //     .catch(err => {
    //       console.log("API GET : Error " + err.response);
    //     });
  }

  render() {
    return (
      <div style={{ overflowX: 'scroll' }}>
        <QuestionList
          questions={this.state.shownQuestions}
          filterValue={this.state.filter}
          onRowDel={this.handleRowDel}
          onRowAdd={this.handleRowAdd}
          onRowSave={this.handleRowSave}
          onFilterChange={this.handleFilterChange}
        /></div>
    );
  }
}

QuestionHolder.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps
)(QuestionHolder)
