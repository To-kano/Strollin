import {
    Button, Image, View, StyleSheet, Text, ScrollView, FlatList
  } from 'react-native';
  import React from "react";
  
  function Comment(props)  {
  
    console.log("props = ", props);
    return (
      <View style={{
        justifyContent: 'space-around', flex: 1, marginTop: 20, marginHorizontal: '10%', backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 20, width: '80%'
      }}
      >
        <Text style={[{ fontSize: 35 }]}>{props.pseudo}</Text>
        <Text></Text>
        <Text style={[{ fontSize: 25 }]}>{props.comment}</Text>
        <Text style={[{ fontSize: 25 }]}>Note : {props.note}</Text>
      </View>
    );
  }
  
  export default Comment;
  
  const styles = StyleSheet.create({
    cont: {
      marginTop: '5%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 0.1,
      backgroundColor: '#FFC300'
    },
    img: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flex: 0.1,
      backgroundColor: 'red',
      width: '80%'
    },
    whiteBox: {
      justifyContent: 'space-between',
      flex: 1,
      marginTop: 20,
      marginHorizontal: '10%',
      backgroundColor: 'rgba(255,255,255, 0.9)',
      borderRadius: 20,
      textAlign: "left",
      width: '80%'
    }
  
  });
  