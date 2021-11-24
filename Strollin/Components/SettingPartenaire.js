import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View, ScrollView ,StyleSheet, Image, Text, TouchableOpacity, FlatList, ImageBackground, TextInput, ActivityIndicator, Modal
} from 'react-native';
import BackgroundImage from './backgroundImage';
import Store from '../Store/configureStore';
import { DrawerActions } from '@react-navigation/native';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import I18n from '../Translation/configureTrans';
const globalStyles = require('../Styles');

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

var initialList = [
  {
    id: 1,
    name: 'Foot',
  },
  {
    id: 2,
    name: 'Tennis',
  },
  {
    id: 3,
    name: 'Piscine',
  }
];

function SettingPartenaire(props) {
  const [list, setList] = React.useState(initialList);
  const [location, setLocation] = useState(true);
  const [isLoading, setLoading] = React.useState(false);

  async function getThings(setLoading) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const url = `http://${IP_SERVER}:${PORT_SERVER}/location/get_locations`
      fetch(url, {
        headers : {
          access_token: props.profil.access_token,
        },
        method: 'GET',
      })
        .then((response) => response.json())
        .then((answer) => {
        //console.log("answer.locations_list", answer);
        for (let i = 0; i < answer.locations_list.length; i++) {
          if (answer.locations_list[i].owner_id == props.profil.id) {
            setLocation(answer.locations_list[i])
            console.log("location is : ",answer.locations_list[i]);
            let action = {type: 'SET_PARTNER_LOCATION', value: answer.locations_list[i]};
            Store.dispatch(action)
            break;
          }
        }
        })
        .catch((error) => {
          console.error('error :', error);
        }).finally(() => {i == false});
  }

  async function postAdd(body, setLoading) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const test = JSON.stringify({ address: body });

  //console.log("id: ", location.id);
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/update_location`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
        location_id: location.id
      },
      body: test,
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
      })
      .then(setLoading(false));
  }

  async function postName(body, setLoading) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const test = JSON.stringify({ name: body });

  //console.log("id: ", location.id);
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/update_location`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
        location_id: location.id
      },
      body: test,
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
      })
      .then(setLoading(false));
  }

  async function postDesc(body, setLoading) {
    const store = Store.getState();
    const access_Token = store.profil.access_token;
    const test = JSON.stringify({ description: body });

    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/update_location`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
        location_id: location.id
      },
      body: test,
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => {
      })
      .then(setLoading(false));
  }

  useEffect(() => {
    getThings(setLoading);
  }, []);

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.settings')}
          {'   '}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.view_box}
        onPress={() => props.navigation.navigate('SettingPartenaire')}
      >
        <ImageBackground
          style={styles.img_boxBack}
          imageStyle={styles.img_boxBack}
          source={randPic()}
          // source={require(props.data.image)}
        >
          <View style={styles.view_boxIn}>
            <View style={styles.view_information}>
              <Image style={styles.img_location} source={require('../images/icons/white/location.png')} />
              <Text style={styles.text_location}>{location.address}</Text>
            </View>
            <Text style={styles.text_name}>{location.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: 327, marginBottom: 15 }}>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('SettingsPartner.shop_name')}
          </Text>
          <View style={styles.view_number}>
            <TextInput
          autoCapitalize={'none'}
              style={styles.textInput_number}
              placeholder={location.name}
              onChangeText={(text) => {
                setLoading(true);
                postName(text);
              }}
            />
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('SettingsPartner.shop_address')}
          </Text>
          <View style={styles.view_number}>
            <TextInput
          autoCapitalize={'none'}
              style={styles.textInput_number}
              placeholder={location.address}
              onChangeText={(text) => {
                setLoading(true);
                postAdd(text);
              }}
            />
          </View>
        </View>
        <View style={styles.view_stat}>
          <Text style={styles.text_stat}>
            {I18n.t('SettingsPartner.shop_desc')}
          </Text>
          <View style={styles.view_number}>
            <TextInput
          autoCapitalize={'none'}
              style={styles.textInput_number}
              placeholder={location.description}
              onChangeText={(text) => {
                setLoading(true);
                postDesc(text);
              }}
            />
          </View>
        </View>
        <View style={styles.view_tags}>
          <Text style={styles.text_stat}>
            {I18n.t('SettingsPartner.shop_tags')}
          </Text>
          <FlatList
            style={styles.view_tagIn}
            data={location.tags_list}
            numColumns={2}
            columnWrapperStyle={{alignItems : 'center', justifyContent:'space-between'}}
            contentContainerStyle={{ paddingBottom : 80 }}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Text style={[globalStyles.subparagraphs, globalStyles.tag]}>{item._id}</Text>
            )}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          props.navigation.navigate('TagSelectionPart');
        //console.log("Choose shop's Tags");
        }}
      >
        <Text style={styles.text_button}>
          {I18n.t('SettingsPartner.choose_my_shop_tag')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '3.3%',
    paddingRight: '3.3%',
    paddingBottom: '0%',
  },
  view_header: {
    flex: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img_header: {
    width: 34,
    resizeMode: 'contain',
  },
  text_header: {
    width: '87.6%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  view_box: {
    backgroundColor: '#000000',
    borderRadius: 12,
    width: '100%',
    height: 235,
    marginBottom: 30,
  },
  img_boxBack: {
    flex: 1,
    borderRadius: 12,
  },
  view_boxIn: {
    flex: 1,
    flexDirection: 'column-reverse',
    borderRadius: 12,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view_information: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img_information: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_information: {
    color: '#FFFFFF',
    fontSize: 15,
  },
  img_location: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_location: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  text_name: {
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  view_stat: {
    flex: 73,
    width: '100%',
    marginBottom: 15,
    alignContent: 'flex-start',
  },
  view_tags: {
    flex: 278,
    width: '100%',
    marginBottom: 15,
    alignContent: 'flex-start',
  },
  text_stat: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  view_number: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  textInput_number: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#0092A7',
  },
  view_tagIn: {
    flex: 304,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    paddingTop: 7.5,
  },
  text_tagIn: {
    alignSelf: 'flex-start',
    textAlign: 'center',
    width: '30%',
    marginLeft: 7.5,
    marginBottom: 7.5,
    paddingTop: 7,
    paddingLeft: 2,
    paddingRight: 2,
    color: '#0091A7',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    borderRadius: 20,
    borderColor: '#0091A7',
    borderWidth: 4,
  },
  view_button: {
    flex: 58,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    // marginTop: 12.5,
    marginBottom: 12.5,
    backgroundColor: '#0092A7',
  },
  text_button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loading_screen: {
    backgroundColor:'rgba(100,100,100,0.75)',
    display: "flex",
    justifyContent: 'space-around',
    height: '100%'
  },
  // back: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  // },
  // header: {
  //   backgroundColor: '#FFFFFF',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.08,
  //   width: '100%',
  // },
  // fill: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1,
  //   backgroundColor: '#FFFFFF',
  //   padding: 5,
  //   marginTop: 10,
  //   marginBottom: 10,
  //   width: '95%',
  //   borderRadius: 5,
  //   opacity: 0.9,
  // },
  // logo: {
  //   flex: 0.1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: '30%',
  // },
  // settings: {
  //   justifyContent: 'space-between',
  //   flexDirection: 'row',
  //   width: '100%',
  // },
  // inputText: {
  //   height: 50,
  //   width: '100%',
  //   fontSize: 20,
  //   paddingTop: 10,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   backgroundColor: '#D9D9D9',
  //   borderRadius: 5,
  //   borderWidth: 0.5,
  //   borderColor: '#404040',
  // },
  // name: {
  //   flex: 0.1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: '30%',
  // },
  // infos: {
  //   width: '90%',
  //   flex: 1,
  //   marginTop: '10%',
  //   marginBottom: '50%',
  // },
  // textLine: {
  //   marginTop: '5%',
  //   flexDirection: 'column',
  //   justifyContent: 'center'
  // },
  // textInfos: {
  //   fontSize: 19,
  //   textAlign: 'left',
  //   width: '100%'
  // },
  // textInput: {
  //   fontSize: 17,
  //   textAlign: 'left',
  //   width: '100%',
  //   borderRadius: 5,
  //   backgroundColor: 'white'
  // }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SettingPartenaire);
