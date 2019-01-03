import React, { Component } from 'react';
import { Text, ScrollView, FlatList, TouchableOpacity, View, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Button, DisplayModal } from './common';

class NeoInfoByDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeNeo : "",
            modalVisible : false
        }
    }

    onNeoSelected( neo ){
        this.setState({
            activeNeo : neo,
            modalVisible : true
        });
    }

    onCloseModal(){
        this.setState({
            modalVisible : false
        });
    }

    renderModal(){
        const item = this.state.activeNeo;
        console.log("==============", item);
        if( item ){
            return(
                <DisplayModal
                    display={this.state.modalVisible}
                    closeModal={this.onCloseModal.bind(this)}
                >   
                    <Card>
                        <CardSection style = {{ justifyContent: 'center', alignItems: 'center', padding:10, backgroundColor: '#6c757d' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#f8f9fa' }}>
                                {item.name}
                            </Text>
                        </CardSection>
                        <CardSection style = {{ flexDirection: "column", alignSelf: "stretch", padding:5 }}>
                            <Text style={{ alignSelf: 'stretch', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>
                                Absolute Magnitude
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {item.absolute_magnitude_h}
                            </Text>
                        </CardSection>
                        <CardSection style = {{flexDirection: "column", alignSelf: "stretch", padding:5 }}>
                            <Text style={{ alignSelf: 'stretch', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>
                                Potentially Hazardous
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {item.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                            </Text>
                        </CardSection>

                        <CardSection style = {{ flexDirection: "column", alignSelf: "stretch", padding:5 }}>
                            <Text style={{ alignSelf: 'stretch', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>
                                Orbiting Body
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {item.close_approach_data[0].orbiting_body}
                            </Text>
                        </CardSection>

                        <CardSection style = {{ flexDirection: "column", alignSelf: "stretch", padding:5 }}>
                            <Text style={{ alignSelf: 'stretch', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>
                                Relative Velocity
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`${item.close_approach_data[0].relative_velocity.kilometers_per_hour} km per hour.`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`${item.close_approach_data[0].relative_velocity.kilometers_per_second} km per second.`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`${item.close_approach_data[0].relative_velocity.miles_per_hour} miles per hour.`}
                            </Text>
                        </CardSection>

                        <CardSection style = {{ flexDirection: "column", alignSelf: "stretch", padding:5 }}>
                            <Text style={{ alignSelf: 'stretch', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>
                                Miss Distance
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Astronomical: ${item.close_approach_data[0].miss_distance.astronomical}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Kilometers: ${item.close_approach_data[0].miss_distance.kilometers}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Lunar: ${item.close_approach_data[0].miss_distance.lunar}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Miles: ${item.close_approach_data[0].miss_distance.miles}`}
                            </Text>
                        </CardSection>

                        <CardSection style = {{ flexDirection: "column", alignSelf: "stretch", padding:5 }}>
                            <Text style={{ alignSelf: 'stretch', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>
                                Maximum Estimated Diameter
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Feet: ${item.estimated_diameter.feet.estimated_diameter_max}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Kilometers: ${item.estimated_diameter.kilometers.estimated_diameter_max}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Meters: ${item.estimated_diameter.meters.estimated_diameter_max}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Miles: ${item.estimated_diameter.miles.estimated_diameter_max}`}
                            </Text>
                        </CardSection>

                        <CardSection style = {{ flexDirection: "column", alignSelf: "stretch", padding:5 }}>
                            <Text style={{ alignSelf: 'stretch', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>
                                Minimum Estimated Diameter
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Feet: ${item.estimated_diameter.feet.estimated_diameter_min}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Kilometers: ${item.estimated_diameter.kilometers.estimated_diameter_min}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Meters: ${item.estimated_diameter.meters.estimated_diameter_min}`}
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {`Miles: ${item.estimated_diameter.miles.estimated_diameter_min}`}
                            </Text>
                        </CardSection>

                        <CardSection style = {{ flexDirection: "column", alignSelf: "stretch", padding:5 }}>
                            <Text style={{ alignSelf: 'stretch', fontWeight: 'bold', fontSize: 12, marginBottom: 5 }}>
                                NEO Reference ID
                            </Text>
                            <Text style={{ alignSelf: 'stretch', fontWeight: '500', fontSize: 14 }}>
                                {item.neo_reference_id}
                            </Text>
                        </CardSection>
                    </Card>
                </DisplayModal>
            )
        }
    }

    renderNeoItem({item}){
        return(
            <View>
                <TouchableOpacity onPress={() => {this.onNeoSelected(item)}}>       
                    <CardSection>
                        <Text 
                            style={{ 
                                padding:10, 
                                color: `${item.is_potentially_hazardous_asteroid ? '#dc3545' : '#343a40'}`,
                                fontWeight: `${item.is_potentially_hazardous_asteroid ? 'bold' : '500'}`
                            }}
                        >
                            {item.name}
                        </Text>
                    </CardSection>
                </TouchableOpacity>
            </View>
        );
    }

    render(){
        return (
            <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
                <Card>
                    <CardSection style={{flexDirection: 'column'}}>
                        <Text 
                            style={{
                                fontSize: 14, 
                                fontWeight: 'bold', 
                                padding: 10
                            }}
                        >
                            NEO (Near-Earth Object)
                        </Text>
                        <Text 
                            style={{
                                fontSize: 14, 
                                fontWeight: '500', 
                                padding: 10
                            }}
                        >
                            An asteroid or comet with a perihelion distance less than or equal to 1.3 au. 99% of NEOs are asteroids. See our page on NEO Groups for more information.
                        </Text>
                    </CardSection>
                </Card>
                <Card>
                    <FlatList
                        data={ this.props.activeElements }
                        renderItem={ this.renderNeoItem.bind(this) }
                        keyExtractor={(item, index) => item.id}
                        extraData={ this.state.activeNeo }
                    />
                </Card>
                {this.renderModal()}
            </ScrollView>
        );
    }
};

const mapStateToProps = (state, props) => {
    return { 
        activeElements : (state.neoInfo.neoElements.find(dateObj => dateObj.date === props.date))['elements']
    };
};

export default connect( mapStateToProps )( NeoInfoByDate );