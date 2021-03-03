/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, Button, Share, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {
  LoginButton, AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';
import { watchPosition } from 'react-native-geolocation-service';
import I18n from '../Translation/configureTrans';
import { loginUser } from '../apiServer/user';

const imageStreet1 = require('../ressources/street1.jpg');
const imageStreet2 = require('../ressources/street2.jpeg');
const imagePlum2 = require('../ressources/plum2.jpg');
const imageLogo3 = require('../ressources/logo3.png');

// import '../api/facebook_api/facebook-api'

const getInfoFromToken = (token, setUserInfo, props) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name,  first_name, last_name, email',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
        // //console.log(`login info has error: ${error}`);
      } else {
        setUserInfo(result);
        loginUser(props, result.email, result.id);
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};

export function LoginPage(props) {
  const [value, onChangeText] = React.useState('');
  const [valuePass, onChangePass] = React.useState('');
  const [userInfo, setUserInfo] = React.useState({});

  return (
    <View style={styles.view_back}>
      <View style={styles.view_logo}>
        <Image style={styles.img_logo} source={require('../images/Logo.png')} />
      </View>
      <View style={styles.view_signInUp}>
        <TouchableOpacity>
          <Text style={styles.text_signIn}>{I18n.t('LoginPage.SIGNIN')}</Text>
        </TouchableOpacity>
        <View style={styles.view_separator} />
        <TouchableOpacity onPress={() => { props.navigation.navigate('userRegister'); }}>
          <Text style={styles.text_signUp}>{I18n.t('LoginPage.SIGNUP')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.view_field}>
        <Text style={styles.text_field}>
          {I18n.t('LoginPage.email')}
          <Text style={styles.text_star}> *</Text>
        </Text>
        <TextInput
          style={styles.textInput_field}
          autoCapitalize="none"
          textContentType="emailAddress"
          autoCompleteType="email"
          keyboardType="email-address"
          onChangeText={(text) => { onChangeText(text); }}
          value={value}
        />
      </View>
      <View style={styles.view_field}>
        <Text style={styles.text_field}>
          {I18n.t('LoginPage.password')}
          <Text style={styles.text_star}> *</Text>
        </Text>
        <TextInput
          style={styles.textInput_field}
          autoCapitalize="none"
          textContentType="password"
          autoCompleteType="password"
          onChangeText={(text) => onChangePass(text)}
          valuePass={valuePass}
          secureTextEntry
        />
      </View>
      <View style={styles.view_bottomButton}>
        <TouchableOpacity
          style={styles.button_logIn}
          onPress={() => { loginUser(props, value, valuePass); }}
        >
          <Text style={styles.text_logIn}>
            {I18n.t('LoginPage.SIGNIN')}
          </Text>
        </TouchableOpacity>
        <Text style={styles.text_or}>{I18n.t('LoginPage.OR')}</Text>
        <View style={styles.view_facebook}>
          <LoginButton
            style={styles.button_facebook}
            readPermissions={['public_profile', 'email']}
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    paddingTop: '10%',
    paddingLeft: '7.5%',
    paddingRight: '7.5%',
    paddingBottom: '10%',
  },
  view_logo: {
    flex: 20,
    justifyContent: 'center',
    width: '100%',
  },
  img_logo: {
    marginTop: 43,
    width: '100%',
    resizeMode: 'contain',
  },
  view_signInUp: {
    flex: 7,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  view_separator: {
    borderLeftWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    borderLeftColor: '#B9B9B9',
  },
  text_signIn: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 12,
    color: '#0092A7',
  },
  text_signUp: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 12,
    color: '#B9B9B9',
  },
  view_field: {
    flex: 10,
    marginTop: 5,
    flexDirection: 'column',
    width: '100%',
  },
  text_field: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 16,
  },
  text_star: {
    fontWeight: 'bold',
    color: '#FF0000',
    fontSize: 16,
  },
  textInput_field: {
    fontSize: 18,
    height: 40,
    borderWidth: 1,
    borderColor: '#B9B9B9',
    borderRadius: 4,
    backgroundColor: '#FFFFFF'
  },
  view_bottomButton: {
    flex: 51,
    width: '100%',
    alignItems: 'center',
  },
  button_logIn: {
    marginTop: 40,
    width: '100%',
  },
  text_logIn: {
    width: '100%',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#0092A7',
  },
  text_or: {
    marginTop: 9,
    padding: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  button_facebook: {
    width: '100%',
    height: 30,
  },
  view_facebook: {
    marginTop: 9,
    width: '100%',
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    paddingHorizontal: 10,
  }
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(LoginPage);
