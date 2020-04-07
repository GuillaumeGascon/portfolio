import React, { Component } from 'react';

import RegisterForm from '../components/RegisterForm'

class Register extends Component {
  render() {
    return (
      <div className='pageContainer'>
          <RegisterForm></RegisterForm>
      </div>
    );
  }
}

export default Register;
