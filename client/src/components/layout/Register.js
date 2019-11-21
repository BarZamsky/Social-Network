import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Spinner from "../UI/Spinner/Spinner"
import server from "../../server"

class Register extends Component{

    state = {
        fullName: null,
        fullNameError: false,
        email: null,
        emailError: false,
        password: null,
        passwordError: false,
        dd:null,
        mm:null,
        yyyy:null,
        loading: false,
        error: false,
        errorMessage: "Something went wrong with your request",
        success: false,
        formValid: false
    };

    componentDidMount() {
        this.setState({
            fullName: null,
            email: null,
            password: null,
            dd:null,
            mm:null,
            yyyy:null,
            loading: false,
            error: false,
            errorMessage: "Something went wrong with your request",
            success: false,
            formValid:false
        })
    }

    onChangeHandler = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
        this.validateForm();
    };

    onClickHandler = () => {
        this.validateForm();
        if (this.state.formValid) {
            this.setState({loading: true});
            const birthDate = this.state.dd + "/" + this.state.mm + "/" + this.state.yyyy;
            const body = {
                fullName: this.state.fullName,
                email: this.state.email,
                password: this.state.password,
                birthDate: birthDate
            };

            server.post("/auth/register", body, (err, res) => {
                console.log(err, res);
                this.setState({loading: false});
                if (err) {
                    this.setState({error: true});
                    return;
                }

                if (res && res.data.status_code === 1007) {
                    const msg = "Given email already exists in the system.";
                    this.setState({error: true, errorMessage: msg});
                    return
                }

                if (res && res.data.status_code === 0) {
                    this.setState({success: true})
                }
            })
        }
    };

    reloadPage = () => {
        this.setState({loading: true});
        window.location.reload();
    };

    validateForm = () => {
        let isValid = true;

        if (this.state.email) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(this.state.email) && isValid;
            !isValid ? this.setState({emailError: true}) : this.setState({emailError: false})
        } else
            this.setState({emailError: true});

        if (this.state.password) {
            isValid = isValid && this.state.password.length >= 7;
            !isValid ? this.setState({passwordError: true}) : this.setState({passwordError: false})

        } else
            this.setState({passwordError: true});

        if (!this.state.fullName) {
            isValid = false;
            this.setState({fullNameError: true})
        } else {
            this.setState({fullNameError: false})
        }

        if (!this.state.fullNameError && !this.state.passwordError && !this.state.emailError)
            this.setState({formValid: true});
        else
            this.setState({formValid: false});
        return isValid;
    };

    render() {
        let body = (
            <>
                <div className="row">
                    <h4>Account</h4>
                    <div className="input-group">
                        <div className={this.state.fullNameError ? "input-field err" : "input-field"}>
                            <i className="fa fa-user icon"/>
                            <input id="fullName" type="text" placeholder="Full Name" onChange={this.onChangeHandler} autoComplete="off" />
                        </div>
                        <div className={this.state.emailError ? "input-field err" : "input-field"}>
                            <i className="fa fa-envelope icon"/>
                            <input id="email" type="email" placeholder="Email Address" onChange={this.onChangeHandler} autoComplete="off" />
                        </div>
                        <div className={this.state.passwordError ? "input-field err" : "input-field"}>
                            <i className="fa fa-key icon"/>
                            <input id="password" type="password" placeholder="Password" onChange={this.onChangeHandler}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-half">
                    <h4>Date of Birth</h4>
                        <div className="input-group">
                            <div className="col-third">
                                <input id="dd" type="text" placeholder="DD" onChange={this.onChangeHandler} autoComplete="off"/>
                            </div>
                            <div className="col-third">
                                <input id="mm" type="text" placeholder="MM" onChange={this.onChangeHandler} autoComplete="off"/>
                            </div>
                            <div className="col-third">
                                <input id="yyyy" type="text" placeholder="YYYY" onChange={this.onChangeHandler} autoComplete="off"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <button className="register-btn" onClick={this.onClickHandler}>CREATE ACCOUNT</button>
                </div>
                <div className="row link">
                    <Link to="/">Cancel</Link>
                </div>
            </>
        )
        if (this.state.loading)
            body = (
                <div className="spinner-container">
                    <Spinner />
                </div>
            )

        if (this.state.error)
            body = (
                <div className="spinner-container">
                    <h4>Oops..</h4>
                    <div>{this.state.errorMessage}</div>
                    <div onClick={this.reloadPage} className="try-again-text">Try again</div>
                </div>
            );

        if (this.state.success) {
            body = (
                <div className="spinner-container">
                    <h4>Your account was created successfully!</h4>
                    <Link to="/login">Continue to LOGIN</Link>
                </div>
            )
        }

        return (
            <div className="register_wrapper">
                <div className="register_form_wrapper">
                    <div className="logo-container">
                        <img className="register_logo" src={require("../../assets/images/logo_transparent.png")} alt="logo"/>
                    </div>
                    {body}
                </div>
            </div>
        )
    }
}

export default Register