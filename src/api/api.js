import axios from 'axios';
import configData from '../config.json';

let API_URL = "/noteeAPI";
export default function callApi(endpoint, method = 'GET', body, process){
    return axios({
        method,
        url: `${API_URL}/${endpoint}`,
        data: body
    }).catch(err =>{
        console.log(err);
    });
}
