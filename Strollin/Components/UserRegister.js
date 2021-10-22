import React, { useState, useEffect } from 'react';

import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
// import * as actions from './features/registration/action';
import {
  StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Image, TextInput
} from 'react-native';
import {
  LoginButton, AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';
import I18n from '../Translation/configureTrans';
// import * as actions from './features/registration/action';

import { RondFormeText } from './rondForm';
import { registerUser } from '../apiServer/user';
import Popup from './Popup';
import Step from './components/Step';
import PrimaryButton from './components/PrimaryButton';
import SecondaryButton from './components/SecondaryButton';

const globalStyles = require('../Styles');

const getInfoFromToken = (token, setUserInfo, props, setMessage, setModalVisible) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id, name, last_name, first_name, email',
    },
  };
  const profileRequest = new GraphRequest(
    '/me',
    { token, parameters: PROFILE_REQUEST_PARAMS },
    (error, result) => {
      if (error) {
      //console.log(`login info has error: ${error}`);
      } else {
      //console.log("registered as : ", result.name, ' via facebook');

        setUserInfo(result);
      //console.log("mail: ", result.email);
        result.email = "toto@toto.toto"
        registerUser(props, result.name, "Facebook1235", result.email, setMessage, setModalVisible, false);
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
  const [SignInStep, setSignInStep] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (props.profil.access_token != null) {
    //console.log("ok")
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
    <View style={globalStyles.container}>
      <Step actualStep={SignInStep} finishStep={4} onPressFct={() => setSignInStep(SignInStep-1)}/>
      <Image
        source={require("../assets/images/Strollin_logo.png")}
        style={globalStyles.logo}
      />

      {SignInStep === 1 &&
        <>
          <Text style={globalStyles.subparapraphs}>
            Choisi un nom d'utilisateur, ça permettra à tes amis de te retrouver dans l'app 😉
          </Text>
          <TextInput
            placeholder={I18n.t('UserRegister.username')}
            style={[globalStyles.textInput, {marginBottom: 32}]}
            autoCapitalize="none"
            textContentType="username"
            autoCompleteType="username"
            onChangeText={(valueText) => { setPseudo(valueText); }}
            value={pseudo}
          />
          <PrimaryButton text="J'ai trouvé un bon nom d'utilisateur" onPressFct={() => setSignInStep(2)}/>
        </>
      }

      {SignInStep === 2 &&
        <>
          <Text style={globalStyles.subparapraphs}>
            Rentre ton adresse email ça te permettra de te connecter plus tard !
          </Text>
          <TextInput
            placeholder={I18n.t('UserRegister.email')}
            keyboardType="email-address"
            style={[globalStyles.textInput, {marginBottom: 32}]}
            autoCapitalize="none"
            textContentType="emailAddress"
            autoCompleteType="email"
            onChangeText={(valueText) => { setUserEmail(valueText); }}
            value={userEmail}
          />
          <PrimaryButton text="Continuer mon inscription" onPressFct={() => setSignInStep(3)}/>
        </>
      }

      {SignInStep === 3 &&
        <>
          <Text style={globalStyles.subparapraphs}>
            Tu y es presque ! Trouve un mot de passe avec au  moins 8 caractères, 1 chiffre, 1 maj et 1 min
          </Text>
          <TextInput
            placeholder={I18n.t('UserRegister.password')}
            secureTextEntry={true}
            style={[globalStyles.textInput, {marginBottom: 32}]}
            autoCapitalize="none"
            textContentType="password"
            onChangeText={(valueText) => { setUserPassword(valueText); }}
            value={userPassword}
          />
          <PrimaryButton text="Continuer mon inscription" onPressFct={() => setSignInStep(4)}/>
        </>
      }

      {SignInStep === 4 &&
        <>
          <Text style={globalStyles.subparapraphs}>
            C'est la dernière étape ! Confirme ton mot de passe et prouve nous que tu n'es pas un robot
          </Text>
          <TextInput
            placeholder={I18n.t('UserRegister.confPassword')}
            secureTextEntry={true}
            style={[globalStyles.textInput, {marginBottom: 32}]}
            autoCapitalize="none"
            textContentType="password"
            onChangeText={(valueText) => { setUserConfirmPassword(valueText); }}
            value={userConfirmPassWord}
          />
          <PrimaryButton
            text="Continuer mon inscription"
            onPressFct={() => {
              if (userPassword === userConfirmPassWord) {
                console.log("JE SUIS LAS");
                registerUser(props, pseudo, userPassword, userEmail, setMessage, setModalVisible, false);
              }
            }}
          />
        </>
      }

      <PrimaryButton text='Continuer avec Facebook' onPressFct={() => console.log('facebook signin')} color='#1877F2'/>
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
              getInfoFromToken(accessToken, setUserInfo, props, setMessage, setModalVisible);
            });
          }
        }}
        onLogoutFinished={() => setUserInfo({})}
      /> */}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('userLogin')}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: 16,
          marginTop: 32,
          marginBottom: 16,
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
          T'as déjà un compte ?
          <Text style={{color: "#0989FF"}}> Connecte toi !</Text>
        </Text>
      </TouchableOpacity>
      <SecondaryButton text='Devenir partenaire' onPressFct={() => props.navigation.navigate('PartnerRegister')}/>
    </View>
    // <View style={styles.view_back}>
    //   <View style={styles.view_topButton}>
    //       <TouchableOpacity
    //         style={styles.button_partner}
    //         onPress={() => {
    //           props.navigation.navigate('PartnerRegister');
    //         }}
    //       >
    //         <Text style={styles.text_partner}>
    //           {I18n.t('UserRegister.PartnerPage')}
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   <View style={styles.view_logo}>
    //     <Image style={styles.img_logo} source={require('../images/Logo.png')} />
    //   </View>
    //   <View style={styles.view_signInUp}>
    //     <TouchableOpacity onPress={() => props.navigation.navigate('userLogin')}>
    //       <Text style={styles.text_signIn}>{I18n.t('UserRegister.SIGNIN')}</Text>
    //     </TouchableOpacity>
    //     <View style={styles.view_separator} />
    //     <TouchableOpacity>
    //       <Text style={styles.text_signUp}>{I18n.t('UserRegister.SIGNUP')}</Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.view_field}>
    //     <Popup message={message} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    //     <Text style={styles.text_field}>
    //       {I18n.t('UserRegister.username')}
    //       <Text style={styles.text_star}> *</Text>
    //     </Text>
    //     <TextInput
    //       style={styles.textInput_field}
    //       autoCapitalize="none"
    //       textContentType="username"
    //       autoCompleteType="username"
    //       onChangeText={(valueText) => { setPseudo(valueText); }}
    //       value={pseudo}
    //     />
    //   </View>
    //   <View style={styles.view_field}>
    //     <Text style={styles.text_field}>
    //       {I18n.t('UserRegister.email')}
    //       <Text style={styles.text_star}> *</Text>
    //     </Text>
    //     <TextInput
    //       style={styles.textInput_field}
    //       autoCapitalize="none"
    //       textContentType="emailAddress"
    //       autoCompleteType="email"
    //       onChangeText={(valueText) => { setUserEmail(valueText); }}
    //       value={userEmail}
    //     />
    //   </View>
    //   <View style={styles.view_field}>
    //     <Text style={styles.text_field}>
    //       {I18n.t('UserRegister.password')}
    //       <Text style={styles.text_star}> *</Text>
    //     </Text>
    //     <TextInput
    //       style={styles.textInput_field}
    //       autoCapitalize="none"
    //       textContentType="password"
    //       onChangeText={(valueText) => { setUserPassword(valueText); }}
    //       value={userPassword}
    //       secureTextEntry
    //     />
    //   </View>
    //   <TouchableOpacity style={{alignSelf: 'center', maxWidth: 400, width: '100%', marginTop: 0, marginBottom: 4, marginLeft: 4 }}>
    //     <Text style={[{fontSize: 10, color: '#000',}, {color: '#c3c3c6',}]}>ⓘ 8 caractères minimum, 1 Majuscule, 1 Minuscule, 1 chiffre</Text>
    //   </TouchableOpacity>
    //   <View style={styles.view_field}>
    //     <Text style={styles.text_field}>
    //       {I18n.t('UserRegister.confPassword')}
    //       <Text style={styles.text_star}> *</Text>
    //     </Text>
    //     <TextInput
    //       style={styles.textInput_field}
    //       autoCapitalize="none"
    //       textContentType="password"
    //       onChangeText={(valueText) => { setUserConfirmPassword(valueText); }}
    //       value={userConfirmPassWord}
    //       secureTextEntry
    //     />
    //   </View>
    //   <View style={styles.view_bottomButton}>
    //     <TouchableOpacity
    //       style={styles.button_logIn}
    //       onPress={() => {
    //         if (userPassword === userConfirmPassWord) {
    //           registerUser(props, pseudo, userPassword, userEmail, setMessage, setModalVisible, false);
    //         }
    //       }}
    //     >
    //       <Text style={styles.text_logIn}>
    //         {I18n.t('UserRegister.SIGNUP')}
    //       </Text>
    //     </TouchableOpacity>
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
    //               getInfoFromToken(accessToken, setUserInfo, props, setMessage, setModalVisible);
    //             });
    //           }
    //         }}
    //         onLogoutFinished={() => setUserInfo({})}
    //       />
    //     </View>
    //   </View>
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
    paddingBottom: '10%',
  },
  view_topButton: {
    position: 'absolute',
    top: 12,
    right: 10,
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
    color: '#B9B9B9',
  },
  text_signUp: {
    fontWeight: 'bold',
    fontSize: 16,
    padding: 12,
    color: '#0092A7',
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
    flex: 32,
    width: '100%',
    alignItems: 'center',
  },
  button_logIn: {
    marginTop: 30,
    width: '100%',
  },
  text_partner: {
    width: '100%',
    borderRadius: 100,
    paddingVertical: 4,
    paddingTop: 6,
    paddingHorizontal: 10,
    borderColor: '#000',
    borderWidth: 2,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    // backgroundColor: '#0092A7',
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

// permet de dire au composant quel reducer il a access (tous les reducer dans cette configuration)
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(UserRegister);
