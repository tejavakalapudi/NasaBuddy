import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Card, CardSection, Button } from './common';
import NeoInfoByDate from './NeoInfoByDate';


class NeoInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeDate : "null",

        }
    }

    onDateSelected(date) {
        this.setState({
            activeDate : date
        });
    }

    renderItemByDate({item}) {
        return(
            <NeoInfoByDate 
                neoInfoItem={item}
                onPress={(date) => { this.onDateSelected(date) }}
                isActive={item.date === this.state.activeDate}
            />
        );
    }

    render(){
        const { 
            neoInfoTitleStyle, 
            neoCountContainer,
            neoCountStyle
        } = styles;
    
        const { neoCount, neoElements } = this.props.neoInfo;

        return (
            <Card>
                <CardSection>        
                    <Text style={ neoInfoTitleStyle }>
                        Number of Asteroids based on their closest approach date to Earth (Next 8 days)
                    </Text>
                </CardSection>
    
                <CardSection>
                    <View style={ neoCountContainer }>
                        <Text style={ neoCountStyle }>
                            { neoCount }
                        </Text>
                    </View>
                </CardSection>
    
                <CardSection style={{maxHeight: 500}}>
                    <FlatList
                        data={ neoElements }
                        renderItem={this.renderItemByDate.bind(this)}
                        extraData={this.state.activeDate}
                    />                    
                </CardSection>
    
            </Card>
        );
    }
};

const styles = {
    neoInfoTitleStyle:{
        fontWeight: 'bold', 
        fontSize: 14, 
        color: 'black', 
        lineHeight: 20
    },
    neoCountContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 100
    },
    neoCountStyle:{
        fontWeight: 'bold', 
        fontSize: 40, 
        color: '#1abc9c'
    }
};

const mapStateToProps = (state) => {
    return { 
        neoInfo : state.neoInfo
    };
};
  
export default connect( mapStateToProps)( NeoInfo );
