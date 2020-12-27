import React from 'react';
import {shallow} from 'enzyme';
import ConnectionScreen from '../Components/ConnectionScreen';

describe('ConnectionScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<ConnectionScreen />)
            expect(component).toMatchSnapshot()
        });
    });
});