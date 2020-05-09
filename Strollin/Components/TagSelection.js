import React from 'react';
import { Component } from 'react'
import {connect} from 'react-redux';
import { StyleSheet, Text, View, Button, ImageBackground, FlatList, Dimensions } from 'react-native';
//import stylesGeneric from '../../styles/genericStyle'
//import { fire } from '../../dataBase/config'
import {fire} from '../dataBase/config'

import {RondFormeText} from "./rondForm"


class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pressed: false
    }
  }

  /*updateColor = (color) =>{
    this.setState({color: color})
  }*/

  removeTag(array, tag) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == tag) {
        array.splice(i, 1)
        return false
      }
    }
    return true
  }

  checkArray(array, tag) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == tag) {
        return false
      }
    }
    return true
  }

  async readUserData(UserId) {
    let tmp = await fire.database().ref('UsersTest/' + UserId).once('value', function (snapshot) {
      return snapshot.val()
    });
    return tmp
  }

  async writeUserData(UserId, tag) {
    console.log("USER ID =", UserId);

    let val = await this.readUserData(UserId)
    let test = val.val().tagList
    if (this.checkArray(test, tag) == true) {
      test = test.concat([tag])
    }
    fire.database().ref('UsersTest/' + UserId).set({
      tagList: test
    }).then((data) => {
      //success callback
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }

  async removeUserData(UserId, tag) {
    console.log("USER ID =", UserId);

    let val = await this.readUserData(UserId)
    let test = val.val().tagList
    if (this.removeTag(test, tag) == true) {
      test = test.concat([tag])
    }
    fire.database().ref('UsersTest/' + UserId).set({
      tagList: test
    }).then((data) => {
      //success callback
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }

  /*async writeUserDataTest(rank, name){
    fire.database().ref('UsersTest/' + 'TonyYe').set({
        array: [''],
        name: 'tony'
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }*/

  updatePressed = () => {
    this.setState({ pressed: !this.state.pressed })
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ margin: 5 }}>
        {this.state.pressed == false && (<Button
          color='rgba(255,192,203, 1)'
          title={this.props.name}
          onPress={() => {
            this.writeUserData(this.props.userData, this.props.name)
            //this.writeUserDataTest(0, 'hello')
            this.updatePressed()
          }}
        />)}
        {this.state.pressed == true && (<Button
          color='rgba(130, 38, 98, 1)'
          title={this.props.name}
          onPress={() => {
            this.removeUserData(this.props.userData, this.props.name)
            this.updatePressed()
          }}
        />)}
      </View>
    );
  }
}

class TageSelection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tags: 'bonjour',
      data: [],
      color: 'pink'
    };
  }

  updatePresses = (key) => {
    //this.setState({data[key]: false})
  }
  updateColor = (color) => {
    this.setState({ color: color })
  }
  updateState = (value) => {
    console.log("update state value = ", value);
    //this.setState({tags: value})
    this.state.tags = value
  }

  data = [{ key: '0', name: 'hello' }];

  async writeTagDataTest(tagName) {
    fire.database().ref('Tags/' + tagName).set({
      name: tagName,
      rank: 0
    }).then((data) => {
      //success callback
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  }

  async readTagsData() {
    let tmp = await fire.database().ref('Tags/').once('value', function (snapshot) {
      return snapshot.val()
    });
    console.log("tmp: ", tmp)
    return tmp
  }

  async displayTags() {
    let tmp = await this.readTagsData()
    this.updateState(tmp)
    var test = []
    var i = 0;
    this.state.tags.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      test.push({ key: i, name: item.name, rank: item.rank, pressed: false })
      i++
    });
    this.setState({ data: test })
  }

  async readUserData(UserId) {
    let tmp = await fire.database().ref('UsersTest/' + UserId).once('value', function (snapshot) {
      return snapshot.val()
    });
    return tmp
  }

  async NextPage(UserId) {
    let tmp = await this.readUserData(UserId)
    let array = tmp.val().tagList
    if (array.length > 4) {
      this.props.navigation.navigate('Home', { uid: UserId })
      return
    }
    alert('Please select at least 4 tags');
  }

  componentDidMount() {
    //this.displayTags()
  }
  render() {
    console.disableYellowBox = true;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <ImageBackground source={require('../images/london2.jpg')} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').width / 2.2 - 10, }} />
        </View>
        <View style={{marginLeft: '35%', marginTop: '3%', position: 'absolute'}}>
          <RondFormeText text="Strollin'" size={120}/>
        </View>
        <View style={{ flex: 1.1, marginHorizontal: 10, marginTop: 20, borderWidth: 0, padding: 5, backgroundColor: 'rgba(255, 255, 255, 0.0)' }}>
          <Text style={[{ textAlign: "left", color: "grey", fontSize: 30 }]}>Welcome,</Text>
          <Text style={[{ textAlign: "center", fontWeight: "bold", fontSize: 35 }]}>{this.props.profil.FirstName}</Text>
          <Text style={[{ textAlign: "center", color: "grey", fontSize: 20, marginTop: 20, fontWeight: 'light' }]}>Choose the tags that fit best your personality</Text>
        </View>
        <View style={{ flex: 2, margin: 10, marginTop: 20 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <Tag name={item.name} pressed={item.pressed} userData={(navigation.getParam('uid'))} />
            )}
          />
          <Button
            color='#89B3D9'
            title="Next"
            onPress={() => this.props.navigation.navigate('userRegister')}
            //onPress={() =>
            //  // this.NextPage(navigation.getParam('uid'))
            //}
          />
        </View>
      </View >
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(TageSelection);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
