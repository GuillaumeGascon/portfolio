import React, { Component } from 'react';
import { MdDashboard, MdLibraryAdd, MdSettings, MdPowerSettingsNew } from 'react-icons/md';


import Logo from '../img/logo.png';

class DashMenu extends Component {
  constructor(){
    super();
    this.state = {
      session: false,
      username: '',
      avatar: '',
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

  deleteCookie(){
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        var expire = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        document.cookie = expire
    }

    window.location = 'http://localhost:3000/';
  }

  componentDidMount(){

    this.setState({session: this.readCookie('session'),
                  username: this.readCookie('sessionUser'),
                  avatar: this.readCookie('sessionAvatar')}, () => {

                    return true

                  })

  }

  render() {
    return (
      <div id='dashMenu'>

        <div id='dashLogo'>
          <img src={Logo} alt='logo'/>
        </div>

        <div id='dashLink'>

          <ul id='menuLink'>
            <li>
              <a href='http://localhost:3000/api/secret/dashboard'><MdDashboard/></a>
            </li>
            <li>
              <a href='http://localhost:3000/api/secret/dashboard/addProject'><MdLibraryAdd/></a>
            </li>
            <li>
              <a href='http://localhost:3000/api/secret/dashboard/settings'><MdSettings/></a>
            </li>
          </ul>  

          <div id="userLink">
            <p>{this.state.username}</p>
            <div id='avatarContainer'>
              <img src={this.state.avatar} alt='avatar'></img>
            </div>
          </div>

          <button onClick={this.deleteCookie}>Logout&nbsp;<MdPowerSettingsNew/></button>
        </div>

      </div>
    );
  }
}

export default DashMenu;
