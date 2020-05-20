import React, {useState} from 'react';
import {StyleSheet ,Text , View, Image, TextInput, TouchableOpacity} from "react-native";

function HomePage(props) {

  const [value, onChangeText] = React.useState('');

  return (
    <View style={styles.back}>
      <TouchableOpacity
        style={styles.button}
        onPress={()=> console.log("ok")}
      >
        <Image source={require('../ressources/trip2.jpg')} style={styles.buttonImage} />
        <Text> New Trip </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=> console.log("ok")}
      >
        <Image source={require('../ressources/profil.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=> console.log("ok")}
      >
        <Image source={require('../ressources/trip2.jpg')} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  back: {
      backgroundColor: 'pink',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 1
  },
  buttonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    justifyContent: 'center',
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10,
    marginTop: 10
  }
});

export default HomePage;
