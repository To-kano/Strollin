import React from 'react';
import {shallow} from 'enzyme';
import TendanceSearchBar from '../Components/TendanceSearchBar';

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

describe('TendanceSearchBar', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<TendanceSearchBar data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});