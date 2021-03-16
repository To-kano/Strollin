import React, { useState, useEffect } from 'react';

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

const getInfoFromToken = (token, setUserInfo, props) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name, last_name, first_name',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
        // console.log(`login info has error: ${error}`);
      } else {
        // console.log('result:', result);
        setUserInfo(result);
        registerUser(props, result.first_name, result.id, result.name);
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};


export function UserRegister(props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassWord, setUserConfirmPassword] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userInfo, setUserInfo] = React.useState({});

  useEffect(() => {
    if (props.profil.access_token != null) {
      console.log("ok")
      props.navigation.navigate('TagSelection');
    }
  })

  //const [loading, setLoading] = useState(false);

  // callbackFirstName = (value) => {
  //  setUserFirstName(value);
  // };

  //console.log('UserRegister');

  //if (loading) {
  //  return (
  //    <View style={{ flex: 1 }}>
  //      <View style={[styles.center, { flex: 1, marginTop: 20 }]}>
  //        <RondFormeText text="Strollin'" size={110} />
  //      </View>
  //      <View style={[styles.center, { flex: 1, marginTop: 20 }]}>
  //        <ActivityIndicator size={100} color="purple" />
  //      </View>
  //    </View>
  //  );
  //}
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <View style={{
        flex: 4,
        margin: 20,
        backgroundColor: 'rgba(255,255,255, 0.95)',
        padding: 10,
        paddingBottom: '5%',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10
      }}
      >
        <View style={styles.logo}>
          <Image style={styles.logo_img} source={require('../images/Logo.png')} />
        </View>
        <View style={{ width: '80%' }}>
          <TextInput
            style={styles.inputText}
            autoCapitalize="none"
            placeholder={I18n.t("UserRegister.username")}
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
            placeholder={I18n.t('UserRegister.email')}
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
            placeholder={I18n.t('UserRegister.password')}
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
            placeholder={I18n.t('UserRegister.confPassword')}
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
                  registerUser(props, pseudo, userPassword, userEmail)
            }}}
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            title={I18n.t('UserRegister.register')}
            color="#89B3D9"
          />
        </View>
        <View style={{ flex: 0.1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', padding: 5 }}>
          {I18n.t('UserRegister.or')}
          </Text>
        </View>
        <View style={{ flex: 0.1, margin: 10 }}>
          <LoginButton
            publishPermissions={['publish_actions']}
            readPermissions={['public_profile']}
            onLoginFinished={(error, result) => {
              if (error) {
                //console.log(`login has error: ${result.error}`);
              } else if (result.isCancelled) {
                //console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  const accessToken = data.accessToken.toString();
                  getInfoFromToken(accessToken, setUserInfo, props);
                });
              }
            }}
            onLogoutFinished={() => setUserInfo({})}
          />
          {userInfo.name && (
            <Text style={{ fontSize: 10, marginVertical: 5, textAlign: 'center', }}>
              Logged in As
              {' '}
              {userInfo.name}
            </Text>
          )}
        </View>
        <View style={{ flex: 0.1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', margin: 5 }}>
          {I18n.t('UserRegister.or')}
          </Text>
        </View>
        <Text style={{ paddingTop: 20 }}>{I18n.t('UserRegister.alreadyAccount')}</Text>
        <View style={styles.button}>

          <Button
            title={I18n.t('UserRegister.signIn')}
            color="#89B3D9"
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
    flex: 0.5,
    width: '80%',
    justifyContent: 'center',
  },
  logo_img: {
    width: '100%',
    resizeMode: "contain",
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
    height: 40,
    width: '100%',
    fontSize: 16,
    paddingLeft: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#404040',
    marginBottom: 10,
  }
});

// permet de dire au composant quel reducer il a access (tous les reducer dans cette configuration)
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(UserRegister);
