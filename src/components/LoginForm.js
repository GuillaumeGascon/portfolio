import React, { Component } from 'react';
import {IoMdCheckmarkCircleOutline, IoMdWarning} from 'react-icons/io';
import Axios from 'axios';
import Bcrypt from 'bcryptjs';

import logo from '../img/logo.png';

class RegisterForm extends Component {
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
      pwCrypt: '',
      userCrypt: '',
      avatar: '',
      banner: '',
      veriPass: '',
    }

    this.handlesubmit = this.handlesubmit.bind(this);
    this.writeCookie = this.writeCookie.bind(this);

  }

  writeCookie(name,value,days) {
      var date, expires;
      if (days) {
          date = new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          expires = "; expires=" + date.toGMTString();
              }else{
          expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
  }

  readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
  }

  handlesubmit(e){
    e.preventDefault();

    const text = document.getElementById('innerText');
    const textContainer = document.getElementById('errorHandler');

    if(this.state.username === '' || this.state.password ===''){

      text.innerHTML = 'You must fill all the input !';
      textContainer.style.opacity = 1;
      textContainer.style.transform = 'translateY(0)';

    }else{

      const username = this.state.username.toLowerCase();
  
      Axios.post('http://localhost:4200/api/name', {
            Username: username
          })
          .then(response => {

            const data = response.data;

            console.log(data.Username !== null)

            if(data === null){

              text.innerHTML = "This username doesn't exist";
              textContainer.style.opacity = 1;
              textContainer.style.transform = 'translateY(0)';

            }else{
              
              this.setState({avatar: data.Avatar,
                              banner: data.Banner,
                              veriPass: data.Password}, () => {

                Bcrypt.compare(this.state.password, this.state.veriPass, (err, res) => {

                  console.log(res)

                  if(res !== true){

                    text.innerHTML = "Check username or password";
                    textContainer.style.opacity = 1;
                    textContainer.style.transform = 'translateY(0)';

                  }else{

                    console.log(`> Logged In, welcome [${this.state.username}]`)

                    this.writeCookie('session', true, 3);
                    this.writeCookie('sessionUser', this.state.username, 3);
                    this.writeCookie('sessionAvatar', this.state.avatar , 3);
                    this.writeCookie('sessionBanner', this.state.banner , 3);

                    window.location = 'http://localhost:3000/api/secret/dashboard';

                  }

                })

              })

            }
          })
          .catch(err => console.log(err))

    }

  }

  componentDidMount(){

    const session = this.readCookie('session');

    this.setState({session: session}, () =>{

        if(this.state.session === true){
            
            window.location = 'http://localhost:3000/';

        }

    })

  }

  render() {
    return (
      <div id='formStyle'>

        <div id="errorHandler">
            <div className="errorIcon">
                <IoMdWarning/>                    
            </div>

            <div className="errorText">
                <p id="innerText"></p>
            </div>
        </div>

        <div id="title" className="logTitle">
            <div id="imageTitle">
              <img src={logo} alt='logo' />
            </div>

            <div id="textTitle">
              <p><b>Guillaume</b><br/>GASCON</p>
            </div>
        </div>

        <form>
          <label>Username&nbsp;<IoMdCheckmarkCircleOutline id='checkUser' style={{display: 'none', color: 'green'}}/></label>
          <input 
                type="text" 
                name="username" 
                placeholder="username" 
                id='username'
                value={this.state.username}
                onChange={event => this.setState({username: event.target.value}, () => {
                       
                  const veriUser = /^[a-zA-Z0-9/-/@éèàùêëüöïôû]{3,16}$/gmi;
                  
                  if(veriUser.test(this.state.username) === true){
                      document.getElementById('username').style.border = '1px solid green';
                      document.getElementById('checkUser').style.display = 'block';
                  }else if(veriUser.test(this.state.username) === false){
                      document.getElementById('username').style.border = '1px solid red';
                      document.getElementById('checkUser').style.display = 'none';
                  }
                })}
          />
          <label>Password&nbsp;<IoMdCheckmarkCircleOutline id='checkPass' style={{display: 'none', color: 'green'}}/></label>
          <input 
                type="password" 
                name="password" 
                placeholder="password" 
                id='password'
                className="logPass"
                value={this.state.password}
                onChange={event => this.setState({password: event.target.value}, () => {
                    
                    const veriPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gmi;

                    if(veriPass.test(this.state.password) === true){
                        document.getElementById('password').style.border = '1px solid green';
                        document.getElementById('checkPass').style.display = 'block';
                    }else if(veriPass.test(this.state.password) === false){
                        document.getElementById('password').style.border = '1px solid red';
                        document.getElementById('checkPass').style.display = 'none';
                    }
                })}
          />

          <button onClick={this.handlesubmit}>Register</button>
        </form>

        <div id="downLinkForm" className="loginDownLink">
          <a href="http://localhost:3000/api/secret/register">Not register ?</a>
          <a href="http://localhost:3000/api/secret/forgotten">forgotten password ?</a>
        </div>

      </div>
    );
  }
}

export default RegisterForm;
