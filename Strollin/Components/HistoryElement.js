import React, { useState } from 'react';
import {
  Text, View, FlatList, Button, Share
} from 'react-native';
import { connect } from 'react-redux';
import {ShareDialog} from 'react-native-fbsdk';
import Map from './map';
import I18n from '../Translation/configureTrans';

function ElementHistoryNav({ data }) {
  const messagetext = `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${data[0].name} au ${data[0].address} !`;
  const [showMap, setShowMap] = useState(false);

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
        <View />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
              <Text>
                {I18n.t('step')}
                {item.id}
              </Text>
              <Text>
                {I18n.t('name')}
                {item.name}
              </Text>
              <Text>
                {I18n.t('address')}
                {item.address}
              </Text>
            </View>
          )}
        />
        <View style={{ width: '100%', flexDirection: 'row', flex: 1 }}>
          <View style={{ flex: 0.5, marginLeft: '5%', marginRight: '5%' }}>
            <Button
              title={I18n.t('showMap')}
              color="#89B3D9"
              onPress={() => setShowMap(!showMap)}
            />
          </View>
        </View>
        <View style={{ width: '100%', flexDirection: 'row', flex: 6 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View style={{ margin: 10 }}>
                <Text>
                  {I18n.t('step')}
                  {item.id}
                </Text>
                <Text>
                  {I18n.t('name')}
                  {item.name}
                </Text>
                <Text>
                  {I18n.t('address')}
                  {item.address}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={{ width: '100%', flexDirection: 'row', flex: 0.4 }}>
          <View style={{ flex: 0.66, marginLeft: '2%', marginRight: '2%' }}>
            <Button
              onPress={() => {
                const shareLinkContent = {
                  contentType: 'link',
                  contentUrl: 'https://www.google.com',
                  quote: messagetext,
                };
                ShareDialog.show(shareLinkContent);
              }}
              title={I18n.t('PublishOnFacebook')}
              color="#3b5998"
              accessibilityLabel="Share"
            />
          </View>
          <View style={{ flex: 0.33, marginLeft: '2%', marginRight: '2%' }}>
            <Button
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
              title={I18n.t('Share')}
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
            title={I18n.t('showStep')}
            color="#89B3D9"
            onPress={() => setShowMap(!showMap)}
          />
        </View>
      </View>
      <View style={{ width: '100%', flexDirection: 'row', flex: 6 }}>
        <View style={{ marginTop: 20, marginBottom: 10, marginLeft: -4 }}>
          <Map height={310} width={310} deltaView={deltaView} waypoints={data} />
        </View>
      </View>
      <View style={{ width: '100%', flexDirection: 'row', flex: 0.4 }}>
        <View style={{ flex: 0.66, marginLeft: '2%', marginRight: '2%' }}>
          <Button
            onPress={() => {
              const shareLinkContent = {
                contentType: 'link',
                contentUrl: 'https://www.google.com',
                quote: messagetext,
              };
              ShareDialog.show(shareLinkContent);
            }}
            title={I18n.t('PublishOnFacebook')}
            color="#3b5998"
            accessibilityLabel="Share"
          />
        </View>
        <View style={{ flex: 0.33, marginLeft: '2%', marginRight: '2%' }}>
          <Button
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
            title={I18n.t('Share')}
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