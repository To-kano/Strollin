import {
  StyleSheet, View, FlatList, Text, TouchableOpacity, Image, ActivityIndicator, Modal
} from 'react-native';
import Comment from './Comment';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';
import I18n from '../Translation/configureTrans';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import { StackActions } from '@react-navigation/native';
import React, {useState} from 'react';

async function getCommentList(props, setCommentList, store) {
  await fetch(`https://${IP_SERVER}:${PORT_SERVER}/comment/get_comment_by_id`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: store.profil.access_token,
      comments_list: store.comment.selectedCourse.comments_list
    },
    method: 'GET',
  }).then((answer) => answer.json())
  .then(async function (answer) {
    setCommentList(answer["comments_list"])
    console.log("comment = ", store.comment.selectedCourse.comments_list)
  })
  .catch((error) => {
    console.error('error :', error);
  });

}

export function Header(props) {

  return (
    <View style={styles.view_header}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/return.png')} />
      </TouchableOpacity>
      <Text style={styles.text_header}>
        {I18n.t('Header.comment')}
      </Text>
      <TouchableOpacity
         onPress={() => {
          const action = {
            type: 'ADD_COURSE',
            value: props.store.comment.selectedCourse
          };
          Store.dispatch(action);
          console.log("course = ", props.store.comment.selectedCommentCourse);

          const popAction = StackActions.pop(5);

          props.navigation.dispatch(popAction);

          props.navigation.navigate('New trip',{
            screen: 'TripSuggestion',
           }
          )
        }}
      >
        <Image style={styles.img_header} source={require('../images/icons/black/next_trip.png')} />
      </TouchableOpacity>
    </View>
  );
}

function CommentScreen(props) {
  const store = Store.getState();
  const [commentList, setCommentList] = useState(null);

  if (!commentList) {
    getCommentList(props, setCommentList, store);
  }
  //const DATA = require('./test.json');
  return (
    <View style={styles.view_back}>
      <Header store={store} navigation={props.navigation} />
      <View style={styles.view_list}>
        <FlatList
          data={commentList}
          contentContainerStyle={{ flexGrow: 0.1 }}
          renderItem={({ item }) => <Comment id={item["author_pseudo"]} comment={item["message"]} note={item["score"]} pseudo={item.pseudo} />}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(CommentScreen);

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
  textInput_header: {
    height: 40,
    width: '85%',
    borderRadius: 21,
    marginRight: 12.5,
    paddingLeft: 12.5,
    backgroundColor: '#FFFFFF',
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
  view_list: {
    flex: 757,
    width: '100%',
  },
});
