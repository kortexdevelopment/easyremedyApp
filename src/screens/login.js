import * as React from 'react';
import { View,
         Image,
         StyleSheet,
         Dimensions } from 'react-native';
import { TextInput,
         Button,
         ActivityIndicator } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as API from '../lib/api';

const scrHeight = Dimensions.get('window').height;

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#FFFFFF',
    placeholder  : '#FFFFFF',
    text: '#FFFFFF',
  }
};

const styles = StyleSheet.create({
  logoView: {
      backgroundColor: '#54B9FF',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  logo: {
    flex: 1,
    height: '10%',
    resizeMode: 'contain',
  },
  inputView: {
      flex: 1,
      display: 'flex',
      width: '100%',
      padding: 24,
  },
  inputTxt: {
      backgroundColor: '#54B9FF',
      marginBottom: 12,
  },
  inputBtn: {
      backgroundColor: '#FFFFFF',
      borderRadius: 45,
      width: '50%',
  }
});

export default function Login(props){

    const [verify, doVerify] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');

    const handleLogin = async() => {
        doVerify(true);

        if(![email, pass].every(Boolean)){
            alert("All inputs are required");
            doVerify(false);
            return;
        }

        try{
            var result = await API.verifyLogin(email, pass);
            console.log(result);
        }catch(e){
            alert('Something went wrong while loggin in');
            doVerify(false);
            return;
        }

        if(result.login === null){
            alert('The credentials used do not exists');
            doVerify(false);
            return;
        }

        if(Number(result.login[5]) === 0 || Number(result.login[6]) === 1){
            alert('This credentials cannot be used.\n Please check our FAQ E:001.');
            doVerify(false);
            return;
        }

        var device = await handleDevice(result.login[0]);

        if(!device){
            alert('This credentials cannot be used.\n Please check our FAQ E:002.');
            doVerify(false);
            return;
        }

        try {
            const sessionJson = JSON.stringify(result.login);
            await AsyncStorage.setItem('@session', sessionJson)
        } catch (e) {
            alert('Your session could not be saved.\n Please contact support E:003.');
            console.log(e);
            doVerify(false);
            return;
        }

        props.navigation.navigate('Main');   

    }

    const handleDevice = async(id) => {
        try{
            var result = await API.logDevice(id);
        }catch(e){
            console.log('ERROR: Internal Device Function');
            return false;
        }

        if(!result.succes){
            console.log('ERROR: Device Handle Fail');
            return false;
        }

        return true;
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

                <View
                    style={styles.inputView}
                >
                    <TextInput
                        disabled={verify}
                        style={styles.inputTxt}
                        theme={theme}
                        mode='outlined'
                        label='User'
                        placeholder='user@mail.com'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    
                    <TextInput
                        disabled={verify}
                        style={styles.inputTxt}
                        theme={theme}
                        mode='outlined'
                        label='Password'
                        placeholder='Password'
                        value={pass}
                        onChangeText={text => setPass(text)}
                    />

                    <View
                        style={{
                            display: verify ? 'none' : 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            style={styles.inputBtn}
                            mode='contained'
                            onPress={()=>handleLogin()}
                        >
                            Log In
                        </Button>
                    </View>

                    <View
                        style={{
                            display: !verify ? 'none' : 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ActivityIndicator 
                            size={40}
                            color='#FFFFFF'
                        />
                    </View>

                </View>

            </View>
        </>
    );
}