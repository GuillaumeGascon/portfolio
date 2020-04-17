import React, { Component } from 'react';

import DashMenu from '../components/dashboard/DashMenu';
import DashBanner from '../components/dashboard/DashBanner';
import NewProjectForm from '../components/dashboard/newProject/newProjectForm';

class NewProject extends Component {
  render() {
    return (
      <div id='newProjectContainer'>
        <DashMenu></DashMenu>

        <DashBanner></DashBanner>

        <div id='formProjectContainer'>

            <NewProjectForm></NewProjectForm>

        </div>        
      </div>
    );
  }
}

export default NewProject;
