import React from 'react';
import {
  StyleSheet, View, FlatList, Text
} from 'react-native';
import Comment from './Comment';

function CommentScreen(props) {
  //console.log("props = ", props.navigation.setParams);
  const DATA = require('./test.json');
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 40 }}> {} </Text>
        <FlatList
          data={DATA}
          contentContainerStyle={{ flexGrow: 0.1 }}
          renderItem={({ item }) => <Comment id={item.id} comment={item.comment} note={item.note} pseudo={item.pseudo} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

export default CommentScreen;

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
