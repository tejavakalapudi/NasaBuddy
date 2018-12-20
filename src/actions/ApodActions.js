import axios from 'axios';
import { API_KEY } from '../constants';

const setAPOD = (payload) => ({
    type: "APOD_FETCH_SUCCESS",
    payload
});

export const fetchAPOD = () => {
    return(dispatch) => {
        axios({
            method: 'get',
            url: 'https://api.nasa.gov/planetary/apod',
            params: {
                api_key: API_KEY,
                hd : true
            }
        })
        .then((res) => {
            dispatch(setAPOD(res.data));
        })
        .catch((e) => {
            console.log("Error fetching APOD", e);
        })
    }
}