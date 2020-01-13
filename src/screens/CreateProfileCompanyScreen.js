import React from 'react';
import { StyleSheet, View, Button,
         TextInput, Text, Alert, AsyncStorage
         } from 'react-native';





class CreateProfileCompanyScreen extends React.Component {
    

    render() {

        const { navigate } = this.props.navigation;

        return (

            <View style={styles.container}>
                <Text>this is profile company screen</Text>
            </View>
        );
    }
}

export default CreateProfileCompanyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'        
    },

    textInput: {
        width: '80%',
        height: 40,
        borderColor: '#009688',
        borderWidth: 1,
        backgroundColor: '#fff',
        textAlign: "center",
        margin: '5%'
    }
});