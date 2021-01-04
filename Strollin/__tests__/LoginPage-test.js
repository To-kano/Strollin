import React from 'react';
import {shallow} from 'enzyme';
import LoginPage from '../Components/LoginPage';

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
                <LoginPage navigation={navigationTest}/>
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        test('test render LoginPage', () => {
            renderer.create(
                <Provider store={Store}>
                    <LoginPage navigation={navigationTest}/>
                </Provider>)
          })
    });
});