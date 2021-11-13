import React from 'react'
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import LinearGradient from 'react-native-linear-gradient';

export default function Footer({primaryText, primaryOnPressFct, secondaryText, secondaryOnPressFct}) {
    return (
        <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,1)']} style={{position: 'absolute', bottom: 0, right: 0, left: 0, paddingHorizontal: 16, paddingVertical: 12 }}>
            {secondaryText && secondaryOnPressFct &&
                <SecondaryButton text={secondaryText} onPressFct={secondaryOnPressFct} />
            }
            {primaryText && primaryOnPressFct && (
                <PrimaryButton text={primaryText} onPressFct={primaryOnPressFct}/>
                )
            }
        </LinearGradient>
    )
}