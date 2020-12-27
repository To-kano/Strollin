import React from 'react';
import {shallow} from 'enzyme';
import UserRegister from '../Components/UserRegister';

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

describe('UserRegister', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<UserRegister data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});