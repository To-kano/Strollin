import React, { useState } from 'react';
import {
  StyleSheet, View, Image, ImageBackground, Text, TouchableOpacity, TextInput
} from 'react-native';
import { round } from 'react-native-reanimated';
import Stars from 'react-native-stars';
import { connect } from 'react-redux';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Store from '../Store/configureStore';
import I18n from '../Translation/configureTrans';
import { DrawerActions } from '@react-navigation/native';

import { CommonActions } from '@react-navigation/native';

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

function ratingCompleted(rating, comment, props) {
  // console.log("rating = " + rating);
  // console.log("comment = " + comment);
  const store = Store.getState();

  const bodyRequest = JSON.stringify({
    message: comment,
    score: rating
  });

  fetch(`http://${IP_SERVER}:${PORT_SERVER}/comment/new_comment`, {
   headers: {
     Accept: 'application/json',
     'Content-Type': 'application/json',
     access_token: store.profil.access_token,
     course_id: store.course.currentCourse.id,
   },
   body: bodyRequest,
   method: 'post',
  })
   .then((response) => response.json())
   .then(async (answer) => {
     console.log("answer =", answer);
     console.log("course =", store.course.currentCourse);
     if (answer.status == true) {
       console.log("comment sent successfully");
     } else {
       console.log("failed answer = ", answer);
     }
   })
   .catch((error) => {
     console.error('error :', error);
   });
   props.navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: 'TripSuggestion' },
        { name: 'TripNavigation' },
        { name: 'CourseEvaluation'},
        { name: 'CourseSettings' },
      ],
    })
  );
}

function skipRating(props) {
  props.navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: 'TripSuggestion' },
        { name: 'TripNavigation' },
        { name: 'CourseEvaluation'},
        { name: 'CourseSettings' },
      ],
    })
  );
}

export function CourseEvaluation(props) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  return (
    <View style={styles.view_back}>
      <View style={styles.view_header}>
        <TouchableOpacity  onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
          <Image style={styles.img_header} source={require('../images/icons/black/menu.png')} />
        </TouchableOpacity>
        <Text style={styles.text_header}>
          {I18n.t('Header.rating')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            skipRating(props);
          }}
        >
          <Image style={styles.img_header} source={require('../images/icons/black/close.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.view_box}>
        <ImageBackground
          style={styles.img_boxBack}
          imageStyle={styles.img_boxBack}
          source={randPic()}
          // source={require(props.data.image)}
        >
          <View style={styles.view_boxIn}>
            <View style={styles.view_information}>
              <Image style={styles.img_location} source={require('../images/icons/white/location.png')} />
              <Text style={styles.text_location}>Adresse de l entreprise</Text>
            </View>
            <Text style={styles.text_name}>Nom entreprise</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.view_star}>
        <Stars
          half
          default={1.5}
          update={(val) => { setRating(val); }}
          spacing={4}
          starSize={40}
          count={5}
          fullStar={require('../images/icons/black/star_filled.png')}
          emptyStar={require('../images/icons/black/star_empty.png')}
          halfStar={require('../images/icons/black/star_half.png')}
        />
      </View>
      <View style={styles.view_comment}>
        <Text style={styles.text_comment}>{I18n.t('CourseEvaluation.yourComment')}</Text>
        <TextInput
          style={styles.textInput_comment}
          onChangeText={(text) => setComment(text)}
          value={comment}
          multiline
          numberOfLines={7}
        />
      </View>
      <TouchableOpacity
        style={styles.view_button}
        onPress={() => {
          ratingCompleted(rating, comment, props);
        }}
      >
        <Text style={styles.text_button}>
          {I18n.t('Notation.send')}
        </Text>
      </TouchableOpacity>
    </View>
    // <View style={styles.container}>
    //   <View>
    //     <Text style={{ textAlign: 'center', fontSize: 40 }}> {I18n.t("CourseEvaluation.evaluate")} {"\n"} </Text>
    //   </View>
    //   <View>
    //     <Text style={{ textAlign: 'center', fontSize: 30 }}> {I18n.t("CourseEvaluation.note")} </Text>
    //     <Stars
    //       half={true}
    //       default={1.5}
    //       update={(val)=>{setRating(val)}}
    //       spacing={4}
    //       starSize={40}
    //       count={5}
    //       fullStar= {require('./../images/star.png')}
    //       emptyStar= {require('./../images/empty_star.png')}
    //       halfStar={require('./../images/half_star.png')}
    //     />
    //   </View>
    //   <Text> {"\n"} </Text>
    //   <View style={{ alignItems: 'center', justifyContent: 'center'}}>
    //     <TextInput
    //       style={styles.textInput}
    //       placeholder={I18n.t("CourseEvaluation.yourComment")}
    //       onChangeText={(text) => setComment(text)}
    //       value={comment}
    //       multiline
    //       numberOfLines={7}
    //     />
    //     <Text> {"\n"} </Text>
    //   </View>
    //   <View>
    //     <TouchableOpacity
    //       id={'test'}
    //       style={styles.newTrip}
    //       onPress={() => {
    //         ratingCompleted(rating, comment, props);
    //       }}
    //     >
    //       <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
    //         {I18n.t("CourseEvaluation.send")}
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    //   <View>
    //     <TouchableOpacity
    //       id={'test'}
    //       style={styles.newTrip}
    //       onPress={() => {
    //         skipRating(props);
    //       }}
    //     >
    //       <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
    //         Skip Rating
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(CourseEvaluation);

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
    width: '77.8%',
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
    marginTop: 15,
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
  view_star: {
    flex: 90,
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  view_comment: {
    flex: 337,
    width: '100%',
    flexDirection: 'column',
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  text_comment: {
    flex: 25,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
  },
  textInput_comment: {
    flex: 262,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    textAlignVertical: 'top',
  },
  view_button: {
    flex: 58,
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
  // container: {
  //   flex: 1
  // },
  // back: {
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 1
  // },
  // fill: {
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.9,
  //   width: '100%',
  // },
  // header: {
  //   backgroundColor: '#E67E22',
  //   flexDirection: 'row',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.1,
  //   width: '100%',
  // },
  // cont: {
  //   marginTop: '5%',
  //   flexDirection: 'column',
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   flex: 0.1,
  //   backgroundColor: '#FFC300',
  //   width: '90%',
  //   borderRadius: 20
  // },
  // newTrip: {
  //   alignItems: 'center',
  //   backgroundColor: '#F07323',
  //   paddingVertical: '5%',
  //   paddingHorizontal: '30%',
  //   borderRadius: 5,
  // },
  // textInput: {
  //   width: '95%',
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   textAlignVertical: 'top',
  // },
});
