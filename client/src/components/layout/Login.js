import React, {Component} from "react"
import {Redirect,Link} from "react-router-dom"
import Spinner from "../UI/Spinner/Spinner"
import {connect} from "react-redux"

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import * as actions from "../../store/actions"
import Container from "@material-ui/core/Container";

class Login extends Component {

    state = {
        email: null,
        password: null
    };

    onChangeHandler = e => {this.setState({ [e.target.id]: e.target.value });};

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.props.onLogin(this.state.email, this.state.password);
    };


    render() {

        let authRedirect = null;
        if (this.props.isAuthenticated)
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
                <Container component="main" maxWidth="xs">
                    <img className="form_logo" src={require("../../assets/images/logo_transparent.png")} alt="logo"/>
                        <form onSubmit={this.onSubmitHandler}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={this.onChangeHandler}
                            />
                            <TextField
                                fullWidth
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.onChangeHandler}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{'marginTop':'16px','marginBottom':'8px','backgroundColor':'#00008B','color':'white'}}> Sign in </Button>
                        </form>
                        <Grid container justify="flex-end">
                            {/*<Grid item xs>*/}
                                {/*<Link to="/register" className="login_link">Forgot password?</Link>*/}
                            {/*</Grid>*/}
                            <Grid item>
                                <Link to="/register" className="login_link">Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Container>
            )
        }

        return (
            <div className="wrapper">
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