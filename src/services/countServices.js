import axios from 'axios';

class CountServices{
    sendData(data){
        axios.post('http://localhost:4200/api/visitor/count', {
            ID: data.ID,
            Count: data.Count,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}

export default CountServices;