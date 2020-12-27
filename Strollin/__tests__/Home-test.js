import React from 'react';
import {shallow} from 'enzyme';
import Home from '../Components/Home';

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

describe('Home', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Home data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});