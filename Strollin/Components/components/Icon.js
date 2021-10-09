import React from 'react'
import { Image } from 'react-native'

const ICONS = [
    {
        name: 'mail',
        uri: require("../../assets/icons/mail.png"),
    },
    {
        name: 'step_before',
        uri: require("../../assets/icons/step_before.png"),
    },
    
    {
        name: 'next',
        uri: require("../../assets/icons/next.png"),
    },
    {
        name: 'menu',
        uri: require("../../assets/icons/menu.png"),
    },
];

export default function Icon({name, size, color}) {
    const src = ICONS.find(data => data.name === name);

    return (
        <Image
            source={src.uri}
          style={{
            height: size,
            width: size,
            borderRadius: 50,
            tintColor: color,
          }}
        />
    )
}