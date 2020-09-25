import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import getImage from '../API/getImage';
import DisplayMedia from './Media/DisplayMedia';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    margin: 5,
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

function Gallery({ data }) {
  // console.log("gallery:\n")
  /// /console.log("props:")
  /// /console.log(props)
  // console.log('\n\ndata:\n')
  // console.log(props.data)

  const [cover, setImageCover] = useState(null);

  // if (!props.data.cover) {
  //    console.log("\n\nNo cover:\n")
  //    console.log(props.data)
  // }

  if (!cover && data.cover) {
    getImage(data.cover).then((answer) => {
      // console.log("answer is :\n");
      // console.log(answer.data);
      setImageCover(answer.data);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text>
        by
        {data.account_url}
      </Text>
      <DisplayMedia data={cover} />
      <View style={styles.detail}>
        <Text>
          {data.views}
          {' '}
          views
        </Text>
        <Text>
          {data.points}
          {' '}
          points
        </Text>
      </View>
      <Text>description</Text>
      <Text>{data.description}</Text>
    </View>
  );
}

export default Gallery;
