import React from 'react';
import {shallow} from 'enzyme';
import Notation from '../Components/Notation';
import renderer from 'react-test-renderer';

import {
    Button, Image, View, StyleSheet, Text, ScrollView, FlatList, TextInput
  } from 'react-native';


const navigationTest = {
    navigate: (test) => jest.fn()
}


describe('Notation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<Notation navigation={navigationTest}/>)
            expect(component).toMatchSnapshot()
        });

        test('test render Notation', () => {
            renderer.create(
                <Notation navigation={navigationTest}/>,
            )      
          })

          it('handles button', async () => {

            const wrapper =  shallow(
                    <Notation defaultState={true} />
            );

            expect(wrapper.find(Button).length).toBe(1);

            const dummy = {
                json: () => {
                    return({
                        html_attributions: [],
                result: {
                    formatted_address: "test",
                    /*geometry: {
                        location: {
                            lat: 48.81208969999999,
                            lng: 2.362477
                        },
                        viewport: {
                            northeast: {
                                lat: 48.81343868029148,
                                lng: 2.363825980291502
                            },
                            southwest: {
                                lat: 48.81074071970848,
                                lng: 2.361128019708498
                            }
                        }
                    },*/
                    international_phone_number: "",
                    name: "",
                    opening_hours: {
                        weekday_text: []
                    },
                    photos: [
                        /*{
                            height: 514,
                            html_attributions: [
                                "<a href=\"https://maps.google.com/maps/contrib/100968360572760858473\">Amor CHHIBI</a>"
                            ],
                            photo_reference: "ATtYBwLvzOL2TX4fr3mHjqxgqvF3IM97JwUj_ZQTV47Tmrw75CezEyc1Qop1ePMglkR5ALXg3NKG4eEP62AYqJ-tUDP8aR9GKBxhODQGpDW4LcGnhHruoCli-QlFF3CeYseaIefU_XZWni3iqStIM9k7NfJmxnA6Y0SdsJRPWOWNnRZsaiwT",
                            width: 771
                        },*/
                    ],
                    rating: 0,
                    reviews: [],
                    types: [],
                    user_ratings_total: 0,
                    website: ""
                },
                status: "OK"
                    })},
            };
            global.fetch = jest.fn(() => Promise.resolve(dummy));


            wrapper
            .find(Button)
            .at(0)
            .props()
            .onPress()

            expect(wrapper.find(TextInput).length).toBe(1);

            wrapper
            .find(TextInput)
            .at(0)
            .props()
            .onChangeText()




            const wrapper2 =  shallow(
                <Notation defaultState={false}/>
        );

            wrapper2
            .find(FlatList)
            .at(0)
            .props()
            .keyExtractor({id: "3"});

            wrapper2
            .find(FlatList)
            .at(0)
            .props()
            .renderItem({item: 
                {
                    date : "10/10/2020", 
                    duration: "4 h 00", 
                    waypoints : [{name: "test"}]
                }
            })

            wrapper2
            .find(FlatList)
            .at(1)
            .props()
            .keyExtractor({id: "3"});

            wrapper2
            .find(FlatList)
            .at(1)
            .props()
            .renderItem({item: 
                {
                    date : "10/10/2020", 
                    duration: "4 h 00", 
                    waypoints : [{name: "test"}]
                }
            })
      
          });
    });
});