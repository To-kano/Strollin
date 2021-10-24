import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ActivityIndicator, Modal
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import json from '../ressources/profile.json';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import { DrawerActions } from '@react-navigation/native';
import { translateTags, detranslateTags } from '../Translation/translateTags'

import ImageProfile from './components/ImageProfile';

import Popup from './Popup';
import ChangeImageProfileForm from './ChangeImageProfileForm';
import MenuButton from './components/MenuButton';
import Footer from './components/Footer';
import Icon from './components/Icon';
import HistoricButton from './components/HistoricButton';

const globalStyles = require('../Styles');

function ParseTags(Tags) {
  let list = Tags[0];

  for (let i = 1; i < Tags.length; i += 1) {
    list += `, ${Tags[i]}`;
  }
  return list;
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
  },
  {
    id: 4,
    name: 'Cinéma',
  },
];

function ProfileScreen(props) {
  // const [list, setList] = React.useState(props.profil.tags_list);
  const [reload, setReload] = useState(true);
  const [args, setArgs] = useState(true);
  const [tagsList, setTagsList] = useState(initialList);

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = React.useState(false);


  const store = Store.getState();
  const access_Token = store.profil.access_token;

  async function getThings() {

    //console.log("access_Token = ",access_Token );

    if (reload == false)
      return
    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/get_own_profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
      },
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        //console.log("profile: ",json);
        //console.log("profile updated ");
        setArgs(json.profile)
        initialList = []
        for (var i = 0; i < json.profile.tags_list.length; i++) {
          initialList.push({ id: i, name: json.profile.tags_list[i] })
        }
        //console.log("tags setted: ", initialList);
        setTagsList(initialList)
        setReload(false)
      })
      .then(setLoading(false));
  }

  async function postMail(body, setLoading) {

    const test = JSON.stringify({ pseudo: body })

    await fetch(`http://${IP_SERVER}:${PORT_SERVER}/users/edit_profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        access_Token,
        location_id: args._id
      },
      body: test,
      method: 'POST',
    })
      .then(res => res.json())
      .then(json => {
      })
      .then(setLoading(false));
  }

  const [list, setList] = React.useState(initialList);
  const [name, setName] = React.useState('');

  useEffect(() => {
    setLoading(true);
    getThings();
  }, []);


  function handleChange(event) {
    setName(event.nativeEvent.text);
  }
  function handleAdd() {
    const newList = list.concat({ name, id: uuidv4() });
    setList(newList);
    setName('');
  }

  //getThings();

  return (
    <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 96 , width: "100%"}}
          style={{width: "100%"}}
        >
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <ImageProfile style={styles.img_profileTop} />
              <View style={{
                position: 'absolute',
                bottom: -16, right: -16,
                backgroundColor: '#0989FF',
                borderRadius: 32,
                padding: 11
              }}>
                <Icon name='pencil' size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>
        <Popup message={"Changer ma photo"} modalVisible={modalVisible} setModalVisible={setModalVisible}>
          <ChangeImageProfileForm modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </Popup>
        <View style={{ marginTop: 32, width: "100%" }}>
          <Text style={[globalStyles.paragraphs, { marginBottom: 8 }]}>{I18n.t('ProfileScreen.pseudo')}</Text>
          <TextInput
            style={[globalStyles.textInput, { marginTop: 0, width: "100%"}]}
            autoCapitalize="none"
            onChangeText={text => {
              setLoading(true);
              postMail(text, setLoading);
            }}
          >
            {args?.pseudo}
          </TextInput>
        </View>
        <View style={{ marginTop: 32, width: "100%" }}>
          <Text style={[globalStyles.paragraphs, { marginBottom: 8 }]}>Les tags que j aime</Text>
          <FlatList
            style={styles.view_tagIn}
            data={tagsList}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={[globalStyles.subparagraphs, globalStyles.tag]}>{translateTags(item.name)}</Text>
            )}
          />
        </View>
      </ScrollView>
      <HistoricButton props={props}/>
      <MenuButton props={props} />
      <Footer primaryText="Changer mes tags" primaryOnPressFct={() => { setReload(true); props.navigation.navigate('TagSelection'); }} />
      {/* <Modal
        animationType="none"
        transparent={true}
        visible={isLoading}
      >
        <View style={styles.loading_screen}>
          <ActivityIndicator size="large"  color="black" style={{}}/>
        </View>
      </Modal> */}
    </View>
    // <View style={styles.view_back}>
    //   <View style={styles.view_header}>
    //     <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
    //       <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
    //       </TouchableOpacity>
    //     <Text style={styles.text_header}>
    //       {I18n.t('Header.profile')}
    //       {'   '}
    //     </Text>
    //   </View>
    //   <View style={styles.view_profileTop}>
    //     <TouchableOpacity onPress={() => setModalVisible(true)}>
    //       <ImageProfile style={styles.img_profileTop} />
    //     </TouchableOpacity>
    //     <Popup message={"Choose your profile picture"} modalVisible={modalVisible} setModalVisible={setModalVisible}>
    //       <ChangeImageProfileForm/>
    //     </Popup>
    //     {/* <Image  style={styles.img_profileTop} source={require('')}/> */}
    //     <Text style={styles.text_profileTop}>{args?.pseudo}</Text>
    //   </View>
    //   <View style={styles.view_email}>
    //     <Text style={styles.text_description}>
    //       {' '}
    //       {I18n.t('ProfileScreen.pseudo')}
    //     </Text>
    //     <TextInput
    //       style={styles.text_email}
    //       autoCapitalize="none"
    //       textContentType="emailAddress"
    //       autoCompleteType="email"
    //       keyboardType="email-address"
    //       onChangeText={text => {
    //         setLoading(true);
    //         postMail(text, setLoading);
    //       }}
    //     >
    //       {args?.pseudo}
    //     </TextInput>
    //   </View>
    //   <View style={styles.view_tag}>
    //     <Text style={styles.text_description}> Tags</Text>
    //     <FlatList
    //       numColumns={3}
    //       style={styles.view_tagIn}
    //       showsHorizontalScrollIndicator={false}
    //       showsVerticalScrollIndicator={false}
    //       data={tagsList}
    //       contentContainerStyle={{ flexGrow: 1 }}
    //       keyExtractor={(item) => item.id}
    //       renderItem={({ item }) => (
    //         <Text style={styles.text_tagIn}>{translateTags(item.name)}</Text>
    //       )}
    //     />
    //   </View>
    //   <TouchableOpacity
    //     style={styles.view_button}
    //     onPress={() => {
    //       setReload(true)
    //       props.navigation.navigate('TagSelection');
    //       //getThings();
    //       //setTagsList(tagsList);
    //     //console.log("exisrte stp eeeeeeeeeeeeeeeee");
    //     }}
    //   >
    //     <Text style={styles.text_button}>Choose my tags</Text>
    //   </TouchableOpacity>
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
  view_profileTop: {
    flex: 200,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  img_profileTop: {
    width: 128,
    height: 128,
    borderRadius: 16,
  },
  text_profileTop: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    padding: 4,
  },
  view_email: {
    flex: 82,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'flex-start',
  },
  text_description: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold'
  },
  text_email: {
    width: '100%',
    height: 40,
    padding: 6,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  view_tag: {
    width: '100%',
  },
  view_tagIn: {
    borderRadius: 4,
    color: "#1C1B1C",
    borderColor: "#9B979B",
    borderWidth: 1,
    width: "100%",
    padding: 8,
  },
  text_tagIn: {
    textAlign: 'center',
    margin: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    color: '#0091A7',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    borderRadius: 20,
    borderColor: '#0091A7',
    borderWidth: 2,
  },
  view_button: {
    flex: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 45,
    marginTop: 12.5,
    marginBottom: 12.5,
    backgroundColor: '#0092A7',
  },
  text_button: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loading_screen: {
    backgroundColor: 'rgba(100,100,100,0.75)',
    display: "flex",
    justifyContent: 'space-around',
    height: '100%'
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(ProfileScreen);
