import React, {useState} from 'react';
import {
   View, Text, Button,
  StyleSheet
} from 'react-native';

import Carousel from 'react-native-snap-carousel';

const dataTutoriel = [
    {
        title : "title",
        description : "this is a description long with a lot of text to test the length of a description lol",
    },
    {
        title : "title 2",
        description : "this is a description long with a lot of text to test the length of a description lol mrd",
    }
]


function TutorialPage() {

    _renderItem = ({item, index}) => {
        return (
            <View style={{}}>
                <Text style={{}}>{ item.title }</Text>
                <Text style={{}}>{ item.description }</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>TutorialPage</Text>
            <Carousel
              //ref={(c) => { this._carousel = c; }}
              data={dataTutoriel}
              renderItem={this._renderItem}
              sliderWidth={400}
              itemWidth={400}
            />
        </View>
    )
}

export default TutorialPage;