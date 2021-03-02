import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList,
} from 'react-native';
import Box from './box';
import I18n from '../Translation/configureTrans';
import BackgroundImage from './backgroundImage';
import SearchBar from './TendanceSearchBar';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';

const imageFriend = require('../ressources/friend.png');
// const imageHistory = require('../ressources/history.png');
const imageProfile = require('../ressources/profile.png');

export function setSortedTendanceData(tag) {
  const store = Store.getState();
  var sortedData = [];

  //console.log("tag = ", tag)
  for (i in store.tendance.tendanceList) {
    for (j in store.tendance.tendanceList[i]["tags_list"]) {
      if (store.tendance.tendanceList[i]["tags_list"][j] == tag) {
        sortedData.push(store.tendance.tendanceList[i]);
        break;
      }
    }
  }
  //console.log("sortedData = ", sortedData);
  const action = {
    type: 'SET_SORTED_TENDANCE_LIST',
    value: sortedData
  };
  Store.dispatch(action);
}

export function getData() {
  const store = Store.getState();

  if (store.tendance.sortedTendanceList.length > 0) {
    return (store.tendance.sortedTendanceList);
  } else {
    return (store.tendance.tendanceList);
  }
}

export function HomePage(props) {
  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')}/>
        </TouchableOpacity>
        <Text style={styles.text_header}>Home</Text>
        <TouchableOpacity>
          <Image style={styles.img_header} source={require('../images/icons/black/search.png')}/>
        </TouchableOpacity>
      </View>
      <View style={styles.SearchBar}>
          <SearchBar
           onPress={setSortedTendanceData}
           imagePath='../images/icons/black/search.png'
          />
      </View>
      <View style={styles.viex_list}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={getData()}
          renderItem={({ item }) => (
            <Box
              {...props}
              data={item}
            />
          )}
          keyExtractor={(item) => item["name"]}
        />
      </View>
    </View>
    // <View style={styles.back}>
    //   <BackgroundImage />
    //   <View style={styles.header}>
    //     <TouchableOpacity
    //       style={{ width: '20%', height: '100%', marginLeft: 15 }}
    //       onPress={() => props.navigation.navigate('HomePage')}
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
    //       onPress={() => props.navigation.navigate('historicUser')}
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
    //       onPress={() => props.navigation.navigate('TripSuggestion')}
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
    //       onPress={() => props.navigation.navigate('Profile')}
    //     >
    //       <Image
    //         style={{
    //           marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
    //         }}
    //         source={require('../ressources/profile.png')}
    //       />
    //     </TouchableOpacity>
    //   </View>
    //   {/* <View style={styles.cont}>
    //     <Text style={{ fontSize: 40 }}> Trending trip: </Text>
    //   </View> */}
    //   <View style={styles.fill}>
    //     <View style={styles.SearchBar}>
    //       <SearchBar
    //         onPress={setSortedTendanceData}
    //         imagePath="../images/loupe.png"
    //       />
    //     </View>
    //     <FlatList
    //       data={getData()}
    //       contentContainerStyle={{ flexGrow: 1 }}
    //       renderItem={({ item }) => (
    //         <Box
    //           style={{ height: '100%', width: '100%' }}
    //           {...props}
    //           data={item}
    //           // {...item}
    //           // navigation={props.navigation}
    //         />
    //       )}
    //       keyExtractor={(item) => item.id}
    //     />
    //   </View>
    //   <View style={{ flex: 0.1, flexDirection: 'row', margin: '2%' }}>
    //     <TouchableOpacity
    //       style={styles.newTrip}
    //       onPress={() => {
    //         const action = {type: 'SET_SEARCH_CONV_LIST', value: props.conversation.conversationList };
    //         props.dispatch(action);
    //         props.navigation.navigate('MenuChat');
    //       }}
    //     >
    //       {/* <Text style={{ fontSize: 12, color: '#FFFFFF', textAlign:'center' }}>
    //         Go to Chat
    //       </Text> */}
    //       <Image
    //         style={{
    //           marginTop: '0%', height: '100%', width: '40%', opacity: 1, resizeMode: 'stretch', tintColor:'white'
    //         }}
    //         source={require('../ressources/chat.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.newTrip}
    //       onPress={() => props.navigation.navigate('TripSuggestion')}
    //     >
    //       {/* <Text style={{ fontSize: 12, color: '#FFFFFF', textAlign:'center' }}>
    //         {' '}
    //         {I18n.t('startNewTrip')}
    //         {' '}
    //       </Text> */}
    //       <Image
    //         style={{
    //           marginTop: '0%', height: '100%', width: '40%', opacity: 1, resizeMode: 'stretch', tintColor:'white'
    //         }}
    //         source={require('../ressources/plus.png')}
    //       />
    //     </TouchableOpacity>
    //     <TouchableOpacity
    //       style={styles.newTrip}
    //       onPress={() => {
    //         props.navigation.navigate('CourseEvaluation');
    //       }}
    //     >
    //       {/* <Text style={{ fontSize: 12, color: '#FFFFFF', textAlign:'center' }}>
    //         Go to Evaluation
    //       </Text> */}
    //       <Image
    //         style={{
    //           marginTop: '0%', height: '100%', width: '40%', opacity: 1, resizeMode: 'stretch', tintColor:'white'
    //         }}
    //         source={require('../ressources/rating.png')}
    //       />
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
}

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
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(HomePage);
