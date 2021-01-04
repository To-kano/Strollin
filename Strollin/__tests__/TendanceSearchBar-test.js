import React from 'react';
import {shallow} from 'enzyme';
import TendanceSearchBar from '../Components/TendanceSearchBar';
import renderer from 'react-test-renderer';


const onPresstest = (test) => jest.fn();


describe('TendanceSearchBar', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<TendanceSearchBar onPress={onPresstest}/>)
            expect(component).toMatchSnapshot()
        });
    });

    test('test render TendanceSearchBar', () => {
        renderer.create(
            <TendanceSearchBar onPress={onPresstest}/>,
        )      
      })
});