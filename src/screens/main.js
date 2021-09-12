import * as React from 'react';
import { View,
         Image,
         StyleSheet,
         Dimensions,
         ActivityIndicator,
         Text,
         BackHandler,
         Alert } from 'react-native';
import { Button,
         Modal } from 'react-native-paper';

import Barcode from "react-native-barcode-builder";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Sound = require('react-native-sound')
Sound.setCategory('Playback');

import RemedySearch from '../comps/remedySearch';
import * as API from '../lib/api';

const scrHeight = Dimensions.get('window').height;
const scrWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logoView: {
      backgroundColor: '#54B9FF',
      display: 'flex',
      alignItems: 'center',
      height: '20%',
  },
  logo: {
    height: '20%',
    resizeMode: 'contain',
    marginBottom: 4,
  },
  logoB: {
    height: '70%',
    resizeMode: 'contain',
  },
  pickerView: {
      margin: 12,
  },
  codeView: {
      height: '55%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
  },
  actionsView:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly'
  },
  actionA:{
      backgroundColor: '#54B9FF',
  },
  actionAlb:{
      color: '#FFFFFF',
      fontWeight: 'bold',
  },
  actionB:{
      backgroundColor: '#FF5463',
  },
  actionBlb:{
      color: '#FFFFFF',
      fontWeight: 'bold',
  },
  vwLabel:{
      marginTop: 4,
      marginHorizontal: 24,
      display: 'flex',
      alignItems: 'center',
      borderColor: '#FFFFFF',
      backgroundColor: '#54B9FF',
      borderWidth: 4,
      borderRadius: 16,
  },
  vwRate:{
      color: '#FFFFFF',
      fontWeight: 'bold',
  },
  vwName:{
      color: '#FFFFFF',
      fontSize: 24,
  },
});

export default function Main(props){

    const [load, isLoad] = React.useState(false);
    const [remedies, setRemedies] = React.useState([]);
    const [remedy, setRemedy] = React.useState({id:-1, label: 'Principal', value: '012345679801234567890123456789'});
    const [ready, isReady] = React.useState(false);
    const [search, isSearch] = React.useState(false);
    const [generate, isGenerate] = React.useState(false);
    const [timer, setTimer] = React.useState(null);
    const [counter, setCounter] = React.useState(0);

    React.useEffect(() => {
        const backAction = () => {
        Alert.alert("Log out", "Are you sure you want to log out from this device?", [
            {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
            },
            { text: "YES", onPress: () => handleLogout() }
        ]);
        return true;
        };

        const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
        );

        return () => backHandler.remove();
    }, []);

    React.useEffect(() =>{
        if(load){
            return;
        }

        isLoad(true);
        getRemedies();
    });

    React.useEffect(() => {
        isReady(true);
    }, [remedy]);

    React.useEffect(() => {
        if(counter <= 0){
            isGenerate(false);
            return;
        }

        if(counter > 15){
            setCounter(0);
            return;
        }

        couting();

        let starter = setInterval(() => {setCounter(counter + 1)}, 800);
        return () => clearInterval(starter);
    },[counter]);
    
    const getRemedies = async() => {
        try {
            var result = await AsyncStorage.getItem('@remedies');
            result = result === null ? undefined : JSON.parse(result);
        } catch(e) {
            //
        }

        var rems = [];

        for(var i = 0; i < result.length; i++){
            var rem ={
                id: result[i][0],
                label: result[i][1],
                value: result[i][2],
            }

            rems.push(rem);
        }

        setRemedies(rems);  
    }

    const serachRemedy = async() => {
        isSearch(true);
    }

    const handleSelected = async(r) => {
        isReady(false);
        isSearch(false);
        setRemedy(r);
    }

    const handleGenerate = async() => {
        isGenerate(true);
        setCounter(counter + 1);
    }

    const couting = async() =>{
        const sn = new Sound(
            "clip.mp3",
            Sound.MAIN_BUNDLE,
            error => {
                if (error) {
                    console.log("failed to load the sound", error);
                    return;
                }

                sn.play((success) => {        
                    sn.release();
                });

            }
        );
    }   

    const handlePotentiation = async() => {
        alert('Feature comming soon!');
    }

    const handleLogout = async() => {
        try {
            var result = await AsyncStorage.getItem('@session');
            result = result === null ? undefined : JSON.parse(result);
        } catch(e) {
            //
        }

        try {
            await AsyncStorage.removeItem('@session')
        } catch(e) {
            alert('An error ocurred while log out. \nPlease, try again later');
            return;
        }

        if(result !== undefined){
            try{
                var device = await  API.logOut(result[0]);
            }catch(e){
                device = undefined;
            }
        }

        BackHandler.exitApp();
    }
    
    return (
        <>
            <View
                style={styles.logoView}
            >
                <Image
                    style={styles.logo}
                    source={require('../../media/logoCopen.png')}
                />
                <Image
                    style={styles.logoB}
                    source={require('../../media/logoEasy.png')}
                />
            </View>
            {/* Button to select rate */}
            <View
                style={{...styles.pickerView, display: search ? 'none' : 'flex'}}
            >
                <Button
                    disabled={generate}
                    mode='contained'
                    style={styles.actionA}
                    labelStyle={styles.actionAlb}
                    onPress={() => serachRemedy()}
                >
                    SEARCH REMEDY
                </Button>
            </View>
            {/* Barcode area */}
            <View
                style={styles.codeView}
            > 
                <View
                    style={{
                        transform: [{ rotate: '90deg'}],
                    }}
                >
                    {!ready && (
                        <ActivityIndicator 
                            size={40}
                            color='#54B9FF'
                        />
                    )}

                    {ready && (
                        <Barcode 
                            height={scrWidth * .9}
                            width={1.5}
                            value={remedy.value} 
                            format="CODE128"
                            background='#FBE400'
                        />
                    )}
                </View>
            </View>
            {/* Actions buttons */}
            <View
                style={styles.actionsView}
            > 
                <Button
                    disabled={generate}
                    style={styles.actionA}
                    labelStyle={styles.actionAlb}
                    onPress={() => handlePotentiation()}
                >
                    POTENTISATION
                </Button>
                <Button
                    disabled={generate || remedy.id < 0}
                    style={styles.actionB}
                    labelStyle={styles.actionBlb}
                    onPress={() => handleGenerate()}
                >
                    {generate ? 'GENERATING...' : 'GENERATE REMEDY'}
                </Button>
            </View>

            <View
                style={styles.vwLabel}
            >
                {remedy.id > -1 && (
                    <Text
                        style={styles.vwRate}
                    >
                        {remedy.id > -1 ? `Rate:${remedy.value}` : ""}
                    </Text>
                )}

                <Text
                    style={styles.vwName}
                >
                    {remedy.id > -1 ? remedy.label : "Select a remedy"}
                </Text>
            </View>

            <Modal visible={search} onDismiss={() => isSearch(false)}>
                <RemedySearch rList={remedies} onSelect={handleSelected}/>
            </Modal>
        </>
    );
}