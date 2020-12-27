import React from 'react';
import {shallow} from 'enzyme';
import Socket from '../Components/Socket';

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

describe('Socket', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Socket data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});