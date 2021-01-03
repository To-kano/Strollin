import React from 'react';
import { connect } from 'react-redux';
import {
  View, StyleSheet, Image, Text, TouchableOpacity, TextInput 
} from 'react-native';
import BackgroundImage from './backgroundImage';

function SettingPartenaire(props) {

    return (
        <View style={styles.back}>
            <BackgroundImage />
            <View style={styles.header}>
                <TouchableOpacity
                style={{ width: '20%', height: '100%', marginLeft: 15 }}
                onPress={() => props.navigation.navigate('HomePage')}
                >
                <Image
                    style={{
                    marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
                    }}
                    source={require('../ressources/home.png')}
                />
                </TouchableOpacity>
                <TouchableOpacity
                style={{ width: '20%', height: '100%' }}
                onPress={() => props.navigation.navigate('historicUser')}
                >
                <Image
                    style={{
                    marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
                    }}
                    source={require('../ressources/trip.png')}
                />
                </TouchableOpacity>
                <TouchableOpacity
                style={{ width: '20%', height: '100%' }}
                onPress={() => props.navigation.navigate('TripSuggestion')}
                >
                <Image
                    style={{
                    marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
                    }}
                    source={require('../ressources/plus.png')}
                />
                </TouchableOpacity>
                <TouchableOpacity
                style={{ width: '20%', height: '100%' }}
                onPress={() => props.navigation.navigate('FriendList')}
                >
                <Image
                    style={{
                    marginTop: '10%', height: '65%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
                    }}
                    source={require('../ressources/friend.png')}
                />
                </TouchableOpacity>
                <TouchableOpacity
                style={{ width: '20%', height: '100%' }}
                onPress={() => props.navigation.navigate('Profile')}
                >
                <Image
                    style={{
                    marginTop: '10%', height: '70%', width: '50%', opacity: 0.5, resizeMode: 'stretch'
                    }}
                    source={require('../ressources/profile.png')}
                />
                </TouchableOpacity>
            </View>
            <View style={styles.fill}>
                <View style={styles.logo}>
                    <Image style={{ resizeMode: 'center' }} source={require('../ressources/profile.png')} />
                </View>
                <View style={styles.name}>
                    <Text style={{ fontSize: 40 }}>
                        Nom Entreprise {/* nom de l'entreprise */}
                    </Text>
                </View>
                <View style={styles.infos}>
                <View style={styles.textLine}>
                        <Text style={styles.textInfos}>Description : </Text>
                        <TextInput style={styles.textInput}
                            placeholder='Description de votre commerce'
                            multiline={true}
                        >
                            Commerce de Basile
                        </TextInput>
                    </View>
                    <View style={styles.textLine}>
                        <Text style={styles.textInfos}>Tags : </Text>
                        <TextInput style={styles.textInput}
                            placeholder="Tags rattachez votre commerce"
                            multiline={true}
                        >
                            Tags de Basile
                        </TextInput>
                    </View>
                    <View style={styles.textLine}>
                        <Text style={styles.textInfos}>Localisation : </Text>
                        <TextInput style={styles.textInput}
                            placeholder="Adresse de votre commerce"
                            multiline={true}
                        >
                            Adresse de Basile
                        </TextInput>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    back: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },
    header: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0.08,
        width: '100%',
    },
    fill: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        width: '95%',
        borderRadius: 5,
        opacity: 0.9,
    },
    logo: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
    },
    settings: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    inputText: {
        height: 50,
        width: '100%',
        fontSize: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#404040',
    },
    name: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30%',
    },
    infos: {
        width: "90%",
        flex: 1,
        marginTop: '10%',
        marginBottom: '50%',
    },
    textLine : {
        marginTop: '5%', 
        flexDirection: "column", 
        justifyContent: 'center' 
    },
    textInfos : {
        fontSize: 19, 
        textAlign: "left", 
        width: "100%" 
    },
    textInput : {
        fontSize: 17, 
        textAlign: "left", 
        width: "100%",
        borderRadius: 5,
        backgroundColor:'white'
    }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(SettingPartenaire);
