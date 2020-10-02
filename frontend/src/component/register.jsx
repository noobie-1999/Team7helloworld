import React, { Component } from "react";
import { Link } from "react-router-dom";
import { InputGroup, InputGroupAddon, Input, FormGroup, InputGroupText, Button } from 'reactstrap'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    onChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <>
                <div className="main-login-container">
                    <div className="login-container">

                        <form className='login-form-control' noValidate>
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
                            <div className="custom-control custom-radio mb-3">
                                <input
                                    className="custom-control-input"
                                    id="Teacher"
                                    name="custom-radio-1"
                                    type="radio"
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
                                />
                                <label className="custom-control-label" htmlFor="Student">
                                    <span>Student</span>
                                </label>
                            </div>
                            <Button
                                className="btn-icon mb-3 mb-sm-0 login-button"
                                color="primary"
                            >
                                <span className="btn-inner--text">Register</span>
                            </Button>

                            <hr style={{ backgroundColor: 'grey', width: '100%' }} />
                            <div className="sigun-up-text">
                                <span>Already have an account?</span><br /><br />
                                <Link to='/login'>
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
export default Register;
