import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import {
  getMoviesFromApi,
  getGoogleApiItinerary,
  nextPageApiSearchCall,
  getGoogleApiSearch,
  getGoogleApiPlaceDetails
} from './google-api.js';

const dumbUrl = 'https://facebook.github.io/react-native/movies.json';

export default class GoogleApiTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: []
    };
  }

  componentDidMount() {
    fetch(dumbUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('######################################API responseJson', responseJson);
        this.setState({
          loading: false,
          dataSource: responseJson.movies
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (this.state.isLoading) {
      <View style={styles.container}>
        <ActivityIndicator />
      </View>;
    } else {
      const movies = this.state.dataSource.map((val, key) => (
        <View key={key} style={styles.item}>
          <Text>
            Id =
            {val.id}
          </Text>
          <Text>
            Title:
            {val.title}
          </Text>
          <Text>
            ReleaseYear:
            {val.releaseYear}
          </Text>
        </View>
      ));
      const test3 = getGoogleApiSearch('json', '-33.8670522', '151.1957362', '1000', 'bakery');
      getGoogleApiPlaceDetails('json', 'ChIJN1t_tDeuEmsRUsoyG83frY4', 'name,rating,reviews');
      getGoogleApiPlaceDetails('json', 'ChIJwbW5ATquEmsR5r2YuYg1aKU', 'name,rating,reviews');
      return (
        <View style={styles.container}>
          <Text>Data Loaded</Text>
          {movies}
          <Button
            title="Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
  }
});
