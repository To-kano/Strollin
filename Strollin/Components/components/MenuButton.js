import React from 'react'
import { TouchableOpacity } from 'react-native'
import { DrawerActions } from '@react-navigation/native';
import Icon from './Icon'

export default function MenuButton({props}) {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        style={{
            backgroundColor: "#ffffff",
            position: "absolute",
            top: 16,
            left: 16,
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
        <Icon name="menu" size={29} color="#1C1B1C" />
      </TouchableOpacity>
    );
}