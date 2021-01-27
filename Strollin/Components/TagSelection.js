import React, { useState } from 'react';

import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Button, FlatList, TouchableOpacity
} from 'react-native';

import I18n from '../Translation/configureTrans';
import BackgroundImage from './backgroundImage';

export function Tag({ name, defaultState = false }) {
  const [pressed, setpressed] = useState(defaultState);

  return (
    <View style={{ margin: 5 }}>
      {pressed === false && (
      <Button
        color="rgba(255,192,203, 1)"
        title={name}
        onPress={() => {
          setpressed(!pressed);
        }}
      />
      )}
      {pressed === true && (
      <Button
        color="rgba(130, 38, 98, 1)"
        title={name}
        onPress={() => {
          setpressed(!pressed);
        }}
      />
      )}
    </View>
  );
}

export function TagSelection({ navigation, profil }) {
  const data = [
    {
      id: '1',
      name: 'vidéo game',
    },
    {
      id: '2',
      name: 'restaurant',
    },
    {
      id: '3',
      name: 'cinéma',
    },
    {
      id: '4',
      name: 'magie',
    }, {
      id: '5',
      name: 'compétition',
    },
  ];

  return (
  // <View style={styles.header}>
  //   <TouchableOpacity
  //     style={{width: '20%', height: '100%', marginLeft: 15}}
  //     onPress={() => props.navigation.navigate('HomePage')}>
  //     <Image
  //       style={{
  //         marginTop: '10%',
  //         height: '70%',
  //         width: '50%',
  //         opacity: 0.5,
  //         resizeMode: 'stretch',
  //       }}
  //       source={require('../ressources/home.png')}
  //     />
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={{width: '20%', height: '100%'}}
  //     onPress={() => props.navigation.navigate('historicUser')}>
  //     <Image
  //       style={{
  //         marginTop: '10%',
  //         height: '70%',
  //         width: '50%',
  //         opacity: 0.5,
  //         resizeMode: 'stretch',
  //       }}
  //       source={require('../ressources/plus.png')}
  //     />
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={{width: '20%', height: '100%'}}
  //     onPress={() => props.navigation.navigate('TripSuggestion')}>
  //     <Image
  //       style={{
  //         marginTop: '10%',
  //         height: '70%',
  //         width: '50%',
  //         opacity: 0.5,
  //         resizeMode: 'stretch',
  //       }}
  //       source={require('../ressources/plus.png')}
  //     />
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={{width: '20%', height: '100%'}}
  //     onPress={() => //console.log('friend')}>
  //     <Image
  //       style={{
  //         marginTop: '10%',
  //         height: '65%',
  //         width: '50%',
  //         opacity: 0.5,
  //         resizeMode: 'stretch',
  //       }}
  //       source={require('../ressources/friend.png')}
  //     />
  //   </TouchableOpacity>
  //   <TouchableOpacity
  //     style={{width: '20%', height: '100%'}}
  //     onPress={() => props.navigation.navigate('Profile')}>
  //     <Image
  //       style={{
  //         marginTop: '10%',
  //         height: '70%',
  //         width: '50%',
  //         opacity: 0.5,
  //         resizeMode: 'stretch',
  //       }}
  //       source={require('../ressources/profile.png')}
  //     />
  //   </TouchableOpacity>
  // </View>

    <View style={styles.back}>
      <BackgroundImage />
      <View style={styles.fill}>
        <Text style={[{ textAlign: 'left', color: 'black', fontSize: 25 }]}>
          {I18n.t('TagSelection.welcome')}
        </Text>
        <Text style={[
          {
            textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: 25
          }
        ]}
        >
          {profil.pseudo}
        </Text>
        <Text style={[{
          textAlign: 'left',
          color: 'black',
          fontSize: 18,
          marginTop: 18,
          fontWeight: 'normal',
        }]}
        >
          {I18n.t('TagSelection.chooseTags')}
        </Text>
        <View style={{ flex: 2, margin: 10, marginTop: 40 }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Tag name={item.name} pressed={item.pressed} />
            )}
          />
          <TouchableOpacity
            style={styles.newTrip}
            onPress={() => navigation.navigate('Profile')}
            // onPress={() =>
            //  // this.NextPage(navigation.getParam('uid'))
            // }
          >
            <Text style={{ fontSize: 16, color: '#FFFFFF' }}>{I18n.t('TagSelection.next')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(TagSelection);

const styles = StyleSheet.create({
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
  fill: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    paddingTop: 25,
    margin: 10,
    width: '95%',
    borderRadius: 5,
    opacity: 0.9,
  },
  header: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
  },
  newTrip: {
    alignItems: 'center',
    backgroundColor: '#F07323',
    paddingVertical: '5%',
    paddingHorizontal: '30%',
    borderRadius: 5,
  },
});
