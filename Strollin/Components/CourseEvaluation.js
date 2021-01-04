import React, { useState } from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput
} from 'react-native';
import Stars from 'react-native-stars';
import { connect } from 'react-redux';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Store from '../Store/configureStore';

function ratingCompleted(rating, comment) {
  //console.log("rating = " + rating);
  //console.log("comment = " + comment);
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
      course_id: "5fdb7bf7e846ca001ea9389e",
    },
    body: bodyRequest,
    method: 'post',
  })
    .then((response) => response.json())
    .then(async (answer) => {
      if (answer.status == true) {
        //console.log("comment sent successfully");
      } else {
        //console.log("answer = ", answer);
      }
    })
    .catch((error) => {
      console.error('error :', error);
    });
}

export function CourseEvaluation(props) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 40 }}> {"Evaluate this course!\n"} </Text>
      </View>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 30 }}> {"Note:"} </Text>
        <Stars
          half={true}
          default={1.5}
          update={(val)=>{setRating(val)}}
          spacing={4}
          starSize={40}
          count={5}
          fullStar= {require('./../images/star.png')}
          emptyStar= {require('./../images/empty_star.png')}
          halfStar={require('./../images/half_star.png')}
        />
      </View>
      <Text> {"\n"} </Text>
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <TextInput
          style={styles.textInput}
          placeholder="Your comment"
          onChangeText={(text) => setComment(text)}
          value={comment}
          multiline
          numberOfLines={7}
        />
        <Text> {"\n"} </Text>
      </View>
      <View>
        <TouchableOpacity
          id={'test'}
          style={styles.newTrip}
          onPress={() => {
            ratingCompleted(rating, comment, );
          }}
        >
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
            Send Evaluation
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(CourseEvaluation);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  back: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1
  },
  fill: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.9,
    width: '100%',
  },
  header: {
    backgroundColor: '#E67E22',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    width: '100%',
  },
  cont: {
    marginTop: '5%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 0.1,
    backgroundColor: '#FFC300',
    width: '90%',
    borderRadius: 20
  },
  newTrip: {
    alignItems: 'center',
    backgroundColor: '#F07323',
    paddingVertical: '5%',
    paddingHorizontal: '30%',
    borderRadius: 5,
  },
  textInput: {
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
});
