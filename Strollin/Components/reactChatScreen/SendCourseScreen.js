import React from 'react';
import {
  StyleSheet, View, FlatList, Text
} from 'react-native';
import SendCourseItem from './SendCourseItem';
import Store from '../../Store/configureStore';
import { connect } from 'react-redux';

function SendCourseScreen(props) {
  const store = Store.getState();

  //const DATA = require('./test.json');
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 30 }}> Select the course you want to send </Text>
      <View>
        <FlatList ListFooterComponent={ <View style={{ margin: 50 }} /> }
          data={store.course.courseObjectHistoric}
          contentContainerStyle={{ flexGrow: 0.1 }}
          renderItem={({ item }) => <SendCourseItem name={item.name} courseObject={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SendCourseScreen);

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
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20
  }
});
