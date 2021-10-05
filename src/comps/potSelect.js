import * as React from 'react';
import { View,
         StyleSheet,
         Dimensions } from 'react-native';
import { TextInput,
         Button,
         RadioButton, 
         Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const scrHeight = Dimensions.get('window').height;
const scrWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logoView: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#54B9FF',
      height: scrHeight * .4,
      width: scrWidth * .9,
      marginLeft: scrWidth * .05,
      borderRadius: 24,
  },
  txtInput: {
      backgroundColor: '#54B9FF',
      margin: 16,
  },
  rate: {
      marginTop: 24,
      marginHorizontal: 16,
      backgroundColor: '#FFFFFF',
  },
  header: {
      display: 'flex',
      marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'center'
  },
  options: {
      display: 'flex',
      marginHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between'
  },
  option: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    primary: '#FFFFFF',
    placeholder  : '#FFFFFF',
    text: '#FFFFFF',
  }
};

export default function PotSelect(props){

    const [potency, setPot] = React.useState('');
    const [label, setLabel] = React.useState('');

    const handleSelect = async() =>{

        if(![potency, label].every(Boolean)){
            alert('All parameters are required');
            return;
        }

        var final = `${potency}-${label}`;

        props.onSelect(final);
    }

    return (
        <>
            <View
                style={styles.logoView}
            >
                {/* Must add theme to Input so looks fine */}
                <TextInput
                    style={styles.txtInput}
                    theme={theme}
                    mode='outlined'
                    label='Potency Value'
                    placeholder='0-9999999'
                    value={potency}
                    onChangeText={text => setPot(text)}
                    keyboardType='numeric'
                />

                 <View
                    style={styles.header}
                >
                    <Text
                        style={{
                            color:'#FFFFFF',
                            fontWeight: 'bold'
                        }}
                    >
                        SELECT POTENCY OPTION
                    </Text>
                </View>

                <View
                    style={styles.options}
                >
                    <View 
                        style={styles.option}
                    >
                        <RadioButton 
                            value={'X'} 
                            status={ label === 'X' ? 'checked' : 'unchecked' }
                            onPress={() => setLabel('X')}
                        />
                        <Text
                            style={{
                                color: '#FFFFFF'
                            }}
                        >
                            X 
                        </Text>
                    </View>

                    <View 
                        style={styles.option}
                    >
                        <RadioButton 
                            value={'C'} 
                            status={ label === 'C' ? 'checked' : 'unchecked' }
                            onPress={() => setLabel('C')}
                        />
                        <Text
                            style={{
                                color: '#FFFFFF'
                            }}
                        >
                            C
                        </Text>
                    </View>       

                    <View 
                        style={styles.option}
                    >
                        <RadioButton 
                            value={'M'} 
                            status={ label === 'M' ? 'checked' : 'unchecked' }
                            onPress={() => setLabel('M')}
                        />
                        <Text
                            style={{
                                color: '#FFFFFF'
                            }}
                        >
                            M
                        </Text>
                    </View>    

                    <View 
                        style={styles.option}
                    >
                        <RadioButton 
                            value={'LM'} 
                            status={ label === 'LM' ? 'checked' : 'unchecked' }
                            onPress={() => setLabel('LM')}
                        />
                        <Text
                            style={{
                                color: '#FFFFFF'
                            }}
                        >
                            LM
                        </Text>
                    </View>     

                </View>

                <View
                    style={styles.options}
                >
                    <View 
                        style={styles.option}
                    >
                        <RadioButton 
                            value={'MM'} 
                            status={ label === 'MM' ? 'checked' : 'unchecked' }
                            onPress={() => setLabel('MM')}
                        />
                        <Text
                            style={{
                                color: '#FFFFFF'
                            }}
                        >
                            MM
                        </Text>
                    </View>

                    <View 
                        style={styles.option}
                    >
                        <RadioButton 
                            value={'F1'} 
                            status={ label === 'F1' ? 'checked' : 'unchecked' }
                            onPress={() => setLabel('F1')}
                        />
                        <Text
                            style={{
                                color: '#FFFFFF'
                            }}
                        >
                            F1
                        </Text>
                    </View>

                    <View 
                        style={styles.option}
                    >
                        <RadioButton 
                            value={'F2'} 
                            status={ label === 'F2' ? 'checked' : 'unchecked' }
                            onPress={() => setLabel('F2')}
                        />
                        <Text
                            style={{
                                color: '#FFFFFF'
                            }}
                        >
                            F2
                        </Text>
                    </View>       

                    <View 
                        style={styles.option}
                    >
                        <RadioButton 
                            value={'F3'} 
                            status={ label === 'F3' ? 'checked' : 'unchecked' }
                            onPress={() => setLabel('F3')}
                        />
                        <Text
                            style={{
                                color: '#FFFFFF'
                            }}
                        >
                            F3
                        </Text>
                    </View>   

                </View>

                <Button
                    style={styles.rate}
                    onPress={handleSelect}
                >
                    ACCEPT
                </Button>
            </View>
        </>
    );
}