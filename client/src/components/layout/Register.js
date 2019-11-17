import React, {Component} from "react"
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import server from "../../server"

class Register extends Component{

    state = {
        fullName: null,
        email: null,
        password: null,
        birthDate: new Date(),
        avatar: null
    };

    onChangeHandler = e => {this.setState({ [e.target.id]: e.target.value })};

    onChangeDateHandler = date => {this.setState({birthDate: date})};

    onSubmitHandler = () => {

    };

    render() {
        return (
            <div className="register_wrapper">
                <img className="register_logo" src={require("../../assets/images/logo_transparent.png")} alt="logo"/>
                <div className="register_form_wrapper">
                    <h2>Create your account</h2>
                    <form onSubmit={this.onSubmitHandler}>
                        <input type="text" id="fullName" placeholder="Full Name" onChange={this.onChangeHandler}/>
                        <input type="email" id="email" placeholder="Email" onChange={this.onChangeHandler}/>
                        <input type="text" id="password" placeholder="Password" onChange={this.onChangeHandler}/>
                        <div className="register_birth_date">
                            <label>Birth date</label>
                            <DatePicker
                                placeHolder="Birth Date"
                                selected={this.state.birthDate}
                                onChange={this.onChangeDateHandler}
                            />
                        </div>
                        <input type="button" value="CREATE ACCOUNT"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register