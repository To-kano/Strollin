import React from 'react';
import {shallow} from 'enzyme';
import FriendList from '../Components/FriendList';
import renderer from 'react-test-renderer';


describe('FriendList', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<FriendList />)
            expect(component).toMatchSnapshot()
        });

        test('test render FriendList', () => {
            renderer.create(
                <FriendList />,
            )      
          })

          it('handles Button', () => {
            // Create a mock function to pass as a handler
            //const onChangeText = (test) => jest.fn();
        
            // Render our button with an image inside
            const wrapper =  shallow(<FriendList/>);
        
            // Find a TouchableOpacity and press it

            expect(wrapper.find({ id: 'testButton' }).length).toBe(1);

            wrapper
              .find({ id: 'testButton' })
              .first()
              .props()
              .onPress()
        
            });

            it('handles TextInput', () => {
                // Create a mock function to pass as a handler
                //const onChangeText = (test) => jest.fn();
            
                // Render our button with an image inside
                const wrapper2 =  shallow(<FriendList/>);
            
                // Find a TouchableOpacity and press it
    
                expect(wrapper2.find({ id: 'testTextInput' }).length).toBe(1);
    
                wrapper2
                  .find({ id: 'testTextInput' })
                  .first()
                  .props()
                  .onChangeText()
            
                });
    });
});