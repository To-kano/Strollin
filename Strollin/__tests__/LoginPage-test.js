import React from 'react';
import {shallow} from 'enzyme';
import ConnectedLoginPage,  {LoginPage} from '../Components/LoginPage';

import {
    StyleSheet, Text, View, Image, TextInput, Button, Share
} from 'react-native';

import {
    LoginButton, AccessToken, GraphRequest, GraphRequestManager
  } from 'react-native-fbsdk';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';


const navigationTest = {
    navigate: (test) => jest.fn()
}


describe('LoginPage', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectedLoginPage navigation={navigationTest}/>
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        test('test render LoginPage', () => {
            renderer.create(
                <Provider store={Store}>
                    <ConnectedLoginPage navigation={navigationTest}/>
                </Provider>)
          })

          it('handles button', () => {

            const wrapper =  shallow(
                    <LoginPage navigation={navigationTest}/>
            );

            expect(wrapper.find(TextInput).length).toBe(2);

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

            //expect(wrapper.find(LoginButton).length).toBe(1);
//
            //wrapper
            //.find(LoginButton)
            //.at(0)
            //.props()
            //.onLoginFinished(null, {
            //    isCancelled: false
            //})

      
          });
    });
});