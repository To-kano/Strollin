import React from 'react';
import {shallow} from 'enzyme';
import Notation from '../Components/Notation';

const navigationTest = {
    navigate: (test) => jest.fn()
}


describe('Notation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Notation navigation={navigationTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});