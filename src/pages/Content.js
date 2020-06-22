import React, { Component } from 'react';

import Counter from '../components/counter';

class Content extends Component {
  constructor(){
      super();
      this.state = {
        light: '',
        dark: '',
        boolean: false,
        status: this.readCookie('darkMode'),
        accentColor: ['#205082', '#5ba95d'],
        contrastColor: ['#0092ff', '478d73'],
      }

      this.readCookie = this.readCookie.bind(this);
      this.writeCookie = this.writeCookie.bind(this);
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

    const bool = this.state.status;

    if(bool === '' || bool === null){
      this.writeCookie('darkMode', this.state.boolean)
    }else if(bool === false || bool === 'false'){
      this.setState({light: '#ffffff',
                    dark: '#000000',
                    boolean: bool})
    }else{
      this.setState({dark: '#ffffff',
                    light: '#000000',
                    boolean: bool})
    }
  }
  render() {
    return (
        <>
            <Counter/>
            <header style={{
              backgroundColor: this.state.light
            }}>
              <div id='bottomButton'>
                <div className='divider'>



                </div>
                <div className='divider'>
                  <button
                  id='darkSwitch' 
                  onClick={event => {

                    if(this.state.boolean === true || this.state.boolean === 'true'){
                      this.setState({light: '#fff',
                                    dark: '#000',
                                    boolean: false}, () => {
                        this.writeCookie('darkMode', false)
                      })
                    }else{
                      this.setState({light: '#000',
                                    dark: '#fff',
                                    boolean: true}, () => {
                        this.writeCookie('darkMode', true)
                      })
                    }
                }}
                style={{
                  backgroundColor: this.state.dark,
                  color: this.state.light
                }}>Dark theme</button>
                </div>
              </div>
            </header>
        </>
    );
  }
}

export default Content;
