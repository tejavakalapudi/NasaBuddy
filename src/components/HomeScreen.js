import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { fetchAPOD, fetchNeoFeed, fetchRoverImages } from '../actions';
import { connect } from 'react-redux';
import APOD from './APOD';
import NeoInfo from './NeoInfo';
import MarsRovers from './MarsRovers';

class HomeScreen extends Component {

    componentWillMount(){
        this.props.fetchAPOD();
        this.props.fetchNeoFeed();

        const cameraNames = [{
            "name": "FHAZ",
            "full_name": "Front Hazard Avoidance Camera"
        }, {
            "name": "NAVCAM",
            "full_name": "Navigation Camera"
        }, {
            "name": "MAST",
            "full_name": "Mast Camera"
        }, {
            "name": "CHEMCAM",
            "full_name": "Chemistry and Camera Complex"
        }, {
            "name": "MAHLI",
            "full_name": "Mars Hand Lens Imager"
        }, {
            "name": "MARDI",
            "full_name": "Mars Descent Imager"
        }, {
            "name": "RHAZ",
            "full_name": "Rear Hazard Avoidance Camera"
        }];

        cameraNames.forEach((camera) => {
            this.props.fetchRoverImages("Curiosity", camera.name);
        });
    }
    
    render(){
        return(
            <ScrollView style={{backgroundColor: '#fff'}}>
                <APOD apod={this.props.apodInfo}/>
                <NeoInfo/>
                <MarsRovers />
                <View style={{paddingBottom: 30}}/>
            </ScrollView>
        );
    }
}

const styles = {
    containerStyle : {

    }
}

const mapStateToProps = (state) => {
    return { 
        apodInfo : state.apodInfo,
        neoInfo : state.neoInfo
    };
};
  
export default connect( mapStateToProps, { fetchAPOD, fetchNeoFeed, fetchRoverImages } )( HomeScreen );