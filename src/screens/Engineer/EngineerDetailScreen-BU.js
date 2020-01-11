import React from 'react';
import { StyleSheet, Text, Picker,
         TextInput, TouchableHighlight,
         Image, FlatList, Alert } from 'react-native';
import axios from 'axios';
import { Icon } from 'react-native-elements'
import { Container, Header, Button, View, Fab } from 'native-base';



class EngineerDetailScreen extends React.Component {

    render(){

    const { navigate, state } = this.props.navigation;
    console.log(this.props.navigation.state.params.id_engineer, '***');

        return(
            
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch'
            }}>
                <View style={{ height: '30%', backgroundColor: 'powderblue'}} />
                <View style={{ height: '60%', backgroundColor: 'skyblue'}} />
                <View style={{ height: '10%', backgroundColor: 'steelblue'}} />


                <Text>welcome to engineer detail</Text><Text>welcome to engineer detail</Text><Text>welcome to engineer detail</Text><Text>welcome to engineer detail</Text><Text>welcome to engineer detail</Text>

                <Text>Hello {state.params.id_engineer}</Text>

            <Fab
                active='false'
                style={{ backgroundColor: '#F4CF5D' }}
                position="topLeft"
            >
                <Icon
  name='rowing' />
            </Fab>




            </View>
            
        )
    }
}

export default EngineerDetailScreen;


