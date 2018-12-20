import axios from 'axios';
import { API_KEY } from '../constants';

const setNeoInfo = (payload) => ({
    type: "NEO_FETCH_SUCCESS",
    payload
});

export const fetchNeoFeed = () => {
    const todayDate = new Date();
    return(dispatch) => {
        axios({
            method: 'get',
            url: 'https://api.nasa.gov/neo/rest/v1/feed',
            params: {
                api_key: API_KEY,
                hd : true,
                start_date : todayDate.toISOString().split('T')[0]
            }
        })
        .then((res) => {
            dispatch(setNeoInfo({
                neoCount : res.data.element_count,
                neoElements : res.data.near_earth_objects
            }));
        })
        .catch((e) => {
            console.log("Error fetching neo feed", e);
        })
    }
}