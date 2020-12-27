import React from 'react';
import {shallow} from 'enzyme';
import ConnectionScreen from '../Components/ConnectionScreen';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

describe('ConnectionScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <ConnectionScreen />
            </Provider>)
            expect(component).toMatchSnapshot()
        });
    });
});