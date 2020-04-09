import axios from 'axios';

class RegService{
    sendData(data){
        console.log(data);
        axios.post('http://localhost:4200/api/add', {
            Username: data.username,
            Password: data.password,
            Email: data.email,
            Avatar: data.avatar,
            Banner: data.banner,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}

export default RegService;