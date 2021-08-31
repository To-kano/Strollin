import React, { useState } from 'react';
import {
  Text, View, Share, Image,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { ShareDialog } from 'react-native-fbsdk';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import FormUpdateLocationCourse from './form/FormUpdateLocationCourse';
import FormDeleteLocationCourse from './form/FormDeleteLocationCourse';


function CourseElement({item}) {

    const navigation = useNavigation();
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    return (

        <View style={styles.view_boxIn}>
            <TouchableOpacity
              style={styles.view_box}
              onPress={() => {navigation.navigate('LocationPage', {location: item})}}
            >
                <View style={styles.view_information}>
                    <Image style={styles.img_information} source={require('../images/icons/white/marker.png')} />
                    <Text style={styles.text_information}>{item.address}, {item.city}</Text>
                </View>
                <Text style={styles.text_name}>{item.name}</Text>
            </TouchableOpacity>
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
                <TouchableOpacity
                  onPress={() => {
                    console.log("test");
                  }}
                  accessibilityLabel="Share"
                >
                    <Image style={styles.img_share} source={require('../images/icons/white/share.png')} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log("test")
                  }}
                  accessibilityLabel="Share"
                >
                    <Image style={styles.img_share} source={require('../images/icons/white/share.png')} />
                </TouchableOpacity>
                <FormDeleteLocationCourse isVisible={showDeleteForm} setIsVisible={setShowDeleteForm} itemId={item.id} />
                <FormUpdateLocationCourse isVisible={showUpdateForm} setIsVisible={setShowUpdateForm} itemId={item.id} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view_boxIn: {
      flex: 1,
      flexDirection: 'column-reverse',
      borderRadius: 12,
      paddingTop: 15,
      paddingLeft: 30,
      paddingRight: 5,
      paddingBottom: 20,
      borderRadius: 12,
      width: 330,
      height: 179,
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
    },
    view_box: {
        //backgroundColor: '#000000',
        //borderRadius: 12,
        //width: 330,
        //height: 179,
        //marginBottom: 12.5,
      },
  });
  
  const mapStateToProps = (state) => state;
  export default connect(mapStateToProps)(CourseElement);