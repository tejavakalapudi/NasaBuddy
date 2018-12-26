import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, SquareText } from './common';

class NeoInfo extends Component {

    onDateSelected(date) {
        Actions.neoByDate({ date, title: `Neo's on ${this.getDateByFormat(date)}` });
    }

    getDateByFormat( date ) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        const dateInstance = new Date( date );
        const month = months[ dateInstance.getMonth() ];
        
        return `${month} ${dateInstance.getDate()}`;
    }

    renderItemByDate({item}) {
        return(
            <View style={{flex:1}}>
                <SquareText onPress = {() => { this.onDateSelected( item.date ) }}>
                    { `${this.getDateByFormat( item.date )} (${item.elements.length})` }
                </SquareText>
            </View>
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
                        horizontal={true}
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
