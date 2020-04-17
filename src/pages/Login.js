import React, { Component } from 'react';
import {FiRefreshCcw} from 'react-icons/fi'
import axios from 'axios';

import LoginForm from '../components/form/LoginForm'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      x: 1,
      count: 1,
      session: false,
    }

    this.switchBackground = this.switchBackground.bind(this)
  }   

  switchBackground(){
    const y = this.state.x

    if(y === this.state.count || y < 1){
      const x = 1;

      this.setState({x: x}, () => {

        const background = document.getElementById('show')

        background.style.backgroundImage = "url('http://localhost:4200/images/bg/background-"+x+".jpg')"

      })
    }else{
      const x = y +1;

      this.setState({x: x}, () => {

        const background = document.getElementById('show')

        background.style.backgroundImage = "url('http://localhost:4200/images/bg/background-"+x+".jpg')"

      })
    }

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

  componentDidMount(){

    const session = this.readCookie('session');

    this.setState({session: session}, () =>{

      console.log(this.state.session)

        if(this.state.session === 'true' || this.state.session === true){
            
            window.location = 'http://localhost:3000/';

        }else{

          axios.get('http://localhost:4200/api/background/count')
          .then(response => {
            
            const data = response.data;

            this.setState({count: data - 1}, () => {

              var d = new Date();
              var n = d.getHours();

              if(n >= 23 || n <= 7){
                const x = Math.floor((Math.random() * this.state.count) + 1);

                this.setState({x: x}, () => {

                  const button = document.getElementById('showButton')

                  button.style.display = 'flex'

                  const background = document.getElementById('show')

                  background.style.backgroundImage = "url('http://localhost:4200/images/bg/background-"+x+".jpg')"

                })
              }else{

                const background = document.getElementById('show')

                const button = document.getElementById('showButton')

                button.style.display = 'none'

                background.style.backgroundImage = "url('http://localhost:4200/images/background-y.jpg')"

              }
            })

          })
          .catch(error => console.log(error))

        }

    })

  }
  render() {
    return (
      <div className='pageContainer'>
          <LoginForm></LoginForm>

          <div id="show">
            <div id="showCover">
              <button id="showButton" onClick={this.switchBackground}><FiRefreshCcw/></button>
            </div>
          </div>
      </div>
    );
  }
}

export default Login;
