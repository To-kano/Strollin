import React, { useState } from "react"
import  { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import {connect} from 'react-redux';
import FriendList from './FriendList';
import SearchBar from "./SearchBar";
import Store from '../../Store/configureStore';

function sortConversation(key) {
    const store = Store.getState();
    var action = {};
    var notFound = true;

    action = { type: 'SET_FRIEND', value : { friendList: ["Koko", "Yaya", "Zaza"] }};

    if (key == "") {
        Store.dispatch(action);
    } else {
        for (i in store.profil.FriendList) {
            if (key == store.profil.FriendList[i]) {
                action = { type: 'SET_FRIEND', value : { friendList: [key] }};
                Store.dispatch(action);
                notFound = false;
            }
        }
        if (notFound == true) {
            action = { type: 'SET_FRIEND', value : { friendList: [] }};
            Store.dispatch(action);
        }
    }
}

function NewConversation(props)  {

    return (
        <View style={styles.container}>
            <View style={styles.circle}/>
            <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                <Text style={ styles.header }>Friend List</Text>
            </View>
            <View>
                <SearchBar
                    onPress = { sortConversation }
                    imagePath = { '../../images/loupe.svg' }
                />
            </View>
            <View>
                <FlatList
                    data={props.profil.FriendList}
                    renderItem={({item}) => <FriendList {...props} name={item} />}
                    keyExtractor={(item) => item}
                />
            </View>
        </View>
    );
}


const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(NewConversation);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F5F7"
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500 / 2,
        backgroundColor: "#FFF",
        position: "absolute",
        left: -120,
        top: -20
    },
    header: {
        textAlign: 'center',
        fontWeight: "800",
        fontSize: 30,
        color: "#514E5A",
    },
    input: {
        marginTop: 32,
        height: 50,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#BAB7C3",
        borderRadius: 30,
        paddingHorizontal: 16,
        color: "#514E5A",
        fontWeight: "600"
    },
    continuation: {
        width: 50,
        height: 50,
        backgroundColor: "#434343"
    }
});