import React from 'react';
import {shallow} from 'enzyme';
import FriendList from '../Components/FriendList';

const dataTest = {
    name: 'test',
    budget: '10',
    period: '10 am to 10 pm',
    destinations: [
        '1',
        '2',
        '3',
    ]
}

describe('FriendList', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<FriendList data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});