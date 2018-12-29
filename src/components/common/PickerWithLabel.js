import React from 'react';
import { TextInput, View, Text, Picker, FlatList, TouchableWithoutFeedback, Modal } from 'react-native';

const PickerWithLabel = ({ 
    label, 
    updateValue, 
    maxSol, 
    selectedValue, 
    placeholder, 
    isPickerLaunched, 
    confirmButton, 
    togglePicker, 
    isDefaultSol,
    pickerValue
}) => {
  const { inputStyle, labelStyle, containerStyle, closeButtonStyle, confirmButtonStyle } = styles;

  const solArray = [...Array(maxSol).keys()];
  return (
    <View style={containerStyle}>   
        <Text style={labelStyle}>{label}</Text>
        <TouchableWithoutFeedback onPress={togglePicker}>
            <Text 
                style={[inputStyle, {color: isDefaultSol ? '#C7C7CD' : '#000'}]}
            >
                {selectedValue || placeholder}
            </Text>
        </TouchableWithoutFeedback>

        <Modal 
            visible={ isPickerLaunched } 
            animationType = "slide" 
            onRequestClose={ () => console.log('closed') }
        >
            <Picker
                selectedValue={pickerValue}
                style={{flex: 1, flexDirection:'column',justifyContent: 'center'}}
                onValueChange={(itemValue, itemIndex) => updateValue(itemValue)}
                >
                {solArray.map( item => <Picker.Item label={`${item}`} value={item} key={item}/>)}
            </Picker>
            <Text style={confirmButtonStyle} onPress={confirmButton}>
                Confirm
            </Text>
            <Text style={closeButtonStyle} onPress={togglePicker}>
                Close
            </Text>    
        </Modal>
    </View>
  );
};

const styles = {
    inputStyle: {
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 10,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 10,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 35,
        width: 180,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1
    },
    closeButtonStyle:{
        position: 'absolute',
        left: 20,
        top: 50,
    },
    confirmButtonStyle:{
        position: 'absolute',
        right: 20,
        top: 50,
    }
};

export { PickerWithLabel };
