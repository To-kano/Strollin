import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, TextInput
} from 'react-native';
import { connect } from 'react-redux';
import CourseItem from './CourseItem';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';
import Icon from './components/Icon';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import { DrawerActions } from '@react-navigation/native';
import MenuButton from './components/MenuButton';
import CourseElement from './CourseElement';

const globalStyles = require('../Styles');

function Header({ props, defaultState = false }) {

    return (
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.PartnerPlace')}
        </Text>
      </View>
    );
}

export function PartnerPlace(props) {

  const [places, setPlaces] = useState(false);
  const [dispPlaces, setDispPlaces] = useState({});
  const store = Store.getState();
  const access_Token = store.profil.access_token;
  var lower = "";

  function SearchBar(props) {
    const [pressed, setpressed] = useState(false);
    const [research, setresearch] = useState('');
  
    return (
      <View 
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: "#ffffff",
          position: "absolute",
          top: 16,
          right: 16,
          padding: 16,
          borderRadius: 32,
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          width: '76%',
          justifyContent: 'space-between',
          elevation: 10,
        }}>
          <TextInput
            autoCapitalize={'none'}
            style={[
              globalStyles.subparagraphs, { padding: 0, }]}
            placeholder={I18n.t('TendanceSearchBar.searchTag')}
            onChangeText={(text) =>  setresearch(text)}
            value={research}
          />
        <TouchableOpacity
          onPress={() => {
            check_search(research)
          }}
        >
          <Icon name="search" size={29} color="#1C1B1C" />
        </TouchableOpacity>
      </View>
    );
  }

  function check_search(text) {
    var list = []
    for (let i = 0; i < places.length; i++) {
      lower = places[i].name.toLowerCase()
      if (lower.search(text) != -1) {
        list.push(places[i])
      }
    }
    console.log(list);
    setDispPlaces(list)
  }

  async function getPlaces(setLoading) {
    var list = [];
    const url = `http://${IP_SERVER}:${PORT_SERVER}/location/get_locations`
      fetch(url, {
        headers : {
          access_token: props.profil.access_token,
        },
        method: 'GET',
      })
        .then((response) => response.json())
        .then((answer) => {
          const list = answer.locations_list
          setPlaces(list)
          //answer.locations_list.splice(50);
          //setDispPlaces(answer.locations_list)
        })
        .catch((error) => {
          console.error('error :', error);
        })
  }

  useEffect(() => {
    if (places == false)
      getPlaces()
  });
  return (
    <View style={globalStyles.container}>
      <View
        style={{width: '100%', height: '70%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 96 }}
      >
        <Text style={[globalStyles.titles, { marginBottom: 32, }]}>Tes trajets favoris sont ici</Text>
        <FlatList
              style={{width: '100%'}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={dispPlaces}
              renderItem={({ item }) => (
                <CourseElement
                  item={item}
                  favoritesPage={false}
                />
              )}
              keyExtractor={(item) => item.id}
            />
      </View>
      <MenuButton props={props}/>
      <SearchBar
        onPress={(data) => { console.log("hello"); }}
        nChangeText={(text) => console.log("oui")}
        imagePath="../images/icons/black/search.png"
      />
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
    width: '88%',
    fontWeight: 'bold',
    fontSize: 28,
    letterSpacing: 2,
    textAlign: 'center',
    color: '#000000',
  },
  view_list: {
    flex: 757,
    width: '100%',
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(PartnerPlace);
