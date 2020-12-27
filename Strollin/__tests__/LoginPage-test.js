import React from 'react';
import {shallow} from 'enzyme';
import LoginPage from '../Components/LoginPage';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

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
    });
});