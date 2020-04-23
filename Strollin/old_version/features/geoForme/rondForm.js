import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, TextInput} from 'react-native';

class RondFormeText extends Component {
    render() {
        return (
        <View style={{height: this.props.size, width: this.props.size, backgroundColor: "#D99860", borderRadius: this.props.size/2, justifyContent: "center"}}>
            <Text style={{textAlign: "center", fontSize: 35, fontFamily :"lobster", color: 'white' }}>{this.props.text}</Text>
        </View>
        )
    }
}

export {RondFormeText};