import * as React from 'react';
import { View,
         StyleSheet,
         ScrollView,
         Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import RemedyClick from './remedyClick';

const styles = StyleSheet.create({
  logoView: {
      display: 'flex',
      backgroundColor: '#54B9FF',
      height: '95%',
      marginHorizontal: 8,
      borderRadius: 24,
  },
  txtInput: {
      backgroundColor: '#54B9FF',
      margin: 16,
  },
  vwClicks: {
      paddingHorizontal: 16,
      marginVertical : 8,
  },
  rate: {
      color: '#FFFFFF',
      fontWeight: 'bold',
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

export default function RemedySearch(props){

    const [ready, isReady] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [cannon, setCannon] = React.useState([]);
    const [filter, setFilter] = React.useState([]);

    React.useEffect(() => {
        if(ready){
            return;
        }

        isReady(true);
        setCannon(props.rList);
        setFilter(props.rList);
    });

    React.useEffect(() => {
        if(!ready){
            return;
        }

        if(search === ''){
            setFilter(cannon);
            return;
        }

        handleFilter();
    }, [search]);

    const handleFilter = async() => {
        const txt = cannon.filter(c => c.label.toLowerCase().includes(search));
        const rts = cannon.filter(c => c.value.includes(search));
        const result = [...txt, ...rts];
        
        setFilter(result);
    }

    const handleSelect = async(r) => {
        props.onSelect(r);
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
                    label='Search'
                    placeholder='Search...'
                    value={search}
                    onChangeText={text => setSearch(text)}
                />

                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Text
                        style={styles.rate}
                    >
                        Select one option
                    </Text>
                </View>
                
                <ScrollView
                    style={styles.vwClicks}
                >
                    {filter.map((rem => 
                        <RemedyClick Rate={rem.value} Name={rem.label} Remedy={rem} onSelect={handleSelect}/>
                    ))}
                    {/* <RemedyClick Rate={654656565} Name={'Carlitos'}/> */}
                </ScrollView>

            </View>
        </>
    );
}