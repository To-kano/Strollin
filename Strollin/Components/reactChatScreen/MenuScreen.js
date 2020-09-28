import React, { useState } from "react"
import  { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";

function LoginScreen({navigation})  {
    const [name, setName] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.circle}/>
            <View style={{ marginTop: 64}}>
            </View>
            <View style={{ marginHorizontal: 32 }}>
                <Text style={ styles.header }>Username</Text>
                <TextInput 
                    style={ styles.input }
                    placeholder="Name"
                    onChangeText={ name => {
                        setName(name);
                    }}
                    value={ name }
                />
                <View style={{ alignItems: "flex-end", marginTop:64 }}>
                    <TouchableOpacity style={ styles.continuation } onPress={ navigation.navigate("Chat", { user: name }) }>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default LoginScreen

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
        fontWeight: "800",
        fontSize: 30,
        color: "#514E5A",
        marginTop: 32
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
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#434343"
    }
});