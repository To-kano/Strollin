import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import CourseItem from './CourseItem';
import I18n from '../Translation/configureTrans';
import Store from '../Store/configureStore';

import { DrawerActions } from '@react-navigation/native';

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
    <View style={styles.view_back}>
      <Header props={props} />
      <View style={styles.view_list}>
        <FlatList
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
      </View>
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
