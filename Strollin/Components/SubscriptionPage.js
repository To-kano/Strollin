import React from 'react'
import { View } from 'react-native'
import {WebView} from 'react-native-webview'
import MenuButton from './components/MenuButton'

export default function SubscriptionPage(props) {
    return (
        <View style={{flex: 1}}>
            <WebView
                source={{
                    uri: 'https://strollin.vercel.app/SubscriptionScreen'
                }}
                style={{ flex: 1 }}
            />
            <MenuButton props={props}/>
        </View>
    )
}
