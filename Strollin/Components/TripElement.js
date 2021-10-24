import React, { useState, useEffect } from 'react';
import Tts from 'react-native-tts';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button , Image, PermissionsAndroid, TouchableOpacity, FlatList,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import I18n from '../Translation/configureTrans';
import Map from './map';

import ElementHistoryNav from './HistoryElement';
import BackgroundImage from './backgroundImage';
import ButtonSwitch from './ButtonSwitch';

import {getCustomCourse} from '../apiServer/course';
import {getLocationByID} from '../apiServer/locations';
import Store from '../Store/configureStore';
import Modal from 'react-native-modal'
import ModalContent from 'react-native-modal'

export function TripElement(indexItem,index){
  return (
    <View>
    <Text> test </Text>
    <FlatList
      //style={styles.view_list}
      data={indexItem}
      renderItem={({ item }) => (
        <View>
          <Text> {item.name} </Text>
          <Text> {item.city} </Text>
          <Text> {item.adress} </Text>
        </View>
      )}
    />
    </View>
  )
  /*return (
    <View style={styles.view_back}>
      <FlatList
        style={styles.view_list}
        data={indexItem.locations}
        renderItem={({ item }) => (
          <View style={styles.view_box}>
            <ImageBackground
              style={styles.img_boxBack}
              imageStyle={styles.img_boxBack}
              source={randPic()}
            >
              <View style={styles.view_boxIn}>
                <View style={styles.view_information}>
                  <Image style={styles.img_information} source={require('../images/icons/white/marker.png')} />
                  <Text style={styles.text_information}>{item.address}, {item.city}</Text>
                </View>
                <Text style={styles.text_name}>{item.name}</Text>
                <View style={styles.view_share}>
                  <TouchableOpacity
                    onPress={() => {
                      Share.share({
                        message: `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${item.name} au ${item.address} !`,
                        title: "Sortir avec Strollin'",
                        url: 'https://www.google.com',
                      }, {
                      // Android only:
                        dialogTitle: 'Share Strollin travel',
                        // iOS only:
                        excludedActivityTypes: [
                          'com.apple.UIKit.activity.PostToTwitter'
                        ]
                      });
                    }}
                    accessibilityLabel="Share"
                  >
                    <Image style={styles.img_share} source={require('../images/icons/white/share.png')} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const shareLinkContent = {
                        contentType: 'link',
                        contentUrl: 'https://www.google.com',
                        quote: `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${item.name} au ${item.address} !`,
                      };
                      ShareDialog.show(shareLinkContent);
                    }}
                    accessibilityLabel="Share"
                  >
                    <Image style={styles.img_share} source={require('../images/icons/white/facebook.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        )}
      />
    </View>
  )*/
}
