import React from 'react';
import {shallow} from 'enzyme';
import ConnectionScreen from '../Components/ConnectionScreen';

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

describe('ConnectionScreen', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<ConnectionScreen data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});