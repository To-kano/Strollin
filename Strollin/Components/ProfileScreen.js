import React from 'react';
import { Button , View, StyleSheet, Image, Text, TouchableOpacity, TextInput} from "react-native";
import json from '../ressources/profile.json'
import BackgroundImage from './backgroundImage';


function ParseTags(Tags) {
  var list = Tags[0];

  for (var i = 1; i < Tags.length; i++) {
    list += ', ' + Tags[i]
  }
  console.log('list: ', list)
  return list
}

function ProfileScreen(props) {
  console.log('json: ', json.Tags)
  const list = ParseTags(json.Tags)

  React.useLayoutEffect(() => {
    props.navigation
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Log Out"
          color="#89B3D9"
          onPress={() =>
            props.navigation.navigate('userLogin')
          }
        />
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.back}>
      <BackgroundImage/>
      <View style={styles.header}>
        <TouchableOpacity
          style={{width: '20%', height: '100%', marginLeft: 15}}
          onPress={() => props.navigation.navigate('HomePage')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/home.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('historicUser')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/history.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('TripSuggestion')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/plus.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => console.log('friend')}
        >
          <Image style={{marginTop: "10%", height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/friend.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{width: '20%', height: '100%'}}
          onPress={() => props.navigation.navigate('Profile')}
        >
          <Image style={{marginTop: "10%", height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'}} source={require('../ressources/profile.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.fill}>
        <View style={styles.logo}>
          <Image style={{resizeMode: 'center'}} source={require('../ressources/profile.png')} />
        </View>
        <View style={styles.name}>
          <Text style={{fontSize: 40}}> {json.Pseudo} </Text>
        </View>
        <View style={styles.infos}>
          <Text style={{fontSize: 22}}> Email: </Text>
          <Text style={styles.inputText}> {json.Email} </Text>
          <Text style={{marginTop: '4%', fontSize: 22}}> Password:</Text>
          <Text style={styles.inputText}>{json.Password}</Text>
          <Text style={{marginTop: '4%', fontSize: 22,}}> Tags:</Text>
          <Text style={styles.inputText}>{list}</Text>
        </View>
      </View>
    </View>
  )}

  const styles = StyleSheet.create({
      back: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
      },
      header: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0.1,
        width: '100%',
      },
      fill: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        width: '95%',
        borderRadius: 5,
        opacity: 0.9,
      },
      logo: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
      },
      inputText: {
        height: 50,
        width: '100%',
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#404040',
      },
      name: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
      },
      infos: {
        flex: 0.9,
        marginTop: '10%',
        marginBottom: '50%',
        textAlign: 'center',
        flexDirection: 'column'
      }
  })

export default ProfileScreen;
