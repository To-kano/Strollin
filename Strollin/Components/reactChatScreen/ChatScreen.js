import React, { useEffect, useState } from "react";
import { Platform, KeyboardAvoidingView, safeAreaView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "./Fire";
import { SafeAreaView } from "react-navigation";
import {connect} from 'react-redux';

function ChatScreen({ route, navigation }) {
    const [messages, setMessages] = useState([]);
    const { username } = route.params.user;

    const user = () => {
        return {
            _id: Fire.uid,
            name: username
        };
    }
    useEffect(() => {
        Fire.get(message =>
            setMessages(GiftedChat.append(messages, message))
        );
        return () => {
            Fire.off();
        }
       }, [])

    const chat = <GiftedChat messages={ messages } onSend={ Fire.send } user={ user } />

    if (Platform.OS === "android") {
        return (
            <KeyboardAvoidingView style={{ flex: 1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                { chat }
            </KeyboardAvoidingView>
        );
    }
    return <SafeAreaView style={{ flex: 1 }}>{ chat }</SafeAreaView>
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(ChatScreen);