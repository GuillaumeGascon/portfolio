import axios from 'axios';

class CountServices{
    sendData(data){
        axios.post('http://localhost:4200/api/visitor/count', {
            ID: data.ID,
            Count: data.Count,
            TotalCount: data.TotalCount,
            Date: data.Date,
        })
        .then(function (response) {
            console.log('this is your ' + data.Count + ' time id: ' + data.ID);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}

export default CountServices;