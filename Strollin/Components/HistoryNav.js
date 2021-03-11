import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  Text, View, Image, FlatList, Button, ImageBackground, TouchableOpacity, StyleSheet, Dimensions
} from 'react-native';
import HistoryItem from './historyItem';
import BackgroundImage from './backgroundImage';
import I18n from '../Translation/configureTrans';
import Box from './box';

export function HistoryNav({ navigation, profil }) {

  console.log("profile = ", profil);
  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')}/>
        </TouchableOpacity>
        <Text style={styles.text_header}>Historic</Text>
        <TouchableOpacity>
          <Image style={styles.img_header} source={require('../images/icons/black/search.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.viex_list}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={profil.course_historic}
          renderItem={({ item }) => (
            <HistoryItem courseId={item}/>
          )}
        />
      </View>
    </View>
    // <View style={styles.back}>
    //   <BackgroundImage />
    //   <View style={styles.header}>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%', marginLeft: 15 }}
    //       onPress={() => navigation.navigate('HomePage')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/home.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%' }}
    //       onPress={() => navigation.navigate('historicUser')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/trip.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%' }}
    //       onPress={() => navigation.navigate('TripSuggestion')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/plus.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%' }}
    //       onPress={() => props.navigation.navigate('FriendList')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/friend.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%' }}
    //       onPress={() => navigation.navigate('Profile')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/profile.png')}
    //       />
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.fill}>
    //     <FlatList
    //       data={map.historic}
    //       renderItem={({ item }) => (
    //         <View style={{ padding: 10 }}>
    //           <Text>
    //             date:
    //             {item.date}
    //           </Text>
    //           <Text>
    //             duration:
    //             {item.duration}
    //           </Text>
    //           <ElementHistoryNav data={item.waypoints} />
    //         </View>
    //       )}
    //     />
    //   </View>
    //   <View style={{ flex: 0.10, flexDirection: 'column', margin: '5%' }}>
    //     <TouchableOpacity
    //       style={styles.newTrip}
    //       onPress={() => navigation.navigate('TripSuggestion')}
    //     >
    //       <Text style={{ fontSize: 16, color: '#FFFFFF' }}> New trip </Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
}


const mapStateToProps = (state) => {
  return (
    {
      profil: state.profil
    }
  )
};
export default connect(mapStateToProps)(HistoryNav);

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '3.3%',
    paddingRight: '3.3%',
    paddingBottom: '0%',
  },
  view_header: {
    flex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '77.8%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  viex_list: {
    flex: 757,
  },
  view_historic: {
    flexDirection: 'column',
    marginBottom: 30,
  },
  view_information: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img_date: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_date: {
    flex: 2,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333333',
  },
  img_duration: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_duration: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#333333',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  view_historicTop: {
    flexDirection: 'column',
  },

  // container: {
  //   // flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   // justifyContent: 'center',
  //   // backgroundColor: "gray"
  // },
  // center: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // backgroundColor: "gray"
  // },
  // back: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  // },
  // fill: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.90,
  //   backgroundColor: '#FFFFFF',
  //   padding: 5,
  //   marginTop: 10,
  //   width: '95%',
  //   borderRadius: 5,
  //   opacity: 0.9,
  // },
  // header: {
  //   backgroundColor: '#FFFFFF',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.082,
  //   width: '100%',
  // },
  // newTrip: {
  //   flex: 0.65,
  //   alignItems: 'center',
  //   backgroundColor: '#F07323',
  //   paddingVertical: '5%',
  //   // width: '90%',
  //   paddingHorizontal: '38%',
  //   borderRadius: 5,
  // }
});
