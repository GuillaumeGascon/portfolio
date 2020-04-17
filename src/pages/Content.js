import React, { Component } from 'react';

import Counter from '../components/counter';

class Content extends Component {
  render() {
    return (
        <>
            <Counter/>
            <div> textInComponent </div>
        </>
    );
  }
}

export default Content;
