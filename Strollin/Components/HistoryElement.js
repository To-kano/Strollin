import React, { useState } from 'react';
import {
  Text, View, FlatList, Button, Share
} from 'react-native';
import { connect } from 'react-redux';
import {ShareDialog} from 'react-native-fbsdk';
import Map from './map';
import I18n from '../Translation/configureTrans';

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

function ElementHistoryNav({ course, locations, defaultSate = false }) {
  const messagetext = `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${getLocation().name} au ${getLocation().address} à ${getLocation().city} !`;
  const [showMap, setShowMap] = useState(defaultSate);

  const deltaView = {
    latitudeDelta: 0.1622,
    longitudeDelta: 0.1021,
  };

  if (showMap === false) {
    return (
      <View style={{
        margin: 1, flex: 0.9, alignItems: 'center', justifyContent: 'space-evenly'
      }}
      >
        <View style={{ width: '100%', flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 1, marginLeft: '5%', marginRight: '5%' }}>
            <Button
              id={"button map"}
              title={I18n.t('HistoryElement.showMap')}
              color="#89B3D9"
              onPress={() => setShowMap(!showMap)}
            />
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', flex: 6 }}>
          <FlatList
            data={locations}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ margin: 10 }}>
                <Text>
                  {I18n.t('HistoryElement.step')}
                </Text>
                <Text>
                  {I18n.t('HistoryElement.name')}
                  {item.name}
                </Text>
                <Text>
                  {I18n.t('HistoryElement.address')}
                  {item.address + " " + item.city}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={{ width: '100%', flexDirection: 'row', flex: 0.4 }}>
          <View style={{ flex: 0.66, marginLeft: '2%', marginRight: '2%' }}>
            <Button
            id={"button share 1"}
              onPress={() => {
                const shareLinkContent = {
                  contentType: 'link',
                  contentUrl: 'https://www.google.com',
                  quote: messagetext,
                };
                //ShareDialog.show(shareLinkContent);
              }}
              title={I18n.t('HistoryElement.PublishOnFacebook')}
              color="#3b5998"
              accessibilityLabel="Share"
            />
          </View>
          <View style={{ flex: 0.33, marginLeft: '2%', marginRight: '2%' }}>
            <Button
              id={"button share 2"}
              onPress={() => {
                Share.share({
                  message: messagetext,
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
              title={I18n.t('HistoryElement.Share')}
              color="#3b5998"
              accessibilityLabel="Share"
            />
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{
      margin: 1, flex: 0.9, alignItems: 'center', justifyContent: 'space-evenly'
    }}
    >
      <View />
      <View style={{ width: '100%', flexDirection: 'row', flex: 0.6 }}>
        <View style={{ flex: 1, marginLeft: '5%', marginRight: '5%' }}>
          <Button
            id={"button map"}
            title={I18n.t('HistoryElement.showStep')}
            color="#89B3D9"
            onPress={() => setShowMap(!showMap)}
          />
        </View>
      </View>
      <View style={{ width: '100%', flexDirection: 'row', flex: 6 }}>
        <View style={{ marginTop: 20, marginBottom: 10, marginLeft: -4 }}>
          <Map height={310} width={310} deltaView={deltaView} course={course} locations={locations}/>
        </View>
      </View>
      <View style={{ width: '100%', flexDirection: 'row', flex: 0.4 }}>
        <View style={{ flex: 0.66, marginLeft: '2%', marginRight: '2%' }}>
          <Button
          id={"button share 1"}
            onPress={() => {
              //const shareLinkContent = {
              //  contentType: 'link',
              //  contentUrl: 'https://www.google.com',
              //  quote: messagetext,
              //};
              //ShareDialog.show(shareLinkContent);
            }}
            title={I18n.t('HistoryElement.PublishOnFacebook')}
            color="#3b5998"
            accessibilityLabel="Share"
          />
        </View>
        <View style={{ flex: 0.33, marginLeft: '2%', marginRight: '2%' }}>
          <Button
          id={"button share 2"}
            onPress={() => {
              //Share.share({
              //  message: messagetext,
              //  title: "Sortir avec Strollin'",
              //  url: 'https://www.google.com',
              //}, {
              //  // Android only:
              //  dialogTitle: 'Share Strollin travel',
              //  // iOS only:
              //  excludedActivityTypes: [
              //    'com.apple.UIKit.activity.PostToTwitter'
              //  ]
              //});
            }}
            title={I18n.t('HistoryElement.Share')}
            color="#3b5998"
            accessibilityLabel="Share"
          />
        </View>
      </View>
    </View>
  );
}

//const mapStateToProps = (state) => state;
//export default connect(mapStateToProps)(ElementHistoryNav);
export default ElementHistoryNav
