import React, { Component } from 'react';
import {IoMdCheckmarkCircleOutline, IoMdWarning} from 'react-icons/io';
import Axios from 'axios';
import Bcrypt from 'bcryptjs';

class EmailChanger extends Component {
    constructor(){
        super()
        this.state = {
            users: null,
            currEmail: '',
            newEmail: '',
            emErr: '',
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
        const currEm = this.state.currPassword;
        const newEm = this.state.newPassword;
        const container = document.getElementById('errorMail');
        const otherContainer = document.getElementById('errorPass');

        // eslint-disable-next-line
        const veriMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gmi;

        if(currEm === '' || newEm === ''){
            this.setState({emErr: 'Please fill all the form'}, () => {
                container.style.transform = 'translateY(0)';
                otherContainer.style.transform = 'translateY(-200px)';
            })
        }else if(veriMail.test(newEm) === false){
            this.setState({emErr: 'Please enter a valide email'}, () => {
                container.style.transform = 'translateY(0)';
                otherContainer.style.transform = 'translateY(-200px)';
            })
        }else{

            Axios.post('http://localhost:4200/api/name', {
                Username: users,
            })
            .then(response => {
                const data = response.data;

                const compEm = data.Email;

                Bcrypt.compare(currEm, compEm, (err, res) => {
                    if(res !== true){
                        this.setState({emErr: 'Please enter your current email'}, () => {
                            container.style.transform = 'translateY(0)';
                            otherContainer.style.transform = 'translateY(-200px)';
                        })
                    }else{
                        const saltRounds = 10;

                        Bcrypt.genSalt(saltRounds, (err, salt) => {
                            Bcrypt.hash(newEm, salt, (err, hash) => {
                                const email = hash;

                                Axios.post('http://localhost:4200/api/users/update', {
                                    Username: users,
                                    update: {
                                        Email: email
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
      <div id='emailFormContainer'>
        <form>
            <h3>Change Email</h3>
            <label>Current email</label>
            <input 
                type='email' 
                name='curEmail'
                id='currEmail'
                placeholder="Current email"
                value={this.state.currEmail}
                onChange={event => this.setState({currEmail: event.target.value})}
            />
            <label>New email&nbsp;<IoMdCheckmarkCircleOutline id='checkNew' style={{display: 'none', color: 'green'}}/></label>
            <input 
                type='email' 
                name='newEmail' 
                id='newEmail'
                placeholder="New email"
                value={this.state.newEmail}
                onChange={event => this.setState({newEmail: event.target.value}, () => {

                    // eslint-disable-next-line
                    const veriMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gmi;

                      if(veriMail.test(this.state.newEmail) === true){
                          document.getElementById('newEmail').style.border = '1px solid green';
                          document.getElementById('checkNew').style.display = 'block';
                      }else if(veriMail.test(this.state.newEmail) === false){
                          document.getElementById('newEmail').style.border = '1px solid red';
                          document.getElementById('checkNew').style.display = 'none';
                      }
                })}
            />
            <button onClick={this.handleSubmit}>Change email</button>
        </form>

        <div id='errorMail'>
            <h4><IoMdWarning/>&nbsp;Oops there's a problem</h4>
            <p>{this.state.emErr}</p>
        </div>

      </div>
    );
  }
}

export default EmailChanger;
