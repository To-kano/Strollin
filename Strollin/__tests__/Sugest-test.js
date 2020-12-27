import React from 'react';
import {shallow} from 'enzyme';
import Sugest from '../Components/sugest';

describe('Sugest', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Sugest />)
            expect(component).toMatchSnapshot()
        });
    });
});