import React, { Component } from 'react';

import CountServices from '../services/countServices';
import Axios from 'axios';

class Counter extends Component {
    constructor(){
        super();
        this.Counting = new CountServices();
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

    componentDidMount(){
        let visited = this.readCookie('visitorVisit');
        let count = this.readCookie('visitorCount');
        const x = Math.floor((Math.random() * (10*90*100*90*200*90*100)) + 1);

        if(visited === ''){
            
            const id = '#'+x+'guilgn';

            this.writeCookie('visitorId', id, 10)
            this.writeCookie('visitorVisit', true, 10);
            count = 1;
            this.writeCookie('visitorCount', count, 10);

            console.log('this is your ' + count + ' time id: ' + this.readCookie('visitorId'));

            this.Counting.sendData({
                ID: id,
                Count: count,  
            });  

        }else{
            
            console.log('welcome back '+ this.readCookie('visitorId'))
            count++;
            this.writeCookie('visitorCount', count, 10);

            Axios.post('http://localhost:4200/api/visitor/update', {
                ID: this.readCookie('visitorId'),
                update: {
                    Count: count,
                }
            })
            .then(response => console.log(response))
            .catch(err => console.log(err))

        }

    }

  render() {
    return (
      <div> textInComponent </div>
    );
  }
}

export default Counter;
