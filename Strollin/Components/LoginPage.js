/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import React, { useState } from 'react';
// import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet, Text, View, Image, TextInput, Button, Share, TouchableOpacity, ActivityIndicator, Modal, StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import {
  LoginButton, AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';
import { watchPosition } from 'react-native-geolocation-service';
import I18n from '../Translation/configureTrans';
import { loginUser } from '../apiServer/user';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from './components/PrimaryButton';
import Popup from './Popup';
import { translateErrors, detranslateErrors } from '../Translation/translateErrors'

const globalStyles = require('../Styles');

// import '../api/facebook_api/facebook-api'

const getInfoFromToken = (token, setUserInfo, props) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name, first_name, last_name, email',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
        // //console.log(`login info has error: ${error}`);
      } else {
      //console.log("connected as : ", result.name, ' via facebook');
        setUserInfo(result);
        console.log(result)
        let email = result.email
        let password = "Facebook" + result.id
        loginUser(props, email, password);
      }
    },
  );
  new GraphRequestManager().addRequest(profileRequest).start();
};

export function LoginPage(props) {
  // const navigation = useNavigation();
  const [value, onChangeText] = React.useState('');
  const [valuePass, onChangePass] = React.useState('');
  const [userInfo, setUserInfo] = React.useState({});
  const [isLoading, setLoading] = React.useState(false);
  const [errorCode, setError] = React.useState(0)
  const [popupError, setPopup] = React.useState(false)

  return (
    <View style={globalStyles.container}>
      <Popup message={I18n.t("Header.error")} modalVisible={popupError} setModalVisible={setPopup}>
        <Text style={[globalStyles.paragraphs, {marginTop: 32, width: '100%'}]}>{translateErrors(errorCode.toString())}</Text>
        <View style={{
            width: '100%',
            marginTop: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <TouchableOpacity
              style={{ backgroundColor: "#ffffff", padding: 16, alignItems: 'center', borderRadius: 32 }}
              onPress={() => {
                setPopup(false);
              }}
            >
              <Text style={globalStyles.paragraphs}>Ok</Text>
            </TouchableOpacity>
          </View>
      </Popup>
      <Image
        source={require("../assets/images/Strollin_logo.png")}
        style={globalStyles.logo}
      />
      <TextInput
        placeholder={I18n.t('LoginPage.email')}
        style={globalStyles.textInput}
        autoCapitalize="none"
        textContentType="emailAddress"
        autoCompleteType="email"
        keyboardType="email-address"
        onChangeText={(text) => { onChangeText(text); }}
        value={value}
      />
      <TextInput
        placeholder={I18n.t('LoginPage.password')}
        style={globalStyles.textInput}
        autoCapitalize="none"
        textContentType="password"
        autoCompleteType="password"
        onChangeText={(text) => onChangePass(text)}
        valuePass={valuePass}
        secureTextEntry={true}
      />
      <TouchableOpacity style={{width: '100%', marginTop: 4, marginBottom: 32}} onPress={() => { props.navigation.navigate("ResetPassword") }}>
        <Text
          style={[globalStyles.subparagraphs, { fontSize: 10, textDecorationLine: "underline", textDecorationColor: "#1C1B1C"}]}
        >{I18n.t('LoginPage.forgot')}</Text>
      </TouchableOpacity>
      <PrimaryButton
        text={I18n.t('LoginPage.SIGNIN')}
        onPressFct={() => {
            if (value && valuePass) {
              setLoading(true);
              loginUser(props, value, valuePass, setLoading, setError, setPopup);
              console.log(errorCode)
            }
          }
        }
      />
      <PrimaryButton
        text={I18n.t('LoginPage.facebook')}
        onPressFct={() => {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken, setUserInfo, props);
          });
        }
      }
        color= "#1877F2"
      />
      {/* <LoginButton
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
      /> */}
      <TouchableOpacity
        onPress={() => { props.navigation.navigate('userRegister') }}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: 16,
          marginTop: 32,
          justifyContent: "center",
          alignContent: "center",
          borderRadius: 32,
        }}
      >
        <Text
          style={[
            globalStyles.paragraphs,
            { color: "#9B979B", textAlign: "center" },
          ]}
        >
          {I18n.t('LoginPage.noAccount')}
          <Text style={{ color: "#0989FF" }}> {I18n.t('LoginPage.SIGNUP')}</Text>
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={isLoading}
      >
        <View style={styles.loading_screen}>
          <ActivityIndicator size="large"  color="black" style={{}}/>
        </View>
      </Modal>
    </View>
    // <View style={styles.view_back}>
    //   <View style={styles.view_logo}>
    //     <Image style={styles.img_logo} source={require('../images/Logo.png')} />
    //   </View>
    //   <View style={styles.view_signInUp}>
    //     <TouchableOpacity>
    //       <Text style={styles.text_signIn}>{I18n.t('LoginPage.SIGNIN')}</Text>
    //     </TouchableOpacity>
    //     <View style={styles.view_separator} />
    //     <TouchableOpacity onPress={() => { props.navigation.navigate('userRegister'); }}>
    //       <Text style={styles.text_signUp}>{I18n.t('LoginPage.SIGNUP')}</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.view_field}>
    //     <Text style={styles.text_field}>
    //       {I18n.t('LoginPage.email')}
    //       <Text style={styles.text_star}> *</Text>
    //     </Text>
    //     <TextInput
    //       style={styles.textInput_field}
    //       autoCapitalize="none"
    //       textContentType="emailAddress"
    //       autoCompleteType="email"
    //       keyboardType="email-address"
    //       onChangeText={(text) => { onChangeText(text); }}
    //       value={value}
    //     />
    //   </View>
    //   <View style={styles.view_field}>
    //     <Text style={styles.text_field}>
    //       {I18n.t('LoginPage.password')}
    //       <Text style={styles.text_star}> *</Text>
    //     </Text>
    //     <TextInput
    //       style={styles.textInput_field}
    //       autoCapitalize="none"
    //       textContentType="password"
    //       autoCompleteType="password"
    //       onChangeText={(text) => onChangePass(text)}
    //       valuePass={valuePass}
    //       secureTextEntry
    //     />
    //   </View>
    //   <TouchableOpacity style={{ width: '100%' }} onPress={() => { props.navigation.navigate("ResetPassword", { step: 1 }) }}>
    //     <Text style={{ fontSize: 12, textAlign: 'left', textDecorationLine: 'underline', color: '#000' }}>Mot de passe oublié ?</Text>
    //   </TouchableOpacity>
    //   <View style={styles.view_bottomButton}>
    //     <TouchableOpacity
    //       style={styles.button_logIn}
    //       onPress={() => {
    //         if (value && valuePass) {
    //           setLoading(true);
    //           loginUser(props, value, valuePass, setLoading);
    //         }
    //       }}
    //     >
    //       <Text style={styles.text_logIn}>
    //         {I18n.t('LoginPage.SIGNIN')}
    //       </Text>
    //     </TouchableOpacity>
    //     <Text style={styles.text_or}>{I18n.t('LoginPage.OR')}</Text>
    //     <View style={styles.view_facebook}>
    //       <LoginButton
    //         style={styles.button_facebook}
    //         readPermissions={['public_profile', 'email']}
    //         onLoginFinished={(error, result) => {
    //           if (error) {
    //             //console.log(`login has error: ${result.error}`);
    //           } else if (result.isCancelled) {
    //             //console.log('login is cancelled.');
    //           } else {
    //             AccessToken.getCurrentAccessToken().then((data) => {
    //               const accessToken = data.accessToken.toString();
    //               getInfoFromToken(accessToken, setUserInfo, props);
    //             });
    //           }
    //         }}
    //         onLogoutFinished={() => setUserInfo({})}
    //       />
    //     </View>
    //   </View>
    //   <Modal
    //     animationType="none"
    //     transparent={true}
    //     visible={isLoading}
    //   >
    //     <View style={styles.loading_screen}>
    //       <ActivityIndicator size="large"  color="black" style={{}}/>
    //     </View>
    //   </Modal>
    // </View>
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
    paddingBottom: '15%',
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
  },
  loading_screen: {
    backgroundColor:'rgba(100,100,100,0.75)',
    display: "flex",
    justifyContent: 'space-around',
    height: '100%'
  }
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(LoginPage);
