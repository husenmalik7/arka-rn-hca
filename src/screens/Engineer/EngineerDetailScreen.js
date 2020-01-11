import React from 'react';
import { StyleSheet, View, Text, Picker,
         TextInput, TouchableHighlight,
         Image, FlatList, Alert } from 'react-native';
import axios from 'axios';



class EngineerDetailScreen extends React.Component {




    render(){

    const { navigate, state } = this.props.navigation;
    console.log(this.props.navigation.state.params.id_engineer, '***');

        return(
            <View>
                <Text>
                    welcome to engineer detail
                </Text>

                <Text>Hello {state.params.id_engineer}</Text>

            </View>
        )
    }
}

export default EngineerDetailScreen;


