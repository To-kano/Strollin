import React, { useState } from 'react';
import {
  StyleSheet, View, FlatList, Text, TouchableOpacity, TextInput, Input
} from 'react-native';
import Stars from 'react-native-stars';
import { connect } from 'react-redux';
import { IP_SERVER, PORT_SERVER } from '../env/Environement';
import Store from '../Store/configureStore';

function test(props) {
  console.log("test success");
  props.navigation.navigate("TripSuggestion");
}

function Back(props) {
  props.navigation.navigate('HomePage');
}

export function CourseSettings(props) {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('0');
  const [budget, setBudget] = useState('0');

  return (
    <View style={styles.container}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 40 }}> {"Select your options!\n\n"} </Text>
      </View>
      <Text style={{ fontSize: 25  }}> {"Select your budget:"} </Text>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput 
             style={styles.budgetInput}
             keyboardType='numeric'
             onChangeText={(text)=> setBudget(text)}
             value={budget}
             maxLength={6}  //setting limit of input
          />
          <Text style={{ fontSize: 25 }}> € </Text>
        </View>
        <Text> {} </Text>
        <Text style={{ fontSize: 25 }}> {"Select your spending time:"} </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput 
             style={styles.timeInput}
             keyboardType='numeric'
             onChangeText={(text)=> setHours(text)}
             value={hours}
             maxLength={2}  //setting limit of input
          />
          <Text style={{ fontSize: 25 }}> Hour(s) </Text>
          <TextInput 
             style={styles.timeInput}
             keyboardType='numeric'
             onChangeText={(text)=> setMinutes(text)}
             value={minutes}
             maxLength={2}  //setting limit of input
          />
          <Text style={{ fontSize: 25 }}> Minute(s) </Text>
        </View>
      </View>

      <Text> {"\n"} </Text>
      <View>
        <TouchableOpacity
          id={'test'}
          style={styles.newTrip}
          onPress={() => {
            test(props);
          }}
        >
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
            Go!
          </Text>
        </TouchableOpacity>
      </View>
      <Text>{"\n"}</Text>
      <View>
        <TouchableOpacity
          id={'test'}
          style={styles.newTrip}
          onPress={() => {
            Back(props);
          }}
        >
          <Text style={{ fontSize: 16, color: '#FFFFFF' }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(CourseSettings);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  },
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
  budgetInput: {
    width: '15%',
    height: '75%',
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    marginLeft: '2%'
  },
  timeInput: {
    width: '6%',
    height: '75%',
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    marginLeft: '2%'
  },
});
