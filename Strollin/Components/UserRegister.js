import React, { useState } from 'react';

import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
// import * as actions from './features/registration/action';
import {
  StyleSheet, Text, View, Button, ActivityIndicator
} from 'react-native';

import { RondFormeText } from './rondForm';

import BackgroundImage from './backgroundImage';

function UserRegister(props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassWord, setUserConfirmPassword] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const [loading, setLoading] = useState(false);

  //callbackFirstName = (value) => {
  //  setUserFirstName(value);
  //};

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
        flex: 4, margin: 20, backgroundColor: 'rgba(255,255,255, 0.95)', padding: 10, justifyContent: 'space-around', borderRadius: 10
      }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>

          <View style={{ width: '40%' }}>
            <Text style={{ color: 'grey' }}>First Name</Text>
            <Input
              autoCapitalize="none"
              style={{ marginTop: 200, marginHorizontal: 40, height: 40 }}
              placeholder="First Name"
              value={userFirstName}
              onChangeText={(valueText) => {
                // setData(valueText);
                setUserFirstName(valueText);
              }}
            />
          </View>

          <View style={{ width: '40%' }}>
            <Text style={{ color: 'grey' }}>Last Name</Text>
            <Input
              autoCapitalize="none"
              style={{ marginTop: 200, marginHorizontal: 40, height: 40 }}
              placeholder="Last Name"
              value={userLastName}
              onChangeText={(valueText) => {
                // setData(valueText);
                setUserLastName(valueText);
              }}
            />
          </View>

        </View>

        <View style={{ width: '80%', paddingTop: 10 }}>
          <Text style={{ color: 'grey' }}>EMAIL</Text>
          <Input
            autoCapitalize="none"
            keyboardType="email-address"
            style={{ marginTop: 200, marginHorizontal: 40, height: 40 }}
            placeholder="Enter email"
            value={userEmail}
            onChangeText={(valueText) => {
              // setData(valueText);
              setUserEmail(valueText);
            }}
          />
        </View>

        <View style={{ width: '80%', paddingTop: 10 }}>
          <Text style={{ color: 'grey' }}>Password</Text>
          <Input
            autoCapitalize="none"
            style={{ marginTop: 200, marginHorizontal: 40, height: 40 }}
            placeholder="PASSWORD"
            value={userPassword}
            onChangeText={(valueText) => {
              // setData(valueText);
              setUserPassword(valueText);
            }}
          />
        </View>

        <View style={{ width: '80%', paddingTop: 10 }}>
          <Text style={{ color: 'grey' }}>Confirme Password</Text>
          <Input
            autoCapitalize="none"
            style={{ marginTop: 200, marginHorizontal: 40, height: 40 }}
            placeholder="Confirm Password"
            value={userConfirmPassWord}
            onChangeText={(valueText) => {
              // setData(valueText);
              setUserConfirmPassword(valueText);
            }}
          />
        </View>
      </View>
      <View style={{
        flex: 1, margin: 20, backgroundColor: 'rgba(255,255,255, 0.9)', padding: 10, justifyContent: 'space-around', borderRadius: 10
      }}
      >
        <Button
          onPress={() => {
            const userData = {
              firstName: userFirstName,
              lastName: userLastName,
              email: userEmail,
              password: userPassword
            };
            const action = { type: 'SET_USER', value: userData };
            props.dispatch(action);
            props.navigation.navigate('TagSelection');
          }}
          buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
          title="Register"
          color="#89B3D9"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: 10 }}>
          <Text style={{ paddingTop: 10 }}>ALREADY HAVE AN ACCOUNT?</Text>
          <Button
            title="Sign In"
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

// permet de dire au composant quel reducer il a access (tous les reducer dans cette configuration)
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(UserRegister);
