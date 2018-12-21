import React, { Component } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import { Card, CardSection, Button } from './common';
import { fetchAPOD, fetchNeoFeed } from '../actions';
import { connect } from 'react-redux';
import APOD from './APOD';
import NeoInfo from './NeoInfo';

class HomeScreen extends Component {

    componentWillMount(){
        this.props.fetchAPOD();
        this.props.fetchNeoFeed();
    }
    
    render(){
        console.log("======", this.props.neoInfo);
        return(
            <ScrollView style={{backgroundColor: '#fff'}}>
                <APOD apod={this.props.apodInfo}/>
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
        neoInfo : state.neoInfo
    };
};
  
export default connect( mapStateToProps, { fetchAPOD, fetchNeoFeed } )( HomeScreen );