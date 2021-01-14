import React, { Component, useState } from 'react';
import {
  Text, View, TouchableHighlight, FlatList, ScrollView, Button, StatusBar, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../Translation/configureTrans';
import BackgroundImage from './backgroundImage';
// import stylesHomepage from '../../styles/homepage'
// import stylesGeneric from '../../styles/genericStyle'
// import { RondFormeText } from "../../features/geoForme/rondForm"

const test = 0;

const User = [
  {
    name: 'tony',
    id: '3ad53abb28ba',
  },
  {
    name: 'pierre',
    id: '3ad53hbb28ba',
  },
  {
    name: 'didier',
    id: '3adg3abb28ba',
  },
  {
    name: 'thomas',
    id: '3ad53abb28ba9',
  },
  {
    name: 'basile',
    id: '3ad53abb28ba1',
  },
  {
    name: 'hugo',
    id: '3ad53abb28bab',
  }
];

const group = [
  {
    id: '232131',
    name: 'work',
    friend: ['3ad53abb28ba9', '3adg3abb28ba']
  },
  {
    id: '23123123',
    name: 'play',
    friend: ['3ad53abb28ba9']
  },
  {
    id: '2132131',
    name: 'friend',
    friend: ['3ad53abb28ba1', '3ad53abb28ba9', '3adg3abb28ba', '3ad53hbb28ba', '3ad53abb28ba']
  },
  {
    id: '21321312',
    name: 'family',
    friend: ['3ad53abb28ba1', '3ad53abb28ba']
  }
];

export function getFriend(group, friend) {
  const userAdd = [];
  for (let i = 0; i < group.friend.length; i += 1) {
    for (let j = 0; j < friend.length; j += 1) {
      if (group.friend[i] == friend[j].id) {
        userAdd.push(friend[j]);
        /* //console.log("friend add")
        //console.log(friend[j].name)
        //console.log(userAdd[0].name)
        //console.log(group.name)
        //console.log("           ") */
      }
    }
  }
  return userAdd;

  /*  var userAdd = group.friend.filter(function(item) {
    var userTmp = []
    var i = 0
    for (var j = 0; j < friend.length; j += 1) {
      if (item == friend[j].id) {
        i = 1
        userTmp.push(friend[j])
        //console.log("friend add")
        //console.log(friend[j].name)
        //console.log(userTmp[0].name)
        //console.log(group.name)
        //console.log("           ")
      }
    }
    return userTmp
  })
  if (userAdd) {
    return userAdd
  } */

  /* for (var j = 0; j < friend.length; j += 1) {
      if (group.friend[i] == friend[j].id) {
        userAdd.prototype.push(friend[j])
        //console.log("friend add")
        //console.log(friend[j].name)
        //console.log(userAdd[0].name)
        //console.log(group.name)
        //console.log("           ")
      }
    } */
  /* var userAdd = []
  group.friend.forEach(item => {
    var userTmp = friend.filter(function(item2) {
      return item == item2.id
    })
    userAdd += userTmp
  })
  //console.log("stop")
  //console.log(userAdd[0])
  return userAdd */
}

const ItemFriend = ({ friend, func, group }) => (
  <View>
    <FlatList
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      data={getFriend(group, friend)}
      renderItem={({ item }) => <Item title={item.name} friend={friend} func={func} />}
      keyExtractor={(item) => item.id}
    />
  </View>
);

export const Item = ({ title, friend, func }) => (
  <View style={{ width: 300, flexDirection: 'row', marginTop: 10}}>
    <Text style={{ fontSize: 18, textAlign: 'center', width: '55%' }}>{title}</Text>
    <Button
      title={I18n.t('deleteFriend')}
      color="#89B3D9"
      onPress={() => {
        deleteFriend(title, friend, func);
      }}
    />
  </View>
);

export function deleteFriend(title, friend, func) {
  const userAdd = friend.filter((item) => title != item.name);

  //console.log(userAdd);

  func(userAdd);
}

export function addFriend(value, friend, func) {
  const userAdd = User.filter((item) => value == item.name);

  //console.log(userAdd);

  if (userAdd.length > 0) {
    func([...friend, userAdd[0]]);
  }
}

function FriendList(props) {
  const [value, onChangeText] = React.useState('');
  const [Friend, onChangeFriend] = React.useState([]);

  return (
    <View style={styles.back}>
      <BackgroundImage />
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: '20%', height: '100%', marginLeft: 15 }}
          onPress={() => props.navigation.navigate('HomePage')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/home.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/trip.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/plus.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('FriendList')}
        >
          <Image
            style={{
              marginTop: '10%', height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/friend.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: '20%', height: '100%' }}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image
            style={{
              marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
            }}
            source={require('../ressources/profile.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.fill}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>{I18n.t('friendList')}</Text>
        <View style={{ flexDirection: 'row', height: 40 }}>
          <TextInput
            style={{ backgroundColor: 'white', width: '60%', borderRadius: 5, marginRight: 10}}
            placeholder="Nom de l'ami"
            underlineColorAndroid="black"
            id={'testTextInput'}
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeText(text);
              //console.log(text);
            }}
            value={value}
          />
          <Button
            title={I18n.t('addFriend')}
            color="#89B3D9"
            onPress={() => {
              addFriend(value, Friend, onChangeFriend);
              onChangeText('');
            }}
          />
        </View>
        <ScrollView style={{width:"100%", marginBottom:10, maxHeight: 400}}>
          <FlatList
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={Friend}
            renderItem={({ item }) => <Item title={item.name} friend={Friend} func={onChangeFriend} />}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>{I18n.t('groupList')}</Text>
        <View style={{ flexDirection: 'row', height: 40, marginBottom:10 }}>
          <TextInput
            style={{ backgroundColor: 'white', width: '48%', borderRadius: 5, marginRight: 10}}
            placeholder="Nom du groupe"
            underlineColorAndroid="black"
            autoCapitalize="none"
            onChangeText={(textGroup) => {
              onChangeText(textGroup);
              console.log(textGroup);
            }}
            value={value}
          />
          <Button
            title={I18n.t('addGroup')}
            color="#89B3D9"
            onPress={() => {
              addFriend(value, Friend, onChangeFriend);
              onChangeText('');
            }}
          />
        </View>
        <ScrollView style={{width:"100%", padding:10, marginBottom:10}}>
          <FlatList
            data={group}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: 'white', borderRadius: 5, marginBottom: 10, padding: 10}}>
                <Text style={{ fontSize: 18, textAlign: 'left' }}>{item.name} : </Text>
                <ItemFriend friend={Friend} func={onChangeFriend} group={item} />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
},
header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.08,
    width: '100%',
},
fill: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginTop: 10,
    marginBottom: 10,
    width: '95%',
    borderRadius: 5,
    opacity: 0.9,
},
logo: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
},
settings: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
},
inputText: {
    height: 50,
    width: '100%',
    fontSize: 20,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#404040',
},
name: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
},
infos: {
    width: "90%",
    flex: 1,
    marginTop: '10%',
    marginBottom: '50%',
},
textLine : {
    marginTop: '5%', 
    flexDirection: "column", 
    justifyContent: 'center' 
},
textInfos : {
    fontSize: 19, 
    textAlign: "left", 
    width: "100%" 
},
textInput : {
    fontSize: 17, 
    textAlign: "left", 
    width: "100%",
    borderRadius: 5,
    backgroundColor:'white'
}
});

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(FriendList);
export default FriendList