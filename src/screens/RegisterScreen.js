import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert } from 'react-native';
import axios from 'axios'
import { ButtonGroup } from 'react-native-elements';

/**
 * Register screen
 */


const url = 'http://192.168.6.139:9000/'

class RegisterScreen extends React.Component {

    state = {
        inputEmail: '',
        inputPassword: '',
        user: [],
        userLength: 0,
        resCompare: false,
        selectedIndexRole: null,
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        axios.get(url+'user', console.log('axios||getdataUser||') )
        .then(res => {
            // console.log(res.data.data, 'thisisres');
            // console.log(res.data.data.length, 'this is lenght')
            this.setState({ user: res.data.data , userLength: res.data.data.length })
            // console.log('thisisstateuser', this.state.user)
        })
    }

    compareEmail(emailInput){
        // console.log('hello this is length', this.state.userLength)

        let i = 0;
        let result;
        let same = false;
        let emailInputLoCase = emailInput.toLowerCase();
        
        while (i < this.state.userLength) {
            result = emailInputLoCase.localeCompare(this.state.user[i].email.toLowerCase())
            if (result == 0) {
                same = true
            }
            i=i+1;
        }

        // console.log('ada yg sama?', same)
        if (same == true) {
            this.setState({resCompare: true})
        } else {
            this.setState({resCompare: false})
        }

    }

    

    handleRegister = async () => {
        // console.log('R--u', this.state.inputEmail)
        // console.log('R--P', this.state.inputPassword)

        await this.compareEmail(this.state.inputEmail)

        if ( this.state.resCompare == true ){
            Alert.alert('the email has been taken')
        } else {
            //0 for left, 1 for right
            //0 for company, 1 for engineer

            // console.log('your email', this.state.inputEmail)
            // console.log('your pass', this.state.inputPassword)
            // console.log('your role is ', this.state.selectedIndexRole)


            const data = { email: this.state.inputEmail, password: this.state.inputPassword, role: this.state.selectedIndexRole }


            axios.post(url+'user/register', data)
            .then(res=> {console.log(res), Alert.alert('success register, please login') }) 
            .catch(err=> {console.log(err) })
        }

    }

    updateIndexRole(selectedIndexRole) {
        this.setState({selectedIndexRole})
    }

    

    render() {

        const { navigate } = this.props.navigation;
        const role = [ 'Company', 'Engineer' ]

        return (
                <View style={styles.container}>
                    <Text>Register</Text>

                    <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(text) => this.setState({inputEmail: text})}
                    />

                    <TextInput 
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={(text) => this.setState({inputPassword: text})}
                    />

                    <ButtonGroup
                        buttons={role}
                        onPress={this.updateIndexRole.bind(this)}
                        selectedIndex={this.state.selectedIndexRole}  
                    />


                    <Button
                        title="REGISTER ME"
                        onPress={() => this.handleRegister()}
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