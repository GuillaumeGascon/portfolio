import React, { Component } from 'react';
import Axios from 'axios';

class DeleteUser extends Component {
    constructor(){
        super();
        this.state = {
            users: '',
            checked: false,
            disabled: true,
        }
        this.handleDelete = this.handleDelete.bind(this)
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

        window.location = window.location.origin+'/';
    }

    handleDelete(e){
        e.preventDefault()

        const users = this.state.users;

        Axios.post('http://localhost:4200/api/user/delete', {
            Username: users
        })
        .then(() => {
            this.deleteCookie();
        })
        .catch(err => console.log(err))

    }

    componentDidMount(){
        this.setState({users: this.readCookie('sessionUser')})
    }
    
  render() {
    return (
      <>

        <div id='textDeleteContainer'>
            <h4>Delete your account</h4>
            <p>By deleting your account, you will lose all the content of it. Be aware that if you really want to delete all of your data because there will be no come back possible. If you do not want to delete your account but just modify some information that are not accessible by this dashboard, please contact our support.</p>
        </div>

        <div id='deleteButtonContainer'>
            <div id='deleteButton'>
                <button id='deleteAccount' onClick={this.handleDelete} disabled={this.state.disabled}>
                    Delete account
                </button>
            </div>
            <div id='slideRound'>
                <input 
                    type='checkbox'
                    id='checkSlide'
                    defaultChecked={this.state.checked}
                    onChange={event => this.setState({checked: !this.state.checked}, () => {
                        
                        if(this.state.checked === true){
                            this.setState({disabled: false})
                        }else{
                            this.setState({disabled: true})
                        }
                        
                    })}
                />
                <label htmlFor='checkSlide'>
                    <span></span>
                    Check this if you want to activate the delete account button
                </label>
            </div>
        </div>

      </>
    );
  }
}

export default DeleteUser;
