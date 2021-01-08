import React from 'react';
import {shallow} from 'enzyme';
import ConnectedHomePage, {HomePage, getData, setSortedTendanceData} from '../Components/HomePage';

import { act } from 'react-dom/test-utils';

import {
    StyleSheet, Text, View, Image, TextInput, TouchableOpacity, FlatList, Button
  } from 'react-native';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';


const navigationTest = {
    navigate: (test) => jest.fn()
}

const dispatchTest = (test) => jest.fn()

describe('HomePage', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectedHomePage navigation={navigationTest} dispatch={dispatchTest} />
            </Provider>
            )
            expect(component).toMatchSnapshot()
        });

        test('test render HomePage', () => {
            renderer.create(
                <Provider store={Store}>
                    <ConnectedHomePage navigation={navigationTest} dispatch={dispatchTest} />
                </Provider>
                )
          })

          it('handles touch', () => {

            const conversation = {
                conversationList : [{

                }]
            } 

            const wrapper =  shallow(
                    <HomePage navigation={navigationTest} dispatch={dispatchTest} conversation={conversation}/>
            );

            expect(wrapper.find(TouchableOpacity).length).toBe(9);

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

            wrapper
            .find(TouchableOpacity)
            .at(5)
            .props()
            .onPress()

            wrapper
            .find(TouchableOpacity)
            .at(6)
            .props()
            .onPress()

            wrapper
            .find(TouchableOpacity)
            .at(7)
            .props()
            .onPress()

            wrapper
            .find(TouchableOpacity)
            .at(8)
            .props()
            .onPress()
      
          });

          act(() => {
            getData();
            setSortedTendanceData("bar");
            getData();

          });    
    });
});