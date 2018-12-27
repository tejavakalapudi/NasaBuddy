import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { fetchAPOD, fetchNeoFeed, selectRover } from '../actions';
import { connect } from 'react-redux';
import APOD from './APOD';
import NeoInfo from './NeoInfo';
import MarsRovers from './MarsRovers';

class HomeScreen extends Component {

    componentWillMount(){
        this.props.fetchAPOD();
        this.props.fetchNeoFeed();
        this.props.selectRover( this.props.marsInfo.selectedRover );
    }
    
    render(){
        return(
            <ScrollView>
                <APOD apod={this.props.apodInfo}/>
                <MarsRovers />
                <NeoInfo/>
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
        marsInfo : state.marsInfo
    };
};
  
export default connect( mapStateToProps, { fetchAPOD, fetchNeoFeed, selectRover } )( HomeScreen );