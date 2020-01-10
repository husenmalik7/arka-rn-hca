import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Modal, TouchableHighlight,
        Image, FlatList, Alert } from 'react-native';
// import { Searchbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';

import axios from 'axios';

const url = 'http://192.168.6.140:9000/'

class EngineerListScreen extends React.Component {
    state = {
        engineerList: [],
        modalVisible: false
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible})
    }

    componentDidMount() {
        this.getData()
    }

    getData(){
        // axios.get('http://mhs.rey1024.com/apibudaya/getListCategory.php')
        axios.get(url+'engineer', console.log('URLRURLRURLRU'))

        
        .then(res => {
            console.log(res.data.response);
            this.setState({ engineerList: res.data.response });
            // console.log(this.state.engineerList,'123');
        })
    }

    



    render() {
        return (

          <View style={{
              flex: 1, 
              flexDirection: 'column',
              alignItems: 'stretch',
            }}>

              <View style={{
                  height: 50, 
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: 'powderblue', 
                  justifyContent: 'space-between',
                }}>
                  <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 20, height: 20}} />
                  <Text>2</Text>
                  <Image source={{uri: 'https://facebook.github.io/react/logo-og.png'}} style={{width: 20, height: 20}} />
              </View>
            
              <View style={{height: 50, backgroundColor: 'skyblue', alignItems: 'center',   justifyContent: 'center'}} >
                  {/* <Searchbar style={{width: '80%'}} placeholder="Search"/> */}
                  <Text>Caritana search bar</Text>
              </View>

              <View style={{flex: 1,  backgroundColor: 'steelblue'}} >
                {console.log(this.state.engineerList, 'lopopoppopop')}
                <FlatList
                  data={ this.state.engineerList }
                  renderItem={({item}) => <Text>{item.name}</Text>}
                  keyExtractor={(item, index) => index.toString() }
                />
              </View>


              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { console.log("hi")}}
              />

              <View style={{marginTop: 22}}>
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {Alert.alert('Modal has been closed')}}
                >
                  <View style={{marginTop: 22}}>
                    <View>
                      <Text>Wassup fellas</Text>
                    
                  

                      <TouchableHighlight
                        onPress={() => {this.setModalVisible(!this.state.modalVisible)} }
                      >
                      <Text>Hide momodl</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>


                <TouchableHighlight
                  onPress={() => {this.setModalVisible(true)}}
                >
                  <Text>SSHOw modalas</Text>
                </TouchableHighlight>
              </View>

          </View>
        );
    }
}

export default EngineerListScreen;
