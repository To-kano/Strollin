import React, { useState } from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput
} from 'react-native';
import Stars from 'react-native-stars';

function ratingCompleted(rating, comment) {
  //console.log("rating = " + rating);
  //console.log("comment = " + comment);
}

function CourseEvaluation(props) {
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
          style={styles.newTrip}
          onPress={() => {
            ratingCompleted(rating, comment);
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

export default CourseEvaluation;

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
