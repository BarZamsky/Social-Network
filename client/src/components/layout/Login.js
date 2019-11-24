import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import Spinner from "../UI/Spinner/Spinner"
import {connect} from "react-redux"
import * as actions from "../../store/actions"

class Login extends Component{

    state = {
        email: null,
        emailError: false,
        password: null,
        passwordError: false,
    };

    onChangeHandler = e => {this.setState({ [e.target.id]: e.target.value });};

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onLogin(this.state.email, this.state.password);
    };


    render() {

        let authRedirect = null;
        if (!this.props.isAuthenticated)
            authRedirect = <Redirect to={this.props.loginRedirectPath}/>;

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let view = <Spinner/>;
        if (!this.props.loading) {
            view = (
                    <div className="login_center">
                        <img className="login_logo" src={require("../../assets/images/logo_transparent.png")} alt="logo"/>
                        <div className="login_title">Enter your credentials to login</div>

                        <form onSubmit={this.onSubmitHandler}>
                            <input className="login_input" type="email" id="email" placeholder="Email address" onChange={this.onChangeHandler}/>
                            <input className="login_input" type="password" id="password" placeholder="Password" onChange={this.onChangeHandler}/>
                            <button className="login_btn">Login</button>
                        </form>
                        <div className="login_label">Not registered yet? <a href="/register">Click to register</a></div>
                    </div>

            )
        }

        return (
            <div className="login_wrapper">
                {authRedirect}
                {errorMessage}
                {view}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        loginRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email,password) => dispatch(actions.signin(email,password)),
        onSetLoginRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)