import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, onPress }) => {
  const { inputStyle, labelStyle, containerStyle, buttonStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <Text style={{fontSize: 8, textAlign:'center'}}>
          Go
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 10,
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
  buttonStyle:{
      flex:0.5, 
      backgroundColor: 'rgba(51, 110, 169, 0.4)',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'rgba(51, 110, 169, 0.4)',
      paddingLeft: 8, 
      paddingRight: 8,
      paddingTop: 3,
      paddingBottom: 3, 
      marginRight: 5
  }
};

export { Input };
