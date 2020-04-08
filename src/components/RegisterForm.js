import React, { Component } from 'react';
import {IoMdCheckmarkCircleOutline, IoMdWarning} from 'react-icons/io';
import Axios from 'axios';
import Bcrypt from 'bcryptjs';

import RegServices from '../services/RegServices';

import logo from '../img/logo.png';

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
      formData: '',
      type: '',
    }

    this.Services = new RegServices();
    this.handlesubmit = this.handlesubmit.bind(this)
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

    const extension = this.state.type.split('/').pop().toLowerCase()
    const allow = ['jpeg', 'jpg', 'png'];
    const veriUser = /^[a-zA-Z0-9/-/@éèàùêëüöïôû]{3,16}$/gmi;
    const veriPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gmi;// eslint-disable-next-line
    const veriMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gmi;

    if(this.state.email === '' || this.state.username === '' || this.state.password === '' || this.state.avatar === '' || this.state.verification === ''){
      
      text.innerHTML = 'You must fill all the input !';
      textContainer.style.opacity = 1;
      textContainer.style.transform = 'translateY(0)';

    }else if(veriUser.test(this.state.username) !== true){

      text.innerHTML = 'Username must be between 3 and 16 characters and can only contain numbers and letters';
      textContainer.style.opacity = 1;
      textContainer.style.transform = 'translateY(0)';
      
    }else if(veriPass.test(this.state.password) !== true){

      text.innerHTML = 'Password must be a least 8 characters and contain 1 uppercase characters';
      textContainer.style.opacity = 1;
      textContainer.style.transform = 'translateY(0)';

    }else if(this.state.verification !== this.state.password){

      text.innerHTML = 'The two password entered are not the same';
      textContainer.style.opacity = 1;
      textContainer.style.transform = 'translateY(0)';

    }else if(veriMail.test(this.state.email) !== true){

      text.innerHTML = 'The email entered are not a valid email adress';
      textContainer.style.opacity = 1;
      textContainer.style.transform = 'translateY(0)';

    }else if(allow.indexOf(extension) === -1){

      text.innerHTML = 'Only jpg & png files are allowed for the avatar';
      textContainer.style.opacity = 1;
      textContainer.style.transform = 'translateY(0)';

    }else{

      text.innerHTML = '';
      textContainer.style.opacity = 0;
      textContainer.style.transform = 'translateY(-150px)';

      Axios.post('http://localhost:4200/api/name', {
        Username: this.state.username,
      })
      .then(response => {

        const dataName = response.data;

        if(dataName !== null){

          text.innerHTML = 'This username already exist, please choose another one';
          textContainer.style.opacity = 1;
          textContainer.style.transform = 'translateY(0)';

        }else{

          Axios.post('http://localhost:4200/api/mail', {
            Email: this.state.email
          })
          .then(response => {

            const dataMail = response.data;

            if(dataMail !== null){

              text.innerHTML = 'An account with this email already exist';
              textContainer.style.opacity = 1;
              textContainer.style.transform = 'translateY(0)';

            }else{

              const username = this.state.username.toLowerCase()
              const email = this.state.email.toLowerCase()

              const saltRounds = 10;

              Bcrypt.genSalt(saltRounds, (err, salt) => {

                Bcrypt.hash(this.state.password, salt, (err, hash) => {

                  const password = hash;

                  Bcrypt.hash(email, salt, (err, hash) =>{

                    const emailHash = hash;

                    Bcrypt.hash(username, salt, (err, hash) => {

                      const userHash = hash;

                      this.Services.sendData({
                        username: userHash,
                        password: password,
                        email: emailHash,
                        avatar: this.state.avatar,
    
                      });
                      
                    })

                  }) 


                  console.log(`%c> Logged In, welcome [${this.state.username}]`, 'color: #0092ff');

                  this.writeCookie('session', true, 3);
                  this.writeCookie('sessionUser', this.state.username, 3);
                  this.writeCookie('sessionAvatar', this.state.avatar, 3);

                  return new Promise(() => {

                    const req = new XMLHttpRequest();

                    req.open("POST", "http://localhost:4200/upload");
                    req.send(this.state.formData);

                  })

                })
              })

            }
            
          })
          .catch(error => console.log(error))

        }

      })
      .catch(error => console.log(error))

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

        <div id="title" className="regTitle">
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
          <label>Repeat password&nbsp;<IoMdCheckmarkCircleOutline id='checkConfirm' style={{display: 'none', color: 'green'}}/></label>
          <input 
                type="password" 
                name="verification" 
                placeholder="repeat your password" 
                id='verification'
                value={this.state.verification}
                onChange={event => this.setState({verification: event.target.value}, () => {
                    
                    const veriPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gmi;
                    
                    if(veriPass.test(this.state.verification) === true && this.state.password === this.state.verification){
                        document.getElementById('verification').style.border = '1px solid green';
                        document.getElementById('checkConfirm').style.display = 'block';
                    }else if(veriPass.test(this.state.verification) === false){
                        document.getElementById('verification').style.border = '1px solid red';
                        document.getElementById('checkConfirm').style.display = 'none';
                    }
                })}
          />
          <label>Email&nbsp;<IoMdCheckmarkCircleOutline id='checkMail' style={{display: 'none', color: 'green'}}/></label>
          <input 
                type="email" 
                name="email" 
                placeholder="email"
                id='email'
                value={this.state.email}
                onChange={event => this.setState({email: event.target.value}, () => {
                    // eslint-disable-next-line
                    const veriMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gmi;

                    if(veriMail.test(this.state.email) === true){
                        document.getElementById('email').style.border = '1px solid green';
                        document.getElementById('checkMail').style.display = 'block';
                    }else if(veriMail.test(this.state.email) === false){
                        document.getElementById('email').style.border = '1px solid red';
                        document.getElementById('checkMail').style.display = 'none';
                    }
                })}
          />
          <label>Avatar&nbsp;<IoMdCheckmarkCircleOutline id='checkAvatar' style={{display: 'none', color: 'green'}}/></label>
          <label htmlFor="file" className="labelFile" id='label-file'>{this.state.file}</label>
          <input 
                id='file' 
                type="file" 
                name="avatar"
                onChange={() => {

                  const files = document.querySelector('[type=file]').files;

                  const formData = new FormData();

                  const file = files[0]

                  formData.append('files[]', file)

                  this.setState({avatar: 'http://localhost:4200/images/i/'+files[0].name,
                                file: files[0].name,
                                type: files[0].type}, () => {

                    if(files[0].type === 'image/jpeg' || files[0].type === 'image/png'){

                      this.setState({formData: formData}, () => {

                        document.getElementById('label-file').style.border = '1px solid green';
                        document.getElementById('checkAvatar').style.display = 'block';
  
                      })
  
                    }else if(files[0].type === ""){

                      this.setState({type: 'files/wrong'})

                    }else{
  
                      document.getElementById('label-file').style.border = '1px solid red';
                      document.getElementById('checkAvatar').style.display = 'none';
  
                    }

                  })

                  
                }}
          />

          <button onClick={this.handlesubmit}>Register</button>
        </form>
        
        <div id="downLinkForm" className="registerDownLink">
          <a href="http://localhost:3000/api/secret/login">Already have an account ?</a>
        </div>

      </div>
    );
  }
}

export default RegisterForm;
