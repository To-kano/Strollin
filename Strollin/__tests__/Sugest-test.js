import React from 'react';
import {shallow} from 'enzyme';
import Sugest from '../Components/sugest';

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

describe('Sugest', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Sugest data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});