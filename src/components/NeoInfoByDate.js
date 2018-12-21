import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button } from './common';

class NeoInfoByDate extends Component {

    renderNeoItem({item}){
        return(        
            <CardSection>
                <Text style={{ padding:5 }}>
                    {item.name}
                </Text>
            </CardSection>
        );
    }

    render(){
        return (
            <View style={{flex:1}}>
                <Card>
                    <FlatList
                        data={ this.props.activeElements }
                        renderItem={ this.renderNeoItem }
                        keyExtractor={(item, index) => item.id}
                    />
                </Card>
            </View>
        );
    }
};

const mapStateToProps = (state, props) => {
    return { 
        activeElements : (state.neoInfo.neoElements.find(dateObj => dateObj.date === props.date))['elements']
    };
};

export default connect( mapStateToProps )( NeoInfoByDate );