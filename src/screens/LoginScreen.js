import React from 'react';
import { StyleSheet, View, Button,
         TextInput, Text
         } from 'react-native';

/**
 * Login screen
 */

class LoginScreen extends React.Component {

    // static navigationOptions = {
    //     title: 'Homes',
    // };
    state = {
        inputUsername: '',
        inputPassword: ''
    }

    

    render() {

        const { navigate } = this.props.navigation;
        

        return (

            <View style={styles.container}>
                <Text>Login</Text>


                <TextInput 
                    style={styles.textInput}
                    placeholder="Username"
                    onChangeText={(text) => this.setState({inputUsername: text})}
                    // underlineColorAndroid='#fff'
                />

                <TextInput 
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(text) => this.setState({inputPassword: text})}
                    // underlineColorAndroid='#fff'
                />

                <Button
                    title="LOGIN ME"
                />

                <Text>{"\n"}</Text>

                 <Button
                    title="Register"
                    onPress={() => navigate('Register')}
                />                
            </View>
        );
    }
}

export default LoginScreen

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