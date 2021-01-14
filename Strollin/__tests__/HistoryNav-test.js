import React from 'react';
import {shallow} from 'enzyme';

import {
    Text, View, Image, FlatList, Button, ImageBackground, TouchableOpacity, StyleSheet, Dimensions
  } from 'react-native';


import ConnectedHistoryNav, {HistoryNav} from '../Components/HistoryNav';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';


const historyNavTest1 = {
    id: "1",
    date: '10/10/2020',
    duration: '2 heures',
    waypoints: [
        {
          id: '1',
          latitude: 48.798683,
          longitude: 2.446183,
          address: '6 Rue Thomas Edison, 94000 Créteil',
          name: 'Centre Sportif Marie-Thérèse Eyquem',
        },
        {
          id: '2',
          latitude: 48.780627,
          longitude: 2.457364,
          address: 'Centre commercial Créteil Soleil, 101 Avenue du Général de Gaulle, 94012 Créteil',
          name: 'Restaurant Flunch Creteil Soleil',
        }, {
          id: '3',
          latitude: 48.790379,
          longitude: 2.465619,
          address: '75 Avenue Pierre Brossolette, 94000 Creteil village',
          name: 'Le Foz Club discothèque',
        }
      ]
  };

  const historyNavTest2 = {
    id: "2",
    date: '11/11/2020',
    duration: '3 heures',
    waypoints: [
        {
          id: '1',
          latitude: 48.798683,
          longitude: 2.446183,
          address: '6 Rue Thomas Edison, 94000 Créteil',
          name: 'Centre Sportif Marie-Thérèse Eyquem',
        },
        {
          id: '2',
          latitude: 48.780627,
          longitude: 2.457364,
          address: 'Centre commercial Créteil Soleil, 101 Avenue du Général de Gaulle, 94012 Créteil',
          name: 'Restaurant Flunch Creteil Soleil',
        }, {
          id: '3',
          latitude: 48.790379,
          longitude: 2.465619,
          address: '75 Avenue Pierre Brossolette, 94000 Creteil village',
          name: 'Le Foz Club discothèque',
        }
      ]
  };

const mapTest = {
    historic: [historyNavTest1, historyNavTest2]
}

const navigationTest = {
    navigate: (test) => jest.fn()
}

describe('HistoryNav', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectedHistoryNav map={mapTest} navigation={navigationTest} />
            </Provider>
            )
            expect(component).toMatchSnapshot()
        });

        test('test render HistoryNav', () => {
            renderer.create(
                <Provider store={Store}>
                    <ConnectedHistoryNav map={mapTest} navigation={navigationTest} />
                </Provider>
                )
          })

          it('handles TouchableOpacity', () => {
            const wrapper =  shallow(
                    <HistoryNav  map={mapTest} navigation={navigationTest}/>
            );
        

            expect(wrapper.find(TouchableOpacity).length).toBe(6);
            expect(wrapper.find(FlatList).length).toBe(1);

            wrapper
            .find(FlatList)
            .at(0)
            .props()
            .keyExtractor({id: "3"});

            wrapper
            .find(FlatList)
            .at(0)
            .props()
            .renderItem({item: 
                {
                    date : "10/10/2020", 
                    duration: "4 h 00", 
                    waypoints : [{name: "test"}]
                }
            })


            wrapper
            .find(TouchableOpacity)
            .at(1)
            .props()
            .onPress()
            
            wrapper
            .find(TouchableOpacity)
            .at(0)
            .props()
            .onPress()

            wrapper
            .find(TouchableOpacity)
            .at(2)
            .props()
            .onPress()

            wrapper
            .find(TouchableOpacity)
            .at(3)
            .props()
            .onPress()

            wrapper
            .find(TouchableOpacity)
            .at(4)
            .props()
            .onPress()

            wrapper
            .find(TouchableOpacity)
            .at(5)
            .props()
            .onPress()
          });

    });
});