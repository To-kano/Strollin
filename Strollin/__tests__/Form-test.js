import React from 'react';
import {shallow} from 'enzyme';
import Form from '../Components/Form';
import renderer from 'react-test-renderer';

describe('Form', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Form />)
            expect(component).toMatchSnapshot()
        });

        test('test render Form', () => {
            renderer.create(
                <Form />,
            )      
          })
    });
});