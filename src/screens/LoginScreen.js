import React from 'react';
import { StyleSheet, View, Button,
         TextInput, Text, Alert, AsyncStorage
         } from 'react-native';
import Axios from 'axios';


/**
 * Login screen
 */

//role
// 0 for company, 1 for engineer

const url = 'http://192.168.6.139:9000/'

class LoginScreen extends React.Component {

    state = {
        inputEmail: '',
        inputPassword: '',
        role: null,
        id_company: null,
        id_engineer: null
    }


    storeData = async(data) => {
        try {
            await AsyncStorage.setItem('token', data.token)
            await AsyncStorage.setItem('id_company', data.id_company)

            console.log('storetteotoe', data.id_company);
        } catch (e) {
            
        }
    }

    
    

    handleLogin(){
        console.log('++', this.state.inputEmail)
        console.log('--', this.state.inputPassword)
        const { navigate } = this.props.navigation;

        const data = {
            email: this.state.inputEmail,
            password: this.state.inputPassword
        }

        console.log('data yors', data)

        Axios.post(url+'user/login', data)
        .then(res => {

            // console.log(res.data.message, 'yooo')
            if (res.data.message === 'password is not correct'){
                // console.log('password teu sarua')
                Alert.alert('password incorrect')
            } else {
                // console.log('password sarua')
                // console.log(res)
                const data = res.data.data


                const dataObj = {
                    email: data.email,
                    token: data.token,
                    id_user: data.id_user,
                    role: data.role,
                    id_company: data.id_company,
                    id_engineer: data.id_engineer
                }

                console.log('auuu', dataObj.id_company)
                this.storeData(dataObj)

                // AsyncStorage.setItem('email', data.email)
                // AsyncStorage.setItem('token', data.token)
                // AsyncStorage.setItem('id_user', data.id_user)
                // AsyncStorage.setItem('role', data.role)
                // AsyncStorage.setItem('id_company', data.id_company)
                // AsyncStorage.setItem('id_engineer', data.id_engineer)

                if ( data.id_company == null && data.id_engineer == null ){
                    // console.log('duanana null euy')

                    console.log(data.role)

                    if (data.role == 0){ //0 for company
                        // console.log('maneh teh company nya')
                        // this.props.navigation('CreateProfileCompany')
                        navigate('CreateProfileCompany')
                    } else {
                        // console.log('maneh mah ENGINEER')
                        // this.props.navigation('CreateProfileEngineer')
                        navigate('CreateProfileEngineer')
                    }

                } else {
                    // console.log('salah sahiji na teu nul euy')

                    if (data.role == 0) {
                        console.log('selamat datang company', data.id_company)
                        navigate('EngineerList', {id_company: data.id_company})
                    } else {
                        console.log('selamat datang engineer')
                        navigate('EngineerDetail', {id_engineer: data.id_engineer})
                    }


                }

                


            }

        


            
            

        })
        .catch(err=> {console.log(err), Alert.alert('email not found')})

    }

    

    render() {

        const { navigate } = this.props.navigation;
        

        return (

            <View style={styles.container}>
                <Text>Login</Text>


                <TextInput 
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={(text) => this.setState({inputEmail: text})}
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
                    // onPress={() => navigate('EngineerList')}
                    onPress={() => this.handleLogin()}
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