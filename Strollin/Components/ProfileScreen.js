import React from 'react';
import {
  View, StyleSheet, Image, Text
} from 'react-native';
import json from '../ressources/profile.json';
import I18n from "../Translation/configureTrans";

const imageProfile = require('../ressources/profile.png');

function ParseTags(Tags) {
  let list = Tags[0];

  for (let i = 1; i < Tags.length; i += 1) {
    list += `, ${Tags[i]}`;
  }
  return list;
}

function ProfileScreen() {
  const list = ParseTags(json.Tags);
  return (
    <View>
      <View style={styles.logo}>
        <Image style={{ resizeMode: 'center' }} source={imageProfile} />
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
          {I18n.t("email")}
          {json.Email}
        </Text>
        <Text style={{ marginTop: '2%', fontSize: 30 }}>
          {' '}
          {I18n.t("password")}
          {json.Password}
        </Text>
        <Text style={{ textAlign: 'center', marginTop: '2%', fontSize: 30, }}>
          {' '}
          {I18n.t("tags")}
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
