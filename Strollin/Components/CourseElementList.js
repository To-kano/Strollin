import React from 'react';
import {
   View, FlatList, ImageBackground,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CourseElement from './CourseElement';

function randPic() {
  const rand = (Math.floor(Math.random() * 2) + 1);

  if (rand === 1) {
    return (require('../ressources/street2.jpg'));
  }
  return (require('../ressources/street1.jpg'));
}

function CourseElementList({ course, locations }) {
  //const navigation = useNavigation();
  //console.log(locations);

    return (
      <View style={styles.view_back}>
        <FlatList
          style={styles.view_list}
          data={locations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (

              <ImageBackground
                style={styles.img_boxBack}
                imageStyle={styles.img_boxBack}
                source={randPic()}
              >
                <CourseElement item={item} />
              </ImageBackground>
          )}
        />
        <TouchableOpacity
            onPress={() => {
              console.log("test")
            }}
            accessibilityLabel="Share"
          >
              <Image style={styles.img_share} source={require('../images/icons/white/share.png')} />
          </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  view_back: {
    flex: 1,
    maxHeight: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E1E2E7',
    paddingTop: '1.8%',
    paddingLeft: '0%',
    paddingRight: '0%',
    paddingBottom: '1.8%',
  },
  img_boxBack: {
    //flex: 1,
    marginBottom: 12.5,
    width: 330,
    height: 179,

    borderRadius: 12,
  },
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(CourseElementList);
