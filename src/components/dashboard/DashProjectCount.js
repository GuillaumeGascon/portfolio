import React, { Component } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import Axios from 'axios';

class DashProjectCount extends Component {
  constructor(){
    super();
    this.state = {
        username: '',
        avatar: '',
        projectCount: '',
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

  getProjectCount(){

    Axios.get('http://localhost:4200/api/project/find')
    .then(response => {
      
      if(response.data === '' || response.data === null || response.data === false || response.data.length <= 0){
        this.setState({projectCount: 0})
      }
      else{
        this.setState({projectCount: response.data.length})
      }

    })
    .catch(err => console.log(err))

  }
  
  location(event){
    event.preventDefault();

    window.location = window.location.origin+'/dir/secret/dashboard/new';
  }

  componentDidMount(){
    this.getProjectCount()

    this.setState({avatar: this.readCookie('sessionAvatar'), username: this.readCookie('sessionUser')})
  }
  render() {
    return (
      <>

        <div id='projectCountContainer'>

          <div id='projectCountCircle'>

            <img src={this.state.avatar} alt='avatar'/>

            <div id='countContainer'>
              <p>{this.state.projectCount}</p>
            </div>

          </div>

          <div id='countUser'>

            <div id='countUsername'>
              <p>{this.state.username}</p>
            </div>
            <div id='countSentence'>
              <p>{this.state.projectCount} projects</p>
            </div>

          </div>

          <button onClick={this.location}><MdLibraryAdd/>&nbsp;Add a project</button>

        </div>

        <div id='projectCountCat'>

        </div>

      </>
    );
  }
}

export default DashProjectCount;
