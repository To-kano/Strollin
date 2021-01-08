import React from 'react';
import {shallow} from 'enzyme';
import Socket, { getProfilCache } from '../Components/Socket';

import Store from '../Store/configureStore';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';


const profilTest = {
    access_token : "vjwhvjhkvjhwkvhjgdkw"
}

const dispatchTest = (test) => jest.fn();

describe('Socket', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(
            <Provider store={Store}>
                <Socket profil={profilTest} dispatch={dispatchTest}/>
            </Provider>)
            expect(component).toMatchSnapshot()
        });

        test('test render socket', () => {
            renderer.create(
                <Provider store={Store}>
                    <Socket profil={profilTest} dispatch={dispatchTest}/>
                </Provider>)
          })

          it('test getProfileCace',async () => {

                await getProfilCache(dispatchTest);
          })
    });
});