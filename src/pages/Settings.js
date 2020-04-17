import React, { Component } from 'react';

import DashMenu from '../components/dashboard/DashMenu';
import DashBanner from '../components/dashboard/DashBanner';
import AvatarUpload from '../components/dashboard/settings/avatarUploader';
import PasswordChanger from '../components/dashboard/settings/passwordChanger';
import EmailChanger from '../components/dashboard/settings/emailChanger';
import DeleteUser from '../components/dashboard/settings/delete';

class Settings extends Component {
  render() {
    return (
      <>

        <div id='settingsContainer'>

          <DashMenu></DashMenu>

          <DashBanner></DashBanner>

          <div id='componentContainer'>

            <div id='avatarUploadDash'>

              <AvatarUpload></AvatarUpload>

            </div>

            <div id='changeSettingContainer'>

              <div id='changeContainer'>
                
                <PasswordChanger></PasswordChanger>

                <EmailChanger></EmailChanger>

              </div>

              <div id='deleteContainer'> 
                <DeleteUser></DeleteUser>
              </div>

            </div>

          </div>

        </div>

      </>
    );
  }
}

export default Settings;
