import React from 'react';
import {shallow} from 'enzyme';
import UserRegister from '../Components/UserRegister';

const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const dispatchtest = (test) => jest.fn();

describe('UserRegister', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<UserRegister dispatch={dispatchtest} navigation={navigationTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});