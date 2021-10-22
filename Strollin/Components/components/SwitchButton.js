import React from 'react'
import { View, Text, Switch } from 'react-native'
const globalStyles = require('../../Styles');

export default function SwitchButton({textTrue, textFalse, switchValue, onSwitchFct}) {
    return (
        <View style={{ marginTop: 32, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={[globalStyles.subparagraphs]}>{ switchValue ? textTrue : textFalse }</Text>
            <Switch
                style={{marginLeft: 8}}
                trackColor={{ false: "#9B979B", true: "#0989FF" }}
                thumbColor={switchValue ? "#ffffff" : "#ffffff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onSwitchFct}
                value={switchValue}
            />
        </View>
    )
}