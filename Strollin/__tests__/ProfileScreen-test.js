import React from 'react';
import {shallow} from 'enzyme';
import ConnectedProfileScreen, {ProfileScreen} from '../Components/ProfileScreen';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import {
    Button, View, StyleSheet, Image, Text, TouchableOpacity, TextInput
} from 'react-native';


const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const profilTest = {
    pseudo: "pierre",
    mail: "test@test.com"
}

describe('ProfileScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
            <ConnectedProfileScreen 
                navigation={navigationTest}
                profil={profilTest}/>
            </Provider>
            )
            expect(component).toMatchSnapshot()
        });

        test('test render ProfileScreen', () => {
            renderer.create(
                <Provider store={Store}>
                <ConnectedProfileScreen 
                    navigation={navigationTest}
                    profil={profilTest}/>
                </Provider>
                )
          })

          it('handles button', () => {

            const wrapper =  shallow(
                    <ProfileScreen 
                    navigation={navigationTest}
                    profil={profilTest}/>
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

            expect(wrapper.find(Button).length).toBe(1);

            wrapper
            .find(Button)
            .at(0)
            .props()
            .onPress()



          });
    });
});