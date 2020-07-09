import React, { Component, useState } from 'react';
import Axios from 'axios';

class Carousel extends Component {
    constructor(){
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount(){

        Axios.get('http://localhost:4200/api/project/find')
        .then(res => {
            let data = res.data;

            console.log(data)

        })
        .catch(err => console.log(err))
    }

  render() {
    return (
      <div> {this.state.data} </div>
    );
  }
}

export default Carousel;
