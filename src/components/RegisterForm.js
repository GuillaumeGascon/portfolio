import React, { Component } from 'react';
import logo from '../img/logo.png'

class RegisterForm extends Component {
  constructor(){
    super()
    this.state = {
      file: 'Choose a picture',
      username: '',
      password: '',
      verification: '',
      email: '',
      avatar: '',
    }
  }
  render() {
    return (
      <div id='RegisterForm'>

        <div id="title">
            <div id="imageTitle">
              <img src={logo} alt='logo' />
            </div>

            <div id="textTitle">
              <p><b>Guillaume</b><br/>GASCON</p>
            </div>
        </div>

        <form>
          <label>Username</label>
          <input type="text" name="username" placeholder="username" id='username'></input>
          <label>Password</label>
          <input type="password" name="password" placeholder="password" id='password'></input>
          <label>Repeat password</label>
          <input type="password" name="verification" placeholder="repeat your password" id='verification'></input>
          <label>Email</label>
          <input type="email" name="email" placeholder="email"></input>
          <label>Avatar</label>
          <label for="file" class="label-file">{this.state.file}</label>
          <input id='file' type="file" name="avatar"></input>

          <button>Register</button>
        </form>

      </div>
    );
  }
}

export default RegisterForm;
