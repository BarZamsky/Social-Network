import React, {Component} from "react"
import {Link} from "react-router-dom"
import Spinner from "../UI/Spinner/Spinner"
import server from "../../server"

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputMask from 'react-input-mask';
import DateFnsUtils from '@date-io/date-fns';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from "@material-ui/pickers"

class Register extends Component{

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthDate: new Date(),
        phoneNumber:"",
        loading: false,
        error: false,
        errorMessage: "Something went wrong with your request",
        success: false
    };

    componentDidMount() {
        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            birthDate: new Date(),
            phoneNumber:"",
            loading: false,
            error: false,
            errorMessage: "Something went wrong with your request",
            success: false
        })
    }

    onChangeHandler = e => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
    };

    handleDateChange = date => {this.setState({birthDate: date})};

    onClickHandler = () => {
        this.setState({loading: true});
        const body = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            birthDate: this.state.birthDate,
            phoneNumber: this.state.phoneNumber
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
    };

    reloadPage = () => {
        this.setState({loading: true});
        window.location.reload();
    };

    render() {
        let body = (
            <Container component="main" maxWidth="xs" style={{"marginBottom":'20px'}}>
                <img className="form_logo" src={require("../../assets/images/logo_transparent.png")} alt="logo"/>
                <form onSubmit={this.onClickHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={this.onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={this.onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.onChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputMask
                                mask="999 999 9999"
                                maskChar=" "
                                onChange={this.onChangeHandler}>
                                {() => <TextField
                                    autoComplete="pNumber"
                                    name="phoneNumber"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number"
                                /> }
                            </InputMask>
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    disableToolbar
                                    variant="outlined"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Birth Date"
                                    value={this.state.birthDate}
                                    onChange={this.handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}/>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                style={{'textAlign':'left'}}
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{'marginTop':'20px','marginBottom':'8px','backgroundColor':'#00008B','color':'white'}}>
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" className="login_link">Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );

        if (this.state.loading)
            body = <Spinner />

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
            <div className="wrapper">
                {body}
            </div>
        )
    }
}

export default Register