const axios = require('axios');

function getStudentById(id){

    axios.get('/user/1', {
        params: {
        ID: 12345
        }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    })
    .then(function () {
        // sempre será executado
    });
}