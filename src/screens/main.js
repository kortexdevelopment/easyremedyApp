import * as React from 'react';
import { View,
         Image,
         StyleSheet,
         Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Barcode from "react-native-barcode-builder";
import { Button } from 'react-native-paper';

const scrHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  logoView: {
      backgroundColor: '#54B9FF',
      display: 'flex',
      alignItems: 'center',
      height: '20%',
  },
  logo: {
    height: '90%',
    resizeMode: 'contain',
  },
  pickerView: {
      margin: 12,
  },
  codeView: {
      height: '50%',
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
});

export default function Main(props){
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
        {label: 'Option A', value: '5000'},
        {label: 'Option B', value: '65465765'}
    ]);

    return (
        <>
            <View
                style={styles.logoView}
            >
                <Image
                    style={styles.logo}
                    source={require('../../media/logoPlaceholder.png')}
                />
            </View>
            {/* Button to select rate */}
            <View
                style={styles.pickerView}
            > 
                <DropDownPicker
                    placeholder={`Select Rate's Name`}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
            </View>
            {/* Barcode area */}
            <View
                style={styles.codeView}
            > 
                <Barcode 
                    height={scrHeight / 2.5}
                    value={value !== null ? value : '0'} 
                    text={value !== null ? `Rate: ${value}` : 'Select Rate First'}
                    background='#FBE400'
                    format="CODE128" 
                />
            </View>
            {/* Actions buttons */}
            <View
                style={styles.actionsView}
            > 
                <Button
                    style={styles.actionA}
                    labelStyle={styles.actionAlb}
                    onPress={() => alert(scrHeight)}
                >
                    POTENTISATION
                </Button>
                <Button
                    style={styles.actionB}
                    labelStyle={styles.actionBlb}
                >
                    GENERATE REMEDY
                </Button>
            </View>
        </>
    );
}