import React from 'react';
import {shallow} from 'enzyme';
import Map from '../Components/map';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';


const navigationTest = {
    navigate: (test) => jest.fn()
}

const dispatchtest = (test) => jest.fn();

const deltaviewTest = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const positionTest = {
    permission: true,
  asked: true,
  update: true,
  position: {
    latitude: 48.815641,
    longitude: 2.363224,
  },
  region: {
    latitude: 48.815641,
    longitude: 2.363224,
    latitudeDelta: 0.1622,
    longitudeDelta: 0.1021
  }
}

const waypointTest = [
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

describe('Map', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <Map 
                    navigation={navigationTest}
                    dispatch={dispatchtest}
                    position={positionTest}
                    height={310}
                    width={310}
                    deltaView={deltaviewTest}
                    waypoints={waypointTest}
                />
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        //test('test render Map', () => {
        //    renderer.create(
        //        <Provider store={Store}>
        //            <Map 
        //                navigation={navigationTest}
        //                dispatch={dispatchtest}
        //                position={positionTest}
        //                height={310}
        //                width={310}
        //                deltaView={deltaviewTest}
        //                waypoints={waypointTest}
        //            />
        //        </Provider>)
        //  })
    });
});