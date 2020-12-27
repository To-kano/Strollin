import React from 'react';
import {shallow} from 'enzyme';
import CourseEvaluation from '../Components/CourseEvaluation';

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

describe('CourseEvaluation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<CourseEvaluation data={dataTest}/>)
            expect(component).toMatchSnapshot()
        });
    });
});