import React from 'react';
import { View, Text } from 'react-native'
import WheelPicker from 'react-native-wheely';

const globalStyles = require('../../Styles');

export default function TimePicker({hourOption, hourSelected, setHourSelected, minuteOption, minuteSelected, setMinuteSelected }) {
  
  return (
    <View style={{
      paddingHorizontal: 16, 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-around', 
      backgroundColor: '#ffffff', 
      marginTop: 32, 
      borderRadius: 16, 
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    }}>
      <WheelPicker
        selectedIndex={hourSelected}
        itemHeight={64}
        visibleRest={1}
        itemTextStyle={[globalStyles.titles, {textAlign: 'center', color: '#0989FF' }]}
        options={hourOption}
        onChange={(index) => setHourSelected(index)}
      />
      <Text style={[globalStyles.titles, {width: '10%', textAlign: 'center'}]}>:</Text>
      <WheelPicker
        selectedIndex={minuteSelected}
        itemHeight={64}
        visibleRest={1}
        itemTextStyle={[globalStyles.titles, {textAlign: 'center', color: '#0989FF' }]}
        options={minuteOption}
        onChange={(index) => setMinuteSelected(index)}
      />
    </View>
  )
}
