import React, { Component } from 'react';

class Menu extends Component {
    constructor(){
        super();
        this.state = {
            url: window.location.href,
        }
    }

    componentDidMount(){
        const url = this.state.url;

        if(url === window.location.origin+'/works/'){
            const el = document.getElementById('works');
            const light = document.getElementById('home')

            light.style.color = this.props.dark;

            el.style.borderBottom = '2px solid '+this.props.color
            el.style.color = this.props.color
        }else{
            const el = document.getElementById('home');
            const light = document.getElementById('works')

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
      </nav>
    );
  }
}

export default Menu;
