import React, { useState } from 'react';
import {
  Text, View, FlatList, Button, Share, ImageBackground, Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { ShareDialog } from 'react-native-fbsdk';
import Map from './map';
import I18n from '../Translation/configureTrans';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

function getLocation() {
  const location1 =
  {
    "_id":{"$oid":"5ff31d40977cba001e801bfa"},
    "owner":"2nd owner",
    "score":"0",
    "user_score":[],
    latitude: 48.798683,
    longitude: 2.446183,
    "description":"Peko",
    "photo":[],
    "timetable":"test",
    "comments_list":["5ff3277dd90060001daaf045"],
    "price_range":["",""],
    "average_time":"",
    "phone":"",
    "website":"",
    "pop_disp":"0",
    "pop_ag":"0",
    "alg_disp":"0",
    "alg_ag":"0",
    "name":"Une troisieme Maison",
    "address":"369, rue Sandvich",
    "city":"Creteil",
    "country":"France",
    "tags_list":[{"_id":{"$oid":"5ff31d40977cba001e801bfb"}}],
    "__v":0
  }

  return location1;
}

function getArrayLocation(idLocations) {
  let result = [];
  for (let i = 0; i < idLocations.length; i++) {
    result.push(getLocation());
  }

  return result
}

function SugestionElement({ course, locations}) {
  const navigation = useNavigation();

  //const messagetext = `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${getLocation().name} au ${getLocation().address} à ${getLocation().city} !`;


    return (
      <View style={styles.view_back}>
        <FlatList
          style={styles.view_list}
          data={locations}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.view_box}
              onPress={() => {navigation.navigate('LocationPage', {location: item})}}
            >
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
            </TouchableOpacity>
          )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    maxHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '0%',
    paddingRight: '0%',
    paddingBottom: '1.8%',
  },
  viex_list: {
    height: '61.8%',
  },
  view_box: {
    backgroundColor: '#000000',
    borderRadius: 12,
    width: 330,
    height: 179,
    marginBottom: 12.5,
  },
  img_boxBack: {
    flex: 1,
    borderRadius: 12,
  },
  view_boxIn: {
    flex: 1,
    flexDirection: 'column-reverse',
    borderRadius: 12,
    paddingTop: 15,
    paddingLeft: 30,
    paddingRight: 5,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view_information: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  img_information: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text_information: {
    textTransform: 'capitalize',
    color: '#FFFFFF',
    fontSize: 12,
    paddingRight: 50,
  },
  img_buget: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_budget: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  text_name: {
    textTransform: 'capitalize',
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2.5,
    paddingRight: 20,
  },
  view_share: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  img_share: {
    width: 25,
    height: 25,
    marginRight: 10,
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SugestionElement);
