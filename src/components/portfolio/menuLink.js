import React, { Component } from 'react';
import { FaLinkedinIn, FaBehance, FaInstagram, FaGithub } from 'react-icons/fa'

class Menu extends Component {
    constructor(){
        super();
        this.state = {
            url: window.location.href,
        }
    }

    componentDidMount(){
        const url = this.state.url;
        const a = document.getElementById('socialWrapper').getElementsByTagName('a');

        for(var link of a){
            link.style.color = this.props.dark
        }

        if(url === window.location.origin+'/works/'){
            const el = document.getElementById('works');
            const light = document.getElementById('home');
            
            light.style.color = this.props.dark;

            el.style.borderBottom = '2px solid '+this.props.color
            el.style.color = this.props.color
        }else{
            const el = document.getElementById('home');
            const light = document.getElementById('works');

            light.style.color = this.props.dark;

            el.style.borderBottom = '2px solid '+this.props.color
            el.style.color = this.props.color
        }
    }
    
    componentDidUpdate(){
        this.componentDidMount()
    }

  render() {
    return (
      <nav id='topNav'>
          <div id='topNavWrapper'>
            <div id='topNavLeftWrapper'>
                <div id='logoTopNav'>
                    <img src={this.props.logo} alt='logo'/>
                </div>

                <div id='linkWrapper'>
                    <a href={process.env.PUBLIC_URL+'/'} id='home' 
                    onMouseOver={() => {
                        const el = document.getElementById('home');
                        el.style.color = this.props.color;
                    }}
                    onMouseOut={() => {
                        const el = document.getElementById('works');
                        el.style.color = this.props.dark;
                    }}
                    >Home</a>
                    <a href={process.env.PUBLIC_URL+'/Works/'} id='works'
                    onMouseOver={() => {
                        const el = document.getElementById('works');
                        el.style.color = this.props.color;
                    }}
                    onMouseOut={() => {
                        const el = document.getElementById('works');
                        el.style.color = this.props.dark;
                    }}
                    >Works</a>
                </div>
            </div>

            <div id='topNavRightWrapper'>
                <div id='socialWrapper'>
                    <a href='https://github.com/GuillaumeGascon' 
                        target='_blank' 
                        rel="noopener noreferrer"                        
                    ><FaGithub
                        id='github'
                        onMouseOver={() => {
                            const el = document.getElementById('github');
                            el.style.color = this.props.color;
                        }}
                        onMouseOut={() => {
                            const el = document.getElementById('github');
                            el.style.color = this.props.dark;
                        }}
                    /></a>
                    <a href='https://www.behance.net/GuillaumeGASCON' 
                        target='_blank' 
                        rel="noopener noreferrer"                        
                    ><FaBehance
                        id='behance'
                        onMouseOver={() => {
                            const el = document.getElementById('behance');
                            el.style.color = this.props.color;
                        }}
                        onMouseOut={() => {
                            const el = document.getElementById('behance');
                            el.style.color = this.props.dark;
                        }}
                    /></a>
                    <a href='https://www.instagram.com/guillgn/' 
                        target='_blank' 
                        rel="noopener noreferrer"
                    ><FaInstagram
                        id='instagram'
                        onMouseOver={() => {
                            const el = document.getElementById('instagram');
                            el.style.color = this.props.color;
                        }}
                        onMouseOut={() => {
                            const el = document.getElementById('instagram');
                            el.style.color = this.props.dark;
                        }}
                    /></a>
                    <a href='https://www.linkedin.com/in/guillaume-gascon-78374a145/' 
                        target='_blank' 
                        rel="noopener noreferrer"
                    ><FaLinkedinIn
                        id='linkedin'
                        onMouseOver={() => {
                            const el = document.getElementById('linkedin');
                            el.style.color = this.props.color;
                        }}
                        onMouseOut={() => {
                            const el = document.getElementById('linkedin');
                            el.style.color = this.props.dark;
                        }}
                    /></a>
                </div>
            </div>
          </div>
      </nav>
    );
  }
}

export default Menu;
