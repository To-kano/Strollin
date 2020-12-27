import React from 'react';
import {shallow} from 'enzyme';
import HomePage from '../Components/HomePage';

const navigationTest = {
    navigate: (test) => jest.fn()
}

const dispatchTest = (test) => jest.fn()

describe('HomePage', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<HomePage navigation={navigationTest} dispatch={dispatchTest} />)
            expect(component).toMatchSnapshot()
        });
    });
});