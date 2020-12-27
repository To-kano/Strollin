import React from 'react';
import {shallow} from 'enzyme';
import CourseEvaluation from '../Components/CourseEvaluation';

describe('CourseEvaluation', () => {
    describe('Rendering', () => {
        it('should match to snapshot', () => {
            const component = shallow(<CourseEvaluation />)
            expect(component).toMatchSnapshot()
        });
    });
});