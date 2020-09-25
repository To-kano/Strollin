import React from 'react';
import {
  Button, View, StyleSheet, Image, Text
} from 'react-native';
import json from '../ressources/profile.json';

function ParseTags(Tags) {
  let list = Tags[0];

  for (let i = 1; i < Tags.length; i++) {
    list += `, ${Tags[i]}`;
  }
  console.log('list: ', list);
  return list;
}

function ProfileScreen({ navigation }) {
  console.log('json: ', json.Tags);
  const list = ParseTags(json.Tags);
  return (
    <View>
      <View style={styles.logo}>
        <Image style={{ resizeMode: 'center' }} source={require('../ressources/profile.png')} />
      </View>
      <View style={styles.name}>
        <Text style={{ fontSize: 40 }}>
          {' '}
          {json.Pseudo}
          {' '}
        </Text>
      </View>
      <View style={styles.infos}>
        <Text style={{ fontSize: 30 }}>
          {' '}
          Email:
          {json.Email}
        </Text>
        <Text style={{ marginTop: '2%', fontSize: 30 }}>
          {' '}
          Password:
          {json.Password}
        </Text>
        <Text style={{ textAlign: 'center', marginTop: '2%', fontSize: 30, }}>
          {' '}
          Tags:
          {list}
          {' '}

        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'pink',
    flexDirection: 'column',
    flex: 1
  },
  logo: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  name: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  infos: {
    flex: 0.9,
    marginTop: '30%',
    textAlign: 'center',
    flexDirection: 'column'
  }
});

export default ProfileScreen;
