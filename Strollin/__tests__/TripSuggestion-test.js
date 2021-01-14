import React from 'react';
import {shallow} from 'enzyme';
import ConnectedTripSuggestion , {TripSuggestion} from '../Components/TripSuggestion';

import {
    StyleSheet, Text, View, Button, Image, PermissionsAndroid, TouchableOpacity
  } from 'react-native';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';


const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const dispatchtest = (test) => jest.fn();

describe('TripSuggestion', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectedTripSuggestion dispatch={dispatchtest} navigation={navigationTest} />
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        it('handles button', async () => {

            const wrapper =  shallow(
                    <TripSuggestion
                    navigation={navigationTest}
                    dispatch={dispatchtest}
                     />
            );
  
            expect(wrapper.find(TouchableOpacity).length).toBe(5);
  
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

            expect(wrapper.find(Button).length).toBe(2);

            wrapper
            .find(Button)
            .at(0)
            .props()
            .onPress()

            wrapper
            .find(Button)
            .at(1)
            .props()
            .onPress()

          });


        //test('test render TripSuggestion', () => {
        //    renderer.create(
        //        <Provider store={Store}>
        //            <TripSuggestion dispatch={dispatchtest} navigation={navigationTest} />
        //        </Provider>)
        //  })
    });
});