import React, { Component } from 'react';
import Axios from 'axios';

class Carousel extends Component {
    constructor(){
        super()
        this.displayCarousel = []
        this.displayWorks = []
        this.state = {
            showCarousel: this.displayCarousel,
            postCarousel: "",
            showWorks: this.displayWorks,
            postWorks: "",
            color: '',
            colorSecond: '',
            colorThird: '',
            colorDark: '',
            colorGrey: '',
            light: '',
            dark: '',
        }

        this.getCarousel = this.getCarousel.bind(this);
    }

    getCarousel(){

      Axios.get('http://localhost:4200/api/project/find')
        .then(res => {
            let data = res.data;

            data.sort();

            for(var i = 0; i < 2; i++){
              this.displayCarousel.push(
                
                <div key={i} className='carouselItems'>
                  <div className='carouselItemLeft'>
                    <h2 
                    style={{
                      color: this.props.colorSecond
                    }}>{data[i].Name}</h2>
                    <div className='carouselTagWrapper'>
                      <p style={{
                        color: this.props.dark,
                      }}>{
                        data[i].Keywords.join(' - ')
                      }</p>
                    </div>
                    <div className='carouselDiscoverWrapper'>
                      <button 
                      style={{
                        backgroundColor: this.props.color,
                      }}
                      onMouseOver={e => {
                        e.target.style.backgroundColor = this.props.colorSecond
                      }}
                      onMouseOut={e => {
                        e.target.style.backgroundColor = this.props.color
                      }}>Discover</button>
                    </div>
                  </div>
                  <div className='carouselItemRight'>
                      <div className='carouselItemRightPosition'>
                        <div className='carouselItemRightWrapper'>
                            <img src={data[i].Thumb} alt={data[i].Name+' thumb'}/>

                            <div className='carouselItemRightProjectText'
                            style={{
                              backgroundColor: this.props.colorSecond,
                            }}>
                              <div className='carouselItemRightTextContainer'>
                                <span>&#171;{data[i].Description}&#187;</span>
                              </div>
                            </div>
                        </div>
                      </div>
                  </div>
                </div>

              );
              this.setState({
                showCarousel: this.displayCarousel,
                postCarousel: '',
              })
            }  

        })
        .catch(err => console.log(err))
    }

    componentDidMount(){

      this.getCarousel();
        
    }

    componentDidUpdate(prevProps){
      
      if(this.props.color !== prevProps.color || this.props.dark !== prevProps.dark || this.props.light !== prevProps.light){
        this.displayCarousel = [];

        this.getCarousel()
      }
    }

  render() {
    return (
      <div id='carouselWrapper'>{this.displayCarousel}</div>
    );
  }
}

export default Carousel;
