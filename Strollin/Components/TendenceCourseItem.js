import {
  Image, View, StyleSheet, Text, TouchableOpacity, ImageBackground, FlatList, ScrollView, 
} from 'react-native';
import React, {useState} from 'react';
import Location_List from './locations_list';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';

function GotoComment(props) {
  // props.navigation.setParams({ data: props.data });
  const action = {type: 'SET_COMMENTS_DISPLAY', value: props.data};
  props.dispatch(action);
  props.navigation.navigate('CommentScreen');
}

async function getLocation(props, setLocationList) {
  await fetch(`http://${IP_SERVER}:${PORT_SERVER}/location/get_locations_by_id`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: props.profil.access_token,
      locations_id_list: props.data["locations_list"]
    },
    method: 'GET',
  }).then((answer) => answer.json())
  .then(async function (answer) {
    setLocationList(answer["locations_list"]);
  })
  .catch((error) => {
    console.error('error :', error);
  });
}

function randPic() {
  /*const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street1.jpg'));
  }*/
  return (require('../ressources/street2.jpg'));
}

function TendenceCourseItem(props) {
  const [locationList, setLocationList] = useState(null);

  if (!locationList) {
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
            <Text style={styles.text_budget}>{props.data["price_range"][0] + " ~ " + props.data["price_range"][1]}</Text>
            {/* <Text style={styles.text_budget}>{ "Période : " + props.data["timetable"]}</Text> */}
          </View>
          <View style={styles.view_information}>
            <Image style={styles.img_information} source={require('../images/icons/white/marker.png')}/>
            <FlatList
              data={locationList}
              showsHorizontalScrollIndicator={true}
              renderItem={({ item }) => (
                <Location_List
                  {...props}
                  data={item}
                />
              )}
            keyExtractor={(item) => item["name"]}
          />
            {/* <Text style={styles.text_information}>{props.data.destinations[0]} - </Text> */}
            {/* <Text style={styles.text_information}>{props.data.destinations[1]} - </Text> */}
            {/* <Text style={styles.text_information}>{props.data.destinations[2]}</Text> */}
          </View>
          <Text numberOfLines={1} style={styles.text_name}>{props.data.name}</Text>
          <View style={styles.view_comments}>
            <TouchableOpacity
              onPress={() => GotoComment(props)}
              >
                <Image style={styles.img_comment} source={require('../images/icons/white/comments.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(TendenceCourseItem);

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
