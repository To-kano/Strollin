import React, { Component } from 'react';
import { Text, View, Image, FlatList, Button, ImageBackground, StyleSheet, Dimensions } from 'react-native';
//import stylesHomepage from '../../styles/homepage'
//import stylesGeneric from '../../styles/genericStyle'
//import { RondFormeText } from "../../features/geoForme/rondForm"

import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';

import {connect} from 'react-redux';

function HistoryNav(props) {

  //console.log("historic ", props.map.historic[0]);

  //const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
            title="Log Out"
            color="#89B3D9"
            onPress={() =>
              props.navigation.navigate('userLogin')
            }
          />
      ),
    });
  }, [props.navigation]);

  return (
    <View style={{ flex: 1,flexDirection: 'column', justifyContent: 'space-around', }}>
      <BackgroundImage/>
        <View style={{ flex: 1.5, marginHorizontal: "15%", marginTop: 20 , backgroundColor : 'rgba(255,255,255, 0.9)', borderRadius: 10}}>
        <FlatList
            data={props.map.historic}
            renderItem={({ item }) => (
              <View style={{padding: 10}} >
                <Text>date: {item.date}</Text>
                <Text>duration: {item.duration}</Text>
                <ElementHistoryNav data={item.waypoints} />
              </View>
            )}
          />
        
          
        </View>
        <View style={[{ flex: 0.3,marginHorizontal: "15%", backgroundColor: 'rgba(0,0,0,0.0)' , justifyContent : "center"}]}>
          <Button
            color='#D99860'
            title="New Trip"
            onPress={() => props.navigation.navigate('TripSuggestion')}
          />
          
        </View>
      </View>
  );
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(HistoryNav);


const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    // backgroundColor: "gray"
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "gray"
  }
});