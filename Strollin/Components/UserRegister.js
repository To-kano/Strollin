import React, { useState } from 'react';

import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
// import * as actions from './features/registration/action';
import {
  StyleSheet, Text, View, Button, ActivityIndicator, Image, TextInput
} from 'react-native';
import {
  LoginButton, AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';
import I18n from '../Translation/configureTrans';
// import * as actions from './features/registration/action';

import { RondFormeText } from './rondForm';
import { registerUser } from '../apiServer/user';
import BackgroundImage from './backgroundImage';

const getInfoFromToken = (token, setUserInfo) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name,  first_name, last_name',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
        console.log(`login info has error: ${error}`);
      } else {
        setUserInfo(result);
        console.log('result:', result);
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};

function UserRegister(props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassWord, setUserConfirmPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userInfo, setUserInfo] = React.useState({});

  const [loading, setLoading] = useState(false);

  // callbackFirstName = (value) => {
  //  setUserFirstName(value);
  // };

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.center, { flex: 1, marginTop: 20 }]}>
          <RondFormeText text="Strollin'" size={110} />
        </View>
        <View style={[styles.center, { flex: 1, marginTop: 20 }]}>
          <ActivityIndicator size={100} color="purple" />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <View style={{
        flex: 4,
        margin: 20,
        backgroundColor: 'rgba(255,255,255, 0.95)',
        padding: 10,
        justifyContent: 'space-around',
        alignItems : "center",
        borderRadius: 10
      }}
      >
        <View style={{ width: '80%' }}>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            placeholder="Username"
            value={pseudo}
            onChangeText={(valueText) => {
              // setData(valueText);
              setPseudo(valueText);
            }}
          />
        </View>
        <View style={{ width: '80%' }}>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder={I18n.t('email')}
            value={userEmail}
            onChangeText={(valueText) => {
              // setData(valueText);
              setUserEmail(valueText);
            }}
          />
        </View>

        <View style={{ width: '80%' }}>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            placeholder={I18n.t('Password')}
            secureTextEntry
            value={userPassword}
            onChangeText={(valueText) => {
              // setData(valueText);
              setUserPassword(valueText);
            }}
          />
        </View>

        <View style={{ width: '80%' }}>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            placeholder={I18n.t('confPassword')}
            secureTextEntry
            value={userConfirmPassWord}
            onChangeText={(valueText) => {
              // setData(valueText);
              setUserConfirmPassword(valueText);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => {
              if (userPassword === userConfirmPassWord) {
                registerUser(props, pseudo, userPassword, userEmail);
              }
              //props.navigation.navigate('TagSelection');
            }}
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            title={I18n.t('register')}
            color="#89B3D9"
          />
        </View>
        <View style={{ flex: 0.1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', margin: 5 }}>
            OU
          </Text>
        </View>
        <View style={{ flex: 0.1, margin: 20 }}>
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log(`login has error: ${result.error}`);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  const accessToken = data.accessToken.toString();
                  getInfoFromToken(accessToken, setUserInfo);
                  props.navigation.navigate('TagSelection');
                });
              }
            }}
            onLogoutFinished={() => setUserInfo({})}
          />
          {userInfo.name && (
          <Text style={{ fontSize: 16, marginVertical: 16 }}>
            Logged in As
            {' '}
            {userInfo.name}
          </Text>
          )}
        </View>
        <Text style={{ paddingTop: 10 }}>{I18n.t('alreadyAccount')}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>

          <Button
            title={I18n.t('signIn')}
            color="black"
            onPress={() => props.navigation.navigate('userLogin')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "gray"
  },
  logo: {
    flex: 0.1,
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 100,
  },
  button: {
    flex: 0.1,
    flexDirection: 'column',
    margin: 10,
    width: '80%',
    height: 50,
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: "gray"
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  inputText: {
    height: 50,
    width: '100%',
    fontSize: 20,
    paddingLeft: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#404040',
  }
});

// permet de dire au composant quel reducer il a access (tous les reducer dans cette configuration)
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(UserRegister);
