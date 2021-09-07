import * as React from 'react';
import { StyleSheet,
         TouchableOpacity,
         View,
         Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
  },
  main: {
      elevation: 5,
      paddingHorizontal: 24,
      backgroundColor: '#5463ff',
      borderRadius: 24,
      marginBottom: 8,
      borderWidth: 2,
      borderColor: '#FFFFFF'
  },
  rate: {
      color: '#FFFFFF'
  },
  title: {
      color: '#FFFFFF',
      fontSize: 24,
  },
});


export default function RemedyClick(props){
    return (
        <>
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    style={styles.main}
                    onPress={() => props.onSelect(props.Remedy)}
                >
                    <Text
                        style={styles.rate}
                    >
                        Rate: {props.Rate}
                    </Text>
                    <Text
                        style={styles.title}
                    >
                        {props.Name}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}