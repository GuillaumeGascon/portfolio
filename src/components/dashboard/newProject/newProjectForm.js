import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';

class NewProjectForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectName: '',
            projectKeywords: [],
            projectColors: [],
            projectFonts: [],
            projectThumb: '',
            projectBanner: '',
            projectLogo: '',
            projectDesc: '',
            projectBranding: '',
            projectMockup: '',
            projectLink: ''
        }

        this.handleChange = this.handleChange.bind(this)

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
                <ul>
                    <div id='leftNewProject'>
                        <label>Project name</label>
                        <input
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
                            inputProps={{placeholder: 'Add a keywords'}}
                            value={this.state.projectKeywords} 
                            onChange={e => this.setState({projectKeywords: e}, () => {
                                console.log(this.state.projectKeywords)
                            })} 
                        />
                    </div>
                </ul>
                <ul>

                </ul>

                <button onClick={e => e.preventDefault()}>Upload</button>
            </form>

        </div>

      </div>
    );
  }
}

export default NewProjectForm;
