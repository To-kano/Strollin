import React from 'react';
import {shallow} from 'enzyme';
import RondForm from '../Components/rondForm';

describe('RondForm', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<RondForm />)
            expect(component).toMatchSnapshot()
        });
    });
});