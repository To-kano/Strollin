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

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

function ElementHistoryNav({ data, defaultSate = false }) {
  const messagetext = `Strollin' m'a proposé un trajet ! \nRejoignons nous a ${data[0].name} au ${data[0].address} !`;
  const [showMap, setShowMap] = useState(defaultSate);

  const deltaView = {
    latitudeDelta: 0.1622,
    longitudeDelta: 0.1021,
  };

  if (showMap === false) {
    return (
      <View style={styles.view_back}>
        <FlatList
          style={styles.view_list}
          data={data}
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
                    <Text style={styles.text_information}>{item.address}</Text>
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

    // <View style={{
    //   margin: 1, flex: 0.9, alignItems: 'center', justifyContent: 'space-evenly'
    // }}
    // >
    //   <View style={{ width: '100%', flexDirection: 'row', flex: 1 }}>
    //     <View style={{ flex: 1, marginLeft: '5%', marginRight: '5%' }}>
    //       <Button
    //         title={I18n.t('showMap')}
    //         color="#89B3D9"
    //         onPress={() => setShowMap(!showMap)}
    //       />
    //     </View>
    //   </View>
    //   <View style={{ width: '100%', flexDirection: 'row', flex: 6 }}>
    //     <FlatList
    //       data={data}
    //       renderItem={({ item }) => (
    //         <View style={{ margin: 10 }}>
    //           <Text>
    //             {I18n.t('step')}
    //             {item.id}
    //           </Text>
    //           <Text>
    //             {I18n.t('name')}
    //             {item.name}
    //           </Text>
    //           <Text>
    //             {I18n.t('address')}
    //             {item.address}
    //           </Text>
    //         </View>
    //       )}
    //     />
    //   </View>
    //   <View style={{ width: '100%', flexDirection: 'row', flex: 0.4 }}>
    //     <View style={{ flex: 0.66, marginLeft: '2%', marginRight: '2%' }}>
    //       <Button
    //         onPress={() => {
    //           const shareLinkContent = {
    //             contentType: 'link',
    //             contentUrl: 'https://www.google.com',
    //             quote: messagetext,
    //           };
    //           ShareDialog.show(shareLinkContent);
    //         }}
    //         title={I18n.t('PublishOnFacebook')}
    //         color="#3b5998"
    //         accessibilityLabel="Share"
    //       />
    //     </View>
    //     <View style={{ flex: 0.33, marginLeft: '2%', marginRight: '2%' }}>
    //       <Button
    //         onPress={() => {
    //           Share.share({
    //             message: messagetext,
    //             title: "Sortir avec Strollin'",
    //             url: 'https://www.google.com',
    //           }, {
    //             // Android only:
    //             dialogTitle: 'Share Strollin travel',
    //             // iOS only:
    //             excludedActivityTypes: [
    //               'com.apple.UIKit.activity.PostToTwitter'
    //             ]
    //           });
    //         }}
    //         title={I18n.t('Share')}
    //         color="#3b5998"
    //         accessibilityLabel="Share"
    //       />
    //     </View>
    //   </View>
    // </View>
    );
  }
  return (
    <View><Text>test 2</Text></View>
    // <View style={{
    //   margin: 1, flex: 0.9, alignItems: 'center', justifyContent: 'space-evenly'
    // }}
    // >
    //   <View />
    //   <View style={{ width: '100%', flexDirection: 'row', flex: 0.6 }}>
    //     <View style={{ flex: 1, marginLeft: '5%', marginRight: '5%' }}>
    //       <Button
    //         title={I18n.t('showStep')}
    //         color="#89B3D9"
    //         onPress={() => setShowMap(!showMap)}
    //       />
    //     </View>
    //   </View>
    //   <View style={{ width: '100%', flexDirection: 'row', flex: 6 }}>
    //     <View style={{ marginTop: 20, marginBottom: 10, marginLeft: -4 }}>
    //       <Map height={310} width={310} deltaView={deltaView} waypoints={data} />
    //     </View>
    //   </View>
    //   <View style={{ width: '100%', flexDirection: 'row', flex: 0.4 }}>
    //     <View style={{ flex: 0.66, marginLeft: '2%', marginRight: '2%' }}>
    //       <Button
    //         onPress={() => {
    //           const shareLinkContent = {
    //             contentType: 'link',
    //             contentUrl: 'https://www.google.com',
    //             quote: messagetext,
    //           };
    //           ShareDialog.show(shareLinkContent);
    //         }}
    //         title={I18n.t('PublishOnFacebook')}
    //         color="#3b5998"
    //         accessibilityLabel="Share"
    //       />
    //     </View>
    //     <View style={{ flex: 0.33, marginLeft: '2%', marginRight: '2%' }}>
    //       <Button
    //         onPress={() => {
    //           Share.share({
    //             message: messagetext,
    //             title: "Sortir avec Strollin'",
    //             url: 'https://www.google.com',
    //           }, {
    //             // Android only:
    //             dialogTitle: 'Share Strollin travel',
    //             // iOS only:
    //             excludedActivityTypes: [
    //               'com.apple.UIKit.activity.PostToTwitter'
    //             ]
    //           });
    //         }}
    //         title={I18n.t('Share')}
    //         color="#3b5998"
    //         accessibilityLabel="Share"
    //       />
    //     </View>
    //   </View>
    // </View>
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
export default connect(mapStateToProps)(ElementHistoryNav);
