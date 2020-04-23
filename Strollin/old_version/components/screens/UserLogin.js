import React from 'react';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../../features/login/action';
import { Component } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, ScrollView, TextInput, ActivityIndicator} from 'react-native';
import stylesGeneric from '../../styles/genericStyle';

import { fire } from '../../dataBase/config'

import { RondFormeText } from "../../features/geoForme/rondForm"

function loginDatabase(email, password) {
  return new Promise((resolve, reject) => {
    fire.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log('responseJSON', response);
      console.log('responseJSON', response.user.email);
      console.log('responseJSON', response.user.uid);
      resolve({email: response.user.email, uid: response.user.uid});
    }).catch(error => {
      console.log('error', error);
      reject(error);
    });
  })

}

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };
  }
  login() {
    this.updateLoading(true)
    loginDatabase(this.state.email, this.state.password)
      .then(userData => {
        console.log(userData);
        this.props.navigation.navigate('Home', {email: userData.email, uid:  userData.uid, name: this.state.firstName});
        this.updateLoading(false)
      })
      .catch(err => {
        alert(err);
        this.updateLoading(false)
      });
  }

  updateLoading = (bool) =>{
    this.setState({loading: bool})
  }

  render() {
  if (this.state.loading) {
    console.disableYellowBox = true;
    return (
      <View style={{flex: 1}}>
        <View style={[styles.center, {flex : 1, marginTop: 20, justifyContent:'center'}]}>
          <RondFormeText text="Strollin'" size={110} />
        </View>
        <View style={[styles.center, {flex : 1, marginTop: 20, justifyContent:'center'}]}>
          <ActivityIndicator size={100} color='purple' />
        </View>
      </View>
    )
  }
  else {
    return (
      <View style={[{ flex: 1 }]}>
        <View style={[{ flex: 1, marginBottom: '45%' }]}>
          <View style={[styles.container]}>
            <ImageBackground source={require('../../assets/login_image.jpg')} style={{ width: '100%', height: 260, marginBottom: -75 }}>
            </ImageBackground>
          </View>
          <View style={[styles.container, { backgroundColor: 'white', width: '390%', height: '620%', rotation: -10, marginTop: -70, marginLeft: -10 }]}>
          </View>
          <View style={[{ margin: '33%', marginTop: '-62%' }]}>
          <RondFormeText text="Strollin'" size={140} />
          </View>
        </View>
        <View style={[{ flex: 1, marginHorizontal: 20 }]}>
          <Text style={{ textAlign: "left", color: "grey" }}>EMAIL</Text>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Text style={{ textAlign: "left", color: "grey", marginTop: 10 }} >PASSWORD</Text>
          <Input
            autoCapitalize="none"
            secureTextEntry
            placeholder="Enter password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </View>
        <View style={[{ flex: 1, marginHorizontal: 20, height: 100 }]}>
          <Button
            onPress={this.login.bind(this)}
            buttonStyle={[{ marginBottom: 5, marginTop: 5}]}
            title="Login"
            color="#89B3D9"
          />
          <View style={{ flexDirection: "row", marginTop: 40, justifyContent: "space-around" }}>
            <Text style={{ paddingTop: 10 }}>DONT HAVE AN ACCOUNT?</Text>
            <Button
              color="black"
              style={{ backgroundColor: "black" }}
              title="Sign up"
              onPress={() => this.props.navigation.navigate('UserRegister')}
            />
          </View>
        </View>
      </View>
    );}
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  userData: state.auth.userData,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(actions.login({ email, password })),
});

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    // backgroundColor: "gray"
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: "gray"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLogin);
