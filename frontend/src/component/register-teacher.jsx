import React, { Component } from "react";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, Input, FormGroup, InputGroupText, Button } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { registerTeacher } from '../actions/authActions'
class RegisterTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            role: ''
        }
    }
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    onChangeRole = e => {
        this.setState({
            role: e.target.id
        })
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        if (this.props.auth.isAuth) {
            this.props.history.push('/dashboard');
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuth) {
            this.props.history.push('/dashboard')
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            teacherName: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        this.props.registerTeacher(userData, this.props.history)
    }

    render() {
        return (
            <>
                <div className="main-login-container">
                    <div className="login-container">

                        <form className='login-form-control' onSubmit={this.onSubmit} noValidate>
                            <div className="logo-container">
                                <Link to='/'>
                                    <img
                                        alt="..."
                                        className="img-fluid"
                                        src={require("./../assets/logo.svg")}
                                        style={{ height: "3em" }}
                                    />
                                </Link>
                                <h2 className="login-header">
                                    Register new account
                </h2>
                            </div>
                            <FormGroup style={{ paddingRight: '1em' }}

                            >
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Name"
                                        type="text"
                                        id="name"
                                        onChange={this.onChange}
                                        value={this.state.name}



                                    />
                                </InputGroup>
                                <InputGroup className="input-group-alternative" style={{ marginTop: '1em' }}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="text"
                                        id="email"
                                        onChange={this.onChange}
                                        value={this.state.email}



                                    />
                                </InputGroup>
                                <InputGroup className="input-group-alternative" style={{ marginTop: '1em' }}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        id="password"
                                        onChange={this.onChange}
                                        value={this.state.password}
                                    />
                                </InputGroup>
                            </FormGroup>
                            {/* <div className="custom-control custom-radio mb-3">
                                <input
                                    className="custom-control-input"
                                    id="Teacher"
                                    name="custom-radio-1"
                                    type="radio"
                                    value={this.state.role}
                                    onChange={this.onChangeRole}
                                />
                                <label className="custom-control-label" htmlFor="Teacher">
                                    <span>Teacher</span>
                                </label>
                            </div>
                            <div className="custom-control custom-radio mb-3">
                                <input
                                    className="custom-control-input"
                                    defaultChecked
                                    id="Student"
                                    name="custom-radio-1"
                                    type="radio"
                                    value={this.state.role}
                                    onChange={this.onChangeRole}
                                />
                                <label className="custom-control-label" htmlFor="Student">
                                    <span>Student</span>
                                </label>
                            </div> */}
                            <Button
                                className="btn-icon mb-3 mb-sm-0 login-button"
                                color="primary"
                                type='submit'
                            >
                                <span className="btn-inner--text">Register</span>
                            </Button>

                            <hr style={{ backgroundColor: 'grey', width: '100%' }} />
                            <div className="sigun-up-text">
                                <span>Already have an account?</span><br /><br />
                                <Link to='/loginTeacher'>
                                    <span>Sign In</span>
                                </Link>
                            </div>

                            <div className="additional-text">
                                <span><i>Where learning is fun</i></span>
                            </div>

                        </form>
                    </div>
                    <div className="login-bg-container">
                    </div>
                </div>
            </>
        );
    }
}

RegisterTeacher.propTypes = {
    registerTeacher: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})
export default connect(
    mapStateToProps,
    { registerTeacher }
)(RegisterTeacher);
