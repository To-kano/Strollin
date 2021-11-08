import React from 'react'
import { TouchableOpacity } from 'react-native'
import { DrawerActions } from '@react-navigation/native';
import Icon from './Icon'

export default function AddButton({iconName, text, onPressFct}) {
    return (
      <TouchableOpacity
        onPress={onPressFct}
        style={{
            backgroundColor: "#0989FF",
            position: "absolute",
            bottom: 32,
            right: 16,
            padding: 16,
            borderRadius: 32,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
        }}
      >
        <Icon name={iconName} size={29} color="#ffffff" />
      </TouchableOpacity>
    );
}