
import React, {useState, useEffect} from "react";

import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
//import * as actions from './features/registration/action';
import { StyleSheet, Text, View, Button, ImageBackground, TextInput, ActivityIndicator} from 'react-native';
import {fire} from '../dataBase/config'

import {RondFormeText} from "./rondForm"

//import {Form} from "./Form"

function addUserData(uid, email, firstName, lastName) {
  return new Promise((resolve) => {
    fire.database().ref('UsersTest/' + uid).set({
      email: email,
      tagList: [''],
      loading: false,
      firstName: firstName,
      lastName: lastName
    });
    resolve( {uid: uid, email: email});
  })
}

function registerDatabase(email, password) {
  return new Promise((resolve, reject) => {
    fire.auth().createUserWithEmailAndPassword(email, password)
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

function UserRegister(props) {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassWord, setUserConfirmPassword] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const [loading, setLoading] = useState(false);

  callbackFirstName = (value) => {
    setUserFirstName(value)
  };
 
  if (loading) {
    return (
      <View style={{flex: 1}}>
          <View style={[styles.center, {flex : 1, marginTop: 20}]}>
            <RondFormeText text="Strollin'" size={110} />
          </View>
          <View style={[styles.center, {flex : 1, marginTop: 20}]}>
            <ActivityIndicator size={100} color='purple' />
          </View>
        </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={[{flex : 1, marginTop: 20, justifyContent :"center", flexDirection: "row"}]}>
          <RondFormeText text="Strollin'" size={110} />
        </View>
        <View style={{flex:3, margin: 20}}>
          <View style={{flexDirection: "row", justifyContent: "space-evenly", margin: 10}}>

<           View style={{width: "40%"}}>
            <Text style={{color: "grey"}}>{"First Name"}</Text>
            <Input
              autoCapitalize="none"
              style={{marginTop: 200, marginHorizontal: 40, height: 40}}
              placeholder={"First Name"}
              value={userFirstName}
              onChangeText={valueText => {
                  //setData(valueText);
                  setUserFirstName(valueText);
                }}
            />
            </View>

            <View style={{width: "40%"}}>
            <Text style={{color: "grey"}}>{"Last Name"}</Text>
            <Input
              autoCapitalize="none"
              style={{marginTop: 200, marginHorizontal: 40, height: 40}}
              placeholder={"Last Name"}
              value={userLastName}
              onChangeText={valueText => {
                  //setData(valueText);
                  setUserLastName(valueText);
                }}
            />
            </View>

  
          </View>

            <View style={{width: "80%"}}>
            <Text style={{color: "grey"}}>{"EMAIL"}</Text>
            <Input
              autoCapitalize="none"
              keyboardType={"email-address"}
              style={{marginTop: 200, marginHorizontal: 40, height: 40}}
              placeholder={"Enter email"}
              value={userEmail}
              onChangeText={valueText => {
                  //setData(valueText);
                  setUserEmail(valueText);
                }}
            />
            </View>

            <View style={{width: "80%"}}>
            <Text style={{color: "grey"}}>{props.title}</Text>
            <Input
              autoCapitalize="none"
              style={{marginTop: 200, marginHorizontal: 40, height: 40}}
              placeholder={"PASSWORD"}
              value={userPassword}
              onChangeText={valueText => {
                  //setData(valueText);
                  setUserPassword(valueText);
                }}
            />
            </View>

            <View style={{width: "80%"}}>
            <Text style={{color: "grey"}}>{"Confirme Password"}</Text>
            <Input
              autoCapitalize="none"
              style={{marginTop: 200, marginHorizontal: 40, height: 40}}
              placeholder={"Confirm Password"}
              value={userConfirmPassWord}
              onChangeText={valueText => {
                  //setData(valueText);
                  setUserConfirmPassword(valueText);
                }}
            />
            </View>

            <View style={{flex: 1, margin: 20}}>
            <Button
              onPress={() => props.navigation.navigate('TagSelection')}
              buttonStyle={[{marginBottom: 5, marginTop: 5}]}
              title="Register"
              color="#89B3D9"
            />
            <View style={{flexDirection : "row", justifyContent: "space-evenly", margin: 10}}>
              <Text style={{paddingTop: 10}}>ALREADY HAVE AN ACCOUNT?</Text>
              <Button
                title="Sign In"
                color="black"
                onPress={() => props.navigation.navigate('UserLogin')}
              />
            </View>
          </View>

  
        </View>
      </View>
    );
  }
}

class UserRegister2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    };
  }

  updateLoading = (bool) =>{
    this.setState({loading: bool})
  }

  register() {
    if (this.state.password != this.state.confirmPassword) {
      alert("The password and confirmPassword field must be identical")
      return
    }
    if (!this.state.firstName || !this.state.lastName) {
      alert("Please fill in all the fields")
      return
    }
    this.updateLoading(true)
    registerDatabase(this.state.email, this.state.password)
    .then(userData => {
      addUserData(userData.uid, userData.email, this.state.firstName, this.state.lastName)
      .then(userData => {
        this.props.navigation.navigate('TagSelection', {email: userData.email, uid:  userData.uid, name: this.state.firstName});
        this.updateLoading(false)
      })
    })
    .catch(err =>  {
      alert(err);
      this.updateLoading(false)
    });
  }

  render() {
    console.disableYellowBox = true;
    //<ImageBackground source={require('../../assets/tmpMap.png')} style={{width: 290, height: 330}}>
    //<Text style={[stylesGeneric.title, {top: 250, left: 100,width: 110,textAlign: "center"}]}>Strollin'</Text>
    //</ImageBackground>
    if (this.state.loading)
    {
      return (
        <View style={{flex: 1}}>
          <View style={[styles.center, {flex : 1, marginTop: 20}]}>
            <RondFormeText text="Strollin'" size={110} />
          </View>
          <View style={[styles.center, {flex : 1, marginTop: 20}]}>
            <ActivityIndicator size={100} color='purple' />
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={[{flex : 1, marginTop: 20, justifyContent :"center", flexDirection: "row"}]}>
            <RondFormeText text="Strollin'" size={110} />
          </View>
          <View style={{flex:3, margin: 20}}>
            <View style={{flexDirection: "row", justifyContent: "space-evenly", margin: 10}}>
              <View style={{width: "40%"}}>
                <Text style={{color: "grey"}}>First Name</Text>
                <Input
                  autoCapitalize="none"
                  style={{marginTop: 200, marginHorizontal: 40, height: 40}}
                  placeholder="First Name"
                  value={this.state.firstName}
                  onChangeText={firstName => this.setState({firstName})}
                />
              </View>
              <View style={{width: "40%"}} >
                <Text style={{color: "grey"}}>Last Name</Text>
                <Input
                  autoCapitalize="none"
                  style={{marginTop: 200, marginHorizontal: 40, height: 40}}
                  placeholder="Last Name"
                  value={this.state.lastName}
                  onChangeText={lastName => this.setState({lastName})}
                />
              </View>
            </View>
            <Text style={{color: "grey"}}>EMAIL</Text>
            <Input
              autoCapitalize="none"
              keyboardType="email-address"
              style={{marginTop: 200, marginHorizontal: 40, height: 40}}
              placeholder="Enter email"
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
            <Text style={{color: "grey", marginTop: 10}}>PASSWORD</Text>
            <Input
              autoCapitalize="none"
              secureTextEntry
              style={{marginTop: 20, marginHorizontal: 40, height: 40}}
              placeholder="Enter password"
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />
            <Text style={{color: "grey", marginTop: 10}}>confirme Password</Text>
            <Input
              autoCapitalize="none"
              secureTextEntry
              style={{marginTop: 20, marginHorizontal: 40, height: 40}}
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChangeText={confirmPassword => this.setState({confirmPassword})}
            />
          </View>
          <View style={{flex: 1, margin: 20}}>
            <Button
              onPress={this.register.bind(this)}
              buttonStyle={[{marginBottom: 5, marginTop: 5}]}
              title="Register"
              color="#89B3D9"
            />
            <View style={{flexDirection : "row", justifyContent: "space-evenly", margin: 10}}>
              <Text style={{paddingTop: 10}}>ALREADY HAVE AN ACCOUNT?</Text>
              <Button
                title="Sign In"
                color="black"
                onPress={() => this.props.navigation.navigate('UserLogin')}
              />
            </View>
          </View>
        </View>
      );
    }
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  userData: state.auth.userData,
  error: state.auth.error,
});

const mapDispatchToProps = dispatch => ({
  register: (email, password) => dispatch(actions.register({email, password})),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
   // backgroundColor: "gray"
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
  }
});

//export default connect(
//  mapStateToProps,
//  mapDispatchToProps,
//)(UserRegister);

export default UserRegister;