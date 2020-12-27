import React from 'react';
import {shallow} from 'enzyme';
import Form from '../Components/Form';

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

describe('Form', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Form data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});