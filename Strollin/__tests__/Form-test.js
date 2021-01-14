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

          it('handles onChangetext', () => {
            // Create a mock function to pass as a handler
            const onChangeText = (test) => jest.fn();
        
            // Render our button with an image inside
            const wrapper =  shallow(<Form value={"test"}  onChangeText={onChangeText}/>);
        
            // Find a TouchableOpacity and press it

            expect(wrapper.find({ value: 'test' }).length).toBe(1);

            wrapper
              .find({ value: 'test' })
              .first()
              .props()
              .onChangeText()
        
            });
    });
});