import React from 'react';
import {shallow} from 'enzyme';
import HomeScreen from '../Components/HomeScreen';

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

describe('HomeScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<HomeScreen data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});