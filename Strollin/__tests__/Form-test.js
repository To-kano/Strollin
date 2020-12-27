import React from 'react';
import {shallow} from 'enzyme';
import Form from '../Components/Form';


describe('Form', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Form />)
            expect(component).toMatchSnapshot()
        });
    });
});