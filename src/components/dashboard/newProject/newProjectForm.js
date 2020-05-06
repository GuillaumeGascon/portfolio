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
            projectLink: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Services = new ProjectServices();

    }

    handleSubmit(e){
        e.preventDefault();

        /*this.Services.sendData({
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
        })*/

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
                            <label htmlFor="projectLogo" className='labelInput'>Import logo</label>
                            <input
                                className='inputProject projectHide'
                                type='file'
                                name='projectLogo'
                                id='projectLogo'
                                value={this.state.projectLogo}
                                onChange={e => this.setState({projectLogo: e.target.value}, () => {
                                    console.log(this.state.projectLogo)
                                })}
                                placeholder='Project logo'
                            />
                            <label>Project Banner</label>
                            <label htmlFor="projectBanner" className='labelInput'>Import banner</label>
                            <input
                                className='inputProject projectHide'
                                type='text'
                                name='projectBanner'
                                id='projectBanner'
                                value={this.state.projectBanner}
                                onChange={e => this.setState({projectBanner: e.target.value}, () => {
                                    console.log(this.state.projectBanner)
                                })}
                                placeholder='Project banner'
                            />
                            <label>Project Thumb</label>
                            <label htmlFor="projectThumb" className='labelInput'>Import thumb</label>
                            <input
                                className='inputProject projectHide'
                                type='text'
                                name='projectThumb'
                                id='projectThumb'
                                value={this.state.projectThumb}
                                onChange={e => this.setState({projectThumb: e.target.value}, () => {
                                    console.log(this.state.projectThumb)
                                })}
                                placeholder='Project thumb'
                            />
                            <label>Project Mockup</label>
                            <label htmlFor="projectMockup" className='labelInput'>Import mockup</label>
                            <input
                                className='inputProject projectHide'
                                type='text'
                                name='projectMockup'
                                id='projectMockup'
                                value={this.state.projectMockup}
                                onChange={e => this.setState({projectMockup: e.target.value}, () => {
                                    console.log(this.state.projectMockup)
                                })}
                                placeholder='Project mockup'
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
                                placeholder='Project name'
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
