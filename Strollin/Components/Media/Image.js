import React from 'react';
import {Image , View, ActivityIndicator, Dimensions, StyleSheet} from "react-native";

const styles = StyleSheet.create({
    viewImage: {
        alignSelf: 'center',
        margin: 5
    }
})

function DisplayImage(props) {
    //console.log("\n\nDisplay image:\n")
    //console.log(props.data)

    if (!props.data) {
        return (
            <ActivityIndicator/>
        )
    }

    return (
        <View style={styles.viewImage}>
            <Image
                style={{
                    width: Dimensions.get('window').width * 80 / 100,
                    height: props.data.height * ( (Dimensions.get('window').height * 45 / 100) / props.data.width),
                    resizeMode: 'contain'
                }}
                source={{
                    uri: props.data.link
                }}
            />
        </View>
    )
}

export default DisplayImage;