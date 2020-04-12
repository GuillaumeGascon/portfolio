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
        let total = this.readCookie('visitorTotal');
        let lastVisit = this.readCookie('visitorDate');
        const x = Math.floor((Math.random() * (10*90*100*90*200*90*100)) + 1);

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        if(visited === ''){
            
            const id = '#'+x+'guilgn';
            count = 1;

            this.writeCookie('visitorId', id, 10)
            this.writeCookie('visitorVisit', true, 10);
            this.writeCookie('visitorCount', count, 10);
            this.writeCookie('visitorTotal', count, 10);
            this.writeCookie('visitorDate', today, 10);

            this.Counting.sendData({
                ID: id,
                Count: count, 
                TotalCount: count, 
                Date: today,
            });  

        }else{
            
            total++

            if(lastVisit === today){
                count++;
                this.writeCookie('visitorCount', count, 10);

                Axios.post('http://localhost:4200/api/visitor/update', {
                    ID: this.readCookie('visitorId'),
                    update: {
                        Count: count,
                        TotalCount: total,
                        Date: today,
                    }
                })
                .then(response => console.log('welcome back '+ this.readCookie('visitorId')))
                .catch(err => console.log(err))
            }else{
                count = 1;
                this.writeCookie('visitorCount', count, 10);

                Axios.post('http://localhost:4200/api/visitor/update', {
                    ID: this.readCookie('visitorId'),
                    update: {
                        Count: count,
                        TotalCount: total,
                        Date: today,
                    }
                })
                .then(response => console.log('welcome back '+ this.readCookie('visitorId')))
                .catch(err => console.log(err))
            }


        }

    }

  render() {
    return (
      <div> textInComponent </div>
    );
  }
}

export default Counter;
