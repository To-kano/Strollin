import React from 'react';
import {shallow} from 'enzyme';
import ProfileScreen from '../Components/ProfileScreen';

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

describe('ProfileScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<ProfileScreen data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});