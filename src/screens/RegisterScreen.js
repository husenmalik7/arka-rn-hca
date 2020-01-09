import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

/**
 * Register screen
 */

class RegisterScreen extends React.Component {

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('name'),
    //     };
    // };

    render() {

        const { navigate } = this.props.navigation;

        return (
                <View style={styles.container}>
                    <Text>Register</Text>

                    <TextInput 
                    style={styles.textInput}
                    placeholder="Username"
                    onChangeText={(text) => this.setState({inputUsername: text})}
                    />

                    <TextInput 
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(text) => this.setState({inputUsername: text})}
                    />


                    <Button
                        title="REGISTER ME"
                    />

                    <Text>{"\n"}</Text>

                    <Button
                        title="Login"
                        onPress={() => navigate('Login')}
                    />
                </View>
        );
    }
}

export default RegisterScreen;

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