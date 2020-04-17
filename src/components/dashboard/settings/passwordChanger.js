import React, { Component } from 'react';
import {IoMdCheckmarkCircleOutline, IoMdWarning} from 'react-icons/io';
import Axios from 'axios';
import Bcrypt from 'bcryptjs';

class PasswordChanger extends Component {
    constructor(){
        super()
        this.state = {
            users: null,
            currPassword: '',
            newPassword: '',
            confirmPassword: '',
            pwErr: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
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

      handleSubmit(e){

        e.preventDefault();

        const users = this.state.users.toLowerCase();
        const currPass = this.state.currPassword;
        const newPass = this.state.newPassword;
        const confPass = this.state.confirmPassword
        const container = document.getElementById('errorPass');
        const otherContainer = document.getElementById('errorMail');

        const veriPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gmi;

        if(currPass === '' || newPass === '' || confPass === ''){
            this.setState({pwErr: 'Please fill all the form'}, () => {
                container.style.transform = 'translateY(0)';
                otherContainer.style.transform = 'translateY(-200px)';
            })
        }else if(veriPass.test(newPass) === false){
            this.setState({pwErr: 'Password must be a least 8 characters and contain 1 uppercase characters'}, () => {
                container.style.transform = 'translateY(0)';
                otherContainer.style.transform = 'translateY(-200px)';
            })
        }else if(confPass !== newPass){
            this.setState({pwErr: 'Please enter the same password'}, () => {
                container.style.transform = 'translateY(0)';
                otherContainer.style.transform = 'translateY(-200px)';
            })
        }else{

            Axios.post('http://localhost:4200/api/name', {
                Username: users,
            })
            .then(response => {
                const data = response.data;

                const compPass = data.Password;

                Bcrypt.compare(currPass, compPass, (err, res) => {
                    if(res !== true){
                        this.setState({pwErr: 'Please enter your current password'}, () => {
                            container.style.transform = 'translateY(0)';
                            otherContainer.style.transform = 'translateY(-200px)';
                        })
                    }else{
                        const saltRounds = 10;

                        Bcrypt.genSalt(saltRounds, (err, salt) => {
                            Bcrypt.hash(newPass, salt, (err, hash) => {
                                const pass = hash;

                                Axios.post('http://localhost:4200/api/users/update', {
                                    Username: users,
                                    update: {
                                        Password: pass
                                    }
                                })
                                .then(() => window.location.reload())
                                .catch(err => console.log(err))
                            })
                        })
                    }
                })

            })
            .catch(err => console.log(err))

        }

      }

    componentDidMount(){
        this.setState({users: this.readCookie('sessionUser')})
    }
  render() {
    return (
      <div id='passwordFormContainer'>
        <form>
            <h3>Change Password</h3>
            <label>Current password</label>
            <input 
                type='password' 
                name='curPassword'
                id='currPassword'
                placeholder="Current password"
                value={this.state.currPassword}
                onChange={event => this.setState({currPassword: event.target.value})}
            />
            <label>New password&nbsp;<IoMdCheckmarkCircleOutline id='checkNew' style={{display: 'none', color: 'green'}}/></label>
            <input 
                type='password' 
                name='newPassword' 
                id='newPassword'
                placeholder="New password"
                value={this.state.newPassword}
                onChange={event => this.setState({newPassword: event.target.value}, () => {

                    const veriPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gmi;

                      if(veriPass.test(this.state.newPassword) === true){
                          document.getElementById('newPassword').style.border = '1px solid green';
                          document.getElementById('checkNew').style.display = 'block';
                      }else if(veriPass.test(this.state.newPassword) === false){
                          document.getElementById('newPassword').style.border = '1px solid red';
                          document.getElementById('checkNew').style.display = 'none';
                      }
                })}
            />
            <label>Confirm password&nbsp;<IoMdCheckmarkCircleOutline id='checkConfirm' style={{display: 'none', color: 'green'}}/></label>
            <input 
                type='password' 
                name='confirmPassword' 
                id='confirmPass'
                placeholder="Confirm password"
                value={this.state.confirmPassword}
                onChange={event => this.setState({confirmPassword: event.target.value}, () => {

                    const veriPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gmi;

                    if(veriPass.test(this.state.confirmPassword) === true && this.state.confirmPassword === this.state.newPassword){
                        document.getElementById('confirmPass').style.border = '1px solid green';
                        document.getElementById('checkConfirm').style.display = 'block';
                    }else if(veriPass.test(this.state.confirmPassword) === false){
                        document.getElementById('confirmPass').style.border = '1px solid red';
                        document.getElementById('checkConfirm').style.display = 'none';
                    }
                })}
            />
            <button onClick={this.handleSubmit}>Change password</button>
        </form>

        <div id='errorPass'>
            <h4><IoMdWarning/>&nbsp;Oops there's a problem</h4>
            <p>{this.state.pwErr}</p>
        </div>

      </div>
    );
  }
}

export default PasswordChanger;
