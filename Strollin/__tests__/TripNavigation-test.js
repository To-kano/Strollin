import React from 'react';
import {shallow} from 'enzyme';
import ConnectedTripNavigation, {TripNavigation} from '../Components/TripNavigation';

import {
  StyleSheet, AppState, View, Text, Button, BackHandler, Image, TouchableOpacity
} from 'react-native';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';


const navigationTest = {
    navigate: (test) => jest.fn()
}

const dispatchtest = (test) => jest.fn();

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
    historic: [historyNavTest1, historyNavTest2],
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
}

describe('TripNavigation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectedTripNavigation navigation={navigationTest}
                    dispatch={dispatchtest}
                    map={mapTest} />
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        it('handles button', async () => {

          const wrapper =  shallow(
                  <TripNavigation
                  navigation={navigationTest}
                  dispatch={dispatchtest}
                  map={mapTest}
                   />
          );

          expect(wrapper.find(TouchableOpacity).length).toBe(6);

          wrapper
          .find(TouchableOpacity)
          .at(0)
          .props()
          .onPress()

          wrapper
          .find(TouchableOpacity)
          .at(1)
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

          

          
    
        });

        it("should ouch last button", async () => {

          const wrapper =  shallow(
            <TripNavigation
            navigation={navigationTest}
            dispatch={dispatchtest}
            map={mapTest}
             />
          );
  
          return new Promise(resolve => setImmediate(resolve)).then(() => {

              wrapper
              .find(TouchableOpacity)
              .at(5)
              .props()
              .onPress()  
          });
      });

    });
});