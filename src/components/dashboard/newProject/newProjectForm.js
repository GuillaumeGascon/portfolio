import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';

import ProjectServices from '../../../services/projectServices';

class NewProjectForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectName: '',
            projectKeywords: [],
            projectColors: [],
            projectThumb: '',
            projectBanner: '',
            projectLogo: '',
            projectDesc: '',
            projectBranding: '',
            projectMockup: '',
            projectLink: '',
            logoData: '',
            bannerData: '',
            thumbData: '',
            mockupData: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Services = new ProjectServices();

    }

    handleSubmit(e){
        e.preventDefault();

        this.Services.sendData({
            Name: this.state.projectName,
            Keywords: this.state.projectKeywords,
            Colors: this.state.projectColors,
            Thumb: this.state.projectThumb,
            Banner: this.state.projectBanner,
            Logo: this.state.projectLogo,
            Description: this.state.projectDesc,
            Branding: this.state.projectBranding,
            Mockup: this.state.projectMockup,
            Link: this.state.projectLink,
        })

        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();

            req.open('POST', 'http://localhost:4200/projectImage');
            req.send(this.state.logoData,
                    this.state.bannerData);

            window.location.reload();

        })

    }

    handleChange(tags) {
        this.setState({tags}, () => {
            console.log(this.state.tags)
        })
      }

  render() {
    return (
      <div id='formProjectCard'>

        <h4>Add a new project</h4>

        <div id='formProject'>

            <form>
                <div id='formProjectColumn'>
                    <ul>
                        <div id='leftNewProject'>
                            <label>Project name</label>
                            <input
                                className='inputProject'
                                type='text'
                                name='projectName'
                                id='projectName'
                                value={this.state.projectName}
                                onChange={e => this.setState({projectName: e.target.value}, () => {
                                    console.log(this.state.projectName)
                                })}
                                placeholder='Project name'
                            />
                            <label>Project keywords</label>
                            <TagsInput 
                                inputProps={{placeholder: 'keywords'}}
                                value={this.state.projectKeywords} 
                                onChange={e => this.setState({projectKeywords: e}, () => {
                                    console.log(this.state.projectKeywords)
                                })} 
                            />
                            <label>Project description</label>
                            <textarea
                                className='inputProject'
                                type='text'
                                name='projectDescription'
                                id='projectDescription'
                                value={this.state.projectDesc}
                                onChange={e => this.setState({projectDesc: e.target.value}, () => {
                                    console.log(this.state.projectDesc)
                                })}
                                placeholder='Project description'
                            />
                            <label>Project branding text</label>
                            <textarea
                                className='inputProject'
                                type='text'
                                name='projectBrandingDesc'
                                id='projectBrandingDesc'
                                value={this.state.projectBranding}
                                onChange={e => this.setState({projectBranding: e.target.value}, () => {
                                    console.log(this.state.projectBranding)
                                })}
                                placeholder='Project branding'
                            />
                            <label>Project colors</label>
                            <TagsInput 
                                inputProps={{placeholder: 'colors'}}
                                value={this.state.projectColors} 
                                onChange={e => this.setState({projectColors: e}, () => {
                                    console.log(this.state.projectColors)
                                })} 
                            />
                        </div>
                    </ul>
                    <ul>
                        <div id='rightNewProject'>
                            <label>Project Logo</label>
                            <label htmlFor="projectLogo" className='labelInput' id='projectLogoLabel'>Import logo</label>
                            <input
                                className='inputProject projectHide'
                                type='file'
                                name='projectLogo'
                                id='projectLogo'
                                onChange={e => {
                                    
                                    const formData = new FormData();
                                    const files = document.querySelector('[name=projectLogo]').files;

                                    const filename = files[0].name.split('.')[0]

                                    const rename = this.state.projectName+'-'+filename+'-logo.png';

                                    Object.defineProperty(files[0], 'name', {
                                        writable: true,
                                        value: rename
                                      });

                                    console.log(files[0])

                                    formData.append('files[]', files[0]);

                                    this.setState({projectLogo: 'http://localhost:4200/images/projectImage/'+rename,
                                                    logoData: formData}, () => {
                                        document.getElementById('projectLogoLabel').innerHTML = rename;
                                    })
                                }}
                            />
                            <label>Project Banner</label>
                            <label htmlFor="projectBanner" className='labelInput' id='projectBannerLabel'>Import banner</label>
                            <input
                                className='inputProject projectHide'
                                type='file'
                                name='projectBanner'
                                id='projectBanner'
                                onChange={e => {
                                    
                                    const formData = new FormData();
                                    const files = document.querySelector('[name=projectBanner]').files;

                                    const filename = files[0].name.split('.')[0]

                                    const rename = this.state.projectName+'-'+filename+'-banner.png';

                                    Object.defineProperty(files[0], 'name', {
                                        writable: true,
                                        value: rename
                                      });

                                    formData.append('files[]', files[0]);

                                    this.setState({projectBanner: 'http://localhost:4200/images/projectImage/'+rename,
                                                    bannerData: formData}, () => {
                                        document.getElementById('projectBannerLabel').innerHTML = rename;
                                    })
                                }}
                            />
                            <label>Project Thumb</label>
                            <label htmlFor="projectThumb" className='labelInput' id='projectThumbLabel'>Import thumb</label>
                            <input
                                className='inputProject projectHide'
                                type='file'
                                name='projectThumb'
                                id='projectThumb'
                                onChange={e => {
                                    
                                    const formData = new FormData();
                                    const files = document.querySelector('[name=projectThumb]').files;
                                    const filename = files[0].name.split('.')[0]

                                    const rename = this.state.projectName+'-'+filename+'-thumb.png';

                                    Object.defineProperty(files[0], 'name', {
                                        writable: true,
                                        value: rename
                                      });

                                    formData.append('files[]', files[0]);

                                    this.setState({projectThumb: 'http://localhost:4200/images/projectImage/'+rename,
                                                    thumbData: formData}, () => {
                                        document.getElementById('projectThumbLabel').innerHTML = rename;
                                    })
                                }}
                            />
                            <label>Project Mockup</label>
                            <label htmlFor="projectMockup" className='labelInput' id='projectMockupLabel'>Import mockup</label>
                            <input
                                className='inputProject projectHide'
                                type='file'
                                name='projectMockup'
                                id='projectMockup'
                                onChange={e => {
                                    
                                    const formData = new FormData();
                                    const files = document.querySelector('[name=projectMockup]').files;

                                    const filename = files[0].name.split('.')[0]

                                    const rename = this.state.projectName+'-'+filename+'-mockup.png';

                                    Object.defineProperty(files[0], 'name', {
                                        writable: true,
                                        value: rename
                                      });

                                    formData.append('files[]', files[0]);

                                    this.setState({projectMockup: 'http://localhost:4200/images/projectImage/'+rename,
                                                    mockupData: formData}, () => {
                                        document.getElementById('projectMockupLabel').innerHTML = rename;
                                    })
                                }}
                            />
                            <label>Project Link</label>
                            <input
                                className='inputProject'
                                type='text'
                                name='projectLink'
                                id='projectLink'
                                value={this.state.projectLink}
                                onChange={e => this.setState({projectLink: e.target.value}, () => {
                                    console.log(this.state.projectLink)
                                })}
                                placeholder='Project Link'
                            />
                        </div>
                    </ul>
                </div>

                <div id='formButtonContainer'>
                    <button onClick={this.handleSubmit}>Upload</button>
                </div>
            </form>

        </div>

      </div>
    );
  }
}

export default NewProjectForm;
