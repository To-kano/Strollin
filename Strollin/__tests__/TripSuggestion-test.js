import React from 'react';
import {shallow} from 'enzyme';
import TripSuggestion from '../Components/TripSuggestion';

const dataTest = {
    name: 'test',
    budget: '10',
    period: '10 am to 10 pm',
    destinations: [
        '1',
        '2',
        '3',
    ]
}

describe('TripSuggestion', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<TripSuggestion data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});