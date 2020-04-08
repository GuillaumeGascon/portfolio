import React, { Component } from 'react';
import logo from '../img/logo.png'
import {IoMdCheckmarkCircleOutline, IoMdWarning} from 'react-icons/io';

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

  handlesubmit(e){
    e.preventDefault();
    
    const files = document.querySelector('[type=file]').files

    console.log(files);
  }


  render() {
    return (
      <div id='RegisterForm'>

        <div id="errorHandler">
            <div className="errorIcon">
                <IoMdWarning/>                    
            </div>

            <div className="errorText">
                <p id="innerText"></p>
            </div>
        </div>

        <div id="title">
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
                value={this.state.confirm}
                onChange={event => this.setState({confirm: event.target.value}, () => {
                    
                    const veriPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gmi;
                    
                    if(veriPass.test(this.state.confirm) === true && this.state.password === this.state.confirm){
                        document.getElementById('verification').style.border = '1px solid green';
                        document.getElementById('checkConfirm').style.display = 'block';
                    }else if(veriPass.test(this.state.confirm) === false){
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
          <label htmlFor="file" className="label-file" id='label-file'>{this.state.file}</label>
          <input 
                id='file' 
                type="file" 
                name="avatar"
                onChange={() => {

                  const files = document.querySelector('[type=file]').files;

                  const formData = new FormData();

                  const file = files[0]

                  formData.append('files[]', file)

                  this.setState({avatar: formData}, () => {

                    if(files[0].type === 'image/jpeg' || files[0].type === 'image/png'){

                      this.setState({file: files[0].name}, () => {
  
                        document.getElementById('label-file').style.border = '1px solid green';
                        document.getElementById('checkAvatar').style.display = 'block';
  
                      })
  
                    }else{
  
                      document.getElementById('label-file').style.border = '1px solid red';
                      document.getElementById('checkAvatar').style.display = 'none';
  
                    }

                  })

                  
                }}
          />

          <button onClick={this.handlesubmit}>Register</button>
        </form>

      </div>
    );
  }
}

export default RegisterForm;
