import {
  Image, View, StyleSheet, Text, TouchableOpacity, ImageBackground, FlatList, ScrollView, Touchable,
} from 'react-native';
import React, { useState } from 'react';
import Location_List from './locations_list';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';

import { removeFavorite, addFavorite } from '../apiServer/user';

import { getLocationByIDList } from '../apiServer/locations';
import Icon from './components/Icon';

const globalStyles = require('../Styles');

function GotoComment(props) {
  // props.navigation.setParams({ data: props.data });
  const action = { type: 'SET_COMMENTS_DISPLAY', value: props.data };
  props.dispatch(action);
  props.navigation.navigate('CommentScreen');
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

async function getLocation(props, setLocationList) {

  const location_list = props.data.locations_list.filter(onlyUnique);

  let answer = await getLocationByIDList(props.profil.access_token, location_list);

  setLocationList(answer);
}

function randPic() {

  return (require('../ressources/street2.jpg'));
}

function checkFavorite(props) {
  const store = Store.getState();

  if (props.favoritesPage) {
    return (true);
  }

  if (store.profil.course_favorites && props.data) {
    for (let i = 0; i < store.profil.course_favorites.length; i++) {
      //console.log("compared id = ", store.profil.course_favorites[i])
      if (store.profil.course_favorites[i] == props.data.id) {
        //console.log("returned true");
        return (true);
      }
    }
  }

  return (false);
}

function CourseItem(props) {
  const [locationList, setLocationList] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);


  if (isFavorite == null) {
    setIsFavorite(checkFavorite(props));
  }
  if (!locationList && props.data.locations_list) {
    getLocation(props, setLocationList);
  }

  return (
    <View style={styles.view_box}>
      <ImageBackground
        style={styles.img_boxBack}
        imageStyle={styles.img_boxBack}
        source={randPic()}
      >
      <View style={styles.view_boxIn}>
        <View style={{width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text numberOfLines={1} style={[globalStyles.titles, {width: '70%', color: '#ffffff', textTransform: 'capitalize'}]}>{props.data.name}</Text>
          <View style={{flexDirection: 'row'}}>
            { isFavorite
              ? <TouchableOpacity
                  onPress={() => removeFavorite(props, setIsFavorite)}
                >
                  <Icon name='star_filled' size={29} color='#ffffff'/>
                </TouchableOpacity>
              : <TouchableOpacity
                  onPress={() => addFavorite(props, setIsFavorite)}
                >
                  <Icon name='star_empty' size={29} color='#ffffff'/>
                </TouchableOpacity>
            }
            <TouchableOpacity
              style={{marginLeft: 8}}
              onPress={() => GotoComment(props)}
            >
              <Icon name='comment' size={29} color='#ffffff'/>
            </TouchableOpacity>
          </View>

        </View>
        <View>
          <View style={styles.view_information}>
            <Icon name="map" size={29} color='#ffffff'/>
            <FlatList
              data={locationList}
              showsHorizontalScrollIndicator={true}
              horizontal={true}
              renderItem={({ item }) => (
                <Text style={[globalStyles.subparagraphs, {color: '#ffffff', marginLeft: 8}]}>
                  {item["name"] + ', '}
                </Text>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
          <View style={styles.view_information}>
            <Icon name="piggy" size={29} color='#ffffff'/>
            <Text style={[globalStyles.subparagraphs, {color: '#ffffff', marginLeft: 8}]}>
              { props.data["price_range"][0] =='0' && props.data["price_range"][1] == '0'
                ? "Gratuit"
                : props.data["price_range"][0] + "€ ~ " + props.data["price_range"][1] + "€"
              }
            </Text>
          </View>
        </View>
      </View>
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(CourseItem);

const styles = StyleSheet.create({
  view_box: {
    backgroundColor: '#000000',
    borderRadius: 16,
    minHeight: 220,
    marginBottom: 30,
    width: '100%',
  },
  img_boxBack: {
    flex: 1,
    borderRadius: 12,
  },
  view_boxIn: {
    width: "100%",
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  view_information: {
    marginTop: 8,
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
});
