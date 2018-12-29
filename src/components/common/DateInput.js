import React from 'react';
import { TextInput, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';

const DateInput = ({ label, onDateChange, placeholder, currentDate, minDate, maxDate, isDefaultDate }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <DatePicker
            style={{
                flex: 2
            }}
            date={currentDate}
            mode="date"
            placeholder={placeholder}
            format="YYYY-MM-DD"
            minDate={minDate}
            maxDate={maxDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-start'
                },
                dateText:[inputStyle,{ color: isDefaultDate ? '#C7C7CD' : '#000'}]
            // ... You can check the source to find the other keys.
            }}
            showIcon= {false}
            onDateChange={onDateChange}
        />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    fontSize: 10,
    lineHeight: 23,
    paddingTop: 0,
    marginTop: 0
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
  }
};

export { DateInput };
