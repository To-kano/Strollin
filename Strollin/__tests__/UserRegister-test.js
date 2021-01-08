import React from 'react';
import {shallow} from 'enzyme';
import ConnectedUserRegister , {UserRegister} from '../Components/UserRegister';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';

import {
    StyleSheet, Text, View, Button, ActivityIndicator, Image, TextInput
} from 'react-native';


const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const dispatchtest = (test) => jest.fn();

describe('UserRegister', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectedUserRegister dispatch={dispatchtest} navigation={navigationTest}/>
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        test('test render UserRegister', () => {
            renderer.create(
                <Provider store={Store}>
                    <ConnectedUserRegister dispatch={dispatchtest} navigation={navigationTest}/>
                </Provider>)
          })

          it('handles button', async () => {

            const wrapper =  shallow(
                    <UserRegister
                    navigation={navigationTest}
                    dispatch={dispatchtest}
                     />
            );
  
            expect(wrapper.find(TextInput).length).toBe(4);
  
            wrapper
            .find(TextInput)
            .at(0)
            .props()
            .onChangeText()

            wrapper
            .find(TextInput)
            .at(1)
            .props()
            .onChangeText()

            wrapper
            .find(TextInput)
            .at(2)
            .props()
            .onChangeText()

            wrapper
            .find(TextInput)
            .at(3)
            .props()
            .onChangeText()
     

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
    });
});