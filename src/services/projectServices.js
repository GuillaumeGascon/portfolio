import axios from 'axios';

class ProjectServices{
    sendData(data){
        axios.post('http://localhost:4200/api/project/add', {
            Name: data.Name,
            Keywords: data.Keywords,
            Colors: data.Colors,
            Thumb: data.Thumb,
            Banner: data.Banner,
            Logo: data.Logo,
            Description: data.Description,
            Branding: data.Branding,
            Mockup: data.Mockup,
            Link: data.Link,
        })
        .then(function (response) {
            console.log('Project : ' + data.Name + ' saved to database');
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}

export default ProjectServices;