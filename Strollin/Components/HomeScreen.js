import React, { useState, useEffect } from 'react';
import {
  Button, View, FlatList, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import getGallery from '../API/getGallery';
import Gallery from './Gallery';
import I18n from "../Translation/configureTrans";


const defaultPage = {
  section: '/hot',
  sort: '',
  pageRequest: 0,
  pageDisplay: 0,
  window: '',
  showViral: null,
  mature: null,
  album_previews: null
};

function HomeScreen(props) {

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const action = { type: 'SET_GALLERY', value: gallery };
    props.dispatch(action);
    DisplayMoreMedia();
  }, [gallery]);

  const [page, setPage] = useState(defaultPage);

  useEffect(() => {
    getGallery(props.profil.access_token, page).then((answer) => {
      setGallery(
        [
          ...gallery,
          ...answer.data
        ]
      );
    });
  }, [page]);

  const [pageDisplay, setPageDisplay] = useState({
    nbDisplay: 0,
    galleryDisplay: []
  });

  useEffect(() => {
  }, [pageDisplay]);

  const NextPage = () => {
    const newPage = {
      ...page,
      pageRequest: page.pageRequest + 1,
    };
    setPage(newPage);
  };

  let loading = false;
  const DisplayMoreMedia = () => {
    if (loading) {
      return;
    }
    loading = true;
    if (pageDisplay.nbDisplay < gallery.length + 1) {
      const newDisplay = {
        ...pageDisplay,
        nbDisplay: pageDisplay.nbDisplay + 10
      };

      for (let i = pageDisplay.nbDisplay; i < pageDisplay.nbDisplay + 10
        && i < gallery.length; i += 1) {
        newDisplay.galleryDisplay.push(gallery[i]);
      }
      loading = true;
      setPageDisplay(newDisplay);
    } else {
      NextPage();
    }
  };

  return (
    <View
      style={styles.container}
    >
      <Button
        title={I18n.t("jane")}
        onPress={() => props.navigation.navigate('Profile', { name: 'Jane' })}
      />
      <View
        style={{
          height: '85%'
        }}
      >
        <FlatList
          data={pageDisplay.galleryDisplay}
          renderItem={(item) => <Gallery data={item.item} />}
          keyExtractor={(item) => item.id}
          onResponderEnd={DisplayMoreMedia}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => state;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
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

export default connect(mapStateToProps)(HomeScreen);
