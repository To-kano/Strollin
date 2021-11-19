import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import I18n from '../../Translation/configureTrans';
const globalStyles = require('../../Styles');

export default function Step({actualStep, finishStep, onPressFct}) {
    if (actualStep == 1) {
        return (
            <TouchableOpacity style={{flexDirection: 'row', position: 'absolute', top: 16, left: 16, alignItems: 'center' }}>
                <Text style={[globalStyles.subparagraphs, {marginLeft: 8}]}>
                    {I18n.t('Step.step')} {actualStep} {I18n.t('Step.to')} {finishStep}
                </Text>
            </TouchableOpacity>
        );
    }
    return (
        <TouchableOpacity onPress={onPressFct} style={{flexDirection: 'row', position: 'absolute', top: 16, left: 16, alignItems: 'center' }}>
            <Icon name='step_before' size={16} color='#0989FF'/>
            <Text style={[globalStyles.subparagraphs, {marginLeft: 8}]}>
                {I18n.t('Step.step')} {actualStep} {I18n.t('Step.to')} {finishStep}
            </Text>
        </TouchableOpacity>
    )
}
