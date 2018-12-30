import axios from 'axios';
import { API_KEY } from '../constants';

const cameraNames = [
    "FHAZ",
    "NAVCAM",
    "MAST",
    "CHEMCAM",
    "MAHLI",
    "MARDI",
    "RHAZ",
    "PANCAM",
    "MINITES"
];

let cameraIndex = 0;
let roverInfoSet = false;

const setRoverImagesByCam = (camera, payload) => ({
    type: `${camera}_IMAGES_SUCCESS`,
    payload
});

const setSelectedRover = (roverName) => ({
    type: 'ROVER_SELECTED',
    roverName
});

const resetAllCams = () => ({
    type: 'RESET_ALL_CAMS'
});

const toggleRequestStatus = () => ({
    type: 'TOGGLE_REQUEST_STATUS'
});

const setRoverInfo = (payload) => ({
    type: 'SET_ROVER_INFO',
    payload
});

export const updateSolAndEarthDate = ({date, sol, sortBy}) =>({
    type: 'UPDATE_SOL_DATE',
    date,
    sol,
    sortBy
})

export const fetchRoverImages = ( roverName, camera, sol, earth_date, selectedSortBy ) => {
    return(dispatch) => {
        axios({
            method: 'get',
            url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos`,
            params: {
                api_key: API_KEY,
                sol: selectedSortBy === 'SOL' ? sol : 'none',
                earth_date: selectedSortBy !== 'SOL' ? earth_date : 'none',
                camera
            }
        })
        .then((res) => {
            if( !roverInfoSet ){   
                if( res.data.photos.length > 0 ){
                    roverInfoSet = true;
                    dispatch(setRoverInfo(res.data.photos[0].rover));
                } else {
                    dispatch(setRoverInfo({}));
                }   
            }
            dispatch( setRoverImagesByCam( camera, res.data.photos ) );
            cameraIndex++;
            if( cameraIndex === (cameraNames.length) ){
                dispatch(toggleRequestStatus());
                cameraIndex = 0;
            }
        })
        .catch((e) => {
            console.log("Error fetching Rover Images", e);
            cameraIndex++;

            if( cameraIndex === (cameraNames.length)){
                dispatch(toggleRequestStatus());
                cameraIndex = 0;
            }
        })
    }
}

export const selectRover = ( roverName ) => {
    return(dispatch, getState) => {

        const { selectedEarthDate, selectedSol, selectedSortBy } = getState().marsInfo;

        roverInfoSet = false;
        dispatch(resetAllCams());
        dispatch(toggleRequestStatus());
        //dispatch(fetchRoverInfo( roverName ));

        console.log("===========", selectedSortBy);
        
        cameraNames.forEach((camera, index) => {
            dispatch(fetchRoverImages(roverName, camera, selectedSol, selectedEarthDate, selectedSortBy));
        });
        
        dispatch(setSelectedRover( roverName ));
    }
}