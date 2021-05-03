import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Store from '../../Store/configureStore';
import DestinationItem from './DestinationItem';
import { CommonActions } from '@react-navigation/native';


import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Button
} from 'react-native';

function CoursePreviewItem(props) {
  const store = Store.getState();
  const navigation = useNavigation();
  console.log("props.courseObject", props.courseObject);
    return (
    <View style={{ height:450}}>
      <Text style={styles.message} ellipsizeMode="tail">
        Destination(s):
      </Text>
      <FlatList
          data={props.courseObject.locations_list}
          renderItem={({ item }) => (
            <DestinationItem locationId={item}/>
          )}
        keyExtractor={(item) => item}
      />
      <Button title="Let's Go!" onPress={() => {
        const action = {
          type: 'ADD_COURSE',
          value: props.courseObject
        };
        Store.dispatch(action);
        navigation.navigate('New trip',{
          screen: 'TripSuggestion',
         }
        )
        //props.navigation.navigate('TripSuggestion')
      }}/>
    </View>
    );
}

const styles = StyleSheet.create({
  box: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
  },
  greyDisplay: {
    flex: 1,
    width: '70%',
    borderRadius: 15,
    padding: 10,
    marginLeft: "1%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(215, 215, 215, 1)',
  },
  blueDisplay: {
    flex: 1,
    width: '70%',
    borderRadius: 15,
    padding: 10,
    marginLeft: "30%",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(50, 150, 250, 1)',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 16,
  },
  message: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  expeditor: {
    fontSize: 10,
    marginLeft: "4%"
  },
  expeditorUser: {
    fontSize: 10,
    textAlign: "right",
    marginRight: "4%"

  },
  icon: {
    width: "20%",
    height: "20%",
    resizeMode: 'contain',
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(CoursePreviewItem);
