import React, { Component } from 'react';

class AddProject extends Component {
    constructor(){
        super();
        this.state = {
            session: false,
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

            if(this.state.session === '' || this.state.session === null || this.state.session === false){
               
                window.location = 'http://localhost:3000/';

            }

        })
    }


  render() {
    return (
      <div> Project </div>
    );
  }
}

export default AddProject;
