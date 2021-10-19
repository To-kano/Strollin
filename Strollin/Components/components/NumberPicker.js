import React from 'react'
import { View, Text } from 'react-native'
import WheelPicker from 'react-native-wheely';

const globalStyles = require('../../Styles');

export default function NumberPicker({min, max, increment, text, indexList, setIndexList}) {

  const listItem = []

  for (let index = min; index <= max; index += increment) {
    listItem.push(index)
  }

  return (
    <View style={{
      paddingHorizontal: 16, 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
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
        selectedIndex={indexList}
        itemHeight={64}
        visibleRest={1}
        itemTextStyle={[globalStyles.titles, {textAlign: 'center', color: '#0989FF' }]}
        options={listItem}
        onChange={(index) => setIndexList(index)}
      />
      {text && <Text style={{ marginLeft: 8, fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#0989FF'}}>{text}</Text>}
    </View>
  )
}
