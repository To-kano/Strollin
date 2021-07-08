import {
  Button, Image, View, StyleSheet, Text, ScrollView, FlatList
} from 'react-native';
import React from 'react';

function Comment(props) {
  return (
    <View style={styles.view_comment}>
      <View style={styles.view_top}>
        <Text style={styles.text_id}>{props.id}</Text>
        <Text style={styles.text_note}><Text style={styles.text_big}>{props.note}</Text>/5</Text>
      </View>
      <Text style={styles.text_comment}>{props.comment}</Text>
    </View>
  );
}

export default Comment;

const styles = StyleSheet.create({
  view_comment: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 30,
    paddingTop: 10,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 15,
    borderRadius: 12,
  },
  view_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  text_id: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  text_big: {
    fontSize: 22,
    color: '#0092A7',
  },
  text_note: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0092A7',
  },
  text_comment: {
    fontSize: 16,
  }
});
