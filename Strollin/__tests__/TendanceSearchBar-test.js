import React from 'react';
import {shallow} from 'enzyme';
import TendanceSearchBar from '../Components/TendanceSearchBar';

const onPresstest = (test) => jest.fn();


describe('TendanceSearchBar', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<TendanceSearchBar onPress={onPresstest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});