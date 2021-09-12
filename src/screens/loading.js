import * as React from 'react';
import { View,
         Image,
         StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as API from '../lib/api';

const styles = StyleSheet.create({
  logoView: {
      backgroundColor: '#54B9FF',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  logo: {
    height: '45%',
    marginBottom: 24,
    resizeMode: 'contain',
  },
});

export default function Loading(props){

    const [loading, isLoad] = React.useState(false);

    React.useEffect(() => {
        if(loading){
            return;
        }

        isLoad(true);
        getRemedies();
    })

    const getSession = async() =>{
        try {
            var session = await AsyncStorage.getItem('@session')
            if(session === null){
                goLogin();
                return;
            }
        } catch(e) {
            alert('Something went wrong while reading sesson\'s data');
        }
        
        session = JSON.parse(session);
        
        var expire = new Date(session[3]);
        var today =  new Date();

        if(expire > today){
            isLoad(false);
            alert('Your credentials has expired');
            return;
        }

        goMain();
    }

    const getRemedies = async() => {
        var updateDate = undefined;
        var today = new Date();
        var errorLog = '';

        try {
            var update = await AsyncStorage.getItem('@update');
            updateDate = update === null ? undefined : new Date(update);
        } catch(e) {
            updateDate = undefined;
            errorLog += 'E:101\n';
        }

        try {
            var remedies = await AsyncStorage.getItem('@remedies');
            remedies = remedies === null ? undefined : JSON.parse(remedies);
        } catch(e) {
            remedies = undefined;
            errorLog += 'E:102\n';
        }

        if(updateDate === undefined || updateDate.getTime() >= today.getTime() || remedies === undefined){
            updateDate = new Date();
            updateDate.setDate( updateDate.getDate() + 7);

            try{
                var result = await API.remedies();
            } catch(e){
                errorLog += 'E:103\n';
                if(remedies === undefined){
                    alert(`Something went wrong while fetching data. \nPlease check our FAQ. \n${errorLog}`);
                    return;
                }
            }

            try {
                const remediesJson = JSON.stringify(result.remedies);
                await AsyncStorage.setItem('@remedies', remediesJson);
            } catch (e) {
                errorLog += 'E:104\n';
                if(remedies === undefined){
                    alert(`Something went wrong while fetching data. \nPlease check our FAQ. \n${errorLog}`);
                    return;
                }
            }

            try {
                await AsyncStorage.setItem('@update', updateDate);
            } catch (e) {
                //
            }
        }

        getSession();

    }

    const goLogin = async() =>{
        props.navigation.navigate('Login');   
    }

    const goMain = async() =>{
        props.navigation.navigate('Main');   
    }

    return (
        <>
            <View
                style={styles.logoView}
            >
                <Image
                    style={styles.logo}
                    source={require('../../media/logoEasy.png')}
                />

                <ActivityIndicator 
                    size={80}
                    color='#FFFFFF'
                />

            </View>
        </>
    );
}