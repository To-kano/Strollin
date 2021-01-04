import React from 'react';
import {shallow} from 'enzyme';
import FriendList, {addFriend, deleteFriend, getFriend, Item} from '../Components/FriendList';
import renderer from 'react-test-renderer';

import {
    Text, View, TouchableHighlight, FlatList, ScrollView, Button, StatusBar, SafeAreaView, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Dimensions, Image
  } from 'react-native';
  
const mockCallback = jest.fn(x => x);



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

            it('handles textInput', () => {
                // Create a mock function to pass as a handler
                //const onChangeText = (test) => jest.fn();
            
                // Render our button with an image inside
                const wrapper =  shallow(<FriendList/>);
            
                // Find a TouchableOpacity and press it
    
                expect(wrapper.find({ id: 'testTextInput' }).length).toBe(1);
    
                wrapper
                  .find({ id: 'testTextInput' })
                  .first()
                  .props()
                  .onChangeText()
            
                });

            it('handles flatlist', () => {
                // Create a mock function to pass as a handler
                //const onChangeText = (test) => jest.fn();
            
                // Render our button with an image inside
                const wrapper2 =  shallow(<FriendList/>);
            
                // Find a TouchableOpacity and press it
    
                expect(wrapper2.find(View).first().find(ScrollView).first().find(FlatList).length).toBe(2);
    
                wrapper2
                  .find(View).first().find(ScrollView).first().find(FlatList).first()
                  .props()
                  .keyExtractor({id: "3"});
            
                  wrapper2
                  .find(View).first().find(ScrollView).first().find(FlatList).first()
                  .props()
                  .renderItem({item: {name : "pierre"}})
                });

                it('test add Friend', () => {
                    addFriend("tony", [{
                        name: 'pierre',
                        id: '3ad53hbb28ba',
                      }], mockCallback);
                
                    });

                it('test delete Friend', () => {
                    deleteFriend("tony", [{
                        name: 'pierre',
                        id: '3ad53hbb28ba',
                      }], mockCallback);
                
                    });

                it('test delete Friend', () => {

                    const friend = [{
                        name: 'pierre',
                        id: '3ad53hbb28ba',
                      }];

                    const wrapper3 = shallow(<Item title={"pierre"}  friend={friend} func={mockCallback}/>)
                
                    });

                it('test get Friend', () => {
                    const group = [
                        {
                          id: '232131',
                          name: 'work',
                          friend: ['3ad53abb28ba9', '3adg3abb28ba']
                        },
                        {
                          id: '23123123',
                          name: 'play',
                          friend: ['3ad53abb28ba9']
                        },
                        {
                          id: '2132131',
                          name: 'friend',
                          friend: ['3ad53abb28ba1', '3ad53abb28ba9', '3adg3abb28ba', '3ad53hbb28ba', '3ad53abb28ba']
                        },
                        {
                          id: '21321312',
                          name: 'family',
                          friend: ['3ad53abb28ba1', '3ad53abb28ba']
                        }
                      ];

                      const friend = [
                             '3ad53abb28ba',
                      ]
                    getFriend({
                        id: '232131',
                        name: 'work',
                        friend: ['3ad53abb28ba9', '3adg3abb28ba']
                      }, friend);
                    })


                
    });
});