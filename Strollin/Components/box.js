import {
  Image, View, StyleSheet, Text, TouchableOpacity, ImageBackground
} from 'react-native';
import React from 'react';

function GotoComment(props) {
  props.navigation.setParams({ data: props.data });
  props.navigation.navigate('CommentScreen');
}

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

function Box(props) {
  return (
    <TouchableOpacity
      style={styles.view_box}
      onPress={() => GotoComment(props)}
    >
      <ImageBackground
        style={styles.img_boxBack}
        imageStyle={styles.img_boxBack}
        source={randPic()}
        // source={require(props.data.image)}
      >
        <View style={styles.view_boxIn}>
          <View style={styles.view_information}>
            <Image style={styles.img_buget} source={require('../images/icons/white/money.png')}/>
            <Text style={styles.text_budget}>{props.data.budget}</Text>
          </View>
          <View style={styles.view_information}>
            <Image style={styles.img_information} source={require('../images/icons/white/marker.png')}/>
            <Text style={styles.text_information}>{props.data.destinations[0]} - </Text>
            <Text style={styles.text_information}>{props.data.destinations[1]} - </Text>
            <Text style={styles.text_information}>{props.data.destinations[2]}</Text>
          </View>
          <Text style={styles.text_name}>{props.data.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default Box;

const styles = StyleSheet.create({
  view_box: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 12,
    width: 330,
    height: 235,
    marginBottom: 30,
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
  img_buget: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  text_budget: {
    fontSize: 22,
    color: '#FFFFFF',
  },
  text_name: {
    fontSize: 28,
    letterSpacing: 2,
    fontWeight: 'bold',
    color: '#FFFFFF',
  }
});
