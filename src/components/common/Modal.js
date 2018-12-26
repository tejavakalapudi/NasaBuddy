import React from 'react'
import { Modal, View, Image, Text, StyleSheet } from 'react-native';
import { ScaledImage } from '../common';

const DisplayModal = (props) => (
    <Modal 
        visible={ props.display } animationType = "slide" 
        onRequestClose={ () => console.log('closed') }
    >
        <View style={styles.contentContainer}>
            <ScaledImage 
                uri = {props.image}
                width = {400}
            />
        </View>
    </Modal>
)

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems : 'center',
        flexDirection : 'column'
    },
    text: {
        fontSize: 20,
        marginLeft: 150
    }
})

export { DisplayModal };