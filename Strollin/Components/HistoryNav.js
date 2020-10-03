import { connect } from 'react-redux';
import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';
import I18n from "../Translation/configureTrans";
import React, { Component } from 'react';
import { Text, View, Image, FlatList, Button, ImageBackground, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Box from './box'

function HistoryNav({ navigation, map }) {
  React.useLayoutEffect(() => {
    props.navigation
    props.navigation.setOptions({
      // headerRight: () => (
      //   <Button
      //       title="Log Out"
      //       color="#89B3D9"
      //       onPress={() =>
      //         props.navigation.navigate('userLogin')
      //       }
      //     />
      // ),
    });
  }, [navigation]);

  return (
    <View style={styles.back}>
      <BackgroundImage/>
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: '20%', height: '100%', marginLeft: 15}}
          onPress={() => props.navigation.navigate('HomePage')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/home.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/history.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/plus.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => console.log('friend')}
        >
          <Image style={{marginTop: "10%", height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/friend.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/profile.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.fill}>
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
      <View style={{flex: 0.10, flexDirection: 'column', margin: '5%'}}>
        <TouchableOpacity
          style={styles.newTrip}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Text style={{fontSize: 16, color: '#FFFFFF'}}> New trip </Text>
        </TouchableOpacity>
      </View>
    </View>
  )

}

const mapStateToProps = (state) => state;

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
  },
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  fill: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginTop: 10,
    width: '95%',
    borderRadius: 5,
    opacity: 0.9,
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
  },
  newTrip: {
    alignItems: "center", 
    backgroundColor: "#F07323", 
    paddingVertical: '5%', 
    // width: '90%',
    paddingHorizontal: '38%', 
    borderRadius: 5,
  }
});
