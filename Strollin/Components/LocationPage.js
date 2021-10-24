import React from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, FlatList,
} from 'react-native';
// import BackgroundImage from './backgroundImage';
// import { SceneView } from 'react-navigation';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import I18n from '../Translation/configureTrans';
// import { useState, useEffect } from 'react';
// import { IP_SERVER, PORT_SERVER } from '../env/Environement';
// import { useNavigation } from '@react-navigation/native';
// import { loadOptions } from '@babel/core';

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

// function test() {
//   for (index = 0; )
// }


function LocationPage({route, navigation}) {
  const {location} = route.params;
//console.log("Location Infos: \n", location);

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>

        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.partner')}
          {'   '}
        </Text>
      </View>
      <ScrollView
        style={styles.view_partner}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={styles.view_box}
        >
          <ImageBackground
            style={styles.img_boxBack}
            imageStyle={styles.img_boxBack}
            source={randPic()}
            // source={require(props.data.image)}
          >
            <View style={styles.view_boxIn}>
              <View style={styles.view_information}>
                <Image style={styles.img_location} source={require('../images/icons/white/location.png')}/>
                <Text style={styles.text_location}>{location.address}</Text>
              </View>
              <Text style={styles.text_name}>{location.name}</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {"Name"}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>{location.name}</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {"Address"}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>{location.address}</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {"Description"}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>{location.description}</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {"Phone"}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>{location.phone}</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {"Website"}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>{location.website}</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {"Timetable"}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>{location.timetable}</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {"Price range"}
          </Text>
          <View style={styles.view_number}>
            <Text style={styles.text_number}>{"Min: " + location.price_range[0] + " | Max: " + location.price_range[1] + " | Avg: " + location.price_range[2]}</Text>
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {"Tags"}
          </Text>
          <FlatList
            numColumns={3}
            style={styles.view_tagIn}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={location.tags_list}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Text style={styles.text_tagIn}>{item.name}</Text>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '3.3%',
    paddingRight: '3.3%',
    paddingBottom: '0%',
  },
  view_header: {
    flex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '87.6%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  view_partner: {
    height: '92%',
    width: '100%',
  },
  view_box: {
    backgroundColor: '#000000',
    borderRadius: 12,
    width: '100%',
    height: 235,
    marginBottom: 30,
  },
  img_boxBack: {
    flex: 1,
    borderRadius: 12,
  },
  view_boxIn: {
    flex: 1,
    flexDirection: 'column-reverse',
    borderRadius: 12,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view_information: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img_information: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_information: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  img_location: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_location: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  text_name: {
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  view_stat: {
    width: '100%',
    marginBottom: 15,
    alignContent: 'flex-start',
  },
  text_stat: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  view_number: {
    flexDirection: 'row',
    width: '100%',
    padding: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  text_number: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0092A7',
  },
  view_tagIn: {
    flex: 304,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    paddingTop: 7.5,
  },
  text_tagIn: {
    alignSelf: 'flex-start',
    textAlign: 'center',
    width: '30%',
    marginLeft: 7.5,
    marginBottom: 7.5,
    paddingTop: 7,
    paddingLeft: 2,
    paddingRight: 2,
    color: '#0091A7',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    borderRadius: 20,
    borderColor: '#0091A7',
    borderWidth: 4,
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(LocationPage);
