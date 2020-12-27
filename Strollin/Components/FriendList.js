import React, { Component, useState } from 'react';
import {
  Text, View, TouchableHighlight, FlatList, ScrollView, Button, StatusBar, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../Translation/configureTrans';
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

function getFriend(group, friend) {
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
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      legacyImplementation={false}
      data={getFriend(group, friend)}
      renderItem={({ item }) => <Item title={item.name} friend={friend} func={func} />}
      keyExtractor={(item) => item.id}
    />
  </View>
);

const Item = ({ title, friend, func }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Button
      title={I18n.t('deleteFriend')}
      color="#89B3D9"
      onPress={() => {
        deleteFriend(title, friend, func);
      }}
    />
  </View>
);

function deleteFriend(title, friend, func) {
  const userAdd = friend.filter((item) => title != item.name);

  //console.log(userAdd);

  func(userAdd);
}

function addFriend(value, friend, func) {
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
    <View>
      <View>
        <View>
          <Button
            title={I18n.t('addFriend')}
            color="#89B3D9"
            onPress={() => {
              addFriend(value, Friend, onChangeFriend);
              onChangeText('');
            }}
          />
        </View>
        <View>
          <TextInput
            underlineColorAndroid="black"
            autoCapitalize="none"
            onChangeText={(text) => {
              onChangeText(text);
              //console.log(text);
            }}
            value={value}
          />
        </View>
        <ScrollView>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{I18n.t('friendList')}</Text>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            legacyImplementation={false}
            data={Friend}
            renderItem={({ item }) => <Item title={item.name} friend={Friend} func={onChangeFriend} />}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            data={group}
            renderItem={({ item }) => (
              <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{item.name}</Text>
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
    flex: 1
  },
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
  },
  header: {
    backgroundColor: '#E67E22',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(FriendList);
