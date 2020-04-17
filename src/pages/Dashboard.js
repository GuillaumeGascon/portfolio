import React, { Component } from 'react';

import DashMenu from '../components/dashboard/DashMenu';
import DashBanner from '../components/dashboard/DashBanner';
import DashProjectCount from '../components/dashboard/DashProjectCount';
import DashVisit from '../components/dashboard/DashVisit';

class Dashboard extends Component {
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

        this.setState({session: this.readCookie('session')}, () =>{

            if(this.state.session === '' || this.state.session === null || this.state.session === false || this.state.session === 'false'){
               
                window.location = process.env.PUBLIC_URL+'/';

            }

        })
    }


  render() {
    return (
      <>
        <div id='dashboardContainer'>

            <DashMenu></DashMenu>

            <DashBanner></DashBanner>

            <div id='dashContent'>

                <div id='dashProjectCount'>
                    <DashProjectCount></DashProjectCount>
                </div>

                <div id='dashAnalytics'>

                    <div className='equal'>

                        <DashVisit></DashVisit>

                    </div>

                    <div className='equal'>

                    </div>

                </div>

            </div>

        </div>

      </>
    );
  }
}

export default Dashboard;
