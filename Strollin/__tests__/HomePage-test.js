import React from 'react';
import {shallow} from 'enzyme';
import HomePage from '../Components/HomePage';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

const navigationTest = {
    navigate: (test) => jest.fn()
}

const dispatchTest = (test) => jest.fn()

describe('HomePage', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <HomePage navigation={navigationTest} dispatch={dispatchTest} />
            </Provider>
            )
            expect(component).toMatchSnapshot()
        });
    });
});