import React, { Component } from 'react';
import Switch from 'react-switch';
import { RiMoonClearLine, RiSunLine, RiArrowDownSLine, RiArrowUpSLine, RiSipLine } from 'react-icons/ri';
import ReactLoading from 'react-loading';
import Fade from 'react-reveal/Fade';

import LogoGreen from '../img/LogoGreen.png';
import LogoBlue from '../img/LogoBlue.png';
import LogoRed from '../img/LogoRed.png';
import LogoYellow from '../img/LogoYellow.png';

import Counter from '../components/counter';
import Menu from '../components/portfolio/menuLink';
import Carousel from '../components/portfolio/carousel';

class Content extends Component {
  constructor(){
      super();
      this.state = {
        done: undefined,
        light: '',
        dark: '',
        boolean: false,
        status: (this.readCookie('darkMode') === 'true'),
        accentColor: [
          {
            id: 1,
            color: '#205082',
            colorSecond: '#0092ff',
            colorThird: '#c1c6eb',
            colorGrey: '#EBEAF3',
            colorDark: '#2e2d35',
            logo: LogoBlue,
          },
          {
            id: 2,
            color: '#5ba95d',
            colorSecond: '#478d73',
            colorThird: '#446b6a',
            colorGrey: '#404c54',
            colorDark: '#32343e',
            logo: LogoGreen,
          },
          {
            id: 3,
            color: '#f6ce25',
            colorSecond: '#fdb73e',
            colorThird: '#f5c050',
            colorGrey: '#7c828e',
            colorDark: '#374053',
            logo: LogoYellow,
          },
          {
            id: 4,
            color: '#cf0000',
            colorSecond: '#940000',
            colorThird: '#1b1c21',
            colorGrey: '#636363',
            colorDark: '#151516',
            logo: LogoRed,
          }
        ],
        activeColor: this.readCookie('activeColor'),
        pickColor: null,
        buttonOpen: false,
      }

      this.readCookie = this.readCookie.bind(this);
      this.writeCookie = this.writeCookie.bind(this);
      this.handleCheck = this.handleCheck.bind(this);
      this.toggleButton = this.toggleButton.bind(this);
  }

  toggleButton(){

    this.setState({
      buttonOpen: !this.state.buttonOpen
    })
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

  handleCheck(checked){
    this.setState({ checked }, () => {

      this.state.boolean ? this.setState({light: '#fff',
                                          dark: '#1c1c1c',
                                          boolean: false}, () => {
                                    this.writeCookie('darkMode', false)
                                  })
                          : this.setState({light: '#1c1c1c',
                                           dark: '#fff',
                                           boolean: true}, () => {
                                    this.writeCookie('darkMode', true)
                                  })

    })
  }

  componentDidMount(){

    const bool = this.state.status;

    if(bool === '' || bool === null){
      this.writeCookie('darkMode', this.state.boolean)
    }else if(bool === false || bool === 'false'){
      this.setState({light: '#ffffff',
                    dark: '#1c1c1c',
                    boolean: bool})
    }else{
      this.setState({dark: '#ffffff',
                    light: '#1c1c1c',
                    boolean: bool})
    }

    var activeColor = this.state.activeColor;
    var temp = this.state.accentColor;

    if(activeColor === '' || activeColor === null){
    
      this.setState({pickColor: temp[1]}, () => {
        
        this.writeCookie('activeColor', temp[1].color);

      })
    }else{

      let obj = temp.find(obj => obj.color === activeColor);

      this.setState({pickColor: obj})

    }

    setTimeout(() => {

      this.setState({done: true})
      
    }, 1200);

  }
  render() {
    const {pickColor} = this.state;
    return (
        <>  
          <Counter/>
          <header style={{
              backgroundColor: this.state.light
            }}>
            {!this.state.done ? (
              <ReactLoading type={"bars"} color={this.state.dark} className='loader'/>
            ) : (
            <>
            <Fade>
              <div className='fadeContainer'>
                <Menu 
                  color={this.readCookie('activeColor')} 
                  colorSecond={pickColor.colorSecond}
                  colorThird={pickColor.colorThird}
                  colorGrey={pickColor.colorGrey}
                  colorDark={pickColor.colorDark}
                  logo={pickColor.logo}
                  light={this.state.light}
                  dark={this.state.dark}
                />

                <div className='carouselContainer'>
                  <Carousel/>
                </div>
                
                <div id='bottomButton'>
                  <div className='divider'>

                    <button
                      id='colorPicker'
                      style={{
                        backgroundColor: this.state.dark,
                      }}
                      onClick={(id) => {
                        this.toggleButton();

                      }}
                    >
                      {this.state.buttonOpen
                        ? <RiArrowDownSLine size='1.2em' color={this.state.light}/>
                        : <RiArrowUpSLine size='1.2em' color={this.state.light}/>
                      }
                      <span style={{backgroundColor: this.readCookie('activeColor')}}></span>
                    </button>

                    <Fade left cascade when={this.state.buttonOpen}>
                      <div className='colorList'
                        style={this.state.buttonOpen
                          ? {display: 'flex'}
                          : {display: 'none'}
                        }
                      >
                        {this.state.accentColor.map((item) =>(
                          <div className='buttonLine' key={item.id}>
                            <button
                              style={{backgroundColor: this.state.dark}}
                              onClick={() => this.setState({pickColor: item}, () => {

                                  this.writeCookie('activeColor', this.state.pickColor.color);
                                  
                                  this.toggleButton();
                                })
                              }
                            >
                              <span
                                style={{backgroundColor: item.color}}
                              ></span>
                              <RiSipLine size='1.2em' color={this.state.light}/>
                            </button>
                          </div>
                        ))}
                      </div>
                    </Fade>

                  </div>
                  <div className='divider'>
                    <Switch
                      onChange={this.handleCheck}
                      checked={this.state.boolean}
                      checkedIcon={<RiMoonClearLine size='1.2em' color='white' className='checkIconSwitch'/>}
                      uncheckedIcon={<RiSunLine size='1.2em' color='white' className='checkIconSwitch'/>}
                      onColor={this.readCookie('activeColor')}
                      offColor='#2e2d35'
                      id='Switch'
                    />
                  </div>
                </div>
              </div>
            </Fade>
            </>
            )}
          </header>
        </>
    );
  }
}

export default Content;
