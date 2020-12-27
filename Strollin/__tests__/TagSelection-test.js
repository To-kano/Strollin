import React from 'react';
import {shallow} from 'enzyme';
import TagSelection from '../Components/TagSelection';

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

describe('TagSelection', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<TagSelection data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});