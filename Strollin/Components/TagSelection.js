import React, {useState, useEffect} from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import BackgroundImage from './backgroundImage';
//import stylesGeneric from '../../styles/genericStyle'
//import { fire } from '../../dataBase/config'
import {fire} from '../dataBase/config';

import {RondFormeText} from './rondForm';

function Tag(props) {
  const [pressed, setpressed] = useState(false);

  return (
    <View style={{margin: 5}}>
      {pressed == false && (
        <Button
          color="rgba(255,192,203, 1)"
          title={props.name}
          onPress={() => {
            setpressed(!pressed);
          }}
        />
      )}
      {pressed == true && (
        <Button
          color="rgba(130, 38, 98, 1)"
          title={props.name}
          onPress={() => {
            setpressed(!pressed);
          }}
        />
      )}
    </View>
  );
}

function TageSelection(props) {
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
    },
    {
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
      //       source={require('../ressources/history.png')}
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
      //     onPress={() => console.log('friend')}>
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
        <Text style={[{textAlign: 'left', color: 'grey', fontSize: 30}]}>
          Welcome,
        </Text>
        <Text style={[{textAlign: 'center', fontWeight: 'bold', fontSize: 35}]}>
          {props.profil.FirstName}
        </Text>
        <Text
          style={[
            {
              color: 'grey',
              fontSize: 20,
              marginTop: 20,
              fontWeight: 'normal',
            },
          ]}>
          Choose the tags that fit best your personality
        </Text>
        <View style={{flex: 2, margin: 10, marginTop: 20}}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <Tag name={item.name} pressed={item.pressed} />
            )}
          />
          <TouchableOpacity
            style={styles.newTrip}
            onPress={() => props.navigation.navigate('HomePage')}
            //onPress={() =>
            //  // this.NextPage(navigation.getParam('uid'))
            //}
          >
            <Text style={{fontSize: 16, color: '#FFFFFF'}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(TageSelection);

const styles = StyleSheet.create({
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  fill: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'left',
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginTop: 10,
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
