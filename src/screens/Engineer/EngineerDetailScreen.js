import React, {Component} from 'react';

// import {View} from 'react-native';
import { Icon } from 'react-native-elements'
import { Container, Header, View, Fab, Text } from 'native-base';
import { Button } from 'react-native-elements';

import axios from 'axios';





class EngineerDetailScreen extends React.Component {

  render() {

    const { navigate, state } = this.props.navigation;
    console.log(this.props.navigation.state.params.id_engineer, '***');


    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'powderblue',
        alignItems: 'stretch',
      }}>
        <View style={{
          height: '30%',      
          backgroundColor: 'darkslateblue'
        }} />
                <View style={{
                  height: '60%',
                  backgroundColor: 'deeppink'
                }}>
                        <View style={{
                          height: '40%',
                          backgroundColor: 'lightblue',
                          flexDirection: 'row'
                        }}>
                                <View style={{
                                  width: '40%',
                                  backgroundColor: 'lightpink'
                                }} />
                                <View style={{
                                  width: '60%',
                                  backgroundColor: 'peru'
                                }} />
                        </View>
                        <View style={{
                          height: '60%',
                          backgroundColor: 'lightgreen'         
                        }} >
                        <Text>Hello {state.params.id_engineer}</Text>
                        </View>
                </View>
        <View style={{
          height: '10%',
          backgroundColor: 'goldenrod',
          justifyContent: "center",
          alignItems: "center"
        }} >
            <View style={{
                width: '80%',
                backgroundColor: 'darkslateblue'
            }} >

                <Button
                title="Hire Me"
                buttonStyle={{borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                />

            </View>

        


        </View>


        <Fab
            active='false'
            style={{ backgroundColor: '#F4CF5D' }}
            position="topLeft"
        >
        <Icon
            name='rowing' />
        </Fab>


      </View>
    );
  }
}

export default EngineerDetailScreen;