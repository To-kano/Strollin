import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from './Icon'
const globalStyles = require('../../Styles');

export default function NextStep({text, onPressFct}) {
    return (
      <TouchableOpacity
        onPress={onPressFct}
        style={{
            flexDirection: 'row',
            position: "absolute",
            bottom: 32,
            right: 16,
            paddingLeft: 22,
            backgroundColor: "#0989FF",
            padding: 16,
            alignItems: 'center',
            borderRadius: 32,
        }}
      >
        <Text style={[globalStyles.paragraphs, { color: "#ffffff" , marginRight: 8}]}>
          {text}
        </Text>
        <Icon name="next" size={19} color="#ffffff" />
      </TouchableOpacity>
    );
}