import React, { Component } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import { Card, CardSection, Button } from './common';
import { fetchAPOD, fetchNeoFeed } from '../actions';
import { connect } from 'react-redux';
import APOD from './APOD';

class HomeScreen extends Component {

    componentWillMount(){
        this.props.fetchAPOD();
        this.props.fetchNeoFeed();
    }
    
    render(){
        return(
            <ScrollView>
                <APOD apod={this.props.apodInfo}/>
                <Card>
                    <CardSection>        
                        <Text style={{fontWeight:"bold", fontSize: 14, color: "black", lineHeight: 20}}>
                            Number of Asteroids based on their closest approach date to Earth (Next 7 days)
                        </Text>
                    </CardSection>
                    <CardSection>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height:200}}>
                            <Text style={{fontWeight:"bold", fontSize: 40, color: "#1abc9c"}}>
                                {this.props.neoInfo.neoCount}
                            </Text>
                        </View>
                    </CardSection>
                </Card>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        apodInfo : state.apodInfo,
        neoInfo : state.neoInfo
    };
};
  
export default connect( mapStateToProps, { fetchAPOD, fetchNeoFeed } )(HomeScreen);