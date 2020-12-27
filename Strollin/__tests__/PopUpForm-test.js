import React from 'react';
import {shallow} from 'enzyme';
import PopUpForm from '../Components/PopUpForm';

describe('PopUpForm', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<PopUpForm />)
            expect(component).toMatchSnapshot()
        });
    });
});