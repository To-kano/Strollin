import {
  Image, View, StyleSheet, Text, TouchableOpacity, ImageBackground, FlatList, ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Location_List from './locations_list';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';

import {removeFavorite, addFavorite} from '../apiServer/user';

import {getLocationByIDList} from '../apiServer/locations';

function GotoComment(props) {
  // props.navigation.setParams({ data: props.data });
  const action = {type: 'SET_COMMENTS_DISPLAY', value: props.data};
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
    <View
      style={styles.view_box}
      onPress={() => GotoComment(props)}
    >
      <ImageBackground
        style={styles.img_boxBack}
        imageStyle={styles.img_boxBack}
        source={randPic()}
        // source={require(props.data.image)}
      >
        <View style={styles.view_boxIn}>
          <View style={styles.view_information}>
            <Image style={styles.img_buget} source={require('../images/icons/white/money.png')}/>
            {props.data["price_range"][0] === "0" && props.data["price_range"][1] === "0" ?
              <Text style={styles.text_budget}>{"Gratuit"}</Text>
              :
              <Text style={styles.text_budget}>{props.data["price_range"][0] + " ~ " + props.data["price_range"][1]}</Text>
            }
            {/* <Text style={styles.text_budget}>{ "Période : " + props.data["timetable"]}</Text> */}
          </View>
          <View style={styles.view_information}>
            <Image style={styles.img_information} source={require('../images/icons/white/marker.png')}/>
            <FlatList
              data={locationList}
              showsHorizontalScrollIndicator={true}
              horizontal={true}
              renderItem={({ item }) => (
                <Location_List
                  {...props}
                  data={item}
                />
              )}
            keyExtractor={(item) => item.id}
          />
          </View>
          <Text numberOfLines={1} style={styles.text_name}>{props.data.name}</Text>
          <View style={styles.view_comments}>
            <TouchableOpacity
              onPress={() => GotoComment(props)}
              >
                <Image style={styles.img_comment} source={require('../images/icons/white/comments.png')}/>
            </TouchableOpacity>
            {
            !isFavorite &&
              <TouchableOpacity
                onPress={() => addFavorite(props, setIsFavorite)}
                >
                  <Image style={styles.img_comment} source={require('../images/empty_white_star.png')}/>
              </TouchableOpacity>
            }
            {
            isFavorite &&
                <TouchableOpacity
                  onPress={() => removeFavorite(props, setIsFavorite)}
                  >
                    <Image style={styles.img_comment} source={require('../images/yellow_star.png')}/>
                </TouchableOpacity>
            }
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
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 12,
    minHeight: 235,
    marginBottom: 30,
    width: '100%',
  },
  img_boxBack: {
    flex: 1,
    borderRadius: 12,
  },
  view_boxIn: {
    flex: 1,
    flexDirection: 'column-reverse',
    borderRadius: 12,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view_information: {
    flexDirection: 'row',
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
  img_buget: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_budget: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  text_name: {
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  view_comments: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  img_comment: {
    width: 35,
    height: 35,
    marginRight: -10,
    marginLeft: 20,
    tintColor:"#fff",
  }
});

// import {
//   Button, Image, View, StyleSheet, Text, ScrollView, FlatList
// } from 'react-native';
// import React from 'react';
// import Location_List from './locations_list';

// function GotoComment(props) {
//   props.navigation.setParams({ data: props.data });
//   props.navigation.navigate('CommentScreen', { data: props.data});
// }

// function Box(props) {
//   return (
//     <View style={{
//       justifyContent: 'space-around', flex: 1, marginTop: 20, marginHorizontal: '5%', backgroundColor: 'rgba(255,255,255, 0.9)', borderRadius: 5, width: '90%'
//     }}
//     >
//       <Text style={[{
//         textAlign: 'center', fontSize: 30, color: '#39A5D6', margin: 5
//       }]}
//       >
//         {props.data["name"]}
//       </Text>
//       <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>

//         {"Budget: " + props.data["price_range"][0] + " ~ " + props.data["price_range"][1]}
//       </Text>
//       <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
//         { "Période : " + props.data["timetable"]}
//       </Text>
//       <Text style={[{ fontSize: 25, marginLeft: '5%' }]}>
//         Destinations:
//       </Text>
//       <FlatList
//           data={props.data["locations_list"]}
//           renderItem={({ item }) => (
//             <Location_List
//               {...props}
//               data={item}
//             />
//           )}
//         keyExtractor={(item) => item["name"]}
//       />
//       <Button
//         title="Commentaires"
//         onPress={() => GotoComment(props)}
//       />
//     </View>
//   );
// }

// /* import I18n from "../Translation/configureTrans";

// export default class Box extends Component {
//   render() {
//     return (
//       <View style={styles.cont}>
//         <Text style={{ fontSize: 40 }}> {I18n.t("trendingTrip")} </Text>
//         <View style={styles.cont}>
//           <Image style={{ resizeMode: 'stretch' }} source={require('../ressources/plum2.jpg')} />
//         </View>
//       </View>
//     );
//   }
// } */

// export default Box;

// const styles = StyleSheet.create({
//   cont: {
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 22,
//     marginBottom: 5,
//     opacity: 0.5
//   },
//   img: {
//     flexDirection: 'column',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flex: 0.1,
//     backgroundColor: 'red',
//     width: '80%'
//   },
//   whiteBox: {
//     justifyContent: 'space-between',
//     flex: 1,
//     marginTop: 20,
//     marginHorizontal: '10%',
//     backgroundColor: 'rgba(255,255,255, 0.9)',
//     borderRadius: 20,
//     textAlign: 'left',
//     width: '80%',
//     resizeMode: 'stretch',
//   }
// });
