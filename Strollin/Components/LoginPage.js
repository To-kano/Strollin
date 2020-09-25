import React from 'react';
import {
  StyleSheet, Text, View, Image, TextInput, Button
} from 'react-native';
import { connect } from 'react-redux';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

// export default class App extends Component {
//   state = {userInfo: {}};

//   getInfoFromToken = token => {
//     const PROFILE_REQUEST_PARAMS = {
//       fields: {
//         string: 'id, name,  first_name, last_name',
//       },
//     };
//     const profileRequest = new GraphRequest(
//       '/me',
//       {token, parameters: PROFILE_REQUEST_PARAMS},
//       (error, result) => {
//         if (error) {
//           console.log('login info has error: ' + error);
//         } else {
//           this.setState({userInfo: result});
//           console.log('result:', result);
//         }
//       },
//     );
//     new GraphRequestManager().addRequest(profileRequest).start();
//   };

//   render() {
//     return (
//       <View style={{flex: 1, margin: 50}}>
//         <LoginButton
//           onLoginFinished={(error, result) => {
//             if (error) {
//               console.log('login has error: ' + result.error);
//             } else if (result.isCancelled) {
//               console.log('login is cancelled.');
//             } else {
//               AccessToken.getCurrentAccessToken().then(data => {
//                 const accessToken = data.accessToken.toString();
//                 this.getInfoFromToken(accessToken);
//               });
//             }
//           }}
//           onLogoutFinished={() => this.setState({userInfo: {}})}
//         />
//         {this.state.userInfo.name && (
//           <Text style={{fontSize: 16, marginVertical: 16}}>
//             Logged in As {this.state.userInfo.name}
//           </Text>
//         )}
//       </View>
//     );
//   }
// }

function RandPic() {
  const nb = Math.floor(Math.random() * 3) + 1;
  let img = '';

  if (nb == 1) img = require('../ressources/street1.jpg');
  if (nb == 2) img = require('../ressources/street2.jpeg');
  if (nb == 3) img = require('../ressources/plum2.jpg');
  // console.log(nb)
  return img;
}

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

function LoginPage(props) {
  const [value, onChangeText] = React.useState('');
  const [valuePass, onChangePass] = React.useState('');
  const [Img, onChangeImg] = React.useState(RandPic());
  const [userInfo, setUserInfo] = React.useState({});

  return (
    <View style={styles.back}>
      <Image
        style={{
          width: '100%', height: '100%', resizeMode: 'cover', position: 'absolute'
        }}
        source={Img}
      />
      <View style={styles.form}>
        <View style={styles.logo}>
          <Image source={require('../ressources/logo3.png')} />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => {
              onChangeText(text);
              console.log(text);
            }}
            value={value}
            textAlign="left"
            placeholder="Username"
            autoCompleteType="username"
          />
        </View>
        <View style={styles.textInput}>
          <TextInput
            style={styles.inputText}
            onChangeText={(text) => onChangePass(text)}
            value={valuePass}
            textAlign="left"
            placeholder="Password"
            autoCompleteType="password"
            secureTextEntry
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => {
              props.navigation.navigate('HomePage');
            }}
            title="Connexion"
            color="#9dc5ef"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <View style={{ flex: 0.1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>
            OU
          </Text>
        </View>
        <View style={{ flex: 0.1, margin: 50 }}>
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
        <View style={{ flex: 0.1, flexDirection: 'column' }}>
          <Text style={{ fontSize: 20, textAlign: 'center', margin: 10 }}>
            OU
          </Text>
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => {
              props.navigation.navigate('userRegister');
            }}
            title="Inscivez-vous"
            color="#9dc5ef"
            accessibilityLabel="Learn more about this blue button"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'pink',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  form: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    width: '90%',
    height: '90%',
    marginTop: '5%',
    opacity: 0.95,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    flex: 0.15,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textLink: {
    color: '#671478',
    fontSize: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
    justifyContent: 'center',
    textAlign: 'center'
  },
  button: {
    flex: 0.1,
    flexDirection: 'column',
    marginTop: 10,
    width: '70%',
  },
  logo: {
    flex: 0.1,
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 100,
  },
  inputText: {
    height: 50,
    width: '70%',
    fontSize: 20,
    paddingLeft: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#404040',
  }
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(LoginPage);
