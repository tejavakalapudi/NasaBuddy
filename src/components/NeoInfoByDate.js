import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Card, CardSection, Button } from './common';

const NeoInfoByDate = (props) => {

    const { date, elements } = props.neoInfoItem;
    const { onPress, isActive } = props;

    const renderNeoItem = ({item}) => (
        <CardSection>
            <Text style={{ padding:5 }}>
                {item.name}
            </Text>
        </CardSection>
    );
    
    return (
        <View>
            <Button onPress = {() => {onPress(date)}}>{ date }</Button>
            {isActive && 
            <Card>
                <FlatList
                    data={ elements }
                    renderItem={ renderNeoItem }
                    keyExtractor={(item, index) => item.id}
                />
            </Card>
            }
        </View>
    );
};

export default NeoInfoByDate;