import React from 'react';
import {shallow} from 'enzyme';
import TripSuggestion from '../Components/TripSuggestion';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';

import renderer from 'react-test-renderer';


const navigationTest = {
    navigate: (test) => jest.fn(),
    setOptions: (test) => jest.fn()
}

const dispatchtest = (test) => jest.fn();

describe('TripSuggestion', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <TripSuggestion dispatch={dispatchtest} navigation={navigationTest} />
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        //test('test render TripSuggestion', () => {
        //    renderer.create(
        //        <Provider store={Store}>
        //            <TripSuggestion dispatch={dispatchtest} navigation={navigationTest} />
        //        </Provider>)
        //  })
    });
});