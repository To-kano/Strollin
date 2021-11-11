import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import CourseItem from './CourseItem';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';

import { DrawerActions } from '@react-navigation/native';
import MenuButton from './components/MenuButton';

const globalStyles = require('../Styles');

export function getFavoritesList() {
  const store = Store.getState();

  return (store.favorites.favoritesList);
}

function Header({ props, defaultState = false }) {

    return (
      <View style={styles.view_header}>
        <TouchableOpacity
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.favorites')}
        </Text>
      </View>
    );
}

export function Favorites(props) {

  return (
    <View style={globalStyles.container}>
      <View
        style={{width: '100%', height: '70%'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 96 }}
      >
        <Text style={[globalStyles.titles, { marginBottom: 32, }]}>Tes trajets favoris sont ici</Text>
        { getFavoritesList().length > 0 
          ? <FlatList
              style={{width: '100%'}}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={getFavoritesList()}
              renderItem={({ item }) => (
                <CourseItem
                  {...props}
                  data={item}
                  favoritesPage={true}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          : <Text style={[globalStyles.subparagraphs, {marginTop: 96}]}>Malheureusement on dirait que tu n'as pas encore de trajet dans tes favoris. Essaye d'appuyer sur l'étoile quand un trajet sur la page d'acceuil te plaît 😉</Text>
        }
      </View>
      <MenuButton props={props}/>
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
export default connect(mapStateToProps)(Favorites);
