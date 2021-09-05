import React, {useState} from 'react';
import {
   View, Text, Button, TouchableOpacity, ScrollView,
  StyleSheet, Image
} from 'react-native';

import Carousel from 'react-native-snap-carousel';


function TutorialItem({data, title}) {

    const _renderItem = ({item, index}) => {
        return (
            <View style={
                {
                    backgroundColor : 'red',
                    backgroundColor:'floralwhite',
                    borderRadius: 5,
                    height: 520,
                    padding: 50,
                    margin : 25,
                }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    letterSpacing: 2,
                    textAlign: 'center',
                    color: '#000000',
                    marginBottom : 10,
                }}>{ item.title }</Text>
                <Image style={{width : 150, height : 300}} source={item.image} />
                <Text style={{
                    fontSize: 12,
                    letterSpacing: 1.4,
                    textAlign: 'center',
                    color: '#000000',
                    marginTop : 20,
                }}>{ item.description }</Text>
            </View>
        );

    }

    return (
        <View
            style={
                {
                    backgroundColor:'white',
                    borderRadius: 5,
                    paddingVertical: 20,
                    marginBottom : 25,
                }}
            >
            <Text style={{
                fontWeight: 'bold',
                fontSize: 25,
                letterSpacing: 2,
                textAlign: 'center',
                color: '#000000',
            }}>{title}</Text>
            <Carousel
              //ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={_renderItem}
              sliderWidth={400}
              itemWidth={300}
              layout={'default'}
              layoutCardOffset={9}
            />
        </View>
    )

}

export default TutorialItem;

const styles = StyleSheet.create({
  });