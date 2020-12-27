import React from 'react';
import {shallow} from 'enzyme';
import TripSuggestion from '../Components/TripSuggestion';

const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const dispatchtest = (test) => jest.fn();

describe('TripSuggestion', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<TripSuggestion dispatch={dispatchtest} navigation={navigationTest} />)
            expect(component).toMatchSnapshot()
        });
    });
});