import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import I18n from '../Translation/configureTrans';
import getImage from '../API/getImage';
import DisplayMedia from './Media/DisplayMedia';

function Gallery({ data }) {
  const [cover, setImageCover] = useState(null);

  if (!cover && data.cover) {
    getImage(data.cover).then((answer) => {
      setImageCover(answer.data);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
      <Text>
        {I18n.t('by')}
        {data.account_url}
      </Text>
      <DisplayMedia data={cover} />
      <View style={styles.detail}>
        <Text>
          {data.views}
          {' '}
          {I18n.t('views')}
        </Text>
        <Text>
          {data.points}
          {' '}
          {I18n.t('points')}
        </Text>
      </View>
      <Text>
        {' '}
        {I18n.t('description')}
        {' '}
      </Text>
      <Text>{data.description}</Text>
    </View>
  );
}

export default Gallery;

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
