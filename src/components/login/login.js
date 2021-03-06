import React, { Component } from 'react';
import axios from 'axios';
//import User from './user';
import { Input } from 'reactstrap';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/usersActions.js';
import '../../App.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            username: "",
            password: "",
            display: true,
            disabled: true,
            userList: [],
            userInfo: []
        })
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // ********* USER LOGIN **************************
    login = (e) => {
        e.preventDefault();
        if (this.state.username && this.state.password) {
            const userInfo =
            {
                username: this.state.username,
                password: this.state.password

            };
            axios
                .post('https://frontend-william.herokuapp.com/api/users/login', userInfo)
                .then(res => {
                    localStorage.setItem('jwt', res.data.token);
                    alert('Login successful...');
                    const passWord = "";
                    const userName = "";
                    this.setState(() => ({ username: userName, password: passWord, display: false, disabled: false }))
                    this.props.noteList(e);
                })
                .catch(err => {
                    console.error('err from login', err);
                });
        } else {
            alert('Please enter a username, password and department')
        }
    }

    // ************ USER REGISTER ***************************
    register = (e) => {
        e.preventDefault();
        if (this.state.username && this.state.password) {
            const userInfo =
            {
                username: this.state.username,
                password: this.state.password
            };

            axios
                .post('https://frontend-william.herokuapp.com/api/users/register', userInfo)
                .then(response => {
                    alert('registration complete...')
                    let passWord = "";
                    let userName = "";
                    this.setState(() => ({ username: userName, password: passWord }))
                })
                .catch(error => {
                    console.error('Server Error', error);
                });
        } else {
            alert('Please enter a username and password')
        }
    }

    // ***************** USER LOGOUT **************************
    logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('jwt')
        alert("User has successfully signed out")
        this.setState(() => ({ userList: [], display: true, disabled: true }));
    }

    // **** USER MESSAGE JUST SOME HUMOR *****
    message = () => {
        alert("Sorry, we dont know it either... #BestSecurityEver");
    }

    render() {
        // *** CODE TO CHANGE THE LOGOUT AND USERLIST BUTTONS TEXT COLOR ****
        let classNames = require('classnames');

        let btnClass = classNames({
            btnLogout: true,
            'btnNoWork': this.state.display
        })
        return (

            <div className="form-container">

                <form className="main-form" onSubmit={this.login}>
                    <h2 className="main-title">Lambda Notes App</h2>
                    <div className="header-text">Please register if you are a new user. Enter your email address, create a password and then
            press the Register button. Use the same email and password to Login.</div>
                    <Input type="text" id="username" value={this.state.username} name='username' className="form-control" placeholder="Enter Email" onChange={this.handleInputChange} />
                    <Input type="password" id="password" value={this.state.password} name='password' className="form-control" placeholder="Enter Password" onChange={this.handleInputChange} />
                    <button type="button" className="btn-register" value="register" onClick={this.register} name="viewHome" id="register">Register</button>
                    <button type="submit" className="btn-login" value="login" onSubmit={this.login} name="viewHome" id="login">Login</button>
                    <button type="button" className={btnClass} disabled={this.state.disabled} value="logout" id="logout" onClick={this.logout} name="viewHome">Logout</button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        error: state.usersReducer.error
    };
};

export default connect(mapStateToProps, {
    registerUser
})(Login);