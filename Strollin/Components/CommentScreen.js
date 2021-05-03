import React from 'react';
import {
  StyleSheet, View, FlatList, Text
} from 'react-native';
import Comment from './Comment';
import { connect } from 'react-redux';
import Store from '../Store/configureStore';

function CommentScreen(props) {
  const store = Store.getState();
  console.log("store.tendance.currentCommentsList = ", store.tendance.currentCommentsList);

  //const DATA = require('./test.json');
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 40 }}> Comments </Text>
        <FlatList
          data={store.tendance.currentCommentsList.comments_list}
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
});
